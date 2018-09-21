<template>
  <div class="article-box">
    <p class="article-title">{{articleInfo.title}}</p>
    <br>
    <div class="article-content" v-html="articleInfo.content"></div>
  </div>
</template>

<script>
  export default {
    name: "article-detail",
    mounted() {
      console.log(this.articleInfo);
    },
    props: ["articleInfo"]
  }
</script>

<style lang="scss" scoped type="text/scss">
  .article-box{
    overflow-x: hidden;
    .article-title{
      text-align: center;
      font-weight: 600;
      font-size: 20px;
    }
    img{
      max-width: 100%;
    }
  }
</style>
