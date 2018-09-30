<template>
  <div>
    <div class="container padding10">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="16">
          <div class="item-model">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span class="title">相关动态</span>
                <svg class="iconfont" aria-hidden="true" v-if="articleName != 'articleList'"
                     style="float: right;cursor: pointer" @click="toArticleList('articleList')">
                  <use xlink:href="#icon-fanhui"></use>
                </svg>
              </div>
              <div style="position: relative; transition: all .5s;min-height: 200px" ref="articleBox">
                <transition name="slide-left">
                  <component :is="articleName" @addArticle="toAddArticle" :articleInfo="articleInfo"
                             @articleList="toArticleList" @autoHeight="autoHeight" @todetail="todetail"></component>
                </transition>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :xs="24" :sm="8">
          <div class="item-model">
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
              <div class="public-notice" style="text-indent: 2em">
                <p>博客以后会在每两周的星期天晚上12:00更新迭代，希望大家多多支持。</p>
                <p>后续会加入更多的功能，例如基本的登录注册、权限模块，如果经费及精力条件允许下会尝试的接入一些第三方功能。</p>
                <p class="update-time">下次更新：2018-10-07</p>
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
                    <img src="https://lionynn.cn/images/weibo-qr.jpg" alt="">
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
  import articleList from "./components/articleList"
  import addArticle from "./components/addArticle"
  import articleDetail from "./components/articleDetail"
  import Swiper from 'swiper'

  export default {
    name: 'index-page',
    data() {
      return {
        articleName: 'articleList',
        articleInfo: null,
        bannerImg: [
          "https://lionynn.cn/images/banner1.jpg",
          "https://lionynn.cn/images/banner3.jpg",
          "https://lionynn.cn/images/banner2.jpg",
        ]
      }
    },
    mounted() {
    },
    methods: {
      toAddArticle(res) {
        this.articleName = res
        this.$refs.articleBox.style.height = '550px'
      },
      toArticleList(res) {
        this.articleName = res
      },
      todetail(res, item) {
        this.articleInfo = item
        this.articleName = res
        document.getElementById("mainContaniner").scrollTop = "0"
        this.$refs.articleBox.style.height = 'auto'
      },
      autoHeight(height) {
        this.$refs.articleBox.style.height = height + 'px'
      }
    },
    components: {
      articleList, addArticle, articleDetail
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped type="text/scss">
  .container {
    padding-top: 20px;
    .item-model {
      // background-color: white;
      border-radius: 3px;
      overflow: hidden;
      font-size: 14px;
      .box-card + .box-card {
        margin-top: 15px;
      }
      .title {
        font-weight: bold;
      }
      .dynamic-item {
        display: flex;
        justify-content: space-between;
        align-content: center;
        line-height: 20px;
        padding: 15px 0;
        border-bottom: 1px solid #ebeef5;
        cursor: pointer;
        &:hover {
          background-color: #fdfdfd;
        }
        &:last-child {
          border-bottom: none;
        }
        .left-base {
          img {
            display: block;
            width: 50px;
            height: 50px;
            border-radius: 25px;
          }
          p {
            font-family: "微软雅黑 Light";
            text-align: center;
            padding-top: 8px;
            span:first-child {
              color: #9e78c0;
              font-size: 14px;
            }
            span:last-child {
              color: #b4b4b4;
              font-size: 10px;
            }
          }
        }
        .article-con {
          width: calc(100% - 130px);
          padding: 0 10px;
          box-sizing: border-box;
          .article-content {
            color: #8a8a8a;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            word-wrap: break-word;
            white-space: normal !important;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            max-height: 38px;
          }
          .article-title {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-weight: 600;
            padding-bottom: 5px;
          }
        }
        .other-mess {
          width: 80px;
          text-align: center;
          color: #a9a9a9;
          p:first-child {
            padding-bottom: 5px;
          }
        }
      }
      .public-notice {
        .update-time {
          padding: 10px 0;
        }
        &.my-smallprogram {
          font-size: 0px;
          img {
            display: inline-block;
            width: 50%;
            vertical-align: top;
          }
          .smallgrogram-introduce {
            display: inline-block;
            width: 50%;
            font-size: 14px;
            padding-left: 15px;
            box-sizing: border-box;
            p {
              padding: 5px 0;
            }
          }
        }
        &.social-content {
          display: flex;
          justify-content: center;
          align-self: center;
          .social-contact {
            width: 25%;
            display: inline-block;
            img {
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

  .el-tooltip__popper {
    img {
      display: block;
      height: 150px;
      width: 150px;
    }
  }
  .swiper-box.box-card{
    /deep/ .el-card__body{
      padding: 0 !important;
    }
    .swiper-container{
      height: 100%;
      /deep/ .swiper-pagination-bullet{
        width: 20px !important;
        border-radius: 3px;
      }
      /deep/ .swiper-slide{
        img{
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
