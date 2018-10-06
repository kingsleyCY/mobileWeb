<template>
  <div class="blog-message">
    <div class="container">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="16">
          <div class="item-model">
            <el-button type="text" @click="login">注册</el-button>
          </div>
        </el-col>
        <el-col :xs="24" :sm="8">
          <div class="item-model">
            <!--Customer-->
            <el-card class="box-card" v-if="username">
              <div slot="header" class="clearfix">
                <span class="title">个人信息</span>
              </div>
              <div class="public-notice" v-if="userInfo">
                <div class="user-infor">
                  <img :src="userInfo.avtor">
                  <span class="user-name">{{userInfo.username}}</span>
                  <svg class="iconfont" aria-hidden="true" v-if="userInfo.sex == 1">
                    <use xlink:href="#icon-nvsheng"></use>
                  </svg>
                  <svg class="iconfont" aria-hidden="true" v-else-if="userInfo.sex == 1">
                    <use xlink:href="#icon-nansheng"></use>
                  </svg>
                </div>
                <div style="font-style: italic;padding-top: 10px">
                  "这个人很懒，什么都没有留下"
                </div>
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
  import { mapState, mapMutations } from "vuex"

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
      if (localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo"))) {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        // console.log(userInfo);
        this.userInfo = userInfo
      }
    },
    methods: {
      login() {
        this.changeLoginModel(true)
        /*this.$http.post('/apis/api/login/sendEmail', {email: "1504468447@qq.com"}).then(res => {
          console.log(res);
        })*/
      },
      ...mapMutations(['changeLoginModel'])
    },
    computed: {
      ...mapState({
        username: function (state) {
          // console.log(state.userInfor.username);
          return state.userInfor.username
        }
      })
    },
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
              padding-left: 15px;
            }
            .iconfont{
              padding-left: 10px;
              width: 15px;
              height: 15px;
            }
          }
        }
      }
    }
  }
</style>
