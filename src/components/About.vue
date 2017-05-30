<template>
  <div class="content about">
    <h2 id="基本信息">基本信息</h2>
    <ul>
      <li>子不语，取自清代袁枚文言笔记志怪《子不语》（又名《新齐谐》）</li>
      <li>本人：⻩徐涛</li>
      <li>本科 · 杭州电子科技大学 · 信息工程 · 计算机科学与技术</li>
      <li><a href="http://about.hxtao.me/">我的简历</a></li>
    </ul>
    <h2 id="联系方式">联系方式</h2>
    <ul>
      <li>Email : h784124804@gmail.com</li>
      <li>Tel : 17826800529</li>
      <li>微信 : h784124804</li>
    </ul>
  　<h2 id="基本信息">本博客</h2>
    <ul>
      <li>算是学习 <a href="http://cn.vuejs.org/">Vue</a> 来练手了</li>
      <li>简单的重构了之前 <a href="https://blog.hxtao.site/">Blog</a> 的前端页面</li>
      <li>未做优化处理也基本没适配移动端</li>
      <li>主要是写到最后突然想 <a href="http://koajs.com/">Koa</a> + Vue 重构前后端，　... RESTful API 配合 JWT ... <img src="https://oblky3j33.qnssl.com/images/11.gif" alt="">有搞头</li>
    </ul>
    <p class="copyright">© 2017 <i class="iconfont icon-aixin"></i> 子不语</p>
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

</style>
