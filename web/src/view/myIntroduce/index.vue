<template>
  <div ref="myIntroduce" class="my-introduce">
    <div :class="['swiper-container',xsScreen?'xs-screen':'normal-screen']">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in childComponents" :key="index">
          <component :is="item"></component>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex"
  import child1 from './components/child1'
  import child2 from './components/child2'
  import child3 from './components/child3'
  import Swiper from 'swiper'

  export default {
    name: "my-introduce",
    data() {
      return {
        childComponents: ['child1']
      }
    },
    created() {
      // console.log(this.xsScreen);
    },
    mounted() {
      var mySwiper = new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        autoplay: false,
        direction: 'vertical',
        mousewheel: true,
      })
    },
    computed: {
      ...mapState({
        xsScreen: state => state.baseStates.xsScreen
      })
    },
    components: {
      child1, child2, child3
    }
  }
</script>

<style lang="scss" scoped type="text/scss">
  .my-introduce {
    width: 100%;
    height: 100%;
    .swiper-container {
      height: 100%;
      .swiper-slide {
      }
      .swiper-pagination {
        right: 30px;
        /deep/ .swiper-pagination-bullet {
          width: 10px !important;
          height: 10px !important;
          margin: 12px 0;
        }
      }
      &.xs-screen {
        background: url("./../../assets/images/bgi-1.jpg") no-repeat center;
        background-size: cover;
      }
      &.normal-screen {
        background: url("./../../assets/images/bgi-2.jpg") no-repeat center;
        background-size: cover;
      }
    }
  }
</style>
