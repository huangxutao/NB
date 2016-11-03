var app = require('../../app');
var config = require('../../config');
var request = require('supertest')(app);
var should = require("should");

var checkJson = function(url, done) {
  request.get(url)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      console.log(res.type);
      if(err) done(err);
      else done();
    });
};

var checkHtml = function(url, done) {
  request.get(url)
    .expect('Content-Type', /html/)
    .end(function(err, res) {
      console.log(res.type);
      if(err) done(err);
      else done();
    });
};

exports.index = function(done) {
  checkHtml('/', done);
};

exports.post = function(done) {
  checkHtml('/post', done);
};

exports.archive = function(done) {
  checkHtml('/archive', done);
};

exports.tag = function(done) {
  checkHtml('/tag', done);
};

exports.category = function(done) {
  checkHtml('/category', done);
};

exports.page = function(done) {
  checkHtml('/page', done);
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
  checkJson('/tag/?json=true', done);
};

exports.categoryJson = function(done) {
  checkJson('/category/?json=true', done);
};

exports.pageJson = function(done) {
  checkJson('/page/?json=true', done);
};
