<template>
  <div class="out-wrapper">
      <div class="m-aside" :class="{'full-screen': navVisible}" @click="handleNavLink">
        <header>
            <h1>{{name}}{{ (this.$route.name !== 'home') ? ` - ${this.$route.name}` : ''}}</h1>
            <p class="location">
                <i></i>
                {{location}}
            </p>
            <div class="nav-menus" :class="{open: navVisible}" @click="handleNav">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </header>
        <nav>
            <router-link to="/"><i class="iconfont icon-home"></i> 首 页</router-link>
            <router-link to="/archive"><i class="iconfont icon-archive"></i> 归 档</router-link>
            <router-link to="/about"><i class="iconfont icon-about"></i> 关 于</router-link>
            <router-link to="/message"><i class="iconfont icon-message"></i> 留 言</router-link>
            <router-link to="/links"><i class="iconfont icon-links"></i> 友 链</router-link>
        </nav>
        <footer class="contact">
            <a v-if="contact.github" :href="contact.github"><i class="iconfont icon-github"></i></a>
            <a v-if="contact.weibo" :href="contact.weibo"><i class="iconfont icon-weibo"></i></a>
            <a v-if="contact.wechat" :href="contact.wechat"><i class="iconfont icon-twitter"></i></a>
            <a v-if="contact.facebook" :href="contact.facebook"><i class="iconfont icon-facebook"></i></a>
            <a v-if="contact.twitter" :href="contact.twitter"><i class="iconfont icon-twitter"></i></a>
        </footer>
    </div>
    <div class="circle-wrapper" :class="{'circle-aniamtion': navVisible}"></div>
  </div>
</template>

<script>
  export default {
    name: 'MSideBar',
    data () {
      console.log(this.$route)
      return {
        name: '子不语',
        location: '杭州 ・ China',
        contact: {
          github: 'https://github.com/huangxutao',
          weibo: 'http://weibo.com/u/2844827443',
          facebook: 'https://www.facebook.com/profile.php?id=100009457792215',
          twitter: 'https://twitter.com/huangxutao'
        },
        navVisible: false
      }
    },

    methods: {
      handleNav: function () {
        this.navVisible = !this.navVisible
      },

      handleNavLink: function (e) {
        if (e.target.tagName === 'A') {
          this.navVisible = !this.navVisible
        }
      }
    }
  }
</script>

