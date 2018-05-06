<template>
  <aside>
    <header>
      <div class="logo">
        <img src="../assets/images/logo.jpg" alt="">
      </div>
      <h1>{{name}}</h1>
      <p class="location">{{location}}</p>
      <p class="contact">
        <a v-if="contact.github" :href="contact.github"><i class="iconfont icon-github"></i></a>
        <a v-if="contact.weibo" :href="contact.weibo"><i class="iconfont icon-weibo"></i></a>
        <a v-if="contact.wechat" :href="contact.wechat"><i class="iconfont icon-twitter"></i></a>
        <a v-if="contact.facebook" :href="contact.facebook"><i class="iconfont icon-facebook"></i></a>
        <a v-if="contact.twitter" :href="contact.twitter"><i class="iconfont icon-twitter"></i></a>
      </p>
    </header>
    <nav>
      <router-link to="/"><i class="iconfont icon-home"></i> 首 页</router-link>
      <router-link to="/archive"><i class="iconfont icon-archive"></i> 归 档</router-link>
      <router-link to="/about"><i class="iconfont icon-about"></i> 关 于</router-link>
      <router-link to="/message"><i class="iconfont icon-message"></i> 留 言</router-link>
      <router-link to="/links"><i class="iconfont icon-links"></i> 友 链</router-link>
    </nav>
  </aside>
</template>

<script>
  export default {
    name: 'SideBar',
    data () {
      return {
        name: '子不语',
        location: '杭州 ・ China',
        contact: {
          github: 'https://github.com/huangxutao',
          weibo: 'http://weibo.com/u/2844827443',
          facebook: 'https://www.facebook.com/profile.php?id=100009457792215',
          twitter: 'https://twitter.com/huangxutao'
        }
      }
    }
  }
</script>

<style>
  aside{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;

    width: 16rem;
    text-align: center;
    box-shadow: 0 0 .8rem #ccc;
    background: #fff;
  }

  aside a{
    text-decoration: none;
    color: #fff;
  }

  aside header{
    padding: 3.2rem 0;
    height: 12rem;
    text-align: center;
    background: linear-gradient(205deg, #e6ad76, #ee7b83);
  }

  header .logo{
    margin: 0 auto;
    padding: .1rem;
    width: 4.8rem;
    height: 4.8rem;
    border: 2px solid #fff;
    border-radius: 4.8rem;
    box-sizing: border-box;
    overflow: hidden;
  }

  header .logo img{
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }

  header h1, header p{
    margin: .4rem;
    color: #fff;
    font-size: 1.2rem;
  }

  header p.location{
    margin-top: -.6rem;
    color: #eee;
    font-size: 12px;
  }

  header p.contact{
    margin: 1.4rem 0;
  }

  header a{
    margin: 0 .4rem;
  }

  header i{
    font-size: 1.2rem!important;
  }

  /* 导航 */
  aside nav{
    padding: 2.8rem 0 0 0;
  }

  nav i{
    display: inline-block;
    margin-right: 1.6rem;
  }

  nav a{
    position: relative;
    display: block;
    padding: .8rem 2rem;
    color: #666;
    font-size: 1rem;
    text-decoration: none;
    transition: all .32s ease;
  }

  nav a.router-link-exact-active{
    color: #ee7b83;
  }

  nav a:hover{
    color: #ee7b83;
    background: #eee;
  }

  @media screen and (min-width: 300px) {
    aside {
      display: none;
    }

    .m-aside{
      display: block;
    }
  }
</style>
