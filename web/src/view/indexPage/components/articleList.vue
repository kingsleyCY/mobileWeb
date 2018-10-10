<template>
  <div :class="['child-view', 'heigth', screenWidth<768?'xs-screen':'']" ref="childView">
    <ul>
      <!--<li v-for="(item, index) in dynamicList" :key="index" class="dynamic-item" @click="todetail(item)">
        <div class="left-base">
          <img :src="item.avtar?item.avtar:'https://lionynn.cn/images/defaultAvtor.jpg'" alt="用户头像">
          <p>
            <span>{{item.article_info?item.article_info.comment_num:0}}</span> /
            <span>{{item.article_info?item.article_info.look_num:0}}</span>
          </p>
        </div>
        <div class="article-con">
          <p class="article-title">{{item.title?item.title:"标题飞走啦！"}}</p>
          <p class="article-content" v-html="item.content?delHtmlTag(item.content):'内容被吃辣'"></p>
        </div>
        <div class="other-mess">
          <p>{{item.user_info?item.user_info.username:"&#45;&#45;"}}</p>
          <p>{{item.created_time?timestampToTime(item.created_time):""}}</p>
        </div>
      </li>-->
      <li v-for="(item, index) in dynamicList" :key="index" class="another-item clearfix" @click="todetail(item)">
        <div :class="['left-img', screenWidth<768?'xs-screen':'']">
          <img :src="item.cover" alt="">
        </div>
        <div :class="['right-content', screenWidth<768?'xs-screen':'']">
          <div class="title">{{item.title?item.title:"标题飞走啦！"}}</div>
          <div class="article" v-html="item.content?delHtmlTag(item.content):'内容被吃辣'"></div>
          <div class="article-info">
            <div>
              <span>
                <svg class="iconfont" aria-hidden="true">
                  <use xlink:href="#icon-shijian"></use>
                </svg>
                {{item.created_time?common.timestampToTime(item.created_time):""}}
              </span>
            </div>
            <div>
              <span>
                <svg class="iconfont" aria-hidden="true">
                  <use xlink:href="#icon-xinxi"></use>
                </svg>评论（{{item.article_info.comment_num?item.article_info.comment_num:0}}）
              </span>
              <span>
                <svg class="iconfont" aria-hidden="true">
                  <use xlink:href="#icon-chakan"></use>
                </svg>浏览（{{item.article_info.look_num?item.article_info.look_num:0}}）
              </span>
              <!--<span>{{item.article_info.good_num?item.article_info.good_num:0}}</span>-->
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="pagination-box">
      <el-pagination
        v-show="pageInfo.total > pageInfo.pre_page"
        :current-page.sync="pageInfo.page"
        :page-size="pageInfo.pre_page"
        layout="prev, pager, next" :total="pageInfo.total">
      </el-pagination>
      <el-button v-if="btnFlag" type="text" @click="addArticle" style="font-size: 14px!important">添加文章</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "article-list",
    data() {
      return {
        screenWidth: document.body.clientWidth, // 屏幕尺寸
        dynamicList: [],
        pageInfo: {
          page: 1,
          pre_page: 20,
          total: 3
        },
        btnFlag: false
      }
    },
    methods: {
      delHtmlTag(str) {
        str = str.replace(/<[^>]+>/g, "")
        str = str.replace(/&nbsp;/ig, "")
        return str;
      },
      addArticle() {
        this.$emit('addArticle', "addArticle")
      },
      /* 查看详情 */
      todetail(item) {
        this.$emit("todetail", "articleDetail", item)
      },
    },
    mounted() {
      if (localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).root == 2) {
        this.btnFlag = true
      }
      let that = this
      this.$http.get("/apis/api/article/all", {params: {page: that.pageInfo.page, pre_page: that.pageInfo.pre_page,}})
        .then(function (res) {
          that.dynamicList = res.date.article_list
          that.pageInfo.total = res.date.page_info.count
          that.$nextTick(() => {
            var liHeight = 0
            if (that.screenWidth > 768) {
              liHeight = 131
            } else {
              /* 手机端 */
              liHeight = 130 + $(that.$refs.childView).width() * 150 / 240
            }
            var computedHeigth = computedHeigth = res.date.article_list.length * liHeight + 28
            that.$emit("autoHeight", that.$refs.childView ? computedHeigth : 0)
          })
        })
      /* 监听屏幕宽度 */
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth
          that.screenWidth = window.screenWidth
          const liHeight = $(that.$refs.childView).find("li").height() + 30
          // console.log(liHeight);
          var computedHeigth = computedHeigth = that.dynamicList.length * liHeight + 28
          that.$emit("autoHeight", that.$refs.childView ? computedHeigth : 0)
        })()
      }
    }
  }
</script>

<style lang="scss" scoped type="text/scss">
  .child-view.xs-screen {
    min-height: 355px;
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
      font-size: 10px;
      p:first-child {
        padding-bottom: 5px;
        font-size: 16px;
      }
    }
  }
  .another-item {
    /*display: flex;
    justify-content: space-between;
    align-content: center;*/
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
    .left-img {
      float: left;
      width: 160px;
      height: 100px;
      overflow: hidden;
      img {
        display: block;
        width: 100%;
        height: 100%;
        transition: all 0.5s;
        &:hover {
          transform: scale(1.1);
        }
      }
      &.xs-screen {
        width: 100%;
        height: auto !important;
        float: none !important;
      }
    }
    .right-content {
      padding-left: 170px;
      box-sizing: border-box;
      width: 100%;
      font-size: 12px;
      .title {
        font-weight: 600;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding-bottom: 5px;
        padding-left: 5px;
        padding-top: 0;
        font-size: 16px;
        box-sizing: border-box;
      }
      .article {
        color: #8a8a8a;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: break-word;
        white-space: normal !important;
        line-clamp: 2;
        /*-webkit-line-clamp: 2;*/
        -webkit-box-orient: vertical;
        max-height: 40px;
        min-height: 40px;
      }
      .article-info {
        padding-top: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .iconfont {
          width: 15px;
          height: 15px;
        }
      }
      &.xs-screen {
        width: 100%;
        padding-left: 0;
        .title {
          padding-top: 5px;
        }
      }
    }
  }
  .pagination-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
