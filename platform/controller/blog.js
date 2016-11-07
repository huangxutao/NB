var post   = require('../models/post');
var config = require('../config.js');

/***
 *
 * Function handleError
 *
 */
function handleError(err, req, res) {
  var err_msg = {
    title: '404',
    message: err ? err.message: 'no post',
    error: {}
  };
  res.status(404);
  return (req.query.json !== 'true') ? res.render('error', err_msg) : res.json(err_msg);
}

// show 博客首页
exports.showIndex = function(req, res) {
  console.log('show 博客首页');

  var page = req.query.num ? parseInt(req.query.num, 10) : 1;

  console.log('Page:',page);

  post.getCount(function(err, count) {
    if(err || count === 0) return handleError(err, req, res);

    post.getPage(page, function(err, result) {
      var data;

      if(err) return handleError(err, req, res);

      else if(result.length === 0) return res.redirect('./');

      data = {
        title: '主页',
        site: config.site,
        posts: result,
        page: {
          pre_num: page - 1,
          curr_num: page,
          next_num: page + 1,
          hasPre: (page - 1) > 0,
          hasNext: ((page-1) * 8 + result.length) < count
        }
      };

      return (req.query.json !== 'true') ? res.render('layout/index', data) : res.json(data);
    });
  });
};

// show 具体文章页
exports.showPost = function(req, res) {

  console.log('show 具体文章页');

  var article =  req.query.article || '';

  post.getPreArticle(article, function(err, preArticle) {
    if(err) return handleError(err, req, res);

    post.getCurrArticle(article, function(err, currArticle) {
      if(err) return handleError(err, req, res);

      var query = {
        _id: article
      };
      var this_article;
      var arr = currArticle.views.detail;  // 所有访客记录
      var req_ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/)[0];  // 当前访客 IP
      var isNew = true;  // 是否为新访客
      var date = new Date();
      var count = currArticle.views.count;  // 总访问量

      if(arr.length !== 0) {

        for(var i = 0, len = arr.length; i < len; i++) {
          if(arr[i].indexOf(req_ip) >= 0) {  // 若已有 IP 记录
            if((date - arr[i][2]) > 1000 * 60 * 60) {  // 访问时间间隔一小时以上算一次访问
              arr[i][1] += 1;  // 当前 IP 访问量
              count += 1;  // 总访问量
            }
            arr[i][2] = date;
            isNew = false;
          }
        }

      } else {
        isNew = true;
      }

      if(isNew) {
        arr.push([req_ip, 1, date]);
        count += 1;
      }

      this_article = {
        $set: {
          views: {
            detail: arr,
            count: count
          }
        }
      };

      post.update(query, this_article, function(err) {
        if(err) return handleError();
      });

      post.getNextArticle(article, function(err, nextArticle) {
        var data;

        if(err) return handleError(err, req, res);

        data = {
          title: currArticle.title,
          site: config.site,
          article: {
            pre: preArticle,
            curr: currArticle,
            next: nextArticle
          }
        };

        return (req.query.json !== 'true') ? res.render('layout/post', data) : res.json(data);
      });
    });
  });
};

// show 归档页
exports.showArchive = function(req, res) {
  console.log('show 归档页');

  post.getArchive(function(err, result) {
    var data;

    if(err) return handleError(err, req, res);

    data = {
      title: 'ARCHIVE',
      site: config.site,
      posts: result
    };

    return (req.query.json !== 'true') ? res.render('layout/archive', data) : res.json(data);

  });
};

// show 分页
exports.showPage = function(req, res) {
  console.log('show 分页');

  var page = req.query.num ? parseInt(req.query.num, 10) : 1;

  if(isNaN(page)) return res.redirect('./');

  post.getCount(function(err, count) {
    if(err) return handleError(err, req, res);

    post.getPage(page, function(err, result) {
      var data;

      if(err) return handleError(err, req, res);

      else if(result.length === 0) return res.redirect('./');

      data = {
        title: '博客 | Page' + page,
        site: config.site,
        posts: result,
        page: {
          pre_num: page - 1,
          curr_num: page,
          next_num: page + 1,
          hasPre: (page - 1) > 0,
          hasNext: ((page-1) * 8 + result.length) < count
        }
      };

      return (req.query.json !== 'true') ? res.render('layout/index', data) : res.json(data);
    });
  });
};

// show 特定类别页
exports.showCategory = function(req, res) {

  console.log('show 特定类别页');

  post.getCategory(req.query.name, function(err, result) {
    var data;

    if(err) return handleError(err, req, res);

    data = {
      title: 'CATEGORY=' + req.query.name,
      site: config.site,
      posts: result
    };

    return (req.query.json !== 'true') ? res.render('layout/category', data) : res.json(data);
  });
};

// show 特定标签页
exports.showTag = function(req, res) {

  console.log('show 特定标签页');

  post.getTag(req.query.name, function(err, result) {
    var data;

    if(err) return handleError(err, req, res);

    data = {
      title: 'TAG=' + req.query.name,
      site: config,
      posts: result
    };

    return (req.query.json !== 'true') ? res.render('layout/tag', data) : res.json(data);
  });
};
