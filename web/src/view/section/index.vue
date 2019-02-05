<template>
  <div :class="['main-content', allClient?'all-client':'not-all-client']" ref="mainContent">
    <canvas id="backCanvas"></canvas>
    <transition :name="transitionName">
      <router-view class="child-view scrollBar" id="mainContaniner"></router-view>
    </transition>
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
    methods: {
      renderCtx() {
        var backCanvas = document.getElementById('backCanvas')
        var ctx = backCanvas.getContext('2d')
        if(ctx) {
          var pr = window.devicePixelRatio || 1,
            w = window.innerWidth,
            h = window.innerHeight,
            f = 90,
            q,
            r = 0,
            u = Math.PI * 2,
            v = Math.cos,
            z = Math.random
          backCanvas.width = w * pr
          backCanvas.height = h * pr
          ctx.scale(pr, pr)
          ctx.globalAlpha = 0.6

          function i() {
            ctx.clearRect(0, 0, w, h)
            q = [{ x: 0, y: h * .7 + f }, { x: 0, y: h * .7 - f }]
            while (q[1].x < w + f) d(q[0], q[1])
          }

          function d(i, j) {
            ctx.beginPath()
            ctx.moveTo(i.x, i.y)
            ctx.lineTo(j.x, j.y)
            var k = j.x + (z() * 2 - 0.25) * f,
              n = y(j.y)
            ctx.lineTo(k, n)
            ctx.closePath()
            r -= u / -50
            ctx.fillStyle = '#' + (v(r) * 127 + 128 << 16 | v(r + u / 3) * 127 + 128 << 8 | v(r + u / 3 * 2) * 127 + 128).toString(16)
            ctx.fill()
            q[0] = q[1]
            q[1] = { x: k, y: n }
          }

          function y(p) {
            var t = p + (z() * 2 - 1.1) * f
            return (t > h || t < 0) ? y(p) : t
          }

          /*document.onclick = i
          document.ontouchstart = i*/
          i()
        }
      }
    },
    created() {
      this.$nextTick(() => {
        this.renderCtx()
      })
    },
    computed: {
      ...mapState({
        allClient: state => state.baseStates.allClient
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped type="text/scss">
  .main-content {
    width: 100%;
    position: relative;
    overflow-x: hidden;
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
    // height: calc(100% - 60px);
    height: 100%;
    transition: all .5s cubic-bezier(.55, 0, .1, 1);
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling : touch;
    background: transparent;
  }
  #backCanvas {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
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
