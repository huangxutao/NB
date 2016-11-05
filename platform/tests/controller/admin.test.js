var app = require('../../app');
var config = require('../../config');
var request = require('supertest')(app);
var should = require("should");

var Cookies;
var articleId;

// 登录
exports.signin = function(done) {
  request.post('/to-signin')
    .send({user: config.user.name, password: config.user.password})
    .end(function(err, res){
      if(err) {
        done(err);
      } else {
        Cookies = res.headers['set-cookie'].pop().split(';')[0];
        res.type.should.equal('application/json');
        done();
      }
    });
};

// 登出
exports.signout = function(done) {
  request.get('/do-manage/signout')
    .set('Cookie', Cookies)
    .end(function(err, res) {
      done(err);
    });
};

// Admin Page
exports.page = function(done) {
  request.get('/do-manage')
   .set('Cookie', Cookies)
   .redirects(1)
   .expect(200, done);
};

// 发表文章
exports.toPublish = function(done) {
  var article = {
    title: '测试标题',
    wrapper: '测试 wrapper',
    content: '## 测试内容\n\n ### 测试内容\n\n [百度](baidu.com),![pic](https://baidu.com/image.jpg)',
    tags: 'test',
    category: 'NodeJs',
    isDraft: false
  };
  request.post('/do-manage/to-publish')
    .set('Cookie', Cookies)
    .send(article)
    .end(function(err, res){
      if(err) {
        done(err);
      } else {
        res.type.should.equal('application/json');
        res.body.status.should.equal("success");
        articleId = res.body.post._id;
        done();
      }
    });
};

exports.toUpdate = function(done) {
  var article = {
    id: articleId,
    title: '测试更新标题',
    wrapper: '测试 wrapper',
    content: '## 测试更新内容\n\n ### 测试内容\n\n [百度](baidu.com),![pic](https://baidu.com/image.jpg)',
    tags: 'test,update',
    category: 'NodeJs',
  };
  request.post('/do-manage/to-update')
    .set('Cookie', Cookies)
    .send(article)
    .end(function(err, res){
      if(err) {
        done(err);
      } else {
        res.type.should.equal('application/json');
        res.body.status.should.equal("success");
        done();
      }
    });
};

exports.toDelete = function(done) {
  request.post('/do-manage/to-delete')
    .set('Cookie', Cookies)
    .send({id: articleId})
    .end(function(err, res){
      if(err) {
        done(err);
      } else {
        res.type.should.equal('application/json');
        res.body.status.should.equal("success");
        done();
      }
    });
};

exports.getPost = function(done) {
  request.post('/do-manage/get-post')
  .set('Cookie', Cookies)
  .send({id: articleId})
  .end(function(err, res){
    if(err) {
      done(err);
    } else {
      res.type.should.equal('application/json');
      res.body.status.should.equal('success');
      done();
    }
  });
};

exports.getPosts = function(done) {
  request.post('/do-manage/get-posts')
    .set('Cookie', Cookies)
    .send({archive: "published"})
    .expect(200, done);
};
