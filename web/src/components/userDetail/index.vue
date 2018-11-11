<template>
  <div class="">
    <div class="user-detail-model">
      <span class="el-icon-close"></span>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex"

  export default {
    name: "user-detail",
    data() {
      return {

      }
    },
    watch: {
      userModel(oldV, newV) {
        console.log(newV);
      }
    },
    computed: {
      ...mapState({
        userModel: state => state.baseStates.userModel
      })
    },
  }
</script>

<style lang="scss" scoped type="text/scss">
  .user-detail-model {
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    height: 100%;
    z-index: 100;
    >.el-icon-close {
      position: absolute;
      top: 0;
      left: -10px;
    }
  }
</style>
