var config = {
  // 以下三项为 SEO
  site: {
    hometitle: '', // 站点主页的 <title>???</title>
    author: '',  // 站点拥有者
    description: '',  // 关于站点的描述
    keywords: '',  // 关键词
  },

  // 登录验证
  user: {
    name: 'root',
    password: 'root'
  },

  // 数据量库
  db: {
    name: 'NB',
    host: 'localhost',
    port: 27017
  },

  // 七牛云储存
  qiniu: {
    access_key: 'your access_key value',
    secret_key: 'your secret_key value',
    domain: 'your domain name',
    bucket: 'your bucket name'
  }
};

module.exports = config;
