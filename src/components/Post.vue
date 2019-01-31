<template>
  <div class="content post">
    <transition name="fade" mode="out-in">
      <article v-if="currPost && changed">
        <h1 class="post-title">{{currPost.title}}</h1>
        <div class="post-info">
          <span><a href=""><img src="../assets/images/logo.jpg" alt="" class="post-author"></a></span>
          <span><i class="iconfont icon-date post-date" ></i> {{(new Date(currPost.date.publish)).toString().slice(4, -24)}}</span>
          <span><i class="iconfont icon-category post-category"></i> <a href="">{{currPost.category}}</a></span>
          <span><i class="iconfont icon-icoviews post-views"></i> {{currPost.views.count}}</span>
        </div>
        <div class="post-content markdown-body" v-html="currPost.content.html" v-highlightjs></div>
        <footer>
          <div class="prev">
            <router-link v-if="prevPost" :to="{ name: 'post', params: { id: prevPost._id }}" class="prev"><i class="iconfont icon-pre"></i> {{prevPost.title}}</router-link>
          </div>
          <div class="next">
            <router-link v-if="nextPost" :to="{ name: 'post', params: { id: nextPost._id }}" class="next">{{nextPost.title}} <i class="iconfont icon-next"></i></router-link>
          </div>
        </footer>
      </article>
      </transition>
      <p class="copyright">© 2018 <i class="iconfont icon-aixin"></i> 子不语</p>
  </div>
</template>

<script>
  import Ajax from '../assets/js/ajax'
  import Hljs from 'highlight.js'

  export default {
    'name': 'post',

    data () {
      return {
        changed: true,
        prevPost: null,
        currPost: null,
        nextPost: null
      }
    },

    directives: {
      highlightjs: {
        inserted: function () {
          let blocks = document.querySelectorAll('pre code')

          Array.prototype.forEach.call(blocks, Hljs.highlightBlock)
        },
        componentUpdated: function () {
          let blocks = document.querySelectorAll('pre code')

          Array.prototype.forEach.call(blocks, Hljs.highlightBlock)
        }
      }
    },

    created () {
      this.getPost()
    },

    watch: {
      '$route': function () {
        this.changed = false
        this.getPost()
      }
    },

    methods: {
      getPost () {
        let url = 'https://old-blog.hxtao.xyz/post/?json=true&article=' + this.$route.params.id

        Ajax.get(url).then((data) => {
          this.prevPost = data.article.pre
          this.currPost = data.article.curr
          this.nextPost = data.article.next

          setTimeout(() => {
            this.changed = true
          }, 600)

          document.title = '子不语 | ' + data.article.curr.title
        })
      }
    }
  }
</script>

<style scoped>
  @import '../assets/css/markdown.css';

  .animated{
    animation: aa 1.2s ease;
  }

  @keyframes aa{
    0%, 100%{
      opacity: 1;
      transform: translateY(0);
    }

    40%, 50%{
      opacity: 0;
      transform: translateY(6rem);
    }
  }
  
  article .post-title{
    color: #ee7b83;
    font-size: 2.8rem;
  }

  article .post-info{
    user-select: none;
    cursor: default;
  }

  article .post-info span{
    display: inline-block;
    margin-right: 1.4rem;
    color: #666;
    vertical-align: top;
  }

  article .post-info i, article .post-info a{
    color: #666;
  }

  article .post-info a:hover{
    text-decoration: underline;
  }

  article .post-author{
    width: 2rem;
    height: 2rem;
    border-radius: 3rem; 
  }

  article footer{
    display: flex;
    flex-wrap: wrap;
    
    position: relative;
    margin: 6rem 0 3rem;
    padding: 2rem 0;
  }

  article footer:after{
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    left: 0;

    height: 4px;
    background: repeating-linear-gradient(-45deg, #ee7b83, #ee7b83 4px, transparent 4px, transparent 8px);
  }

  article footer .prev, article footer .next{
    width: 50%;
    font-size: 1.2rem;
  }

  article footer a{
    color: #a1b2b4;
  }

  article footer a:hover{
    color: #ee7b83;
  }

  article footer .prev{
    text-align: left;
  }

   article footer .next{
    text-align: right;
  }

  @media only screen and (max-width: 640px) {
    .post{
      padding: 2rem 0 1rem;
    }

    .content.post article{
      padding: 0 1rem;
    }

    article .post-title{
      font-size: 1.6rem;
    }

    article footer .prev, article footer .next{
      margin: 1.2rem 0;
      width: 100%;
      font-size: 14px;
    }
  }
</style>
