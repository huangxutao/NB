<template>
  <div class="back-top">
    <i class="iconfont icon-top"></i>
  </div>
</template>

<script>
  export default {
    name: 'backtop'
  }
</script>

<style scoped>
  .back-top{
    position: fixed;
    bottom: 2rem;
    right: 1rem;

    width: 3.6rem;
    height: 3.6rem;
    line-height: 3.6rem;
    text-align: center;
    border-radius: 1.8rem;
    box-shadow: 0 3px 6px rgba(0, 0, 0, .28);
    cursor: pointer;
    background: #ff4081;
    opacity: 0;

    transform: translateY(12rem);
    transition: all .32s ease;
  }

  .back-top i{
    font-size: 1.6rem;
    color: #fff;
  }

  .back-top.show{
    opacity: 1;
    transform: translateX(0);
  }

  @media only screen and (max-width: 640px) {
    .back-top{
      right: 0;
      left: 0;
      margin: auto;
      width: 3.2rem;
      height: 3.2rem;
    }
  }
</style>
