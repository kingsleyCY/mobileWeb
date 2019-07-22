<template>
  <div class="user-detail-background" :style="{'display':(userModel?'block':'none')}">
    <div class="user-detail-model" ref="detailModel">
      <span class="el-icon-close" @click="closeDetailModel"></span>
      <div content="content"></div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from "Vuex"

  export default {
    name: "user-detail",
    data() {
      return {
        detailModel: null
      }
    },
    methods: {
      closeDetailModel() {
        this.changeUserModel(false)
      },
      ...mapMutations(['changeUserModel'])
    },
    watch: {
      userModel(newV, oldV) {
        this.$nextTick(() => {
          this.detailModel = this.$refs.detailModel
          if (newV) {
            this.detailModel.style.transform = 'translateX(0)'
          } else {
            this.detailModel.style.transform = 'translateX(-300px)'
          }
        })
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
  .user-detail-background {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: rgba(241, 241, 241, 0.1);
    .user-detail-model {
      position: absolute;
      top: 0;
      right: 0;
      width: 300px;
      height: 100%;
      z-index: 101;
      background-color: white;
      transform: translateX(-300px);
      transition: transform 1s;
      > .el-icon-close {
        position: absolute;
        top: 0;
        left: -20px;
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
  @keyframes moveAnimation {

  }
</style>
