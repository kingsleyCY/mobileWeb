<template>
  <div style="height: 100%;width: 100%;">
    <el-collapse-transition>
      <header-model v-if="!allClient"></header-model>
    </el-collapse-transition>
    <section-model></section-model>
    <footer-model></footer-model>
    <div class="index-loading" ref="indexLoading">
      <div class="spinner-circular">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import headerModel from '@/view/headers'
  import sectionModel from '@/view/section'
  import footerModel from '@/view/footer'

  import { mapState } from "vuex"

  export default {
    name: 'index',
    data() {
      return {}
    },
    computed: {
      ...mapState({
        allClient: state => state.baseStates.allClient
      })
    },
    components: {
      headerModel, sectionModel, footerModel
    },
    mounted() {
      setTimeout(function () {
        this.$refs.indexLoading.style.opacity = "0"
        setTimeout(function () {
          this.$refs.indexLoading.style.display = "none"
        }.bind(this), 500)
      }.bind(this),1500)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped type="text/css">
  .index-loading{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: white;
    transition: all 0.5s;
  }
</style>
