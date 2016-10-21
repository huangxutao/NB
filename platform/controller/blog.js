var post   = require('../models/post');
var config = require('../config.js');

// show 博客首页
exports.showIndex = function(req, res) {
  console.log('show 博客首页');

  var query = req.query;
  var page = query.page ? parseInt(query.page, 10) : 1;

  post.getPage(page, function(err, result) {
    if(err) return console.log(err);
    res.render('layout/index', {
      title: '主页',
      site: config.site,
      posts: result
    });
  });
};

// show 具体文章页
exports.showPost = function(req, res) {
  console.log('show 具体文章页');
};

// show 归档页
exports.showArchive = function(req, res) {
  console.log('show 归档页');
};

// show 分页
exports.showPage = function(req, res) {
  console.log('show 分页');
}

// show 特定归类页
exports.showCategory = function(req, res) {
  console.log('show 特定归类页');
}

// show 特定标签页
exports.showTag = function(req, res) {
  console.log('show 特定标签页');
}
