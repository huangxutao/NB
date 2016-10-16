var fs     = require('fs');
var marked = require('marked');
var post   = require('../models/post');
var config = require('../config.js');

var layout = function(template) {
  return 'themes/'+ config.theme + '/' + template;
};

/* rewrite the marked method */
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





/****** GET ******/
// 前端
exports.show = function(req, res) {
  var query = req.query;
  var page = query.page ? parseInt(query.page, 10) : 1;

  res.render(layout('index'), { title: '主页', site: config.site});
};

// 后台登录
exports.Signin = function(req, res) {
  return res.render('backend/signin', { title: '登录' ,site: config.site});
};

// 后台登出
exports.Signout = function(req, res) {
  return req.session.destroy(function() {
    res.redirect('/do-manage/signin');
  });
};

// 后台管理
exports.manage = function(req, res) {
  var emojis = ['😁', '😂', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😌', '😍', '😏', '😒', '😓', '😔', '😘', '😜', '😝', '😣', '😫', '😭', '😰', '😨', '😤', '😱', '🙅', '🙌', '🙋', '🙈', '✌', 'ℹ', '⏰', '☀', '☕', '✔', '✖', '❓', '❤'];
  
  return req.session.user ? res.render('backend/index', {title: '后台管理', emojis: emojis, qiniu_domain: config.qiniu.domain}) : res.redirect('/do-manage/signin');
};







/****** POST ******/
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

/* 发表文章 */
exports.toPublish = function(req, res) {
  if(!req.session.user) {
    res.json({status: 'fail', detail: '登录超时请重新登录'});
  } else {
    if(req.body.title === '' || req.body.tags === '' || req.body.content === '') {
      res.json({status: 'fail', detail: '数据不能为空'});
    } else {
      createArticle();
    }
  }

  function createArticle() {
    var date = new Date();
    var article = {
      title: req.body.title,
      date: {
        publish: date,
        update: date
      },
      content: {
        html: marked(req.body.content, { renderer: renderer }),
        markdown: req.body.content,
        summary: completeHTML(marked(req.body.content).substring(0, 240))
      },
      tags: req.body.tags,
      category: req.body.category,
      isDraft: req.body.isDraft
    };

    post.create(article, function(err, thisPost) {
      return err ? res.json({status: 'fail', detail: '后台,操作数据库出错'}) : res.json({status: 'success', detail: '发布成功', post: {_id: thisPost._id, title: thisPost.title}});
    });
  }
};

exports.toDelete = function(req, res) {
  if(!req.session.user) return res.json({result: 'fail', detail: '登录超时请重新登录'});

  deleteArticle();

  function deleteArticle() {
    post.remove({_id: req.body.id}, function(err) {
      return err ? res.json({status: 'fail', detail: '操作数据库出错'}) : res.json({status: 'success', detail: '删除成功'});
    });
  }
};

exports.toUpdate = function(req, res) {
  if(!req.session.user) return res.json({result: 'fail', detail: '登录超时请重新登录'});

  if(req.body.title === '' || req.body.tags === '' || req.body.content === '') {
    res.json({status: 'fail', detail: '数据不能为空'});
  } else {
    updateArticle();
  }

  function updateArticle() {
    var date = new Date();
    var query = {
      _id: req.body.id
    };
    var article = {
      $set: {
        title: req.body.title,
        'date.update': date,
        content: {
          html: marked(req.body.content, { renderer: renderer }),
          markdown: req.body.content,
          summary: completeHTML(marked(req.body.content).substring(0, 240))
        },
        tags: req.body.tags,
        category: req.body.category,
        isDraft: req.body.isDraft
      }
    };

    post.update(query, article, function(err) {
      return err ? res.json({status: 'fail', detail: '操作数据库出错'}) : res.json({status: 'success', detail: '更新成功'});
    });
  }
};

exports.getPost = function(req, res) {
  if(!req.session.user) return res.json({result: 'fail', detail: '登录超时请重新登录'});
  post.getOne(req.body.id, function(err, post) {
    return err ? res.json({status: 'fail', detail: '操作数据库出错'}) : res.json({status: 'success', detail: '载入成功', post: post});
  });
};

exports.getPosts = function(req, res) {
  if(!req.session.user) return res.json({result: 'fail', detail: '登录超时请重新登录'});
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

  // post.getAll(function(err, posts) {
  //   return err ? res.json({status: 'fail', detail: '操作数据库出错'}) : res.json({status: 'success', detail: posts});
  // });
};
