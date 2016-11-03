var signin = require('./controller/signin.test');
var admin = require('./controller/admin.test');
var blog = require('./controller/blog.test');
/***
 * 登录测试
 */
describe('Test To Signin (./controller/signin.test.js)', function() {
  // 获取登录页面
  it('should response with 200, when the send request.', signin.page);

  // 登录失败 Empty User
  it('should response with fail, when the user is empty.', signin.emptyUser);

  // 登录失败 Invalid User
  it('should response with fail, when the user is invalid.', signin.invalidUser);

  // 登录成功 Vaild User
  it('should response with success, when the user is valid.', signin.validUser);

});

/***
 * 管理员测试
 */
describe('Test To Operate As Admin (./controller/admin.test.js)', function() {
  beforeEach(admin.signin);
  afterEach(admin.signout);
  it('should response with 200, when the send request.', admin.page);
  it('should response with 200, when the send request.', admin.toPublish);
  it('should response with 200, when the send request.', admin.toUpdate);
  it('should response with 200, when the send request.', admin.toDelete);
  it('should response with 200, when the send request.', admin.getPost);
  it('should response with 200, when the send request.', admin.getPosts);
});

/***
 * 博客测试
 */
describe('GET Page Data', function() {
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
