<template>
  <div class="child-view heigth">
    <el-input
      placeholder="请输入文章标题"
      v-model="title"
      clearable>
    </el-input>
    <br>
    <br>
    <div id="editor"></div>
    <div class="btn-grounp">
      <el-button type="info" @click="articleList">取消</el-button>
      <el-button type="primary" @click="submitEditor">提交</el-button>
    </div>
  </div>
</template>

<script>
  var E = require('wangeditor')  // 使用 npm 安装
  export default {
    name: "add-article",
    data() {
      return {
        editor: null,
        title: "",
      }
    },
    methods: {
      articleList() {
        this.$emit("articleList", "articleList")
      },
      submitEditor() {
        if(this.editor) {
          let textContent = this.editor.txt.html()
          let that = this
          this.$http.post("/apis/api/article/addArticle", {
            title: that.title,
            content: textContent,
            username: 'kingsley'
          }).then(function (res) {
            that.$message.success("添加成功")
            that.$emit("articleList", "articleList")
          })
        }
      }
    },
    mounted() {
      // 创建编辑器
      this.editor = null
      document.getElementById("editor").innerHTML = "";
      var editor = new E('#editor')
      editor.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        // 'quote',  // 引用
        'emoticon',  // 表情
        'image',  // 插入图片
        'table',  // 表格
        'video',  // 插入视频
        // 'code',  // 插入代码
        'undo',  // 撤销
        'redo'  // 重复
      ]
      editor.customConfig.uploadImgShowBase64 = true
      editor.create()
      this.editor = editor
    }
  }
</script>

<style lang="scss" scoped type="text/scss">
  /deep/ .w-e-toolbar{
    flex-wrap: wrap;
  }
  /deep/ .w-e-text{
    overflow-y: auto;
  }
  .btn-grounp{
    text-align: right;
    padding-top: 15px;
  }
</style>
