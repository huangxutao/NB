var express = require('express');
var router  = express.Router();
var blog    = require('../controller/blog');

var layout = function(template) {
  var config = require('../config.js');
  return 'themes/'+ config.theme +'/layout/' + template;
};

router.get('/', blog.show);

/* 后台管理 */
router.get('/do-manage', blog.manage);
router.get('/do-manage/signin', blog.Signin);

router.post('/to-signin', blog.toSignin);
router.post('/to-publish', blog.toPublish);
router.post('/to-update', blog.toUpdate);
router.post('/to-delete', blog.toDelete);

router.post('/get-posts', blog.getPosts);


module.exports = router;
