<template>
  <div class="header-model">
    <div class="container">
      <i class="el-icon-menu hidden-sm-and-up"></i>
      <img src="../../assets/images/logo.jpg" class="left-avator"/>
      <div class="right-tab">
        <el-menu :default-active="activeIndex"
                 class="el-menu-demo" :mode="isPc?'vertical':'horizontal'"
                 :collapse="!isPc">
          <el-menu-item index="1">朝花夕拾</el-menu-item>
          <el-menu-item index="2">四季豆花</el-menu-item>
          <el-menu-item index="3">前端日记</el-menu-item>
          <el-menu-item index="4">自我介绍</el-menu-item>
        </el-menu>
        <div class="line"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'header-model',
    data() {
      return {
        activeIndex: '4',
        menuMode: 'horizontal',
        isPc: true
      }
    },
    created() {
      if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        this.isPc = false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped type="text/scss">
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
  @media only screen and (max-width: 768px) {
    .container {
      padding: 0 15px;
    }
  }
</style>
