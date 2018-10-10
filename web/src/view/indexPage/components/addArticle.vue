<template>
  <div class="child-view heigth">
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="文章封面">
        <img-upload @uploadSuccess="uploadSuccess" :initImg="this.ruleForm.cover"></img-upload>
      </el-form-item>
      <el-form-item label="文章类型">
        <el-select v-model="ruleForm.type" placeholder="请选择文章类型">
          <el-option :label="item.name" :value="item.id" :key="index"
                     v-for="(item, index) in selectArr.type"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章标贴" prop="type">
        <el-checkbox-group v-model="ruleForm.label">
          <el-checkbox :label="item.id" name="type" :key="index"
                       v-for="(item, index) in selectArr.label">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="文章标题">
        <el-input
          size="small"
          style="max-width: 300px"
          placeholder="请输入文章标题"
          v-model="ruleForm.title"
          clearable>
        </el-input>
      </el-form-item>
      <div id="editor"></div>
    </el-form>
    <div class="btn-grounp">
      <el-button type="info" @click="articleList" size="small">取消</el-button>
      <el-button type="primary" @click="submitEditor" size="small">提交</el-button>
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
          type: '',
          label: [],
          editor: null,
        },
        isAdd: true,
        selectArr: {
          type: [],
          label: []
        }
      }
    },
    methods: {
      articleList() {
        this.$emit("articleList", "articleList")
      },
      uploadSuccess(url) {
        // console.log(url);
        this.ruleForm.cover = url
      },
      submitEditor() {
        let that = this
        if (that.ruleForm.editor) {
          let textContent = that.ruleForm.editor.txt.html()
          if (textContent == '' || that.ruleForm.type == '' || that.ruleForm.label.length <= 0 || that.ruleForm.title == '' || that.ruleForm.cover == '') {
            that.$message.info("请填写完整内容")
            return
          }
          let param = {
            title: that.ruleForm.title,
            content: textContent,
            cover: that.ruleForm.cover,
            type: that.ruleForm.type,
            label: that.ruleForm.label,
            username: JSON.parse(localStorage.getItem('userInfo')).username,
          }
          if (this.isAdd) {
            that.$http.post("/apis/api/article/addArticle", param).then(function (res) {
              that.$message.success("添加成功")
              that.$emit("articleList", "articleList")
            })
          } else {
            param.id = that.articleEditInfo.id
            that.$http.post("/apis/api/article/updateArticle", param).then(function (res) {
              that.$message.success("编辑成功")
              that.$emit("articleList", "articleList")
            })
          }
        }
      },
      /* 获取配置参数 */
      getConfiguration() {
        this.$http.post('/apis/api/status/baseText', {
          datatype: ['articleType', 'articleLabel']
        }).then(res => {
          this.selectArr.type = res.date.articleType
          this.selectArr.label = res.date.articleLabel
        })
      }
    },
    mounted() {
      // console.log(this.articleEditInfo)
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
      /*判断添加/编辑*/
      if (this.articleEditInfo) {
        /* 编辑文章 */
        this.isAdd = false
        this.ruleForm.cover = this.articleEditInfo.cover
        this.ruleForm.title = this.articleEditInfo.title
        editor.txt.html(this.articleEditInfo.content)
      } else [
        /* 添加文章 */
        this.isAdd = true
      ]
      this.ruleForm.editor = editor
      this.getConfiguration()
    },
    components: {
      imgUpload
    },
    props: ['articleEditInfo']

  }
</script>

<style lang="scss" scoped type="text/scss">
  /deep/ .el-form-item {
    margin-bottom: 12px;
  }
  .el-select-dropdown{
    z-index: 10050;
  }
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
