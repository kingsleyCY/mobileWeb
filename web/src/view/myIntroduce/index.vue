<template>
  <div ref="myIntroduce" class="my-introduce">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          slider1
        </div>
        <div class="swiper-slide">
          slider2
        </div>
        <div class="swiper-slide">
          slider3
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  export default {
    name: "my-introduce",
    created() {

    },
    mounted() {
      var mySwiper = new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination',
          clickable :true,
        },
        autoplay: false,
        direction : 'vertical',
        mousewheel : true,
      })
    }
  }
</script>

<style lang="scss" scoped type="text/scss">
  .my-introduce{
    width: 100%;
    height: 100%;
    .swiper-container{
      height: 100%;
      line-height: 10rem;
      text-align: center;
      font-size: 50px;
      .swiper-pagination{
        right: 30px;
        /deep/ .swiper-pagination-bullet{
          width: 10px !important;
          height: 10px !important;
          margin: 12px 0;
        }
      }
    }
  }
</style>
