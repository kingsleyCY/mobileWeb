<template>
  <div class="blog-message">
    <div class="container">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="16">
          <commonts-list></commonts-list>
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
  import commontsList from "./components/commontsList"
  import { mapState, mapMutations } from "vuex"

  export default {
    name: "mess-tome",
    data() {
      return {
        screenWidth: document.body.clientWidth, // 屏幕尺寸
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
          pre_page: 20,
          total: 0
        }
      }
    },
    mounted() {
      this.getVuexData()
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
          localStorage.removeItem("sessionid")
          localStorage.removeItem("userInfo")
          this.userInfo = null
          this.REMOVE_USERINFO()
        })
      },
      ...mapMutations(['changeLoginModel', 'REMOVE_USERINFO'])
    },
    computed: {
      ...mapState({
        username: function (state) {
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
      commontsList
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
</style>
