var app = require('../../app');
var config = require('../../config');
var request = require('supertest')(app);
var should = require("should");

var signin = {
  // Check User
  _check: function (user, expect, done) {
    request.post('/to-signin')
      .send(user)
      .end(function(err, res){
        if(err) {
          done(err);
        } else {
          res.type.should.equal('application/json');
          res.body.status.should.equal(expect);
          done();
        }
      });
  },

  // Get Index Page
  indexPage: function(done) {
    request.get('/do-manage/signin')
      .expect(200, done);
  },

  // Empty User
  emptyUser: function (done) {
    signin._check({
      name: '',
      password: ''
    }, 'fail', done);
  },

  // Invalid User
  invalidUser: function (done) {
    signin._check({
      name: 'invaliduser',
      password: 'invaliduserpwd'
    }, 'fail', done);
  },

  // Valid User
  validUser: function (done) {
    signin._check( config.user, 'success', done);
  }

};

exports.test = function() {
  describe('Test To Signin (./test/controller/signin.test.js)', function() {
    // 获取登录页面
    it('should response with 200, when the send request.', signin.indexPage);

    // 登录失败 Empty User
    it('should response with fail, when the user is empty.', signin.emptyUser);

    // 登录失败 Invalid User
    it('should response with fail, when the user is invalid.', signin.invalidUser);

    // 登录成功 Vaild User
    it('should response with success, when the user is valid.', signin.validUser);

  });
};
