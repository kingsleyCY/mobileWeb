<template>
  <el-dialog
    title="" append-to-body modal-append-to-body
    :visible.sync="loginModel" top="10vh" :show-close="false"
    :width="isPc?'400px':'320px'" @open="openModelMethod"
    :before-close="handleClose">
    <div>
      <el-form ref="form" :model="userForm" :rules="rules"
               label-width="80px" class="form-list">
        <h4>User Registration</h4>
        <el-form-item label="Username：" prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="Email：" prop="useremail">
          <el-input v-model="userForm.useremail"></el-input>
        </el-form-item>
        <el-form-item label="Sex：" prop="sex">
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
        <el-form-item label="Password：" prop="password">
          <el-input v-model="userForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="Confirm_Pass：" prop="confirm_password">
          <el-input v-model="userForm.confirm_password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="Avtor：" prop="avtor">
          <img :src="userForm.avtor" class="selectAvtor">
        </el-form-item>
        <div class="avtor-select-box clearfix">
          <img :src="'/static/avtor/avtor' + (index + 1) + '.jpg'" @click="chooseAvtor(index)"
               v-for="(item, index) in 18" :key="index">
        </div>
        <div style="text-align: center;padding-top: 15px">
          <el-button type="primary" @click="submitClick">确认</el-button>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
  import {mapState, mapMutations} from "vuex"

  export default {
    name: "login",
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('password is required'));
        } else if (value.length < 6) {
          callback(new Error('The password is at least 6 bits !'));
        } else {
          if (this.userForm.confirm_password !== '') {
            this.$refs.form.validateField('confirm_password');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('confirm_password is required'));
        } else if (value !== this.userForm.password) {
          callback(new Error('The two input password is inconsistent!'));
        } else {
          callback();
        }
      };
      return {
        userForm: {
          username: '',
          useremail: '',
          sex: '',
          password: '',
          confirm_password: '',
          avtor: '/static/avtor/avtor1.jpg'
        },
        rules: {
          username: [
            {required: true, trigger: 'blur'}
          ],
          useremail: [
            {required: true, trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
          ],
          sex: [
            {required: true, trigger: 'blur'}
          ],
          password: [
            {required: true, validator: validatePass, trigger: 'blur'}
          ],
          confirm_password: [
            {required: true, validator: validatePass2, trigger: 'blur'}
          ],
          avtor: [
            {required: true}
          ]
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
          avtor: '/static/avtor/avtor1.jpg'
        }
      },
      chooseAvtor(index) {
        this.userForm.avtor = "/static/avtor/avtor" + (index + 1) + ".jpg"
      },
      submitClick() {
        this.$nextTick(() => {
          this.$refs['form'].validate((valid) => {
            if (valid) {
              console.log(this.userForm);
              this.$http.post('/apis/api/users/addUser', this.userForm)
                .then(res => {
                  console.log(res);
                })
            }
          });
        })
      },
      ...mapMutations(['changeLoginModel'])
    },
    computed: {
      ...mapState({
        loginModel: state => state.baseStates.loginModel,
        isPc: state => state.baseStates.isPc
      })
    },
    watch: {}
  }
</script>

<style lang="scss" scoped type="text/scss">
  .form-list {
    padding: 0 10px 0 0;
    box-sizing: border-box;
    h4 {
      text-align: center;
      padding-bottom: 30px;
      font-size: 20px;
    }
  }

  .selectAvtor {
    display: inline-block;
    width: 75px;
    height: 75px;
    border-radius: 75px;
  }

  .avtor-select-box {
    img {
      display: inline-block;
      float: left;
      width: 9%;
      margin: 5px 1%;
      cursor: pointer;
    }
  }

  /deep/ .el-dialog__header {
    height: 0;
    padding: 0px;
  }
</style>
