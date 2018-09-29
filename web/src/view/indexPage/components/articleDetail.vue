<template>
  <div class="article-box">
    <p class="article-title">{{articleInfo.title}}</p>
    <div class="article-info">
      <span class="item-info">
        <svg class="iconfont" aria-hidden="true">
          <use xlink:href="#icon-personal"></use>
        </svg>
        <span class="item-info-text">{{articleInfo.user_info.username}}</span>
      </span>
      <span class="item-info">
        <svg class="iconfont" aria-hidden="true">
          <use xlink:href="#icon-rili1"></use>
        </svg>
        <span class="item-info-text">{{articleInfo.created_time?timestampToTime(articleInfo.created_time):""}}</span>
      </span>
    </div>
    <div class="article-content" v-html="articleInfo.content"></div>

    <div class="share-box" v-if="config.url">
      分享：<share :config="config" class="share-btn-box"></share>
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
      }
    },
    mounted() {
      console.log(this.articleInfo);
      var BASE_URL
      if(location.origin.indexOf('localhost') >= 0 || location.host.indexOf('192.168') == 0) { //本地
        BASE_URL = 'http://lioncc.cn/#/indexPage'
      }else {
        BASE_URL = 'http://lioncc.cn/#/indexPage'
      }
      console.log(BASE_URL);
      this.config.url = BASE_URL
    },
    methods: {
      timestampToTime(timestamp) {
        var date = new Date(Number(timestamp));//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours();
        Number(h) < 10 ? h = ('0' + h) : h = h
        // var m = date.getMinutes() + ':';
        var m = date.getMinutes();
        Number(m) < 10 ? m = ('0' + m) : m = m
        var s = date.getSeconds();
        // return Y + M + D + h + m + s;
        return Y + M + D + h + ':' + m;
      },
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
    .article-content{
      img {
        max-width: 100%;
      }
    }
  }
  .share-box{
    padding: 30px 0 10px 0;
    .share-btn-box{
      display: inline-block;
      /deep/ a{
        width: 33px !important;
        height: 33px !important;
        font-size: 20px;
        position: relative;
        margin: 0 8px;
        text-align: center;
        &:before{
          position: absolute;
          top: 5px;
          left: 7px;
        }
      }
    }
  }
  /deep/ .social-share .icon-wechat .wechat-qrcode{
    height: 3.3rem !important;
    top: -3.7rem;
    left: -1.05rem;
    .qrcode{
      margin: 12px 25px;
      img{
        margin: 0 auto;
      }
    }
  }

</style>
