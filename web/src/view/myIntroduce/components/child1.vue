<template>
  <div :class="['myslf-baseinfo', xsScreen?'xs-screen':'']">
    <img src="./../../../assets/images/logo-1.jpg" alt="logo" class="user-logo">
    <p class="user-name">Cheng丶C</p>
    <p class="brief-introduction">一位奋战前线的搬砖农名工, 一心只读圣贤书，两耳不闻窗外事</p>
    <div class="technology-stack">
      <p class="stack-title">&nbsp;&nbsp;&nbsp;My Technology Stack</p>
      <div class="stack-content">
        <ul>
          <li v-for="(item, index) in stackArr" :key="index">
            <span>{{item.name}}</span>
            <span>
              <el-progress :text-inside="true" :stroke-width="15"
                           :percentage="item.percent" :color="item.bgc"></el-progress>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex"

  export default {
    name: "child1",
    data() {
      return {
        stackArr: [
          {
            name: "HTML/CSS/JS",
            percent: 80,
            bgc: '#8E71C7',
          }, {
            name: "JQuery",
            percent: 90,
            bgc: '#409eff',
          }, {
            name: "Vue",
            percent: 75,
            bgc: '#67c23a',
          }, {
            name: "Node",
            percent: 60,
            bgc: '#f56c6c',
          }, {
            name: "Mongo",
            percent: 50,
            bgc: '#ffdc25',
          }, {
            name: "小程序",
            percent: 65,
            bgc: '#a4c4ff',
          }
        ]
      }
    },
    computed: {
      ...mapState({
        xsScreen: state => state.baseStates.xsScreen
      })
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  $baseColor: #409eff;
  .myslf-baseinfo {
    overflow: hidden;
    background-color: #fcfcfc;
    height: 100%;
    box-sizing: border-box;
    padding-top: 5vh;
    .user-logo {
      display: block;
      width: 7.5vh;
      height: 7.5vh;
      border-radius: 7.5vh;
      margin: 0 auto;
    }
    .user-name {
      text-align: center;
      font-size: 3vh;
      font-family: "webfonts" !important;
      padding-top: 3vh;
    }
    .brief-introduction {
      text-align: center;
      color: #b4b7b1;
      padding: 1vh 0;
    }
    .technology-stack {
      max-width: 600px;
      margin: 0 auto;
      padding-top: 10px;
      .stack-title {
        background-color: #ededed;
        border-left: 3px solid $baseColor;
        line-height: 3.2vh;
        font-size: 14px;
        font-family: "微软雅黑";
        font-weight: 600;
      }
      .stack-content {
        padding-top: 2vh;
        li {
          display: flex;
          width: 100%;
          justify-content: center;
          align-items: center;
          padding: 2.5vh 0;
          span:first-child {
            width: 20%;
            text-align: right;
            font-size: 16px;
            padding-right: 1vw;
            box-sizing: border-box;
          }
          span:last-child {
            width: 80%;
            padding-right: 1vw;
            box-sizing: border-box;
          }
        }
      }
    }
    &.xs-screen {
      padding-top: 3vh;
      .user-logo {
        width: 45px;
        height: 45px;
        border-radius: 45px;
      }
      .user-name {
        padding-top: 1vh;
        font-size: 20px;
      }
      .technology-stack {
        width: 90%;
        .stack-title {
          line-height: 28px;
          font-size: 12px;
          font-weight: normal;
          font-family: "微软雅黑";
        }
        .stack-content {
          padding-top: 3vh;
          li {
            justify-content: flex-start;
            padding: 3vh 0;
            span:first-child {
              font-size: 12px;
            }
            span:last-child {
              width: 70%;
            }
          }
        }
      }
    }
  }
</style>
