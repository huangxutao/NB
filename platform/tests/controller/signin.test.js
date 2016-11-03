var app = require('../../app');
var config = require('../../config');
var request = require('supertest')(app);
var should = require("should");


var checkSignin = function(user, expect, done) {
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
};

// Signin Page
exports.page = function(done) {
  request.get('/do-manage/signin').expect(200, done);
};

// Empty User
exports.emptyUser = function(done) {
  checkSignin({user: '', password: ''}, 'fail', done);
};

// Invalid User
exports.invalidUser = function(done) {
  checkSignin({user: 'invaliduser', password: 'invaliduserpwd'}, 'fail', done);
};

// Valid User
exports.validUser = function(done) {
  checkSignin({user: config.user.name, password: config.user.password}, 'success', done);
};
