<template>
  <div class="content about">
    <h2 id="基本信息">基本信息</h2>
    <ul>
      <li>子不语 (⻩徐涛)</li>
      <li>本科 · 杭州电子科技大学 · 信息工程 · 计算机科学与技术</li>
      <li><a href="http://about.hxtao.me/">我的简历</a></li>
    </ul>
    <h2 id="联系方式">联系方式</h2>
    <ul>
      <li>Email : hxtao1996@gmail.com</li>
      <li>Tel : 17826800529</li>
      <li>微信 : h784124804</li>
    </ul>
  　<h2 id="基本信息">本博客</h2>
    <ul>
      <li>算是学习 <a href="http://cn.vuejs.org/">Vue</a> 来练手了</li>
      <li>简单的重构了之前 <a href="https://old-blog.hxtao.xyz/">Blog</a> 的前端页面</li>
      <li>未做优化处理也基本没适配移动端</li>
      <li>主要是写到最后突然想 <a href="http://koajs.com/">Koa</a> + Vue 重构前后端，　... RESTful API 配合 JWT ... <img src="http://cdn.hxtao.xyz/images/11.gif" alt="">有搞头</li>
    </ul>
    <p class="copyright">© 2018 <i class="iconfont icon-aixin"></i> 子不语</p>
  </div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      msg: 'Welcome to About'
    }
  }
}
</script>

<style scoped>
  a{
    color: #ee7b83;
  }

  .about li img{
    width: 3.2rem;
  }

  @media screen and (min-width: 300px) {
    .about{
      padding: 2rem 1rem 1rem;
    }
  }

</style>
