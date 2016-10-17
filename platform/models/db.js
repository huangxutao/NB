var mongoose = require('mongoose');
var config   = require('../config');

// 连接mongodb
mongoose.connect(config.db.host, config.db.name);

// 实例化连接对象
var connect = mongoose.connection;
connect.on('error', console.error.bind(console, '连接错误！！'));
connect.once('open', function(){
  console.info('MongoDB连接成功！！', new Date());
});
