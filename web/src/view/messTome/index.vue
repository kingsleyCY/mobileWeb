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
                <span>足迹</span>
                <div>
                  <span>{{commentsData.total}}</span>&nbsp;条留言
                </div>
              </div>
              <ul v-if="commentsData.list">
                <li v-for="(item, index) in commentsData.list" :key="index">
                  <div :class="['background-yin',screenWidth<768?'xs-screen':'']" :ref="'everyComments' + index">
                    <img :src="computedYin(items.type)" v-for="(items, indexs) in item.yinArr" :key="indexs">
                  </div>
                  <div class="base-info clearfix">
                    <img :src="item.userInfo.avtor" alt="">
                    <div class="comments-content">
                      <p>{{item.username}}</p>
                      <p v-html="item.content"></p>
                    </div>
                    <span class="comments-time">{{common.timestampToTime(item.create_time)}}</span>
                  </div>
                  <div class="operation-box">
                    <svg class="iconfont reply-btn" aria-hidden="true" @click="clickZan">
                      <use xlink:href="#icon-huifu"></use>
                    </svg>
                    <el-popover
                      v-if="item.username !== username"
                      class="yin-btn" placement="top"
                      width="230" trigger="click">
                      <div class="dianyin-select" ref="dianyinSelect">
                        <ul>
                          <li class="active" @click="selectYin(0, index)"><img :src="dou"></li>
                          <li @click="selectYin(1, index)"><img :src="geili"></li>
                          <li @click="selectYin(2, index)"><img :src="pei"></li>
                          <li @click="selectYin(3, index)"><img :src="penzi"></li>
                        </ul>
                        <el-button @click="addImprint($event, item)" type="danger" size="mini">给他点印
                        </el-button>
                      </div>
                      <span slot="reference">印</span>
                    </el-popover>
                  </div>
                </li>
              </ul>
              <div v-if="commentsData.list && (commentsData.list.length < commentsData.total)"
                   class="loading-more" @click="loadingMore">查看更多
                <svg class="iconfont" aria-hidden="true">
                  <use xlink:href="#icon-xiangxia"></use>
                </svg>
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
  import dou from "@/assets/images/stamp/dou.png"
  import geili from "@/assets/images/stamp/geili.png"
  import pei from "@/assets/images/stamp/pei.png"
  import penzi from "@/assets/images/stamp/penzi.png"
  import { mapState, mapMutations } from "vuex"

  export default {
    name: "mess-tome",
    data() {
      return {
        dou, geili, pei, penzi,
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
        },
        messBtn: false
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
        if (!this.messBtn) {
          this.messBtn = true
          /* 未登录必须先登录 */
          if (!this.username) {
            this.messBtn = false
            this.changeLoginModel(true)
            return
          } else if ($('.text').val() == '') {
            this.$message.info('请输入内容')
            return
          }
          this.$http.post('/apis/api/comments/add', {
            username: this.username,
            content: $.AnalyticEmotion($('.text').val()),
          }).then(res => {
            this.messBtn = false
            this.$message.success(res.mess)
            $('.text').val("")
            this.commentsData.page = 1
            this.getCommentsList()
          }).catch(res => {
            this.messBtn = false
          })
        }
      },
      /* 获取评论列表 */
      getCommentsList() {
        let that = this
        this.$http.post('/apis/api/comments/all', {
          page: this.commentsData.page,
          pre_page: this.commentsData.pre_page,
        }).then(res => {
          var baseLength = 0
          if (this.commentsData.page == 1) {
            this.commentsData.list = res.date.resuletList
          } else {
            baseLength = this.commentsData.list.length - 1
            this.commentsData.list = this.commentsData.list.concat(res.date.resuletList)
          }
          this.commentsData.total = res.date.commentsInfo.count
          this.$nextTick(() => {
            for (var i = baseLength; i < that.commentsData.list.length; i++) {
              if (that.$refs['everyComments' + i][0].querySelectorAll('img').length > 0) {
                const imgList = that.$refs['everyComments' + i][0].querySelectorAll('img')
                for (var j = 0; j < imgList.length; j++) {
                  var screenWidth = that.$refs['everyComments' + i][0].clientWidth * 0.9 - 60
                  var screenHeigth = that.$refs['everyComments' + i][0].clientHeight - 30
                  var positionData = that.commentsData.list[i].yinArr[j].positionData
                  imgList[j].style.left = 60 + positionData.left * screenWidth + 'px'
                  imgList[j].style.top = positionData.left * screenHeigth + 'px'
                }
              }
            }
          })
        })
      },
      loadingMore() {
        ++this.commentsData.page
        this.getCommentsList()
      },
      /* 点赞 */
      clickZan() {
        this.$notify({
          message: '功能暂未开放',
          type: 'warning'
        });
      },
      /* 选择印 */
      selectYin(index, inde) {
        var list
        if (this.$refs.dianyinSelect.length) {
          list = this.$refs.dianyinSelect[inde].querySelectorAll('li')
        } else {
          list = this.$refs.dianyinSelect.querySelectorAll('li')
        }
        list.forEach(function (v, i) {
          if (i == index) {
            v.classList.add("active")
          } else {
            v.classList.remove("active")
          }
        })
      },
      /* 点印 */
      addImprint(e, item) {
        if (!this.username) {
          this.$notify({
            message: '您还未登录',
            type: 'warning'
          });
          return
        }
        let btn = e.path.filter(function (v, i) {
          return v.nodeName === 'BUTTON'
        })[0]
        var type = 0
        $.each($(btn).prev('ul').children('li'), function (i, v) {
          if($(v).hasClass('active')) {
            type = $(v).index() + 1
          }
        })
        this.$http.post('/apis/api/comments/addImprint', {
          type: type,
          username: this.username,
          commentId: item.id,
          positionData: {
            left: Math.random(),
            top: Math.random(),
          }
        }).then(res => {
          // console.log(res);
          this.$message.success(res.mess)
          this.commentsData.page = 1
          this.getCommentsList()
        })
      },
      /* 计算点印背景图 */
      computedYin(type) {
        switch (type) {
          case 1:
            return dou;
            break;
          case 2:
            return geili;
            break;
          case 3:
            return pei;
            break;
          case 4:
            return penzi;
            break;
        }
      },
      /* 计算点印位置 */
      computedYinPosition(positionData, index) {
        const commentsBox = this.$refs['everyComments' + index]
        return {
          left: Math.random(),
          top: Math.random(),
        }
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
    user-select: none;
    padding-bottom: 20px;
    .reply-title {
      display: flex;
      width: 90%;
      height: 30px;
      margin: 0 auto;
      margin-bottom: 10px;
      color: #e74851;
      > span {
        border: 1.5px solid #e74851;
        border-bottom: none;
        line-height: 30px;
        text-align: center;
        width: 50px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }
      > div {
        width: calc(100% - 50px);
        border-bottom: 1.5px solid #e74851;
        text-align: right;
        span {
          font-family: Impact !important;
          font-size: 20px;
        }
      }
    }
    ul {
      width: 90%;
      margin: 0 auto;
      li {
        padding: 15px 0;
        border-bottom: 1px dashed #e5e5e5;
        position: relative;
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
            p:first-child {
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
        .operation-box {
          display: flex;
          width: 100%;
          padding-right: 5px;
          box-sizing: border-box;
          justify-content: flex-end;
          align-items: center;
          > span:first-child {
            color: #8d8d8a;
            cursor: pointer;
          }
          > .iconfont {
            width: 15px;
            height: 15px;
            margin-left: 8px;
            cursor: pointer;
            color: #8d8d8a;
            transform: rotate(0deg);
          }
          .yin-btn {
            width: 17px !important;
            height: 17px !important;
            line-height: 18px;
            text-align: center;
            color: #e74851;
            border: 1px solid #e74851;
            border-radius: 20px;
            font-size: 12px;
            transform: rotate(30deg);
            cursor: pointer;
            margin-left: 8px;
          }
        }
        .background-yin {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          padding-left: 60px;
          box-sizing: border-box;
          img {
            position: absolute;
          }
          &.xs-screen {
            img {
              width: 40px;
              height: 40px;
            }
          }
        }
        .reply-btn {
          cursor: pointer;
        }
      }
    }
    .loading-more {
      width: 90%;
      margin: 10px auto;
      border-radius: 5px;
      text-align: center;
      line-height: 30px;
      cursor: pointer;
      background-color: #f0f0f0;
      &:hover {
        color: #e74851;
        background-color: #fef6f6;
      }
      .iconfont {
        width: 15px;
        height: 15px;
        font-size: 16px;
      }
    }
  }
  .dianyin-select {
    button {
      display: block;
      width: 100%;
      margin-top: 10px;
    }
    ul {
      display: flex;
      justify-content: center;
      align-items: center;
      li {
        margin: 0 5px;
        padding: 10px 0;
        cursor: pointer;
        border-bottom: 2px solid white;
        &.active {
          border-bottom: 2px solid #e7847f;
        }
      }
    }
  }
</style>
