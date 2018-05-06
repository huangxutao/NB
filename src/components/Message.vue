<template>
  <div class="content message">
    <h1>你就这样走了吗 <img src="https://oblky3j33.qnssl.com/images/11.gif" alt=""></h1>
    <div class="comment">
     <div id="disqus_thread"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'message',
    created: function () {
      this.comment()
    },
    methods: {
      comment: function () {
        let disqusShortname = 'hxtao'
        let s = document.createElement('script')

        if (typeof DISQUS === 'object') return

        s.async = true
        s.type = 'text/javascript'
        s.src = '//' + disqusShortname + '.disqus.com/embed.js'
        document.querySelector('body').appendChild(s)
      }
    }
  }
</script>

<style scoped>
  .message h1{
    font-size: 2rem;
    color: #ee7b83;
  }

  .message h1 img{
    width: 3.2rem;
  }

  .message .comment {
    margin: 4rem auto;
    max-width: 66rem;
  }

  @media screen and (min-width: 300px) {
    .message{
      padding: 2rem 1rem 1rem;
    }

    .message h1{
      font-size: 22px;
    }
  }
</style>
