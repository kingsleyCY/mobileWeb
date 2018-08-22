<template>
  <div :class="['main-content', allClient?'all-client':'not-all-client']" ref="mainContent">
    <router-view/>
  </div>
</template>

<script>
  import { mapState } from "vuex"
  export default {
    name: 'section-model',
    data() {
      return {
        isPc: false
      }
    },
    computed: {
      ...mapState({
        allClient: state => state.baseStates.allClient
      })
    },
    watch: {
      allClient(newV) {

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped type="text/scss">
  .main-content {
    width: 100%;
    &.all-client {
      height: 100%;
    }
    &.not-all-client{
      height: calc(100% - 60px);
      box-sizing: border-box;
    }
  }
</style>
