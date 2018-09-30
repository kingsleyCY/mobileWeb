<template>
  <el-dialog
    title="" append-to-body modal-append-to-body
    :visible.sync="loginModel"
    :width="isPc?'500px':'90%'"
    :before-close="handleClose">
    <div>

    </div>
  </el-dialog>
</template>

<script>
  import { mapState, mapMutations } from "vuex"
  export default {
    name: "login",
    data() {
      return {

      }
    },
    methods: {
      handleClose() {
        console.log(this.isPc);
        this.changeLoginModel(false)
      },
      ...mapMutations(['changeLoginModel'])
    },
    computed: {
      ...mapState({
        loginModel: state => state.baseStates.loginModel,
        isPc: state => state.baseStates.isPc
      })
    },
    watch: {

    }
  }
</script>

<style lang="scss" scoped type="text/scss">

</style>
