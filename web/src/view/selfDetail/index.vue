<template>
  <div>
    <div class="container">
      <el-row>
        <el-col :xs="24" :sm="{span:12,offset:6}">
          <el-form ref="form" :model="form" label-width="80px" size="small" class="form-box">
            <el-form-item label="用户名">
              <el-input :disabled="true" v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="电子邮件">
              <el-input v-model="form.useremail"></el-input>
            </el-form-item>
            <el-form-item label="个性签名">
              <el-input resize="none" rows="3" type="textarea" v-model="form.personSignature"></el-input>
            </el-form-item>
            <!--<el-form-item label="头像">
              <div class="base-content">
                <i class="el-icon-upload"></i>
                <p>点击上传图片</p>
              </div>
              <vueCropper
                ref="cropper" :img="option.img" :output-size="option.size" :output-type="option.outputType"
                :info="true" :full="option.full" :can-move="option.canMove" :can-move-box="option.canMoveBox"
                :fixed-box="option.fixedBox" :original="option.original" :auto-crop="option.autoCrop"
                :auto-crop-width="option.autoCropWidth" :auto-crop-height="option.autoCropHeight"
                :center-box="option.centerBox" @real-time="realTime" :high="option.high" @img-load="imgLoad"></vueCropper>
            </el-form-item>-->
            <el-form-item label="">
              <el-button type="primary" @click="sureSubmit">确认提交</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import VueCropper from 'vue-cropper'
  import {uploadFile} from '@/api/login'

  export default {
    name: 'self-details',
    data() {
      return {
        form: {
          username: '',
          useremail: '',
          personSignature: '',
          imageUrl: ''
        },
        userInfo: null,
        option: {
          img: '',
          size: 1,
          full: false,
          outputType: 'png',
          canMove: true,
          fixedBox: true,
          original: false,
          canMoveBox: true,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          autoCropWidth: 120,
          autoCropHeight: 120,
          centerBox: true,
          high: true
        },
      }
    },
    created() {
      if (localStorage.getItem("userInfo")) {
        this.userInfo = JSON.parse(localStorage.getItem("userInfo"))
      }
      if (this.userInfo) {
        this.form.username = this.userInfo.username || ''
        this.form.useremail = this.userInfo.useremail || ''
        this.form.personSignature = this.userInfo.personSignature || ''
      }
    },
    methods: {
      // 实时预览函数
      realTime(data) {
        this.previews = data
        // console.log(data)
      },
      imgLoad(msg) {
        // console.log(msg)
      },
      /* 删除背景图 */
      clearImgback() {
        this.uploadImgUrl = null
      },
      /* 提交确认*/
      sureSubmit() {
        console.log(this.form);
      }
    },
    components: {
      VueCropper
    }
  }
</script>

<style lang="scss" scoped type="text/scss">
  .container {
    margin-top: 15px;
    background-color: white;
    padding: 20px 0;
    /deep/ .base-content {
      width: 120px;
      height: 120px;
      text-align: center;
      border: 1px solid #dcdfe6;
      vertical-align: center;
      .el-icon-upload {
        margin-top: 30px;
      }
    }
  }
</style>
