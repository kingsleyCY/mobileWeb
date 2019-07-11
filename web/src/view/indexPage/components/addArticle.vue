<template>
  <div class="child-view heigth">
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small">
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
        <el-radio :label="item.id" :key="index" v-model="ruleForm.label"
                  v-for="(item, index) in selectArr.label">{{item.name}}
        </el-radio>
      </el-form-item>
      <el-form-item label="文章标题">
        <el-input
          size="small" style="max-width: 300px"
          placeholder="请输入文章标题"
          v-model="ruleForm.title"
          clearable maxlength="50">
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
  import { editArticle, addArticle } from '@/api/article'
  import { mapState } from "vuex"

  var E = require('wangeditor')  // 使用 npm 安装
  export default {
    name: "add-article",
    data() {
      return {
        ruleForm: {
          cover: "",
          title: "",
          type: '',
          label: '',
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
          if (textContent == '' || that.ruleForm.type == '' || that.ruleForm.label == '' || that.ruleForm.title == '' || that.ruleForm.cover == '') {
            that.$message.info("请填写完整内容")
            return
          }
          let param = {
            title: that.ruleForm.title,
            content: textContent,
            cover: that.ruleForm.cover,
            articleType: that.ruleForm.type,
            labelArr: that.ruleForm.label,
            username: JSON.parse(localStorage.getItem('userInfo')).username,
          }
          if (this.isAdd) {
            addArticle(param).then(function (res) {
              that.$message.success("添加成功")
              that.$emit("articleList", "articleList")
            })
          } else {
            param.id = that.articleEditInfo.id
            editArticle(param).then(function (res) {
              that.$message.success("编辑成功")
              that.$emit("articleList", "articleList")
            })
          }
        }
      }
    },
    mounted() {
      let that = this
      // console.log(this.articleEditInfo)
      // 创建编辑器
      this.editor = null
      document.getElementById("editor").innerHTML = "";
      var editor = new E('#editor')
      if (window.location.host.indexOf('lioncc.cn') >= 0) {
        editor.customConfig.uploadImgServer = this.env.BASE_API + '/api/upload/oss'
      } else {
        editor.customConfig.uploadImgServer = '/api/upload/oss'
      }
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
      editor.customConfig.uploadImgHeaders = {
        sessionid: localStorage.getItem("sessionid")
      }
      editor.customConfig.withCredentials = true
      editor.customConfig.uploadImgHooks = {
        customInsert: function (insertImg, result, editor) {
          if (result.code == 1) {
            setTimeout(function () {
              insertImg(result.date)
            }, 1000)
          } else if (result.code == 100001) { /*登录过期*/
            that.$message.warning('登录过期，请重新登录')
            that.$store.dispatch('clear_session')
          }
        }
      }
      editor.create()
      /*判断添加/编辑*/
      if (this.articleEditInfo) {
        /* 编辑文章 */
        this.isAdd = false
        this.ruleForm.cover = this.articleEditInfo.cover
        this.ruleForm.title = this.articleEditInfo.title
        this.ruleForm.type = this.articleEditInfo.articleType ? this.articleEditInfo.articleType : ''
        this.ruleForm.label = this.articleEditInfo.labelArr ? this.articleEditInfo.labelArr : []
        editor.txt.html(this.articleEditInfo.content)
      } else [
        /* 添加文章 */
        this.isAdd = true
      ]
      this.ruleForm.editor = editor
      this.selectArr.type = this.typeArr
      this.selectArr.label = this.labelArr
    },
    computed: {
      ...mapState({
        env: state => state.baseStates.env
      })
    },
    components: {
      imgUpload
    },
    props: ['articleEditInfo', 'typeArr', 'labelArr']
  }
</script>

<style lang="scss" scoped type="text/scss">
  /deep/ .el-form-item {
    margin-bottom: 12px;
  }
  .el-select-dropdown {
    z-index: 10050;
  }
  /deep/ .w-e-toolbar {
    flex-wrap: wrap;
  }
  /deep/ .w-e-text {
    overflow-y: auto;
    p {
      margin: 5px 0 !important;
    }
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
