<template>
  <div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="16">
          <div class="item-model">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span class="title">相关动态</span>
              </div>
              <div>
                <ul>
                  <li v-for="(item, index) in dynamicList" :key="index" class="dynamic-item">
                    <img :src="item.avtar" alt="用户头像">
                    <div class="article-con">
                      <p class="article-title">{{item.title}}</p>
                      <p class="article-content">{{item.content}}</p>
                    </div>
                    <div class="other-mess">
                      <p>{{item.created_time}}</p>
                      <p>{{item.username}}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col class="hidden-xs-only" :sm="8">
          <div class="item-model" style="background-color: #F6F6F6">
            <!--小程序-->
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span class="title">关注小程序</span>
              </div>
              <div class="public-notice my-smallprogram">
                <img src="https://lionynn.cn/images/smallProgram.jpg" alt="">
                <div class="smallgrogram-introduce">
                  <p>ID：四季豆花</p>
                  <p>个人网站关联的小程序，记录family的点点滴滴。<br><br>不忘丶始终</p>
                </div>
              </div>
            </el-card>
            <!--消息-->
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span class="title">消息</span>
              </div>
              <div class="public-notice">
                网站以后会在每两周的星期天晚上12:00更新迭代，希望大家多多支持。<br/>
                <p class="update-time">下次更新：2018-09-30</p>
              </div>
            </el-card>
            <!--社交-->
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span class="title">社交</span>
              </div>
              <div class="public-notice social-content">
                <el-tooltip placement="top">
                  <div slot="content">GitHub</div>
                  <div class="social-contact">
                    <a href="https://github.com/Stur-Lion" target="_blank">
                      <img src="https://lionynn.cn/images/github.jpg" alt="">
                    </a>
                  </div>
                </el-tooltip>
                <el-tooltip placement="top">
                  <div slot="content">
                    <img src="https://lionynn.cn/images/qq-qr.png" alt="">
                  </div>
                  <div class="social-contact">
                    <img src="https://lionynn.cn/images/qq.jpg" alt="">
                  </div>
                </el-tooltip>
                <el-tooltip placement="top">
                  <div slot="content">
                    微博
                  </div>
                  <div class="social-contact">
                    <img src="https://lionynn.cn/images/weibo.jpg" alt="">
                  </div>
                </el-tooltip>
                <el-tooltip placement="top">
                  <div slot="content">
                    <img src="https://lionynn.cn/images/weixin-qr.jpg" alt="">
                  </div>
                  <div class="social-contact">
                    <img src="https://lionynn.cn/images/weixin.jpg" alt="">
                  </div>
                </el-tooltip>
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
      dynamicList: [
        {
          avtar: "https://lionynn.cn/images/defaultAvtor.jpg",
          username: "lion",
          title: "测试标题",
          content: "文章内容不超过哇哈哈哈文章内容不超过哇哈哈哈文章内容不超过哇哈哈哈文章内容不超过哇哈哈哈",
          created_time: "09-17 13:46",
          update_time: "09-17 13:46"
        }, {
          avtar: "https://lionynn.cn/images/defaultAvtor.jpg",
          username: "cckings",
          title: "测试标题",
          content: "文章内容不超过哇哈哈哈文章内容不超过哇哈哈哈文章内容不超过哇哈哈哈文章内容不超过哇哈哈哈",
          created_time: "09-17 13:46",
          update_time: "09-17 13:46"
        }
      ]
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
      .box-card + .box-card{
        margin-top: 15px;
      }
      .title{
        font-weight: bold;
      }
      .dynamic-item{
        display: flex;
        justify-content: space-between;
        align-content: center;
        line-height: 20px;
        padding: 15px 0;
        border-bottom: 1px solid #ebeef5;
        cursor: pointer;
        &:hover{
          background-color: #fdfdfd;
        }
        &:last-child{
          border-bottom: none;
        }
        img{
          display: inline-block;
          width: 50px;
          height: 50px;
          border-radius: 25px;
        }
        .article-con{
          width: calc(100% - 130px);
          padding: 0 10px;
          box-sizing: border-box;
          .article-content{
            color: #8a8a8a;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            word-wrap: break-word;
            white-space: normal !important;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .article-title{
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-weight: 600;
            padding-bottom: 5px;
          }
        }
        .other-mess{
          width: 80px;
          text-align: center;
        }
      }
      .public-notice{
        .update-time{
          padding: 10px 0;
        }
        &.my-smallprogram{
          font-size: 0px;
          img{
            display: inline-block;
            width: 50%;
            vertical-align: top;
          }
          .smallgrogram-introduce{
            display: inline-block;
            width: 50%;
            font-size: 14px;
            padding-left: 15px;
            box-sizing: border-box;
            p{
              padding: 5px 0;
            }
          }
        }
        &.social-content{
          display: flex;
          justify-content: center;
          align-self: center;
          .social-contact{
            width: 25%;
            display: inline-block;
            img{
              display: block;
              width: 40px;
              height: 40px;
              margin: 0 auto;
              border-radius: 20px;
            }
          }
        }
      }
    }
  }
  .el-tooltip__popper{
    img{
      display: block;
      height: 150px;
      width: 150px;
    }
  }
</style>
