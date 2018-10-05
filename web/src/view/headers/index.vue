<template>
  <div class="header-model">
    <div class="container">
      <i class="el-icon-menu hidden-sm-and-up" @click="toggleMenu"></i>
      <span class="header-title hidden-sm-and-up">Some OF Myself</span>
      <span class="my-logo">
        <img :src="avtor?avtor:defaultLogo" class="left-avator"/>
        <span class="webfont hidden-xs-only">Cheng丶C ' s Blog</span>
      </span>
      <div class="right-tab hidden-xs-only">
        <el-menu :default-active="activeIndex" class="el-menu-demo"
                 mode="horizontal" @select="menuSelect">
          <el-menu-item :index="item.index" v-for="(item, index) in menuArr"
                        :key="index" v-if="item.isShow">{{item.name}}
          </el-menu-item>
        </el-menu>
        <div class="line"></div>
      </div>
    </div>
    <div class="menu-background" ref="menuBack" @click="closeMenu">
      <ul ref="menuList">
        <div>
          <img src="../../assets/images/logo.jpg"/>
        </div>
        <li v-for="(item, index) in menuArr" :key="index" @click="menuSelect(index + 1,[item.index])"
            v-if="item.isShow">
          <svg class="iconfont" aria-hidden="true">
            <use :xlink:href="'#'+item.icon"></use>
          </svg>
          {{item.name}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import defaultLogo from "./../../assets/images/logo.jpg"
  import {mapState, mapMutations} from "vuex"

  export default {
    name: 'header-model',
    data() {
      return {
        defaultLogo,
        activeIndex: "1",
        isPc: false,
        menuArr: [
          {
            name: "朝花夕拾",
            index: "1",
            icon: 'icon-shuqian',
            path: '/indexPage',
            isShow: 1
          }, {
            name: "四季豆花",
            index: "2",
            icon: 'icon-zhezhi',
            path: '/forOurs',
            isShow: 0
          }, {
            name: "前端日记",
            icon: 'icon-wanjufengche',
            index: "3",
            path: '/someNote',
            isShow: 1
          }, {
            name: "自我介绍",
            index: "4",
            icon: 'icon-jinianpin',
            path: '/myIntroduce',
            isShow: 1
          }, {
            name: "给我留言",
            index: "5",
            icon: 'icon-wenju',
            path: '/messTome',
            isShow: 1
          }
        ]
      }
    },
    created() {
      if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        this.isPc = true
      }
      var that = this
      this.menuArr.forEach((item, index) => {
        if(that.$route.path.indexOf(item.path) == 0) {
          that.activeIndex = String(index + 1)
        }
      })
      /* 获取localstorage数据存储在Vuex */
      this.getVuexData()
    },
    methods: {
      toggleMenu() {
        this.$refs.menuBack.style.display = 'block'
        setTimeout(function () {
          this.$refs.menuList.style.transform = 'translateX(0px)'
        }.bind(this), 50)
      },
      closeMenu(e) {
        this.$refs.menuList.style.transform = 'translateX(-200px)'
        setTimeout(function () {
          this.$refs.menuBack.style.display = 'none'
        }.bind(this), 300)
      },
      menuSelect(index, indexPath) {
        let routerPath = this.menuArr[index - 1].path
        this.$router.push({
          path: routerPath
        })
      },
      getVuexData() {
        if(localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo"))) {
          const userIfo = JSON.parse(localStorage.getItem("userInfo"))
          // console.log(userIfo);
          this.SET_USERINFO(["username", userIfo.username])
          this.SET_USERINFO(["useremail", userIfo.useremail])
          this.SET_USERINFO(["avtor", userIfo.avtor])
          this.SET_USERINFO(["sex", userIfo.sex])
          this.SET_USERINFO(["root", userIfo.root])
        }
      },
      ...mapMutations(['SET_USERINFO'])
    },
    computed: {
      ...mapState({
        avtor: function (state) {
          // console.log(state.userInfor);
          return state.userInfor.avtor
        }
      })
    },
    watch: {
      '$route'(to, from) {
        var that = this
        this.menuArr.forEach((item, index) => {
          if(to.path.indexOf(item.path) == 0) {
            that.activeIndex = String(index + 1)
          }
        })
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped type="text/scss" scoped>
  .header-model {
    height: 60px;
    background-color: white;
    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      .left-avator {
        width: 45px;
        height: 45px;
        border-radius: 45px;
        display: inline-block;
      }
      .el-icon-menu {
        font-size: 20px
      }
      .header-title {
        font-size: 16px;
        font-weight: bold;
      }
      .my-logo{
        display: flex;
        align-content: center;
        justify-content: center;
        span{
          display: inline-block;
          padding-left: 15px;
          line-height: 45px;
        }
      }
      .right-tab {
        height: 100%;
        .el-menu {
          height: 100%;
          li {
            height: 100%;
            line-height: 60px;
            font-size: 14px;
            font-weight: bold;
          }
        }
      }
    }
  }
  .menu-background {
    display: none;
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000000;
    ul {
      height: 100%;
      width: 170px;
      overflow-y: auto;
      display: inline-block;
      background-color: white;
      transform: translateX(-200px);
      transition: transform 0.5s;
      li {
        border-top: 1px solid #c8d0dc;
        padding-left: 15px;
        box-sizing: border-box;
        line-height: 45px;
        height: 45px;
        font-size: 14px;
        svg {
          display: inline-block;
          width: 20px;
          height: 20px;
          margin-right: 5px;
          vertical-align: -6px;
        }
      }
      li:last-child{
        border-bottom: 1px solid #c8d0dc;
      }
      img{
        display: block;
        margin: 15px auto;
        width: 50px;
        height: 50px;
        border-radius: 50px;
      }
    }
  }
  @media only screen and (max-width: 768px) {
    .container {
      padding: 0 15px;
    }
  }
</style>
