<template>
  <div class="content links">
    <ul>
      <li v-for="link in links" v-bind:key="link.name">
        <img v-if="link.img" :src="link.img" alt="">
        <a :href="link.url">{{link.name}}</a>
      </li>
    </ul>
    <p class="copyright">© 2018 <i class="iconfont icon-aixin"></i> 子不语</p>
  </div>
</template>

<script>
  export default {
    name: 'links',
    data () {
      return {
        links: []
      }
    },
    created: function () {
      this.links = [
        {
          name: 'β-house',
          url: 'http://betahouse.us/',
          img: 'http://cdn.hxtao.xyz/images/favicon-beta.png'
        },
        {
          name: '麻组 - 小麻雀',
          url: 'http://makaiqian.com/',
          img: 'http://www.betahouse.us/assets/images/photo/m3/mkq.jpg'
        },
        {
          name: '涛哥 - 皮蛋粥',
          url: 'http://js-ninja.cn/',
          img: 'http://www.betahouse.us/assets/images/photo/m5/zyt.jpg'
        },
        {
          name: '克拉克',
          url: 'http://zhoushidong.cc/',
          img: 'http://www.betahouse.us/assets/images/photo/m6/zsd.jpg'
        },
        {
          name: '黑皮学长 - 七月上',
          url: 'http://imhype.github.io/',
          img: 'http://www.betahouse.us/assets/images/photo/m4/xjy.jpg'
        }
      ]
    }
  }
</script>

<style scoped>
  .links ul{
    margin: 0;
    padding: 0;
    width: 100%;
  }

  .links ul:after{
    content: "";
    display: block;
    clear: both;
  }

  .links ul li{
    float: left;
    position: relative;
    margin: 1.6rem;
    list-style: none;
    width: 12rem;
    height: 12rem;
    line-height: 12rem;
    text-align: center;
    background: #eee;
    overflow: hidden;
  }

  .links ul li:hover{
    animation: jello 1.2s ease;
  }

  .links ul li img{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    margin: auto;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: all .6s ease;
    z-index: 1;
  }

  .links ul li:hover img{
    opacity: 1;
  }

  .links ul li a{
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
    font-size: 1.2rem;
    color: #ee7b83;
    transition: all .6s ease;
    z-index: 99;
  }

  .links ul li:hover a{
    color: #fff;
    background: rgba(238, 123, 131, 0.9);
  }

  @keyframes jello{
    from, 11.1%, to {
      transform: none;
    }

    22.2%{
      transform: skewX(-12.5deg) skewY(-12.5deg);
    }

    33.3%{
      transform: skewX(6.25deg) skewY(6.25deg);
    }

    44.4%{
      transform: skewX(-3.125deg) skewY(-3.125deg);
    }

    55.5%{
      transform: skewX(1.5625deg) skewY(1.5625deg);
    }

    66.6%{
      transform: skewX(-0.78125deg) skewY(-0.78125deg);
    }

    77.7%{
      transform: skewX(0.390625deg) skewY(0.390625deg);
    }

    88.8%{
      transform: skewX(-0.1953125deg) skewY(-0.1953125deg);
    }
  }

  @media screen and (max-width: 640px) {
    .links{
      padding: 2rem 1rem 1rem;
    }

    .links ul li{
      float: none;
      margin: 1.6rem auto;
      width: 18rem;
      height: 18rem;
      line-height: 18rem;
    }

    .links ul li img{
      opacity: 1;
    }
    
    .links ul li a{
      color: #fff;
      background: rgba(238, 123, 131, 0.8);
    }
    
  }
        
</style>
