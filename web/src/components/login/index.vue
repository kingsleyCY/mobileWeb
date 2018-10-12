<template>
  <el-dialog
    title="" append-to-body modal-append-to-body
    :visible.sync="loginModel" top="10vh" :show-close="false"
    @open="openModelMethod" :before-close="handleClose">
    <div style="position: absolute;width: 100%;height: 100%;">
      <div class="cont_centrar">
        <div class="cont_login">
          <div class="cont_info_log_sign_up">
            <div class="col_md_login">
              <div class="cont_ba_opcitiy">
                <h2>LOGIN</h2>
                <p>Lorem ipsum dolor sit amet, consectetur.</p>
                <button class="btn_login" @click="cambiar_login">LOGIN</button>
              </div>
            </div>
            <div class="col_md_sign_up">
              <div class="cont_ba_opcitiy">
                <h2>SIGN UP</h2>
                <p>Lorem ipsum dolor sit amet, consectetur.</p>
                <button class="btn_sign_up" @click="cambiar_sign_up">SIGN UP</button>
              </div>
            </div>
          </div>
          <div class="cont_back_info">
            <div class="cont_img_back_grey"><img :src="poJpg" alt=""/></div>
          </div>
          <div class="cont_forms">
            <div class="cont_img_back_"><img :src="poJpg" alt=""/></div>
            <div class="cont_form_login">
              <a href="#" @click="ocultar_login_sign_up"><i class="el-icon-back"></i></a>
              <h2>LOGIN</h2>
              <el-form ref="loginForms" :model="loginForm"
                       label-width="0" class="form-list">
                <el-form-item label="" prop="usernames">
                  <el-input v-model="loginForm.usernames" placeholder="Username"></el-input>
                </el-form-item>
                <el-form-item label="" prop="passwords">
                  <el-input type="password" v-model="loginForm.passwords" placeholder="Password"></el-input>
                </el-form-item>
              </el-form>
              <button class="btn_login" @click="cambiar_login">LOGIN</button>
            </div>
            <div class="cont_form_sign_up">
              <a href="#" @click="ocultar_login_sign_up"><i class="el-icon-back"></i></a>
              <h2>SIGN UP</h2>
              <el-form ref="form" :model="userForm"
                       label-width="0" class="form-list" size="small">
                <el-form-item label="" prop="username">
                  <el-input v-model="userForm.username" placeholder="Username"></el-input>
                </el-form-item>
                <el-form-item label="" prop="useremail">
                  <el-input v-model="userForm.useremail" placeholder="Useremail"></el-input>
                </el-form-item>
                <el-form-item label="" prop="sex">
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
                <el-form-item label="" prop="password">
                  <el-input v-model="userForm.password" type="password" placeholder="Password"></el-input>
                </el-form-item>
                <el-form-item label="" prop="confirm_password">
                  <el-input v-model="userForm.confirm_password" type="password"
                            placeholder="Confirm_password"></el-input>
                </el-form-item>
                <el-form-item label="" prop="avtor" style="margin-bottom: 0px;padding-top: 10px">
                  <img :src="userForm.avtor" class="selectAvtor">
                </el-form-item>
                <div class="avtor-select-box clearfix">
                  <img :src="'/static/avtor/avtor' + (index + 1) + '.jpg'" @click="chooseAvtor(index)"
                       v-for="(item, index) in 18" :key="index">
                </div>
              </el-form>
              <button class="btn_sign_up" @click="cambiar_sign_up">SIGN UP</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  import poJpg from "@/assets/images/po.jpg"
  import { mapState, mapMutations } from "vuex"

  export default {
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
        poJpg,
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
            {min: 6, message: 'The minimum user name is 6.', trigger: 'blur'}
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
        this.$nextTick(() => {
          this.$refs['loginForms'].validate((valid) => {
            if (valid) {
              let param = {
                username: this.loginForm.usernames,
                password: this.loginForm.passwords,
              }
              this.$store.dispatch('login', param, function (result) {
                // console.log(result);
                this.$message.success("登陆成功，welcome ")
                this.changeLoginModel(false)
              })
            }
          });
        })
      },
      /* 动画JS */
      cambiar_login() {
        this.loginForm = {
          usernames: '',
          passwords: '',
        }
        document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login";
        document.querySelector('.cont_form_login').style.display = "block";
        document.querySelector('.cont_form_sign_up').style.opacity = "0";
        setTimeout(function () {
          document.querySelector('.cont_form_login').style.opacity = "1";
        }, 400);
        setTimeout(function () {
          document.querySelector('.cont_form_sign_up').style.display = "none";
        }, 200);
      },
      cambiar_sign_up(at) {
        this.userForm = {
          username: '',
          useremail: '',
          sex: '',
          password: '',
          confirm_password: '',
          avtor: '/static/avtor/avtor1.jpg'
        }
        document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_sign_up";
        document.querySelector('.cont_form_sign_up').style.display = "block";
        document.querySelector('.cont_form_login').style.opacity = "0";
        setTimeout(function () {
          document.querySelector('.cont_form_sign_up').style.opacity = "1";
        }, 100);
        setTimeout(function () {
          document.querySelector('.cont_form_login').style.display = "none";
        }, 400);
      },
      ocultar_login_sign_up() {
        document.querySelector('.cont_forms').className = "cont_forms";
        document.querySelector('.cont_form_sign_up').style.opacity = "0";
        document.querySelector('.cont_form_login').style.opacity = "0";
        setTimeout(function () {
          document.querySelector('.cont_form_sign_up').style.display = "none";
          document.querySelector('.cont_form_login').style.display = "none";
        }, 500);
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
  /deep/ .el-dialog__header {
    padding: 0;
  }
  /deep/ .el-dialog__body {
    padding: 0;
    .el-form-item {
      margin-bottom: 15px;
      .el-input__inner {
        width: 200px;
        background-color: rgba(235, 235, 219, 0.38);
        border-color: white;
        text-align: center;
        outline: none;
        transition: all 0.5s;
        &:focus {
          border-color: white;
          width: 220px;
          background-color: white;
        }
      }
      .el-form-item__error {
        left: 20%;
      }
      .selectAvtor {
        display: inline-block;
        width: 75px;
        height: 75px;
        border-radius: 75px;
      }
    }
    .avtor-select-box {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
      img {
        width: 9%;
        height: auto;
        margin: 5px 1%;
        cursor: pointer;
        border-radius: 75px;
      }
    }
  }
  * {
    margin: 0px auto;
    padding: 0px;
    text-align: center;
    font-family: 'Lato', sans-serif;
  }
  .cont_centrar {
    position: relative;
    float: left;
    width: 100%;

  }
  .cont_login {
    position: relative;
    width: 640px;
    left: 50%;
    margin-left: -320px;

  }
  .cont_back_info {
    position: relative;
    float: left;
    width: 640px;
    height: 280px;
    overflow: hidden;
    background-color: #fff;
    margin-top: 100px;
    box-shadow: 1px 10px 30px -10px rgba(0, 0, 0, 0.5);
  }
  .cont_forms {
    position: absolute;
    overflow: hidden;
    top: 100px;
    left: 0px;
    width: 320px;
    height: 280px;
    background-color: #eee;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
  }
  .cont_forms_active_login {
    box-shadow: 1px 10px 30px -10px rgba(0, 0, 0, 0.5);
    height: 420px;
    top: 20px;
    left: 0px;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;

  }
  .cont_forms_active_sign_up {
    box-shadow: 1px 10px 30px -10px rgba(0, 0, 0, 0.5);
    height: 550px;
    top: 20px;
    left: 320px;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
  }
  .cont_img_back_grey {
    position: absolute;
    width: 950px;
    top: -80px;
    left: -116px;
  }
  .cont_img_back_grey > img {
    width: 100%;
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
    opacity: 0.2;
    animation-name: animar_fondo;
    animation-duration: 20s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: alternate;

  }
  .cont_img_back_ {
    position: absolute;
    width: 950px;
    top: -80px;
    left: -116px;
  }
  .cont_img_back_ > img {
    width: 100%;
    opacity: 0.3;
    animation-name: animar_fondo;
    animation-duration: 20s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
  .cont_forms_active_login > .cont_img_back_ {
    top: 0px;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
  }
  .cont_forms_active_sign_up > .cont_img_back_ {
    top: 0px;
    left: -435px;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
  }
  .cont_info_log_sign_up {
    position: absolute;
    width: 640px;
    height: 280px;
    top: 100px;
    z-index: 1;
  }
  .col_md_login {
    position: relative;
    float: left;
    width: 50%;
  }
  .col_md_login > h2 {
    font-weight: 400;
    margin-top: 70px;
    color: #757575;
  }
  .col_md_login > p {
    font-weight: 400;
    margin-top: 15px;
    width: 80%;
    color: #37474F;
  }
  .btn_login {
    background-color: #FF9800;
    border: none;
    padding: 10px;
    width: 200px;
    border-radius: 3px;
    box-shadow: 1px 5px 20px -5px rgba(0, 0, 0, 0.4);
    color: #fff;
    margin-top: 10px;
    cursor: pointer;
  }
  .col_md_sign_up {
    position: relative;
    float: left;
    width: 50%;
  }
  .cont_ba_opcitiy > h2 {
    font-weight: 400;
    color: #fff;
  }
  .cont_ba_opcitiy > p {
    font-weight: 400;
    margin-top: 15px;
    color: #fff;
  }
  /* ----------------------------------
  background text
  ------------------------------------
   */
  .cont_ba_opcitiy {
    position: relative;
    background-color: rgba(187, 168, 170, 0.79);
    width: 80%;
    border-radius: 3px;
    margin-top: 60px;
    padding: 15px 0px;
  }
  .btn_sign_up {
    background-color: #f44336;
    border: none;
    padding: 10px;
    width: 200px;
    border-radius: 3px;
    box-shadow: 1px 5px 20px -5px rgba(0, 0, 0, 0.4);
    color: #fff;
    margin-top: 10px;
    cursor: pointer;
  }
  .cont_forms_active_sign_up {
    z-index: 2;
  }
  @-webkit-keyframes animar_fondo {
    from {
      -webkit-transform: scale(1) translate(0px);
      -moz-transform: scale(1) translate(0px);
      -ms-transform: scale(1) translate(0px);
      -o-transform: scale(1) translate(0px);
      transform: scale(1) translate(0px);
    }
    to {
      -webkit-transform: scale(1.5) translate(50px);
      -moz-transform: scale(1.5) translate(50px);
      -ms-transform: scale(1.5) translate(50px);
      -o-transform: scale(1.5) translate(50px);
      transform: scale(1.5) translate(50px);
    }
  }
  @-o-keyframes identifier {
    from {
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -ms-transform: scale(1);
      -o-transform: scale(1);
      transform: scale(1);
    }
    to {
      -webkit-transform: scale(1.5);
      -moz-transform: scale(1.5);
      -ms-transform: scale(1.5);
      -o-transform: scale(1.5);
      transform: scale(1.5);
    }

  }
  @-moz-keyframes identifier {
    from {
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -ms-transform: scale(1);
      -o-transform: scale(1);
      transform: scale(1);
    }
    to {
      -webkit-transform: scale(1.5);
      -moz-transform: scale(1.5);
      -ms-transform: scale(1.5);
      -o-transform: scale(1.5);
      transform: scale(1.5);
    }

  }
  @keyframes identifier {
    from {
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -ms-transform: scale(1);
      -o-transform: scale(1);
      transform: scale(1);
    }
    to {
      -webkit-transform: scale(1.5);
      -moz-transform: scale(1.5);
      -ms-transform: scale(1.5);
      -o-transform: scale(1.5);
      transform: scale(1.5);
    }
  }
  .cont_form_login {
    position: absolute;
    opacity: 0;
    display: none;
    width: 320px;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
  }
  .cont_forms_active_login {
    z-index: 2;
  }
  .cont_forms_active_login > .cont_form_login {
  }
  .cont_form_sign_up {
    position: absolute;
    width: 320px;
    float: left;
    opacity: 0;
    display: none;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
  }
  .cont_form_sign_up > input {
    text-align: left;
    padding: 15px 5px;
    margin-left: 10px;
    margin-top: 20px;
    width: 260px;
    border: none;
    color: #757575;
  }
  .cont_form_sign_up > h2 {
    margin: 40px 0 10px 0;
    font-weight: 400;
    color: #757575;
  }
  .cont_form_login > input {
    padding: 15px 5px;
    margin-left: 10px;
    margin-top: 20px;
    width: 260px;
    border: none;
    text-align: left;
    color: #757575;
  }
  .cont_form_login > h2 {
    margin: 100px 0 10px 0;
    font-weight: 400;
    color: #757575;
  }
  .cont_form_login > a, .cont_form_sign_up > a {
    color: #757575;
    position: relative;
    float: left;
    margin: 10px;
    margin-left: 30px;
  }
  /* latin-ext */
  @font-face {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v14/S6uyw4BMUTPHjxAwXjeu.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v14/S6uyw4BMUTPHjx4wXg.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* fallback */
  @font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/materialicons/v41/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2) format('woff2');
  }
  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
  }
</style>
