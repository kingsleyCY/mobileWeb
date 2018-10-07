<template>
  <div class="blog-message">
    <div class="container">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="16">
          <div class="item-model">
            <div id="content">
              <div class="wrap">
                <div class="comment clearfix">
                  <div class="head-face">
                    <img src="../../assets/comment/images/1.jpg">
                  </div>
                  <div class="content">
                    <div class="cont-box">
                      <textarea class="text" placeholder="来说两句吧..."></textarea>
                    </div>
                    <div class="tools-box">
                      <div class="operator-box-btn"><span class="face-icon">☺</span></div>
                      <div class="submit-btn"><input type="button" onClick="out()" value="提交评论"/></div>
                    </div>
                  </div>
                </div>
              </div>
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
                暂未登陆、点击
                <span style="color: #409EFF;cursor: pointer" @click="changeLoginModel(true)">登录</span>
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
        userInfo: null
      }
    },
    mounted() {
      this.getVuexData()

      // 绑定表情
      $('.face-icon').SinaEmotion($('.text'));

      // 测试本地解析
      function out() {
        var inputText = $('.text').val();
        $('#info-show ul').append(reply(AnalyticEmotion(inputText)));
      }

      var html;

      function reply(content) {
        console.log(content);
        html = '<li>';
        html += '<div class="head-face">';
        html += '<img src="images/1.jpg" / >';
        html += '</div>';
        html += '<div class="reply-cont">';
        html += '<p class="username">小小红色飞机</p>';
        html += '<p class="comment-body">' + content + '</p>';
        html += '<p class="comment-footer">2016年10月5日　回复　点赞54　转发12</p>';
        html += '</div>';
        html += '</li>';
        return html;
      }
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
    margin-top: 40px;
  }
</style>
