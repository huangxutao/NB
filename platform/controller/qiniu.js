var qiniu = require('qiniu');
var config = require('../config.js');

exports.upload = function(req, res) {
  //需要填写你的 Access Key 和 Secret Key
  qiniu.conf.ACCESS_KEY = config.qiniu.access_key;
  qiniu.conf.SECRET_KEY = config.qiniu.secret_key;

  //要上传的空间
  bucket = 'hxtao-site';

  //构建上传策略函数
  function uptoken(bucket, key) {
    var putPolicy = new qiniu.rs.PutPolicy(bucket);
    return putPolicy.token();
  }

  //生成上传 Token
  var token = {
    uptoken: uptoken(bucket)
  };

  res.writeHead(200, {
    'Content-Type':'text/json',
    'Expires': 0,
    'Pragma': 'no-cache'
  });

  res.end(JSON.stringify(token));
};
