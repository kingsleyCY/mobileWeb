<template>
  <div ref="myIntroduce" class="my-introduce">
    <div :class="['swiper-container',xsScreen?'xs-screen':'normal-screen']">
      <child1></child1>
    </div>
  </div>
</template>

<script>
  import { mapState } from "Vuex"
  import child1 from './components/child1'

  export default {
    name: "my-introduce",
    data() {
      return {}
    },
    computed: {
      ...mapState({
        xsScreen: state => state.baseStates.xsScreen
      })
    },
    components: {
      child1
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
        background: url("https://lioncc.oss-cn-beijing.aliyuncs.com/base-avtor/bgi-1.jpg") no-repeat center;
        background-size: cover;
      }
      &.normal-screen {
        background: url("https://lioncc.oss-cn-beijing.aliyuncs.com/base-avtor/bgi-2.jpg") no-repeat center;
        background-size: cover;
      }
    }
  }
</style>
