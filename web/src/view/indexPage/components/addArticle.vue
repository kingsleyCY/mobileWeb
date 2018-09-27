<template>
  <div class="child-view heigth">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="文章封面" prop="cover">
        <img-upload @uploadSuccess="uploadSuccess"></img-upload>
      </el-form-item>
      <el-form-item label="文章标题" prop="title">
        <el-input
          style="max-width: 300px"
          placeholder="请输入文章标题"
          v-model="ruleForm.title"
          clearable>
        </el-input>
      </el-form-item>
      <div id="editor"></div>
    </el-form>
    <div class="btn-grounp">
      <el-button type="info" @click="articleList">取消</el-button>
      <el-button type="primary" @click="submitEditor">提交</el-button>
    </div>
  </div>
</template>

<script>
  import VueCropper from 'vue-cropper'
  import imgUpload from "@/components/imgUpload"

  var E = require('wangeditor')  // 使用 npm 安装
  export default {
    name: "add-article",
    data() {
      return {
        ruleForm: {
          cover: "",
          title: "",
          editor: null,
        },
        rules: {
          cover: [{ required: true }],
          content: [{ required: true }],
          title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
        },
      }
    },
    methods: {
      articleList() {
        this.$emit("articleList", "articleList")
      },
      uploadSuccess(url) {
        console.log(url);
        this.ruleForm.cover = url
      },
      submitEditor() {
        let that = this
        if (that.ruleForm.editor) {
          let textContent = that.ruleForm.editor.txt.html()
          if(textContent == '' || that.ruleForm.title == '' || that.ruleForm.cover == '') {
            that.$message.info("请填写完整内容")
            return
          }
          that.$http.post("/apis/api/article/addArticle", {
            title: that.ruleForm.title,
            content: textContent,
            cover: that.ruleForm.cover,
            username: '游客12138',
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
      editor.customConfig.uploadImgServer = '/apis/api/upload'
      editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024
      editor.customConfig.uploadImgMaxLength = 1
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
        // 'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        // 'quote',  // 引用
        'emoticon',  // 表情
        'image',  // 插入图片
        // 'table',  // 表格
        // 'video',  // 插入视频
        // 'code',  // 插入代码
        //'undo',  // 撤销
        //'redo'  // 重复
      ]
      editor.customConfig.uploadImgShowBase64 = true
      editor.create()
      this.ruleForm.editor = editor
    },
    components: {
      imgUpload
    }
  }
</script>

<style lang="scss" scoped type="text/scss">
  /deep/ .w-e-toolbar {
    flex-wrap: wrap;
  }

  /deep/ .w-e-text {
    overflow-y: auto;
  }

  /deep/ .w-e-droplist {
    z-index: 20002 !important;
    .w-e-dp-title {
      z-index: 20003 !important;
    }
  }

  .btn-grounp {
    text-align: right;
    padding-top: 15px;
  }
</style>
