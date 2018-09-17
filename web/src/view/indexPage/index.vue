<template>
  <div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="item-model">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span class="title">相关动态动态</span>
              </div>
              <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="item-model">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span class="title">通告</span>
              </div>
              <div>
                网站以后会在每两周的星期天晚上12:00更新迭代，希望大家多多支持。
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index-page',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped type="text/scss">
  .container{
    padding-top: 20px;
    .item-model{
      background-color: white;
      border-radius: 3px;
      overflow: hidden;
      font-size: 14px;
      .title{
        font-weight: bold;
      }
    }
  }
</style>
