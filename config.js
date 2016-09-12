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

  // 主题
  theme: 'default'
};

module.exports = config;
