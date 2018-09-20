<template>
  <div class="child-view heigth" ref="childView">
    <ul>
      <li v-for="(item, index) in dynamicList" :key="index" class="dynamic-item">
        <div class="left-base">
          <img :src="item.avtar?item.avtar:'https://lionynn.cn/images/defaultAvtor.jpg'" alt="用户头像">
          <p>
            <span>{{item.article_info?item.article_info.comment_num:0}}</span> /
            <span>{{item.article_info?item.article_info.look_num:0}}</span>
          </p>
        </div>
        <div class="article-con">
          <p class="article-title">{{item.title?item.title:"标题飞走啦！"}}</p>
          <p class="article-content" v-html="item.content?item.content:'内容被吃辣'"></p>
        </div>
        <div class="other-mess">
          <p>{{item.user_info?item.user_info.username:"--"}}</p>
          <p>{{item.created_time?timestampToTime(item.created_time):""}}</p>
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
      <el-button type="text" @click="addArticle">添加文章</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "article-list",
    data() {
      return {
        dynamicList: [],
        pageInfo: {
          page: 1,
          pre_page: 20,
          total: 3
        }
      }
    },
    methods: {
      timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
        var D = date.getDate() + ' ';
        var h = date.getHours();
        Number(h) < 10 ? h = ('0' + h) : h = h
        // var m = date.getMinutes() + ':';
        var m = date.getMinutes();
        Number(m) < 10 ? m = ('0' + m) : m = m
        var s = date.getSeconds();
        // return Y + M + D + h + m + s;
        return M + D + h + ':' + m;
      },
      addArticle() {
        this.$emit('addArticle', "addArticle")
      }
    },
    mounted() {
      let that = this
      this.$http.get("/apis/api/article/all", {
        params: {
          page: that.pageInfo.page,
          pre_page: that.pageInfo.pre_page,
        }
      }).then(function (res) {
        that.dynamicList = res.article_list
        that.pageInfo.total = res.page_info.count
        that.$nextTick(() => {
          that.$emit("autoHeight", that.$refs.childView ? that.$refs.childView.clientHeight : 0)
        })
      })
    }
  }
</script>

<style lang="scss" scoped type="text/scss">
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
      p:first-child {
        padding-bottom: 5px;
      }
    }
  }

  .pagination-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