<style>
  .out-wrapper{
    position: fixed;
    width: 100%;
    height: auto;      
  }

  .m-aside{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 56px;
    overflow: hidden;
    text-align: center;
    box-shadow: 0 0.12rem .6rem 0 #e6ad76;
    background: linear-gradient(205deg, #e6ad76, #ee7b83);
  }
  
  .m-aside.full-screen{
    height: 100%;
    animation: navAnimation .666s ease forwards;
  }

  .circle-wrapper{
    position: fixed;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    border-radius: 2000px;
    background: #e6ad76;
  }

  .circle-wrapper.circle-aniamtion{
    animation: circleAnimation .666s ease forwards;
  }

  .m-aside header{
    position: relative;
    overflow: hidden;
  }

  .m-aside header .location i{
    display: inline-block;
    width: 12px;
    height: 12px;
    vertical-align: middle;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFJElEQVR4Xu2aV4idVRDHf3+j8UGNsRIfjD1Bg5pgwWiMCoJoEohGzIsKAbsoPoglwRKxoj4EKxZUEMRYQsAEEVGxxPqggsauIBbs2LCPDDkru9fs7pnznftt4N55Wdg77fy/mXNm5hzR46QeXz99APoR0OMI9FOgxwOgvwm2mgJmNhHYCdgZmAaMB2YC3wLvAh8Br0la21Zkdh0AMzsIWAAcC+yWubAfgZeB+4CVkn7OlAuzdQUAM9sMOB04DZga9mqowG/AA8Alkj5rqOt/4lUBMLONgEXA1cD2lZ39A7gDWCrpm1q6qwFgZpOBR4H9ajk3jJ6vgRMlPVHDThUAzOxI4GFgyxpOZeq4AbhI0t+Z/OtlawyAmXme3w5jcqTeL+mkMQPAzHx3Xw547o8VLZHke04RFUeAmR0FPAZsXGS5npABcyWtLlFZBEAqaD4Atikx2gUZPx53l+RHZohKAbgFOCtkqfvMF0u6NmomDICZ+fn+aSpjo/YG+F8BVgFvpn/sCxwDHFiqEPgemCTJ64VsKgFgMXBVtoWhjM8D50h6fX3yZjYduAmYVaj/VEl3RWRLAHgaODxiJPHeCZwh6Z+RZFM1eWsqpaNmVkmaGxEKAWBmvuN7Y7JpxIiHe9QxM1sGnBu08wswUdJfuXJRAKaktjVXv/P9AEyW9FNEyMy8Vf4E2CEiB0yR9H6uTBSAQ4Fnc5UnvqLd2WXN7ALguqC9gyW9mCsTBWBOKn5y9TvfVEnvRQQGeM1sDyAqO0+SF2hZFAXAhxvZ6PpHBMZJ8r9hMjP3z5udiJ+HScqO0ohiD0kfZX0cWMl3khpVi2bm7e+2AZuhiIsC4Lu/nwK59b9/+fGRXXnwQgsjYEJkww0BkDYmTwFPhVyaKemlXOYOAKJ7wFpJe0VslQBwjQ8iAkaWSTovwP8fq5ldCETq+9skhXqUEgC8DX48sCDv0HaMzvFSx+nneST/F0ry+UQ2lQDg+f9lsBV+CpgTaVfNbAUwP3sl8HtqhrzwyqYwAGkfuMLH1NlW1jG+mgYXX40kl3oBb4hCoQzcLemUoE+h83Vwbk4CfAgRHYX517kcuEeSX34MoYbd4DRJb7cCQIqCB4ETogYT/5+At8ZvpWuxTQCfLJfOA9ZIOqTEl6IUSAB4Y+SIjysxXFlmlqQXSnQWA5BAuBk4u8RwRZnlkhaW6msKwNapNJ5Q6kBDuV/TMPSLUj2NAEhRUNKylvrbKbdYkhdmxVQDAK8LfMg5o9iLMkEvyWeX9hkDJhsDkKJgF+ANYIuytYSl/AjdU9LnYckOgSoAJBD8mswvSNugRZLurWGoGgAJBH/RcXINx0bQsULScbVs1AbAr8d9hFX7ccTAej8Eptd8MlMVgBQFRwBPFpTJo31U7ypnSHpnNMbI79UBSCCcD1wfcSSD90xJ/g6hKnUFgASCP5fxl2E16BFJx9dQ1KmjmwBslS5RtmvouL8f3L9m3g/2p2sApCg4Ot0Cl9rxAewBtfO+NQASCEuBSwujwF9++DV616j0y2Q7lEbbK4F52ULrGG+U5JtpV6nrAKQo2BxYA+yduZrn/Ap+tKv0TF0jsrUCQAJhV8AfRozWL3je7yMpcgNVjEVrACQQPA08HYaz6/eA8yOXm8UrT4KtApBAWAJcOYzjl0nyiXNrNBYAuE3P8c4h5jM+GG369DWKXOsApCjwsbpPlWcD3uA8lHb9aq/Ac4EYEwBynWuDrw9AGyhvyDb6EbAhf502fOv5CPgXNSB0UF8zSJYAAAAASUVORK5CYII=') no-repeat;
    background-size: 100%;
  }

  .m-aside .nav-menus{
    position: absolute;
    top: 0;
    left: 1rem;
    bottom: 0;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 30px;
    height: 30px;
  }

  .m-aside .nav-menus span{
    display: block;
    width: 100%;
    height: 5px;
    border-radius: 12px;
    background: #e6ad76;
    box-sizing: border-box;
    transition: all .32s ease;
  }

  .m-aside .nav-menus span:nth-child(2){
    width: 60%;
  }

  .m-aside .nav-menus span:nth-child(3){
    width: 90%;
  }

  .m-aside .nav-menus.open span{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 100%;
    background: #fff;
  }

  .m-aside .nav-menus.open span:first-child{
    transform: rotate(-45deg);
  }

  .m-aside .nav-menus.open span:last-child{
    transform: rotate(45deg);
  }
  
  .m-aside .nav-menus.open span:nth-child(2){
    width: 0;
  }

  .m-aside nav{
    width: 90%;
    margin: 0 auto;
    padding: 30px 0;
    border-top: 2px dashed #fff;
    border-bottom: 2px dashed #fff;
  }

  .m-aside nav a{
    color: #fff;
  }

  .m-aside nav a:hover{
      background: none;
  }

  .m-aside footer{
    padding: 30px 0;
  }

  .m-aside footer i{
    margin: 0 12px;
    color: #fff;
    font-size: 16px;
  }

  .m-aside h1{
    font-size: 16px;
  }

  .m-aside p{
    font-size: 12px;
  }

  .m-aside .logo{
    display: inline-block;
    width: 1.4rem;
    height: 1.4rem;
    border-width: 1px;
    vertical-align: text-bottom;
  }

  .m-aside .logo img{
    vertical-align: top;
  }

  /* @media screen and (min-width: 300px) {
    .m-aside{
      display: block;
    }
  } */

  @keyframes circleAnimation{
    0%{
      opacity: 1;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
    }

    99%{
        opacity: 1;
        top: -1000px;
        left: -1000px;
        width: 2000px;
        height: 2000px;
    }

    100%{
      opacity: 0;
      z-index: -1;
    }
  }

  @keyframes navAnimation{
      0%{
          opacity: 0;
      }

      40%{
          opacity: 0;
      }

      100%{
          opacity: 1;
      }
  }
</style>
