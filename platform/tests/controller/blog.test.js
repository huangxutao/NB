var support = require('../support/support');
var app = require('../../app');
var request = require('supertest')(app);
var should = require("should");

var blog = {};
var article = {};

var checkJson = function(url, done) {
  request.get(url)
    .end(function(err, res){
      if(err) {
        done(err);
      } else {
        res.type.should.equal('application/json');
        done();
      }
    });
};

var checkHtml = function(url, done) {
  request.get(url)
    .end(function(err, res){
      if(err) {
        done(err);
      } else {
        res.type.should.equal('text/html');
        done();
      }
    });
};

blog.index = function(done) {
  checkHtml('/', done);
};

blog.post = function(done) {
  checkHtml('/post/?article=' + article._id, done);
};

blog.archive = function(done) {
  checkHtml('/archive', done);
};

blog.tag = function(done) {
  checkHtml('/tag/?name=' + article.tags, done);
};

blog.category = function(done) {
  checkHtml('/category/?name=' + article.category, done);
};

blog.page = function(done) {
  checkHtml('/page/?num=1', done);
};

///////

blog.indexJson = function(done) {
  checkJson('/?json=true', done);
};

blog.postJson = function(done) {
  checkJson('/post/?json=true&article=' + article._id, done);
};

blog.archiveJson = function(done) {
  checkJson('/archive/?json=true', done);
};

blog.tagJson = function(done) {
  checkJson('/tag/?json=true&name=' + article.tags, done);
};

blog.categoryJson = function(done) {
  checkJson('/category/?json=true&name=' + article.category, done);
};

blog.pageJson = function(done) {
  checkJson('/page/?json=true&num=1', done);
};

exports.test = function() {
  describe('GET Page Data', function() {
    before(function(done) {
      support.createArticle(function(a) {
        console.log('===========================>>>>>> Create Article');
        article = a;
        done();
      });
    });

    after(function(done) {
      console.log('============================>>>>>> Remove Article');
      support.removeArticle(article._id);
      done();
    });

    describe('With html', function() {
      this.timeout(10000);
      it('should get index', blog.index);
      it('should get post', blog.post);
      it('should get archive', blog.archive);
      it('should get tag', blog.tag);
      it('should get category', blog.category);
      it('should get page', blog.page);
    });

    describe('With Json', function() {
      this.timeout(10000);
      it('should get index', blog.indexJson);
      it('should get post', blog.postJson);
      it('should get archive', blog.archiveJson);
      it('should get tag', blog.tagJson);
      it('should get category', blog.categoryJson);
      it('should get page', blog.pageJson);
    });
  });
};
