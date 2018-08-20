<template>
  <div class="header-model">
    <div class="container">
      <img src="../../assets/images/logo.jpg" class="left-avator"/>
      <div class="right-tab">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
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
  data () {
    return {
      activeIndex: '4',
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .header-model{
    height: 60px;
    background-color: white;
    .container{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      .left-avator{
        width: 45px;
        height: 45px;
        border-radius: 45px;
        display: inline-block;
      }
      .right-tab{
        height: 100%;
        .el-menu{
          height: 100%;
          li{
            height: 100%;
            line-height: 60px;
            font-size: 14px;
            font-weight: bold;
          }
        }
      }
    }
  }
</style>
