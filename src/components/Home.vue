<template>
  <div class="content home">
    <transition-group name="fade" mode="out-in" tag="div" class="content">
      <article v-for="post in posts" v-bind:key="post._id">
        <div class="img">
          <img :src="post.wrapper" alt="">
        </div>
        <h1><router-link :to="{ name: 'post', params: { id: post._id }}">{{post.title}}</router-link></h1>
        <time pubdate><i class="iconfont icon-date"></i> {{(new Date(post.date.publish)).toString().slice(4, -24)}}</time>
        <p>{{post.content.summary.text.slice(0, 36) + '...'}}</p>
      </article>
    </transition-group>
    <div class="load-more" v-if="loading">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <p class="copyright">© 2017 <i class="iconfont icon-aixin"></i> 子不语</p>
  </div>
</template>

<script>
  import Ajax from '../assets/js/ajax.js'

  export default {
    name: 'Home',
    data () {
      return {
        posts: [],
        page: {
          hasNext: true
        },
        loading: false
      }
    },
    props: {
      pageNum: {
        type: Number,
        required: true
      }
    },
    created: function () {
      this.getPosts(1)
    },
    watch: {
      'pageNum': function () {
        this.getPosts(this.pageNum)
      }
    },
    methods: {
      getPosts: function (page) {
        let url = 'https://blog.hxtao.site/page/?json=true&num=' + page

        if (!this.page.hasNext) return

        this.loading = true
        Ajax.get(url).then((data) => {
          this.page = data.page
          this.posts = this.posts.concat(data.posts)
          this.loading = false
        })
      }
    }
  }
</script>

<style scoped>

  .content{
    position: relative;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .content h2{
    position: absolute;
    top: -1rem;
    left: 2rem;
    font-weight: normal;
    user-select: none;
    cursor: default;
  }

  article{
    margin: 2rem 1rem;
    width: 28rem;
    min-height: 26rem;
    border-radius: 4px;
    box-shadow: .2rem .3rem 1rem 0 #ccc;
    background: #fff;
    text-align: center;
    transition: all .32s ease;
  }

  article .img{
    position: relative;
    width: 100%;
    height: 14rem;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    overflow: hidden;
  }

  article img{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    margin: auto;
    width: 100%;
    min-height: 100%;
  }

  article h1, article p, article time{
    padding: 0 1rem;
    color: #777;
  }

  article h1{
    margin-bottom: 0;
    font-weight: normal;
  }

  article a{
    color: #333;
    text-decoration: none;
    transition: color .32s ease;
  }

  article a:hover{
    color: #ee7b83;
  }



  article:first-of-type{
    width: 100%;
    min-height: 32rem;
  }

  article:first-of-type .img{
    height: 22rem;
  }

  article:first-of-type, article.hot{
    position: relative;
    font-family: 'iconfont';
  }

  article:first-of-type:before, article.hot:before{
    content: "";
    position: absolute;
    top: 2.8rem;
    left: -1rem;

    width: 0;
    height: 0;
    border: .5rem solid transparent;
    border-top-color: #ee7b83;
    border-right-color: #ee7b83;
    border-top-width: .25rem;
    border-bottom-width: .25rem;
  }

  article:first-of-type:after, article.hot:after{
    content: "\e611 new";
    position: absolute;
    top: .8rem;
    left: -1rem;

    width: 4rem;
    height: 2rem;
    line-height: 2rem;
    color: #fff;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    background: #ee7b83;
  }
  
  article.hot:after{
    content: "\e615 hot";
  }

  /* 加载动画 */
  .content .load-more{
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 2rem 0;
    width: 100%;
  }

  .load-more span{
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 6px;
    background: #ee7b83;
  }

  .load-more span:first-child{
    transform: rotate(20deg);
    transform-origin: 250% -300%;
    animation: loader_left 1.6s cubic-bezier(1, 1, 0, 0)  infinite;
  }

  .load-more span:last-child{
    transform: rotate(0deg);
    transform-origin: -150% -300%;
    animation: loader_right 1.6s cubic-bezier(1, 1, 0, 0) infinite;
  }

  @keyframes loader_left{
    0%, 100%{
      transform: rotate(20deg);
    }

    25%, 50%, 75%{
      transform: rotate(0deg);
    }
  }

  @keyframes loader_right{
    0%, 25%, 75%, 100%{
      transform: rotate(0deg);
    }

    50%{
      transform: rotate(-20deg);
    }
  }

  @media only screen and (min-width: 1680px){
    article:first-of-type{
      height: 40rem;
    }

    article:first-of-type .img{
      height: 28rem;
    }
  }

  @media only screen and (max-width: 1200px){
    article, article:first-of-type{
      width: 100%;
      min-height: 32rem;
    }

    article .img{
      height: 22rem;
    }
  }

  @media only screen and (max-width: 640px) {
    article, article:first-of-type{
      min-height: 22rem;
      text-align: left;
      box-shadow: 0 .1rem .2rem 0 #ccc;
    }


    article:first-of-type .img, article .img{
      height: 14rem;
    }

    article h1{
      font-size: 1.22rem;
    }

    article:first-of-type:after, article.hot:after{
      text-indent: 6px;
    }
  }
</style>
