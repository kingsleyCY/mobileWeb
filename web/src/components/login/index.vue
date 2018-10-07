<template>
  <el-dialog
    title="" append-to-body modal-append-to-body
    :visible.sync="loginModel" top="10vh" :show-close="false"
    :width="isPc?'410px':'320px'" @open="openModelMethod"
    :before-close="handleClose">
    <div style="transition: all .5s">
      <div v-if="step == 'login'">
        <el-form ref="loginForms" :model="loginForm" :rules="rulesLogin"
                 label-width="80px" class="form-list">
          <h4>Login</h4>
          <el-form-item label="Username：" prop="usernames">
            <el-input v-model="loginForm.usernames"></el-input>
          </el-form-item>
          <el-form-item label="Password：" prop="passwords">
            <el-input type="password" v-model="loginForm.passwords"></el-input>
          </el-form-item>
          <div class="login-btn-box">
            <div>
              <el-button type="text" @click="toRegist">注册账号</el-button> /
              <el-button type="text" @click="toinit" style="margin: 0">重置密码</el-button>
            </div>
            <div>
              <el-button @click="handleClose">取消</el-button>
              <el-button type="primary" @click="submitLogin">确认</el-button>
            </div>
          </div>
        </el-form>
      </div>
      <div v-if="step == 'regist'">
        <el-form ref="form" :model="userForm" :rules="rules"
                 label-width="90px" class="form-list">
          <h4>Registered Account</h4>
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
          <el-form-item label="Avtor：" prop="avtor" style="margin-bottom: 0px;padding-top: 10px">
            <img :src="userForm.avtor" class="selectAvtor">
          </el-form-item>
          <div class="avtor-select-box clearfix">
            <img :src="'/static/avtor/avtor' + (index + 1) + '.jpg'" @click="chooseAvtor(index)"
                 v-for="(item, index) in 18" :key="index">
          </div>
          <div style="text-align: center;padding-top: 15px">
            <el-button @click="handleClose">取消</el-button>
            <el-button type="primary" @click="submitClick">确认</el-button>
          </div>
        </el-form>
      </div>
      <div v-if="step == 'initpass'">
        不着急
      </div>
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
        step: "login",
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
            {required: true, trigger: 'blur'},
            { min: 6, message: 'The minimum user name is 6.', trigger: 'blur' }
          ],
          useremail: [
            {required: true, trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
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
        },
        loginForm: {
          usernames: '',
          passwords: '',
        },
        rulesLogin: {
          usernames: [
            {required: true, trigger: 'blur'}
          ],
          passwords: [
            {required: true, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleClose() {
        /*
        * this.$refs.form.clearValidate()
        * this.$refs.loginForms.clearValidate()
        * */
        if (this.$refs.form) {
          this.$refs.form.clearValidate()
        } else if (this.$refs.loginForms) {
          this.$refs.loginForms.clearValidate()
        }
        this.changeLoginModel(false)
      },
      openModelMethod() {
        // console.log(1);
        this.step = 'login'
        this.loginForm = {
          usernames: '',
          passwords: '',
        }
      },
      toRegist() {
        this.$refs.loginForms.clearValidate()
        setTimeout(function () {
          this.step = 'regist'
          this.userForm = {
            username: '',
            useremail: '',
            sex: '',
            password: '',
            confirm_password: '',
            avtor: '/static/avtor/avtor18.jpg'
          }
          this.$nextTick(() => {
            this.$refs.form.clearValidate()
          })
        }.bind(this), 500)
      },
      toinit() {
        this.$refs.loginForms.clearValidate()
        setTimeout(function () {
          this.step = 'initpass'
          this.$nextTick(() => {

          })
        }.bind(this), 500)
      },
      /* 选择头像 */
      chooseAvtor(index) {
        this.userForm.avtor = "/static/avtor/avtor" + (index + 1) + ".jpg"
      },
      /* 注册请求提交 */
      submitClick() {
        this.$nextTick(() => {
          this.$refs['form'].validate((valid) => {
            if (valid) {
              this.$http.post('/apis/api/users/addUser', this.userForm)
                .then(res => {
                  // console.log(res);
                  if (res.code == 1) {
                    // this.$message.success("注册成功")
                    let param = {
                      username: this.userForm.username,
                      password: this.userForm.password,
                    }
                    this.$store.dispatch('login', param, function (result) {
                      // console.log(result);
                      this.$messchangeLoginModelage.success(
                        "注册成功, 已自动登录，welcome " + res.date.username
                      )
                      this.changeLoginModel(false)
                    })
                  }
                })
            }
          });
        })
      },
      /* 登录提交 */
      submitLogin() {
        let param = {
          username: this.loginForm.usernames,
          password: this.loginForm.passwords,
        }
        this.$store.dispatch('login', param, function (result) {
          // console.log(result);
          this.$message.success("登陆成功，welcome ")
          this.changeLoginModel(false)
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
    padding: 0 !important;
    box-sizing: border-box;
    h4 {
      text-align: center;
      padding-bottom: 30px;
      font-size: 20px;
    }
    /deep/ .el-form-item {
      padding-right: 15px;
      box-sizing: border-box;
    }
    .login-btn-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: center;padding-top: 15px;
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
