<template>
  <div style="height: 100%;width: 100%;">
    <el-collapse-transition>
      <header-model v-if="!allClient"></header-model>
    </el-collapse-transition>
    <section-model></section-model>
    <footer-model></footer-model>
    <div class="index-loading" ref="indexLoading">
      <lottie :options="defaultOptions" :height="400" :width="400"/>
    </div>
    <login></login>
    <login-code></login-code>
    <userDetail></userDetail>
    <to-top></to-top>
  </div>
</template>

<script>
  import headerModel from '@/view/headers'
  import sectionModel from '@/view/section'
  import footerModel from '@/view/footer'
  import login from '@/components/login'
  import loginCode from '@/components/loginCode'
  import toTop from '@/components/toTop'
  import userDetail from '@/components/userDetail'
  import Lottie from '@/components/lottie';
  import * as animationData from '../../assets/pinjump.json';

  import { mapState } from "vuex"

  export default {
    name: 'index',
    data() {
      return {
        defaultOptions: {
          animationData: animationData,
          animationSpeed: 1.2
        },
      }
    },
    computed: {
      ...mapState({
        allClient: state => state.baseStates.allClient
      })
    },
    components: {
      headerModel,
      sectionModel,
      footerModel,
      login, toTop,
      userDetail,
      loginCode, Lottie
    },
    mounted() {
      setTimeout(function () {
        this.$refs.indexLoading.style.opacity = "0"
        setTimeout(function () {
          this.$refs.indexLoading.style.display = "none"
        }.bind(this), 500)
      }.bind(this), 1000)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped type="text/css">
  .index-loading {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: white;
    transition: all 0.5s;
  }
</style>
