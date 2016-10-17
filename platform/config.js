var config = {
  // 以下三项为 SEO
  site: {
    author: '站点拥有者',
    description: '关于站点的描述',
    keywords: '关键词',
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
    access_key: 'n5zFTyAmqbikpE7-pgoOaAu1kZvfJjVA4bK1q5v9',
    secret_key: 'MdVuorRwRm2Jfph0Dp51EpX7wTNPL4FdNDaqoUsW',
    domain: 'https://oblky3j33.qnssl.com/'
  }
};

module.exports = config;
