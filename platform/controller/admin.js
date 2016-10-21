var marked = require('marked');
var post   = require('../models/post');
var config = require('../config.js');

/* rewrite the marked method / START */
var renderer = new marked.Renderer();

renderer.heading = function (text, level) {
  return '<h' + level + ' id="' + text.toLowerCase() + '">' + text + '</h' + level + '>\n';
};

renderer.link = function(href, title, text) {
  var out = '<a href="' + href + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += ' target="_blank">' + text + '</a>';
  return out;
};
/* rewrite the marked method / END */

/*** 
 * 
 * Function 完善 HTML 标签
 * @param { String } str 含有 html 标记的字符串
 * 
 */
function completeHTML(str) {
  var regAllTag   = /<[^>]*>/ig;  // 正则 所有标签
  var regStartTag = /<[^\/>]*>/i;  // 正则 开启标签
  var regEndTag   = /<\/[^\/>]*>/i;  // 正则 闭合标签
  var arrStart = [];  // 储存 开启标签
  var lastTagPosition; // 最后一个标签的位置(不论开启还是关闭)
  var breakTagPosition;  // 破损标签的位置, 破损标签 eg: '<a href' 或 '<h1' 或 '<'
  var tagNeeded;  // 需要被补全的标签
  var tagCurr;  // 当前匹配到的标签

  while((tagCurr = regAllTag.exec(str)) !== null) { // 首先查询所有完整的标签
    if(regStartTag.test(tagCurr[0])) {  // 如果符合'开启标签'的字符串,则压入栈 (数组 arrStart)
      var p = tagCurr[0].indexOf(' ');
      if(p < 0) {  // 没有多余属性的直接入栈
        arrStart.push(tagCurr[0]);
      } else {  // 如果有类似 id class title 等属性的,做去除
        arrStart.push(tagCurr[0].replace(' ', '>').substring(0, p + 1));
      }
    }
    else if(regEndTag.test(tagCurr[0])){  // 如果出现闭合标签,则出栈
      arrStart.pop();
    }
    lastTagPosition = regAllTag.lastIndex;
    // 最终留下来未出栈的标签就是未匹配闭合的标签了
  }

  breakTagPosition = str.lastIndexOf('<');
  tagNeeded = arrStart.reverse().join('').replace(/</g, '</');

  if(breakTagPosition >= lastTagPosition) {
    return str.substring(0, breakTagPosition) + '' + tagNeeded;
  } else {
    return str + '' + tagNeeded;
  }
}

/*** 
 * 
 * Function 处理文章
 * @param { Object } req 请求对象
 * @param { String } option 文章的类型　( 默认 new: 表示新建文章; 否则为　update 更新文章 )
 * 
 */
function article(req, option) {
  var this_option = option || 'new';
  var date = new Date();
  var htmlstr = marked(req.body.content, { renderer: renderer });

  if(this_option === 'new') {
    return {
      title: req.body.title,
      date: {
        publish: date,
        update: date
      },
      content: {
        html: htmlstr,
        markdown: req.body.content,
        summary: {
          html: completeHTML(htmlstr.substring(0, 240)),
          text: htmlstr.replace(/<[^>]+>/g, '').substring(0, 140)
        }
      },
      tags: req.body.tags,
      category: req.body.category,
      views: 0,
      isDraft: req.body.isDraft
    };
  } else {
    return {
      $set: {
        title: req.body.title,
        'date.update': date,
        content: {
          html: htmlstr,
          markdown: req.body.content,
          summary: {
            html: completeHTML(htmlstr.substring(0, 240)),
            text: htmlstr.replace(/<[^>]+>/g, '').substring(0, 140)
          }
        },
        tags: req.body.tags,
        category: req.body.category,
        isDraft: req.body.isDraft
      }
    };
  }
}

// show 后台登录界面
exports.showSignin = function(req, res) {
  return res.render('backend/signin', { title: '登录' ,site: config.site});
};

// admin 登出
exports.toSignout = function(req, res) {
  return req.session.destroy(function() {
    res.redirect('/do-manage/signin');
  });
};

// show 后台界面
exports.showIndex = function(req, res) {
  var emojis = ['😁', '😂', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😌', '😍', '😏', '😒', '😓', '😔', '😘', '😜', '😝', '😣', '😫', '😭', '😰', '😨', '😤', '😱', '🙅', '🙌', '🙋', '🙈', '✌', 'ℹ', '⏰', '☀', '☕', '✔', '✖', '❓', '❤'];
  
  return res.render('backend/index', {title: '后台管理', emojis: emojis, qiniu_domain: config.qiniu.domain});
};

// admin 登入
exports.toSignin = function(req, res) {
  var user = config.user;

  req.session.user = false;
  if(req.body.user === user.name && req.body.password === user.password) {
    req.session.user = true;
    res.json({status: 'success'});
  } else {
    res.json({status: 'fail'});
  }
};

// admin 发表文章
exports.toPublish = function(req, res) {
  var this_article = {};

  if(req.body.title === '' || req.body.tags === '' || req.body.content === '') {
    res.json({status: 'fail', detail: '数据不能为空'});
  } else {
    this_article = article(req, 'new');
  }
  
  post.create(this_article, function(err, thisPost) {
    return err ? res.json({status: 'fail', detail: '后台,操作数据库出错'}) : res.json({status: 'success', detail: '发布成功', post: {_id: thisPost._id, title: thisPost.title}});
  });
};

// admin 删除文章
exports.toDelete = function(req, res) {
  post.remove({_id: req.body.id}, function(err) {
    return err ? res.json({status: 'fail', detail: '操作数据库出错'}) : res.json({status: 'success', detail: '删除成功'});
  });
};

// admin 更新文章
exports.toUpdate = function(req, res) {
  var query = {
    _id: req.body.id
  };
  var this_article = {};

  if(req.body.title === '' || req.body.tags === '' || req.body.content === '') {
    res.json({status: 'fail', detail: '数据不能为空'});
  } else {
    this_article = article(req, 'update');
  }

  post.update(query, this_article, function(err) {
    return err ? res.json({status: 'fail', detail: '操作数据库出错'}) : res.json({status: 'success', detail: '更新成功'});
  });
};

// admin 获取一篇文章
exports.getPost = function(req, res) {
  post.getOne(req.body.id, function(err, post) {
    return err ? res.json({status: 'fail', detail: '操作数据库出错'}) : res.json({status: 'success', detail: '载入成功', post: post});
  });
};

// admin 批量获取文章
exports.getPosts = function(req, res) {
  if(req.body.archive === 'published') {
    post.getPublished(function(err, posts) {
      return err ? res.json({status: 'fail', detail: '操作数据库出错'}) : res.json({status: 'success', detail: posts});
    });
  }

  if(req.body.archive === 'draft') {
    post.getDraft(function(err, posts) {
      return err ? res.json({status: 'fail', detail: '操作数据库出错'}) : res.json({status: 'success', detail: posts});
    });
  }
};
