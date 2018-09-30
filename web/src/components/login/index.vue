<template>
  <el-dialog
    title="" append-to-body modal-append-to-body
    :visible.sync="loginModel" top="10vh"
    :width="isPc?'320px':'320px'" @open="openModelMethod"
    :before-close="handleClose">
    <div>
      <el-form ref="form" :model="userForm" label-width="80px" class="form-list">
        <h4>User Registration</h4>
        <el-form-item label="Username：">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="Email：">
          <el-input v-model="userForm.useremail"></el-input>
        </el-form-item>
        <el-form-item label="Sex：">
          <el-radio-group v-model="userForm.sex">
            <el-radio label="1">
              <svg class="iconfont" aria-hidden="true">
                <use xlink:href="#icon-nvsheng"></use>
              </svg>
            </el-radio>
            <el-radio label="2">
              <svg class="iconfont" aria-hidden="true">
                <use xlink:href="#icon-nansheng"></use>
              </svg>
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Password：">
          <el-input v-model="userForm.password"></el-input>
        </el-form-item>
        <el-form-item label="Confirm_Pass：">
          <el-input v-model="userForm.confirm_password"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
  import { mapState, mapMutations } from "vuex"
  export default {
    name: "login",
    data() {
      return {
        userForm: {
          username: '',
          useremail: '',
          sex: '',
          password: '',
          confirm_password: '',
        }
      }
    },
    methods: {
      handleClose() {
        // console.log(this.isPc);
        this.changeLoginModel(false)
      },
      openModelMethod() {
        this.userForm = {
          username: '',
            useremail: '',
            sex: '',
            password: '',
            confirm_password: '',
        }
      },
      ...mapMutations(['changeLoginModel'])
    },
    computed: {
      ...mapState({
        loginModel: state => state.baseStates.loginModel,
        isPc: state => state.baseStates.isPc
      })
    },
    watch: {

    }
  }
</script>

<style lang="scss" scoped type="text/scss">
  .form-list{
    padding: 0;
    box-sizing: border-box;
    h4{
      text-align: center;
      padding-bottom: 15px;
      font-size: 20px;
    }
  }
</style>
