var support = require('../support/support');
var app = require('../../app');
var request = require('supertest')(app);
var should = require("should");

exports.test = function(done) {
  describe('Test to Signout', function() {
    it('should signout successfuly and response with 302', function(done) {
      request.get('/do-manage/signout')
        .set('Cookie', support.adminCookie)
        .expect(302, done);
    });
  });
};
