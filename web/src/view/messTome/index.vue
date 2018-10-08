<template>
  <div class="blog-message">
    <div class="container">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="16">
          <div class="item-model" style="background-color: white">
            <div id="content">
              <div class="wrap">
                <div class="comment clearfix">
                  <div class="head-face">
                    <img v-if="userInfo" :src="userInfo.avtor">
                    <p v-else class="login" @click="changeLoginModel(true)">登录</p>
                  </div>
                  <div class="content">
                    <div class="cont-box">
                      <textarea class="text scrollBar" placeholder="来说两句吧..." maxlength="250"></textarea>
                    </div>
                    <div class="tools-box">
                      <div class="operator-box-btn">
                        <span class="face-icon">☺</span>
                      </div>
                      <div class="submit-btn" @click="submitMess"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="reply-box">
              <div class="reply-title">
                <span>评论</span>
                <div>
                  <span>12</span>条评论
                </div>
              </div>
              <ul v-if="commentsData.list">
                <li v-for="(item, index) in commentsData.list" :key="index">
                  <div class="base-info clearfix">
                    <img :src="item.userInfo.avtor" alt="">
                    <div class="comments-content">
                      <p>{{item.username}}</p>
                      <p v-html="item.content"></p>
                    </div>
                    <span class="comments-time">{{common.timestampToTime(item.create_time)}}</span>
                  </div>
                  <div></div>
                </li>
              </ul>
            </div>
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
                  <img :src="userInfo.avtor">
                  <div>
                    <span class="user-name">{{userInfo.username}}</span>
                    <svg class="iconfont" aria-hidden="true" v-if="userInfo.sex == 1">
                      <use xlink:href="#icon-nvsheng"></use>
                    </svg>
                    <svg class="iconfont" aria-hidden="true" v-else-if="userInfo.sex == 2">
                      <use xlink:href="#icon-nansheng"></use>
                    </svg>
                    <div style="padding: 3px 10px;box-sizing: border-box">
                      <el-button style="padding: 0" type="text" @click="layoutSubmit">注销</el-button>
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
  import {mapState, mapMutations} from "vuex"

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
        ],
        userInfo: null,
        commentsData: {
          list: null,
          page: 1,
          pre_page: 20
        }
      }
    },
    mounted() {
      this.getVuexData()
      this.getCommentsList()
      // 绑定表情
      $('.face-icon').SinaEmotion($('.text'));
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
      /* 注销 */
      layoutSubmit() {
        this.$http.post("/apis/api/status/layout", {}).then(res => {
          this.$message.success("注销成功")
          localStorage.removeItem("sessionId")
          localStorage.removeItem("userInfo")
          this.REMOVE_USERINFO()
        })
      },
      /* 提交评论 */
      submitMess() {
        /* 未登录必须先登录 */
        if (!this.username) {
          this.changeLoginModel(true)
          return
        } else if ($('.text').val() == '') {
          return
        }
        this.$http.post('/apis/api/comments/add', {
          username: this.username,
          content: $.AnalyticEmotion($('.text').val()),
        }).then(res => {
          this.$message.success(res.mess)
          $('.text').val("")
          this.commentsData.page = 1
          this.commentsData.pre_page = 20
          this.getCommentsList()
        })
      },
      /* 获取评论列表 */
      getCommentsList() {
        this.$http.post('/apis/api/comments/all', {
          page: this.commentsData.page,
          pre_page: this.commentsData.pre_page,
        }).then(res => {
          // console.log(res);
          this.commentsData.list = res.date
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
    }
  }
</script>

<style lang="scss" scoped type="text/scss">
  .blog-message {
    /*background-color: white !important;*/
    border-top: 1px solid #ebeee6;
    box-sizing: border-box;
    .container {
      padding-top: 15px;
      box-sizing: border-box;
      .item-model {
        border-radius: 3px;
        overflow: hidden;
        font-size: 14px;
        margin-bottom: 15px;
        .box-card {
          margin-bottom: 15px;
        }
        .title {
          font-weight: bold;
        }
        .public-notice {
          a {
            text-decoration: none;
            color: black;
            font-size: 16px;
            padding: 5px 0;
            display: inline-block;
          }
          .link-desciption {
            color: #929292;
            font-size: 12px;
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
        }
      }
    }
  }
  #content {
    width: 100%;
    height: auto;
    margin: 50px 0 20px;
  }
  .reply-box {
    .reply-title{
      display: flex;
      width: 90%;
      height: 30px;
      margin: 0  auto;
      margin-bottom: 10px;
      color: #e74851;
      >span{
        border: 1.5px solid #e74851;
        border-bottom: none;
        line-height: 30px;
        text-align: center;
        width: 50px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }
      >div{
        width: calc(100% - 50px);
        border-bottom: 1.5px solid #e74851;
        text-align: right;
        span{
          font-family: Impact;
          font-size: 20px;
        }
      }
    }
    ul {
      width: 90%;
      margin: 0 auto;
      li {
        padding: 15px 0;
        border-bottom: 1px dashed #e5e5e5;;
        .base-info {
          position: relative;
          min-height: 50px;
          img {
            position: absolute;
            width: 45px;
            height: 45px;
            border-radius: 45px;
          }
          .comments-content {
            width: 100%;
            box-sizing: border-box;
            padding: 0 15% 0 60px;
            p:first-child{
              color: #e74851;
            }
            P:last-child {
              padding-top: 10px;
            }
          }
          span {
            position: absolute;
            text-align: center;
            width: 15%;
            right: 0;
            top: 0;
            font-family: Arial;
            color: silver;
            font-size: 12px;
            font-family: "微软雅黑";
          }
        }
      }
    }
  }
</style>
