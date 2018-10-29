<template>
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
          <div class="base-info clearfix" :ref="'commentDetail' + index">
            <img :src="item.userInfo.avtor" alt="">
            <div class="comments-content">
              <p>{{item.username}}</p>
              <p v-html="item.content"></p>
            </div>
            <div class="right-info">
              <p class="comments-time">{{common.timestampToTime(item.create_time).slice(5)}}</p>
              <svg class="iconfont reply-btn" aria-hidden="true"
                   @click="replyCommont('comments', item, undefined, 'commentDetail' + index)">
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
          </div>
          <div class="reply-list" v-if="item.replyList">
            <ul>
              <li v-for="(replyItem, replyIndex) in item.replyList">
                <span>twst001</span>回复<span>test002</span>：这是为什么啊哈哈
                <svg class="iconfont reply-btn" aria-hidden="true"
                     @click="replyCommont('reply', item, replyItem, 'commentDetail' + index)">
                  <use xlink:href="#icon-huifu"></use>
                </svg>
              </li>
            </ul>
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
</template>

<script>
  import dou from "@/assets/images/stamp/dou.png"
  import geili from "@/assets/images/stamp/geili.png"
  import pei from "@/assets/images/stamp/pei.png"
  import penzi from "@/assets/images/stamp/penzi.png"
  import { mapState, mapMutations } from "vuex"

  export default {
    name: "commonts-list",
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
        messBtn: false,
        replyText: ''
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
      /* 提交评论 */
      submitMess() {
        if (!this.messBtn) {
          /* 未登录必须先登录 */
          if (!this.username) {
            this.changeLoginModel(true)
            return
          } else if ($('.text').val() == '') {
            this.$message.info('请输入内容')
            return
          }
          this.messBtn = true
          this.$http.post('/apis/api/comments/add', {
            username: this.username,
            content: $.AnalyticEmotion($('.text').val()),
          }).then(res => {
            if (res.code == 1) {
              this.$message.success(res.mess)
              $('.text').val("")
              this.commentsData.page = 1
              this.getCommentsList()
            }
            this.messBtn = false
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
      /* 回复 */
      replyCommont(type, commentDetail, replyDetail, commentDetailRef) {
        let replyHtml;
        if (replyDetail) { /*回复*/
          replyHtml = this.getReplyHtml(replyDetail.username, type)
        } else { /*评论*/
          replyHtml = this.getReplyHtml(commentDetail.username, type)
        }
        let commentRef = this.$refs[commentDetailRef][0] ? this.$refs[commentDetailRef][0] : this.$refs[commentDetailRef]
        if($(commentRef).find('#replyTextBox').length <= 0) {
          $('#replyTextBox').remove()
          $(commentRef).children('.comments-content').append(replyHtml)
          this.showReplyText()
        }else {
          this.hideReplyText()
          setTimeout(function () {
            $('#replyTextBox').remove()
          },500)
        }
      },
      /* 提交评论 */
      submitReply() {
        console.log(1);
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
          if ($(v).hasClass('active')) {
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
          if (res.code == 1) {
            this.$message.success(res.mess)
            this.commentsData.page = 1
            this.getCommentsList()
          }
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
      /* 获取回复的HTML */
      getReplyHtml(one, type) {
        var placeText = ''
        if (one && type == 'reply') {
          placeText = '回复：' + one
        } else if (one) {
          placeText = '评论：' + one
        }
        return '<div id="replyTextBox">' +
          '<input name="replyText" id="replyText" maxlength="150" placeholder="' + placeText + '">' +
          '<button>确认</button></div>'
      },
      /* 显示输入框 */
      showReplyText() {
        let that = this;
        $('#replyTextBox').fadeIn(function () {
          $('#replyTextBox button').off('click').on('click', function () {
            that.submitReply()
          })
        })
        $('#replyTextBox').height(35);
      },
      /* 隐藏输入框 */
      hideReplyText() {
        $('#replyTextBox').height(0);
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
    > ul {
      width: 90%;
      margin: 0 auto;
      > li {
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
            padding: 0 20% 0 60px;
            p:first-child {
              color: #e74851;
            }
            P:nth-child(2) {
              padding-top: 5px;
            }
          }
          .right-info {
            position: absolute;
            width: 20%;
            right: 0;
            top: 0;
            font-family: Arial;
            color: silver;
            font-size: 12px;
            font-family: "微软雅黑";
            text-align: right;
            .comments-time {
              padding-bottom: 5px;
            }
            .iconfont {
              width: 15px;
              height: 15px;
              margin-left: 5px;
              cursor: pointer;
              color: #8d8d8a;
              transform: rotate(0deg);
              font-size: 14px;
            }
            .reply-btn {
              cursor: pointer;
              /*display: none;*/
            }
            .yin-btn {
              padding: 2px;
              line-height: 18px;
              text-align: center;
              color: #e74851;
              border: 1px solid #e74851;
              border-radius: 20px;
              font-size: 14px;
              transform: rotate(30deg);
              cursor: pointer;
              margin-left: 5px;
            }
          }
          &:hover {
            .reply-btn {
              display: inline-block;
            }
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
        .reply-list {
          padding-left: 60px;
          box-sizing: border-box;
          position: relative;
          ul {
            li {
              padding: 2px 0px;
              font-size: 12px;
              padding-right: 20px;
              box-sizing: border-box;
              > span {
                color: #3a8ee6;
              }
              .reply-btn {
                /*display: none;*/
                font-size: 12px;
                width: 15px;
                height: 15px;
                position: absolute;
                right: 0;
                top: 0;
              }
              &:hover {
                .reply-btn {
                  display: inline-block;
                }
              }
            }
          }
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
