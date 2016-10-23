var post   = require('../models/post');
var config = require('../config.js');

/*** 
 * 
 * Function handleError
 * 
 */
function handleError(err, res) {
  res.status(404);
  res.render('error', {
    title: '404',
    message: err.message,
    error: {}
  });
}

// show 博客首页
exports.showIndex = function(req, res) {
  console.log('show 博客首页');

  var page = req.query.num ? parseInt(req.query.num, 10) : 1;

  console.log('Page:',page)

  post.getCount(function(err, count) {
    if(err) return handleError(err, res);

    post.getPage(page, function(err, result) {
      var data;

      if(err) return handleError(err, res);

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
    if(err) return handleError(err, res);

    post.getCurrArticle(article, function(err, currArticle) {
      if(err) return handleError(err, res);

      post.getNextArticle(article, function(err, nextArticle) {
        var data;

        if(err) return handleError(err, res);

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

    if(err) return handleError(err, res);

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
    if(err) return handleError(err, res);

    post.getPage(page, function(err, result) {
      var data;

      if(err) return handleError(err, res);

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
}

// show 特定类别页
exports.showCategory = function(req, res) {

  console.log('show 特定类别页');
  
  post.getCategory(req.query.name, function(err, result) {
    var data;

    if(err) return handleError(err, res);

    data = {
      title: 'CATEGORY=' + req.query.name,
      site: config.site,
      posts: result
    };

    return (req.query.json !== 'true') ? res.render('layout/category', data) : res.json(data);
  });
}

// show 特定标签页
exports.showTag = function(req, res) {

  console.log('show 特定标签页');
  
  post.getTag(req.query.name, function(err, result) {
    var data;

    if(err) return handleError(err, res);

    data = {
      title: 'TAG=' + req.query.name,
      site: config,
      posts: result
    };

    return (req.query.json !== 'true') ? res.render('layout/tag', data) : res.json(data);
  });
}
