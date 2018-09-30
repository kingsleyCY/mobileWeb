<template>
  <div class="blog-message">
    <div class="container">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="16">
          <div class="item-model">
            123
          </div>
        </el-col>
        <el-col :xs="24" :sm="8">
          <div class="item-model">
            <!--消息-->
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span class="title">友链</span>
              </div>
              <div class="public-notice">
                <ul>
                  <li v-for="(item, index) in friendLink" :key="index">
                    <a :href="item.link" target="_blank">{{item.name}}</a>
                    <span class="link-desciption">({{item.des}})</span>
                  </li>
                </ul>
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
    name: "mess-tome",
    data() {
      return {
        friendLink: [
          {
            name: "源泉-79px",
            link: "https://79px.com",
            des: "一位技术大佬，老同事"
          }, {
            name: "技术胖-JSpang",
            link: "http://jspang.com/",
            des: "学习网站，很多博主录得学习视频"
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped type="text/scss">
  .blog-message{
    background-color: white !important;
    border-top: 1px solid #ebeee6;
    .container{
      padding-top: 15px;
      box-sizing: border-box;
      .item-model{
        border-radius: 3px;
        overflow: hidden;
        font-size: 14px;
        .title {
          font-weight: bold;
        }
        .public-notice{
          a{
            text-decoration: none;
            color: black;
            font-size: 16px;
            padding: 5px 0;
            display: inline-block;
          }
          .link-desciption{
            color: #929292;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
