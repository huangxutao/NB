<template>
  <div class="content archive">
    <section v-for="posts in items">
      <h1>{{posts[0].date.publish.slice(0, 4)}}</h1>
      <p v-for="p in posts">
        <router-link :to="{ name: 'post', params: { id: p._id }}">{{p.title}}</router-link>
        <time pubdate>{{p.date.publish.slice(5, -14)}}</time>
      </p>
    </section>
    <p class="copyright">© 2018 <i class="iconfont icon-aixin"></i> 子不语</p>
  </div>
</template>

<script>
  import Ajax from '../assets/js/ajax.js'
  export default {
    name: 'Archive',
    data () {
      return {
        items: []
      }
    },
    mounted: function () {
      this.getPosts(1)
    },
    methods: {
      getPosts: function (page) {
        let url = 'https://blog.hxtao.site/archive/?json=true'

        Ajax.get(url).then((data) => {
          this.items = data.posts
        })
      }
    }
  }
</script>

<style scoped>
  .archive h1{
    position: relative;
    color: #ee7b83;
  }

  .archive h1:after{
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 4rem;

    margin: auto;
    height: 0;
    border: 1px dashed #ccc;
  }

  .archive a:hover{
    color: #ee7b83;
  }

  .archive p{
    margin: 0;
    padding: .6rem 1rem;
    border-radius: 4px;
    transition: all .32s ease;
  }

  .archive p:hover{
    background: #eee;
  }

  .archive p time{
    float: right;
  }

  @media screen and (max-width: 640px) {
    .archive{
      padding: 2rem 1rem 1rem;
    }
  }
</style>
