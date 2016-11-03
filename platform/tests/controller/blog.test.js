var app = require('../../app');
var config = require('../../config');
var request = require('supertest')(app);
var should = require("should");

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

exports.index = function(done) {
  checkHtml('/', done);
};

exports.post = function(done) {
  checkHtml('/post/?article=1kladq313', done);
};

exports.archive = function(done) {
  checkHtml('/archive', done);
};

exports.tag = function(done) {
  checkHtml('/tag/?name=javascript', done);
};

exports.category = function(done) {
  checkHtml('/category/?name=javascript', done);
};

exports.page = function(done) {
  checkHtml('/page/?num=1', done);
};






///////

exports.indexJson = function(done) {
  checkJson('/?json=true', done);
};

exports.postJson = function(done) {
  checkJson('/post/?json=true', done);
};

exports.archiveJson = function(done) {
  checkJson('/archive/?json=true', done);
};

exports.tagJson = function(done) {
  checkJson('/tag/?json=true&name=javascript', done);
};

exports.categoryJson = function(done) {
  checkJson('/category/?json=true&name=javascript', done);
};

exports.pageJson = function(done) {
  checkJson('/page/?json=true&num=1', done);
};
