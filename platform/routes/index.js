var express = require('express');
var router  = express.Router();
var blog    = require('../controller/blog');
var admin    = require('../controller/admin');
var qiniu    = require('../controller/qiniu');

// 博客前端展示
router.get('/', blog.showIndex);
router.get('/post', blog.showPost);
router.get('/page', blog.showPage);
router.get('/archive', blog.showArchive);
router.get('/category', blog.showCategory);
router.get('/tag', blog.showTag);

// 后台管理
router.get('/do-manage', admin.showIndex);
router.get('/do-manage/signin', admin.showSignin);
router.get('/do-manage/signout', admin.toSignout);

router.post('/to-signin', admin.toSignin);
router.post('/do-manage/to-publish', admin.toPublish);
router.post('/do-manage/to-update', admin.toUpdate);
router.post('/do-manage/to-delete', admin.toDelete);
router.post('/do-manage/get-post', admin.getPost);
router.post('/do-manage/get-posts', admin.getPosts);

router.get('/qiniu-uploader', qiniu.upload);

module.exports = router;
