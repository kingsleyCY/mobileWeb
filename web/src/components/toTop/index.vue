<template>
  <div id="toTop" @click="scrollZero">
    <svg class="iconfont" aria-hidden="true">
      <use xlink:href="#icon-xiangshang"></use>
    </svg>
  </div>
</template>

<script>
  export default {
    name: "to-top",
    methods: {
      scrollZero() {
        $('#mainContaniner').scrollTop(0)
      }
    },
    created() {
      /*this.$nextTick(() => {
        const heigth = $('#mainContaniner').height() + 20
        $('#mainContaniner').off('scroll').on('scroll', function () {
          if($(this).scrollTop() > heigth) {
            $('#toTop').fadeIn(500)
          }else {
            $('#toTop').fadeOut()
          }
        })
      })*/
    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped type="text/scss">
  #toTop {
    position: fixed;
    right: 8%;
    bottom: 10%;
    display: none;
    width: 50px;
    height: 50px;
    box-sizing: border-box;
    border-radius: 50px;
    border: 1px solid #c3c3c3;
    text-align: center;
    line-height: 50px;
    box-shadow: 1px 1px 1px 1px #d6d6d6;
    cursor: pointer;
    .iconfont {
      width: 30px;
      height: 30px;
      color: #8f8f8f;
      margin: 10px auto;
    }
  }
</style>
