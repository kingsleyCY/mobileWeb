<template>
  <div>
    <div class="container">
      <el-row>
        <el-col :xs="24" :sm="{span:12,offset:6}">
          <el-form ref="form" :model="form" label-width="80px" size="small" class="form-box">
            <el-form-item label="用户名">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="电子邮件">
              <el-input v-model="form.useremail"></el-input>
            </el-form-item>
            <el-form-item label="个性签名">
              <el-input resize="none" rows="3" type="textarea" v-model="form.personSignature"></el-input>
            </el-form-item>
            <el-form-item label="头像">

            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'self-details',
    data() {
      return {
        form: {
          username: '',
          useremail: '',
          personSignature: '',
        }
      }
    }
  }
</script>

<style lang="scss" scoped type="text/scss">
  .container {
    margin-top: 15px;
    background-color: white;
    padding: 20px 0;
    .form-box {
      /deep/ .el-form-item__content {

      }
    }
  }
</style>
