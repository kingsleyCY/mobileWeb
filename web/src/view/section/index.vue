<template>
  <div :class="['main-content', allClient?'all-client':'not-all-client']" ref="mainContent">
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
    <!--<router-view></router-view>-->
  </div>
</template>

<script>
  import { mapState } from "vuex"
  export default {
    name: 'section-model',
    data() {
      return {
        isPc: false,
        transitionName: 'slide-left'
      }
    },
    computed: {
      ...mapState({
        allClient: state => state.baseStates.allClient
      })
    },
    watch: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped type="text/scss">
  .main-content {
    width: 100%;
    position: relative;
    &.all-client {
      height: 100%;
    }
    &.not-all-client{
      height: calc(100% - 60px);
      box-sizing: border-box;
    }
  }
  .child-view {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: calc(100% - 60px);
    transition: all .5s cubic-bezier(.55,0,.1,1);
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
  }
</style>
