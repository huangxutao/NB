var config = require('../../config');
var post = require('../../models/post');

exports.adminCookie = "developer=test_developer";

exports.createArticle = function(cb) {

  var date = new Date();

  var article = {
    title: '测试标题',
    wrapper: 'https://oblky3j33.qnssl.com/images/helloworld.png',
    date: {
      publish: date,
      update: date
    },
    content: {
      html: '<h2 id=\"测试内容\">测试内容</h2>\n<h3 id=\"测试内容\">测试内容</h3>\n<p> <a href=\"baidu.com\" target=\"_blank\">百度</a>,<img src=\"https://oblky3j33.qnssl.com/images/https-2.png\" alt=\"pic\"></p>\n',
      markdown: '## 测试内容\n\n ### 测试内容\n\n [百度](baidu.com),![pic](https://oblky3j33.qnssl.com/images/https-2.png)',
      summary: {
        html: '<h2 id=\"测试内容\">测试内容</h2>\n<h3 id=\"测试内容\">测试内容</h3>\n<p> <a href=\"baidu.com\" target=\"_blank\">百度</a>,<img src=\"https://baidu.com/image.jpg\" alt=\"pic\"></p>\n',
        text: '测试内容\n测试内容\n 百度,\n'
      }
    },
    tags: 'test',
    category: 'NodeJs',
    views: {
      detail: [],
      count : 0
    },
    isDraft: false
  };

  return post.create(article, function(err, this_article) {
    cb(this_article);
  });
};

exports.removeArticle = function(article) {
  return post.remove({_id: article}, function(err) {
    if(err) return err;
  });
}
