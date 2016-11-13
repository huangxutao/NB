var support = require('../support/support');
var app = require('../../app');
var request = require('supertest')(app);
var should = require("should");

var admin = {};
var Cookies;
var articleId;

admin.page = function(done) {
  request.get('/do-manage')
   .set('Cookie', support.adminCookie)
   .redirects(1)
   .expect(200, done);
};

admin.toPublish = function(done) {
  var article = {
    title: '测试标题',
    wrapper: '测试 wrapper',
    content: '## 测试内容\n\n ### 测试内容\n\n [百度](baidu.com),![pic](https://baidu.com/image.jpg)',
    tags: 'test',
    category: 'NodeJs',
    isDraft: false
  };
  request.post('/do-manage/to-publish')
    .set('Cookie', support.adminCookie)
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

admin.toUpdate = function(done) {
  var article = {
    id: articleId,
    title: '测试更新标题',
    wrapper: '测试 wrapper',
    content: '## 测试更新内容\n\n ### 测试内容\n\n [百度](baidu.com),![pic](https://oblky3j33.qnssl.com/images/css-tricks-attr.png)\n [百度](https://baidu.com)',
    tags: 'test,update',
    category: 'NodeJs',
  };
  request.post('/do-manage/to-update')
    .set('Cookie', support.adminCookie)
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

admin.toDelete = function(done) {
  request.post('/do-manage/to-delete')
    .set('Cookie', support.adminCookie)
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

admin.getPost = function(done) {
  request.post('/do-manage/get-post')
  .set('Cookie', support.adminCookie)
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

admin.getPostsPublished = function(done) {
  request.post('/do-manage/get-posts')
    .set('Cookie', support.adminCookie)
    .send({archive: "published"})
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

admin.getPostsDraft = function(done) {
  request.post('/do-manage/get-posts')
    .set('Cookie', support.adminCookie)
    .send({archive: "draft"})
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

exports.test = function() {
  describe('Test To Operate As Admin (./controller/admin.test.js)', function() {
    it('should response with 200 and status equal success, when the send request.', admin.page);
    it('should response with 200 and status equal success, when the send request.', admin.toPublish);
    it('should response with 200 and status equal success, when the send request.', admin.toUpdate);
    it('should response with 200 and status equal success, when the send request.', admin.toDelete);
    it('should response with 200 and status equal success, when the send request.', admin.getPost);
    it('should response with 200 and status equal success, when the send request.', admin.getPostsPublished);
    it('should response with 200 and status equal success, when the send request.', admin.getPostsDraft);
  });
};
