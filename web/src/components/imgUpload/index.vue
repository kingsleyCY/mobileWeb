<template>
  <div>
    <div class="upload-box" ref="uploadBox">
      <div class="base-content" @click="openModel">
        <i class="el-icon-upload"></i>
        <p>点击上传图片</p>
      </div>
      <div class="uploadImg-back" @mouseenter="enterImgBack" @mouseleave="leaveImgBack"
           :style='{"display": uploadImgUrl?"block":"none"}'>
        <img :src="uploadImgUrl" v-if="uploadImgUrl">
        <div class="lighrGray-box" ref="lighrGrayBox">
          <i class="el-icon-delete" @click="clearImgback"></i>
        </div>
      </div>
    </div>
    <el-dialog title="上传图片" :visible.sync="dialogVisible" :width="isPc?'50%':'90%'"
               append-to-body modal-append-to-body :before-close="beforeClose">
      <div class="uploadImg-box">
        <div v-show="partIndex == 1" class="step-one">
          <div class="base-content" @click="dialogVisible = true">
            <i class="el-icon-upload"></i>
            <p>点击上传图片</p>
          </div>
          <input ref="fileInput" type="file" class="upload-file-btn" @change="uploadImg($event, 1)">
        </div>
        <div v-show="partIndex == 2">
          <vueCropper
            ref="cropper" :img="option.img" :output-size="option.size" :output-type="option.outputType"
            :info="true" :full="option.full" :can-move="option.canMove" :can-move-box="option.canMoveBox"
            :fixed-box="option.fixedBox" :original="option.original" :auto-crop="option.autoCrop"
            :auto-crop-width="option.autoCropWidth" :auto-crop-height="option.autoCropHeight"
            :center-box="option.centerBox" @real-time="realTime" :high="option.high" @img-load="imgLoad"></vueCropper>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="beforeClose">取 消</el-button>
        <el-button v-show="partIndex == 2" type="primary" @click="sureSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import VueCropper from 'vue-cropper'
  import { uploadFile } from '@/api/login'
  import { mapState } from "vuex"

  export default {
    name: "img-upload",
    data() {
      return {
        dialogVisible: false,
        partIndex: 1,
        uploadImgUrl: null,
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
          autoCropWidth: 240,
          autoCropHeight: 150,
          centerBox: true,
          high: true
        },
      }
    },
    methods: {
      openModel() {
        this.dialogVisible = true
        this.uploadImgUrl = null
      },
      uploadImg(e, num) {
        // console.log('uploadImg');
        var _this = this;
        //上传图片
        var file = e.target.files[0]
        _this.fileName = file.name;
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
        }
        var reader = new FileReader();
        reader.onload = (e) => {
          let data;
          if (typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          _this.partIndex = 2
          if (num === 1) {
            _this.option.img = data
          } else if (num === 2) {
            _this.example2.img = data
          }
        }
        /*转化为base64
        reader.readAsDataURL(file)*/
        // 转化为blob
        reader.readAsArrayBuffer(file);

      },
      // 实时预览函数
      realTime(data) {
        this.previews = data
        // console.log(data)
      },
      imgLoad(msg) {
        // console.log(msg)
      },
      /* 鼠标悬浮、离开背景图 */
      enterImgBack() {
        $(this.$refs.lighrGrayBox).fadeIn(100)
      },
      leaveImgBack() {
        $(this.$refs.lighrGrayBox).fadeOut(100)
      },
      /* 删除背景图 */
      clearImgback() {
        this.uploadImgUrl = null
      },
      beforeClose() {
        this.dialogVisible = false
        this.partIndex = 1
        $(this.$refs.fileInput).val("")
      },
      sureSubmit() {
        let _this = this;
        let formData = new FormData();
        this.$refs.cropper.getCropBlob((data) => {
          let img = window.URL.createObjectURL(data)
          this.model = true;
          this.modelSrc = img;
          formData.append("file", data, this.fileName);
          uploadFile(formData).then((response) => {
            if (response.code == 1) {
              const result = response.date
              _this.$message({
                type: 'success',
                message: '上传成功'
              });
              _this.beforeClose()
              _this.uploadImgUrl = result
              _this.$emit('uploadSuccess', result)
            }
          }).catch(res => {
            console.log(res + '----error');
          })
        })
      }
    },
    computed: {
      ...mapState({
        isPc: state => state.baseStates.isPc
      })
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.uploadBox.style.width = this.width ? this.width : "180px"
        this.$refs.uploadBox.style.height = this.height ? this.height : "110px"
        //console.log(this.initImg);
        if (this.initImg) {
          this.uploadImgUrl = this.initImg
        }
      })
    },
    props: ['width', 'height', 'initImg'],
    components: {
      VueCropper
    }
  }
</script>

<style lang="scss" scoped type="text/scss">
  .upload-box {
    position: relative;
    display: inline-block;
    border: 1px solid #dcdfe6;
    cursor: pointer;
    min-height: 110px;
    user-select: none;
    position: relative;
    .base-content {
      height: 100%;
      text-align: center;
      i {
        font-size: 30px;
        padding: 25px 0 15px 0;
      }
      p {
        color: #409EFF;
        font-size: 12px;
      }
    }
    .uploadImg-back {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 30;
      }
      .lighrGray-box {
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        display: none;
        position: relative;
        z-index: 50;
        i {
          font-size: 30px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-15px) translateY(-15px);
          color: white;
        }
      }
    }
  }
  .uploadImg-box {
    height: 300px;
    > div {
      height: 100%;
    }
    .step-one {
      background-color: #ededed;
      position: relative;
      .base-content {
        height: 100%;
        text-align: center;
        i {
          font-size: 60px;
          font-weight: 600;
          padding: 50px 0 45px 0;
        }
        p {
          color: #409EFF;
          font-size: 18px;
        }
      }
      .upload-file-btn {
        cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
  }
  .el-dialog__wrapper {
    z-index: 100005 !important;
  }
</style>
