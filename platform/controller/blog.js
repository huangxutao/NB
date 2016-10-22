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

  var query = req.query;
  var page = query.page ? parseInt(query.page, 10) : 1;

  post.getPage(page, function(err, result) {
    if(err) return console.log(err);
    return (req.query.json !== 'true') ? res.render('layout/index', {
      title: '主页',
      site: config.site,
      posts: result
    }) :
    res.json({status: 'success', posts: result});
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
        if(err) return handleError(err, res);

        var this_article = {
          pre: preArticle,
          curr: currArticle,
          next: nextArticle
        }

        return (req.query.json !== 'true') ? res.render('layout/post', {
          title: currArticle.title,
          site: config,
          article: this_article
        }) :
        res.json({status: 'success', article: this_article});

      });
    });
  });
};

// show 归档页
exports.showArchive = function(req, res) {
  console.log('show 归档页');

  post.getArchive(function(err, result) {
    if(err) return handleError(err, res);

    return (req.query.json !== 'true') ? res.render('layout/archive', {
      title: 'ARCHIVE',
      site: config,
      posts: result
    }) :
    res.json({status: 'success', posts: result});

  });
};

// show 分页
exports.showPage = function(req, res) {
  console.log('show 分页');
}

// show 特定类别页
exports.showCategory = function(req, res) {

  console.log('show 特定类别页');
  
  post.getCategory(req.query.name, function(err, result) {
    return (req.query.json !== 'true') ? res.render('layout/category', {
      title: 'CATEGORY=' + req.query.name,
      site: config,
      posts: result
    }) :
    res.json({status: 'success', posts: result});
  });
}

// show 特定标签页
exports.showTag = function(req, res) {

  console.log('show 特定标签页');
  
  post.getTag(req.query.name, function(err, result) {
    return (req.query.json !== 'true') ? res.render('layout/tag', {
      title: 'TAG=' + req.query.name,
      site: config,
      posts: result
    }) :
    res.json({status: 'success', posts: result});
  });
}
