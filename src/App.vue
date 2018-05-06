<template>
  <div id="app">
    <side-bar></side-bar>
    <m-side-bar></m-side-bar>
    <main @scroll="toggleMenu" ref="mainDom">
      <transition name="fade" mode="out-in">
        <keep-alive include="message,about,links">
          <router-view v-bind:pageNum="pageNum"></router-view>
        </keep-alive>
      </transition>
    </main>
    <div class="back-top" @click="toTop">
      <i class="iconfont icon-top"></i>
    </div>
    <!--<div class="notice">基于 Vue2.0 重构博客前端页面</div>-->
  </div>
</template>

<script>
  import SideBar from './components/SideBar'
  import MSideBar from './components/MSideBar'

  export default {
    name: 'app',

    components: {
      sideBar: SideBar,
      mSideBar: MSideBar
    },

    data () {
      return {
        pageNum: 1,
        beforeScrollTop: this.$refs.mainDom ? this.$refs.mainDom.scrollTop : 0
      }
    },

    watch: {
      '$route': function () {
        let main = document.querySelector('#app main')

        this.pageNum = 1
        setTimeout(() => {
          main.scrollTop = 0
        }, 600)
      }
    },

    methods: {
      toggleMenu: function (e) {
        let target = e.target
        let backTop = document.querySelector('.back-top')
        let scrollTop = target.scrollTop

        if (target.tagName !== 'MAIN') return

        let clientHeight = document.documentElement.clientHeight

        if (target.scrollTop > clientHeight && (scrollTop - this.beforeScrollTop < 0)) {
          backTop.className = 'back-top show'
        } else {
          backTop.className = 'back-top'
        }

        if (target.scrollHeight - target.scrollTop - clientHeight === 0 &&
          this.$route.name === 'home') {
          this.pageNum++
        }

        this.beforeScrollTop = scrollTop
      },

      toTop: function () {
        document.querySelector('#app main').scrollTop = 0
      }
    }
  }
</script>

<style>
  html,body{
    margin: 0;
    padding: 0;
    min-width: 1366px;
    font: 16px/1.8 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  
  main{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 16rem;

    padding: 1rem 3.6rem;
    background: #f8f8f9;
    overflow: auto;
    z-index: -1;
  }

  a{
    color: #666;
    outline: none;
    text-decoration: none;
  }

  .copyright{
    color: #a1b2b4;
    text-align: center;
  }

  .copyright i{
    color: red;
  }

  .back-top{
    position: fixed;
    bottom: 2rem;
    right: 1.6rem;

    width: 3.6rem;
    height: 3.6rem;
    line-height: 3.6rem;
    text-align: center;
    border-radius: 1.8rem;
    box-shadow: 0 3px 6px rgba(0, 0, 0, .28);
    cursor: pointer;
    background: linear-gradient(205deg, #e6ad76, #ee7b83);
    opacity: 0;

    transform: translateY(12rem);
    transition: all .32s ease;
    z-index: -1;
  }

  .back-top i{
    font-size: 1.6rem;
    color: #fff;
  }

  .back-top.show{
    opacity: 1;
    transform: translateX(0);
  }

  .notice{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: 3rem;
    line-height: 3rem;
    color: #fff;
    text-align: center;
    background: rgba(51, 51, 51, 0.3);
    z-index: 999;
    overflow: hidden;
  }

/*  .fade-enter, .fade-leave-active{
    opacity: 0;
  }

  .fade-enter-active, .fade-leave-active{
    transition: all 0.16s ease;
  }*/

  .fade-leave-active{
    animation: slideOutDown .6s;
  }

  .fade-enter-active{
    animation: slideInUp .6s;
  }

  @media screen and (max-width: 640px) {
    main {
      left: 0;
      padding: 1rem .3rem;
    }

    .content{
      margin-top: 1.2rem;
    }
    
    .back-top{
      right: 0;
      left: 0;
      margin: auto;
      width: 3.2rem;
      height: 3.2rem;
    }
  }
  
  @keyframes slideInUp{
    from {
      opacity: 0;
      transform: translate3d(0, 6rem, 0);
      visibility: visible;
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes slideOutDown{
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      opacity: 0;
      transform: translate3d(0, 6rem, 0);
      visibility: visible;
    }
  }

  @media only screen and (min-width: 640px) {
    /* 定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸 */
    ::-webkit-scrollbar{
      width: 10px;
      height: 8px;
      background-color: #eee;
    }

    ::-webkit-scrollbar-track:hover{
      background-color: #eee;
    }

    /* 定义滑块 内阴影 圆角 */
    ::-webkit-scrollbar-thumb{
      background-color: #afafb0;
    }

    ::-webkit-scrollbar-thumb:hover{
      background-color: #888;
    }
    
  }
</style>
