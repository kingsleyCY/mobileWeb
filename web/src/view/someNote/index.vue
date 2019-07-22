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
            <!--Customer-->
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span class="title">个人信息</span>
              </div>
              <div class="public-notice" v-if="userInfo">
                <div class="user-infor">
                  <img :src="aliBaseUrl + userInfo.avtor">
                  <div>
                    <span class="user-name">{{userInfo.username}}</span>
                    <svg class="iconfont" aria-hidden="true" v-if="userInfo.sex == 1">
                      <use xlink:href="#icon-nvsheng"></use>
                    </svg>
                    <svg class="iconfont" aria-hidden="true" v-else-if="userInfo.sex == 2">
                      <use xlink:href="#icon-nansheng"></use>
                    </svg>
                    <div style="padding: 3px 10px;box-sizing: border-box">
                      <el-button style="padding: 0" type="text" @click="layoutSubmit">退出</el-button>
                    </div>
                  </div>
                </div>
                <div style="font-style: italic;padding-top: 10px">
                  "这个人很懒，什么都没有留下"
                </div>
              </div>
              <div class="public-notice" v-else>
                暂未登陆
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
  import { layout } from '@/api/login'
  import { getBaseText } from '@/api/article'
  import { mapState, mapMutations } from "Vuex"

  export default {
    name: 'some-note',
    data() {
      return {
        aliBaseUrl: 'https://lioncc.oss-cn-beijing.aliyuncs.com/base-avtor/',
        screenWidth: document.body.clientWidth, // 屏幕尺寸
        articleName: 'articleList',
        articleInfo: null,
        articleEdit_info: null,
        selectArr: {
          type: [],
          label: []
        },
        userInfo: null,
      }
    },
    mounted() {
      this.getVuexData()
      this.testArticle()
      this.getConfiguration()
    },
    methods: {
      getVuexData() {
        if (localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo"))) {
          const userInfo = JSON.parse(localStorage.getItem("userInfo"))
          this.userInfo = userInfo
        } else {
          this.userInfo = null
        }
      },
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
      /* 注销 */
      layoutSubmit() {
        layout().then(res => {
          this.$message.success("注销成功")
          localStorage.removeItem("sessionid")
          localStorage.removeItem("userInfo")
          this.REMOVE_USERINFO()
        })
      },
      /* 判断query 的article */
      testArticle() {
        if (this.$route.query.article) {
          // console.log(this.$route);
          this.todetail("articleDetail", { id: this.$route.query.id })
        }
      },
      /* 获取配置参数 */
      getConfiguration() {
        getBaseText({
          datatype: ['articleType', 'articleLabel']
        }).then(res => {
          this.selectArr.type = res.date.articleType
          this.selectArr.label = res.date.articleLabel
        })
      },
      ...mapMutations(['changeLoginModel', 'REMOVE_USERINFO'])
    },
    computed: {
      ...mapState({
        username: function (state) {
          // console.log(state.userInfor.username);
          return state.userInfor.username
        }
      })
    },
    watch: {
      username(newV, oldV) {
        this.getVuexData()
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
        .user-infor {
          display: flex;
          width: 100%;
          justify-content: left;
          align-items: center;
          img {
            display: inline-block;
            width: 50px;
            height: 50px;
          }
          span {
            padding-left: 10px;
          }
          .iconfont {
            width: 15px;
            height: 15px;
          }
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
