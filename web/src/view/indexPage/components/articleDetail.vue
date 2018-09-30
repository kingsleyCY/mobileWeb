<template>
  <div class="article-box" v-if="article_info">
    <p class="article-title">{{article_info.title}}</p>
    <div class="article-info">
      <span class="item-info">
        <svg class="iconfont" aria-hidden="true">
          <use xlink:href="#icon-personal"></use>
        </svg>
        <span class="item-info-text">{{article_info.user_info.username}}</span>
      </span>
      <span class="item-info">
        <svg class="iconfont" aria-hidden="true">
          <use xlink:href="#icon-rili1"></use>
        </svg>
        <span
          class="item-info-text">{{article_info.created_time?common.timestampToTime(article_info.created_time):""}}</span>
      </span>
    </div>
    <div class="article-content" v-html="article_info.content"></div>

    <div class="share-box" v-if="config.url">
      分享：
      <share :config="config" class="share-btn-box"></share>
    </div>
  </div>
</template>

<script>
  export default {
    name: "article-detail",
    data() {
      return {
        config: {
          url: '',
          sites: ['weibo', 'qzone', 'qq', 'wechat'], // 启用的站点
          wechatQrcodeTitle: '微信扫一扫：分享', // 微信二维码提示文字
          wechatQrcodeHelper: '<p>微信扫一下二维码</p><p>便可将本文分享至朋友圈。</p>'
        },
        article_info: null
      }
    },
    mounted() {
      let that = this
      this.$http.post('/apis/api/article/findOne', {id: this.articleInfo.id, addLook: true}).then(res => {
        that.article_info = res
        let BASE_URL
        if (location.origin.indexOf('localhost') >= 0 || location.host.indexOf('192.168') == 0) { //本地
          BASE_URL = 'http://lioncc.cn'
        } else {
          BASE_URL = 'http://lioncc.cn'
        }
        that.config.url = BASE_URL
      })
    },
    methods: {},
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
        vertical-align: middle;
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
          top: 5px;
          left: 7px;
        }
      }
    }
  }

  /deep/ .social-share .icon-wechat .wechat-qrcode {
    height: 3.3rem !important;
    top: -3.7rem;
    left: -1.05rem;
    .qrcode {
      margin: 12px 25px;
      img {
        margin: 0 auto;
      }
    }
  }

</style>
