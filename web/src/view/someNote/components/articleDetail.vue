<template>
  <div class="article-box" v-if="article_info">
    <p class="article-title">{{article_info.title}}</p>
    <div class="article-info clearfix">
      <span class="item-info">
        <svg class="iconfont" aria-hidden="true">
          <use xlink:href="#icon-geren"></use>
        </svg>
        <span class="item-info-text">{{article_info.user_info.username}}</span>
      </span>
      <span class="item-info">
        <svg class="iconfont" aria-hidden="true">
          <use xlink:href="#icon-rili"></use>
        </svg>
        <span class="item-info-text">{{article_info.created_time?common.timestampToTime(article_info.created_time):""}}</span>
      </span>
    </div>
    <div class="article-content" v-html="article_info.content"></div>
    <img :src="article_info.cover" class="cover-img">

    <div class="share-box" v-if="config.url">
      分享：
      <share :config="config" :class="['share-btn-box', isPc?'pcScreen':'']"></share>
    </div>
    <div v-if="">
      <br>
      <el-button v-if="btnFlag" type="text" @click="toEdit" style="font-size: 14px!important">编辑文章</el-button>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex"

  export default {
    name: "article-detail",
    data() {
      return {
        btnFlag: false,
        config: {
          url: '',
          sites: ['weibo', 'qzone', 'qq', 'wechat'], // 启用的站点
          wechatQrcodeTitle: '微信扫一扫：分享', // 微信二维码提示文字
          wechatQrcodeHelper: '<p>微信扫一下二维码</p><p>将本文分享至朋友圈</p>'
        },
        article_info: null
      }
    },
    methods: {
      toEdit() {
        this.$emit('toedit', this.article_info)
      }
    },
    mounted() {
      if (localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).root == 2) {
        this.btnFlag = true
      }
      let that = this
      this.$http.post('/apis/api/article/findOne', {id: this.articleInfo.id, addLook: true})
        .then(res => {
          that.article_info = res.date
          let BASE_URL
          if (location.origin.indexOf('localhost') >= 0) { //本地
            BASE_URL = 'http://localhost:8080/#/indexPage?article=true&id=' + that.articleInfo.id
          } else {
            BASE_URL = 'http://lioncc.cn/#/indexPage?article=true&id=' + that.articleInfo.id
          }
          // console.log(BASE_URL);
          that.config.url = BASE_URL
        })
    },
    computed: {
      ...mapState({
        isPc: function (state) {
          return state.baseStates.isPc
        }
      })
    },
    props: ["articleInfo"]
  }
</script>

<style lang="scss" scoped type="text/scss">
  .article-box {
    overflow-x: hidden;
    padding: 0 15px 30px;
    box-sizing: border-box;
    font-size: 16px;
    user-select: none;
    .article-title {
      text-align: center;
      font-weight: 600;
      font-size: 20px;
    }
    .article-info {
      padding: 20px 0;
      .item-info {
        height: 15px !important;
        line-height: 15px !important;
        margin-right: 20px;
        color: #999999;
        display: flex;
        float: left;
        font-size: 12px;
        font-family: "微软雅黑";
        .item-info-text{
          margin-left: 5px;
        }
        .iconfont {
          width: 15px;
          height: 15px;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .article-content {
      img {
        max-width: 100%;
      }
    }
    .cover-img{
      margin: 20px auto;
      margin-bottom: 0;
      max-width: 100%;
      display: block;
    }
  }
  .share-box {
    padding: 30px 0 10px 0;
    .share-btn-box {
      display: inline-block;
      /deep/ a {
        width: 33px !important;
        height: 33px !important;
        font-size: 20px;
        position: relative;
        margin: 0 8px;
        text-align: center;
        &:before {
          position: absolute;
          top: 0px;
          left: 7px;
          display: inline-block;
        }
      }
      &.pcScreen {
        /deep/ a {
          &:before {
            top: 0px;
            left: 7px;
          }
        }
      }
    }
  }
  /deep/ .social-share .icon-wechat .wechat-qrcode {
    top: -192px;
    left: -45px;
    width: 120px;
    height: 180px;
    font-size: 12px !important;
    h4 {
      height: 20px;
      line-height: 20px;
    }
    .qrcode {
      padding: 12px 10px;
      margin: 0px;
      width: 100%;
      box-sizing: border-box;
      img {
        margin: 0 auto;
      }
    }
    .help {
      font-size: 12px !important;
      p {
        line-height: 12px !important;
        &:first-child {
          padding-bottom: 5px;
        }
      }
    }
  }

</style>
