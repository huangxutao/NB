var express = require('express');
var router  = express.Router();
var blog    = require('../controller/blog');
var qiniu    = require('../controller/qiniu');

var layout = function(template) {
  var config = require('../config.js');
  return 'themes/'+ config.theme +'/layout/' + template;
};

router.get('/', blog.show);

/* 后台管理 */
router.get('/do-manage', blog.manage);
router.get('/do-manage/signin', blog.Signin);
router.get('/do-manage/signout', blog.Signout);

router.post('/to-signin', blog.toSignin);
router.post('/to-publish', blog.toPublish);
router.post('/to-update', blog.toUpdate);
router.post('/to-delete', blog.toDelete);

router.post('/get-post', blog.getPost);
router.post('/get-posts', blog.getPosts);

router.get('/qiniu-uploader', qiniu.upload);

module.exports = router;
