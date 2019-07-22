<template>
  <div id="toIndexFixed" @click="handlerClick" ref="toIndexFixed">
    <el-tooltip content="点击返回主页" placement="top" effect="light">
      <svg class="iconfont" aria-hidden="true">
        <use xlink:href="#icon-shouye"></use>
      </svg>
    </el-tooltip>
  </div>
</template>

<script>
  import { mapState } from "Vuex"

  export default {
    name: 'footer-model',
    data() {
      return {}
    },
    computed: {
      ...mapState({
        allClient: state => state.baseStates.allClient
      })
    },
    methods: {
      handlerClick() {
        this.$router.push({
          path: '/indexPage'
        })
      },
      changeOpacity(newV) {
        let toIndexFixed = this.$refs.toIndexFixed
        var timre
        if (newV) {
          toIndexFixed.style.display = 'inline-block'
          timre = setInterval(function () {
            if(toIndexFixed.style.opacity >= 1) {
              clearInterval(timre)
            }else {
              toIndexFixed.style.opacity = Number(toIndexFixed.style.opacity) + 0.05
            }
          }, 20)
        } else {
          timre = setInterval(function () {
            if(toIndexFixed.style.opacity <= 0) {
              clearInterval(timre)
              toIndexFixed.style.display = 'none'
            }else {
              toIndexFixed.style.opacity = Number(toIndexFixed.style.opacity) - 0.05
            }
          }, 20)
        }
      }
    },
    mounted() {
      this.changeOpacity(this.allClient)
    },
    watch: {
      allClient(newV) {
        this.changeOpacity(newV)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped type="text/scss">
  #toIndexFixed {
    display: none;
    position: fixed;
    right: 80px;
    bottom: 8%;
    width: 45px;
    height: 45px;
    opacity: 0;
    cursor: pointer;
    z-index: 1000000;
    //background-color: white;
    .iconfont {
      width: 45px;
      height: 45px;
    }
  }
</style>
