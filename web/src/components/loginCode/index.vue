<template>
  <el-dialog
    title="" append-to-body modal-append-to-body width="320px"
    :close-on-click-modal="false" :close-on-press-escape="true"
    :visible.sync="loginCodeModel" top="10vh" :show-close="false"
    class="login-qrcode-model">
    <div class="login-qrcode" v-if="!loginCodeObj.isLogin">
      <img :src="loginCodeObj?loginCodeObj.img:''" alt="图片失效" ref="loginImg">
      <p>为方便网站维护，请使用微信扫一扫授权绑定</p>
    </div>
    <div class="login-qrcode" v-else>
      <img :src="loginCodeObj?loginCodeObj.img:''" alt="图片失效" ref="loginImg">
    </div>
  </el-dialog>
</template>

<script>
  import { mapState, mapMutations } from "vuex"

  export default {
    name: "login-code",
    data() {
      return {}
    },
    computed: {
      ...mapState({
        loginCodeModel: state => state.baseStates.loginCodeModel,
        loginCodeObj: state => state.baseStates.loginCodeObj,
      })
    },
    methods: {
      handleClose() {
        /*this.loginModel = false*/
      },
      ...mapMutations(['changeLoginCodeModel'])
    }
  }
</script>

<style lang="scss" scoped type="text/scss">
  .login-qrcode-model {
    /deep/ .el-dialog__header {
      padding: 0 !important;
    }
    /deep/ .el-dialog__body {
      padding: 20px;
    }
  }
  .login-qrcode {
    width: 100%;
    p {
      padding-top: 10px;
      text-align: center;
      color: #ff3a1e;
    }
  }
</style>
