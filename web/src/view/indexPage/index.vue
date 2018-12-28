<template>
  <div>
    <div class="container padding10">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="16">
          <div class="item-model">
            <el-card :class="['box-card', screenWidth<768?'xs-screen':'']">
              <div slot="header" class="clearfix">
                <span class="title">相关动态</span>
                <svg class="iconfont" aria-hidden="true" v-if="articleName != 'articleList'"
                     style="float: right;cursor: pointer" @click="toArticleList('articleList')">
                  <use xlink:href="#icon-fanhui"></use>
                </svg>
                <el-button style="float: right; padding: 0" type="text" @click="changeLoginModel(true)"
                           v-if="articleName == 'articleList' && !username">登录
                </el-button>
              </div>
              <div style="position: relative; transition: all .5s;min-height: 200px" ref="articleBox">
                <transition name="slide-left">
                  <component :is="articleName" @addArticle="toAddArticle" @toedit="toedit"
                             :articleEditInfo="articleEdit_info" :articleInfo="articleInfo"
                             @articleList="toArticleList" @autoHeight="autoHeight"
                             @todetail="todetail" :typeArr="selectArr.type" :labelArr="selectArr.label"></component>
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
                <img :src="env.STATICS_API + '/images/smallProgram.jpg'" alt="">
                <div class="smallgrogram-introduce">
                  <p>ID：四季豆花</p>
                  <p>网站相关联的小程序，刚好还可以练习一下小程序<br><br>不忘丶始终</p>
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
                <p class="update-time">下次更新：{{update_time}}</p>
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
                      <img :src="env.STATICS_API + '/images/github.jpg'">
                    </a>
                  </div>
                </el-tooltip>
                <el-tooltip placement="top">
                  <div slot="content">
                    <img :src="env.STATICS_API + '/images/qq-qr.png'">
                  </div>
                  <div class="social-contact">
                    <img :src="env.STATICS_API + '/images/qq.jpg'">
                  </div>
                </el-tooltip>
                <el-tooltip placement="top">
                  <div slot="content">
                    <img :src="env.STATICS_API + '/images/weibo-qr.jpg'">
                  </div>
                  <div class="social-contact">
                    <img :src="env.STATICS_API + '/images/weibo.jpg'">
                  </div>
                </el-tooltip>
                <el-tooltip placement="top">
                  <div slot="content">
                    <img :src="env.STATICS_API + '/images/weixin-qr.jpg'">
                  </div>
                  <div class="social-contact">
                    <img :src="env.STATICS_API + '/images/weixin.jpg'">
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
  import {mapState, mapMutations} from "vuex"

  export default {
    name: 'index-page',
    data() {
      return {
        screenWidth: document.body.clientWidth, // 屏幕尺寸
        articleName: 'articleList',
        articleInfo: null,
        articleEdit_info: null,
        update_time: null,
        selectArr: {
          type: [],
          label: []
        },
        wx_img: ''
      }
    },
    mounted() {
      this.testArticle()
      this.getConfiguration()
    },
    methods: {
      toAddArticle(res) {
        this.articleEdit_info = null
        this.articleName = "addArticle"
        this.$refs.articleBox.style.height = '700px'
      },
      toedit(article_info) {
        // console.log(article_info);
        this.articleEdit_info = article_info
        this.articleName = "addArticle"
        this.$refs.articleBox.style.height = '700px'
      },
      toArticleList(res) {
        this.articleName = res
      },
      todetail(res, item) {
        this.articleEdit_info = null
        this.articleInfo = item
        this.articleName = res
        document.getElementById("mainContaniner").scrollTop = "0"
        this.$refs.articleBox.style.height = 'auto'
      },
      autoHeight(height) {
        this.$refs.articleBox.style.height = height + 'px'
      },
      /* 判断query 的article */
      testArticle() {
        if (this.$route.query.article) {
          // console.log(this.$route);
          this.todetail("articleDetail", {id: this.$route.query.id})
        }
      },
      /* 获取配置参数 */
      getConfiguration() {
        this.$http.post('/apis/api/status/baseText', {
          datatype: ['nextTime', 'articleType', 'articleLabel']
        }).then(res => {
          this.update_time = res.date.nextTime
          this.selectArr.type = res.date.articleType
          this.selectArr.label = res.date.articleLabel
        })
      },
      ...mapMutations(['changeLoginModel'])
    },
    computed: {
      ...mapState({
        username: function (state) {
          return state.userInfor.username
        },
        env: state => state.baseStates.env
      })
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
      .box-card {
        margin-bottom: 15px;
        &.xs-screen {
          /deep/ .el-card__body {
            padding: 10px 5px !important;
          }
        }
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
  .swiper-box.box-card {
    /deep/ .el-card__body {
      padding: 0 !important;
    }
    .swiper-container {
      height: 100%;
      /deep/ .swiper-pagination-bullet {
        width: 20px !important;
        border-radius: 3px;
      }
      /deep/ .swiper-slide {
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
