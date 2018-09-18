<template>
  <div class="header-model">
    <div class="container">
      <i class="el-icon-menu hidden-sm-and-up" @click="toggleMenu"></i>
      <span class="header-title hidden-sm-and-up">Some OF Myself</span>
      <span class="my-logo">
        <img src="../../assets/images/logo.jpg" class="left-avator"/>
        <span class="webfont hidden-xs-only">Cheng丶C ' s Blog</span>
      </span>
      <div class="right-tab hidden-xs-only">
        <el-menu :default-active="activeIndex" class="el-menu-demo"
                 mode="horizontal" @select="menuSelect">
          <el-menu-item :index="item.index" v-for="(item, index) in menuArr"
                        :key="index">{{item.name}}
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
        <li v-for="(item, index) in menuArr" :key="index" @click="menuSelect(index,[item.index])">
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
  export default {
    name: 'header-model',
    data() {
      return {
        activeIndex: "1",
        isPc: false,
        menuArr: [
          {
            name: "朝花夕拾",
            index: "1",
            icon: 'icon-shuqian',
            path: ''
          }, {
            name: "四季豆花",
            index: "2",
            icon: 'icon-zhezhi',
            path: ''
          }, {
            name: "前端日记",
            icon: 'icon-wanjufengche',
            index: "3",
            path: ''
          }, {
            name: "自我介绍",
            index: "4",
            icon: 'icon-wenju',
            path: ''
          }
        ]
      }
    },
    created() {
      if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        this.isPc = true
      }
      this.menuSelect(undefined, ["1"])
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
        let routerPath = ''
        switch (indexPath[0]) {
          case "1":
            routerPath = '/indexPage'
            break;
          case "2":
            routerPath = '/forOurs'
            break;
          case "3":
            routerPath = '/someNote'
            break;
          case "4":
            routerPath = '/myIntroduce'
            break;
          default:
            routerPath = '/indexPage'
            break;
        }
        this.$router.push({
          path: routerPath
        })
      }
    }
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
