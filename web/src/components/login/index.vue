<template>
  <el-dialog
    :custom-class="screenWidth<768?'xs-screen':''"
    title="" append-to-body modal-append-to-body
    :visible.sync="loginModel" top="10vh" :show-close="false"
    @open="openModelMethod" :before-close="handleClose">
    <div class="clearfix">
      <!--PC-->
      <div class="cont_centrar clearfix" v-if="screenWidth>768">
        <div class="cont_login clearfix">
          <div class="cont_info_log_sign_up">
            <div class="col_md_login">
              <div class="cont_ba_opcitiy">
                <h2>LOGIN</h2>
                <p>You need more time to work hard.</p>
                <button class="btn_login" @click="cambiar_login">LOGIN</button>
              </div>
            </div>
            <div class="col_md_sign_up">
              <div class="cont_ba_opcitiy">
                <h2>SIGN UP</h2>
                <p>Not all efforts will be rewarding.</p>
                <button class="btn_sign_up" @click="cambiar_sign_up">SIGN UP</button>
              </div>
            </div>
          </div>
          <div class="cont_back_info">
            <div class="cont_img_back_grey"><img :src="poJpg" alt=""/></div>
          </div>
          <div class="cont_forms">
            <div class="cont_img_back_"><img :src="poJpg" alt=""/></div>
            <div ref="contFormLogin" class="cont_form_login">
              <a href="#" @click="ocultar_login_sign_up"><i class="el-icon-back"></i></a>
              <h2>LOGIN</h2>
              <el-form ref="loginForms" :model="loginForm" :rules="rulesLogin"
                       label-width="0" class="form-list">
                <el-form-item label="" prop="usernames">
                  <el-input v-model.trim="loginForm.usernames" placeholder="Username"></el-input>
                </el-form-item>
                <el-form-item label="" prop="passwords">
                  <el-input type="password" v-model.trim="loginForm.passwords" placeholder="Password"></el-input>
                </el-form-item>
              </el-form>
              <button class="btn_login" @click="submitLogin" v-loading="btnLoading">LOGIN</button>
              <img src="http://lioncc.oss-cn-beijing.aliyuncs.com/ui/webqr.png" class="qucik-login" @click="qrLogin">
            </div>
            <div ref="contFormSign" class="cont_form_sign_up">
              <a href="#" @click="ocultar_login_sign_up"><i class="el-icon-back"></i></a>
              <h2>SIGN UP</h2>
              <el-form ref="form" :model="userForm" :rules="rules"
                       label-width="0" class="form-list" size="small">
                <el-form-item label="" prop="username">
                  <el-input v-model="userForm.username" placeholder="Username"></el-input>
                </el-form-item>
                <el-form-item label="" prop="useremail">
                  <el-input v-model.trim="userForm.useremail" placeholder="Useremail"></el-input>
                </el-form-item>
                <el-form-item label="" prop="sex">
                  <el-radio-group v-model="userForm.sex">
                    <el-radio label="1">
                      <svg class="iconfont" aria-hidden="true">
                        <use xlink:href="#icon-nvsheng-copy"></use>
                      </svg>
                    </el-radio>
                    <el-radio label="2">
                      <svg class="iconfont" aria-hidden="true">
                        <use xlink:href="#icon-nansheng-copy"></use>
                      </svg>
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="" prop="password">
                  <el-input v-model.trim="userForm.password" type="password" placeholder="Password"></el-input>
                </el-form-item>
                <el-form-item label="" prop="confirm_password">
                  <el-input v-model.trim="userForm.confirm_password" type="password"
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
              <button class="btn_sign_up" @click="submitClick" v-loading="btnLoading">SIGN UP</button>
            </div>
          </div>
        </div>
      </div>
      <!--移动端-->
      <div class="xs-screen" v-else>
        <div class="cont_forms"
             ref="contForms">
          <div class="cont_img_back_"><img :src="poJpg" alt=""/></div>
          <div ref="contLogin" class="cont_form_login">
            <a href="#" @click="handleClose"><i class="el-icon-close"></i></a>
            <h2>LOGIN</h2>
            <el-form ref="loginForms" :model="loginForm" :rules="rulesLogin"
                     label-width="0" class="form-list">
              <el-form-item label="" prop="usernames">
                <el-input v-model="loginForm.usernames" placeholder="Username"></el-input>
              </el-form-item>
              <el-form-item label="" prop="passwords">
                <el-input type="password" v-model="loginForm.passwords" placeholder="Password"></el-input>
              </el-form-item>
            </el-form>
            <button class="btn_login" @click="submitLogin">LOGIN</button>
            <div class="go-sign" @click="mobileToSign">
              <svg class="iconfont" aria-hidden="true">
                <use xlink:href="#icon-Hdonghua-xiangzuofeiru"></use>
              </svg>
              <span>点击注册</span>
            </div>
          </div>
          <div ref="contSign" class="cont_form_sign_up">
            <a href="#" @click="mobileToLogin"><i class="el-icon-close"></i></a>
            <h2>SIGN UP</h2>
            <el-form ref="form" :model="userForm" :rules="rules"
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
            <button class="btn_sign_up" @click="submitClick">SIGN UP</button>
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
      var validateName = (rule, value, callback) => {
        if(/^[a-zA-Z0-9_]{1,}$/.test(value)) {
          callback();
        }else {
          callback(new Error('用户名只允许大小字母及数字'));
        }
      };
      let coefficient = 1
      return {
        poJpg,
        screenWidth: document.body.clientWidth, // 屏幕尺寸
        btnLoading: false,
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
            { required: true, trigger: 'blur' },
            { min: 6, message: 'The minimum user name is 6.', trigger: 'blur' },
            { max: 20, message: 'The maximum user name is 20.', trigger: 'blur' },
            { required: true, validator: validateName, trigger: 'blur' }
          ],
          useremail: [
            { required: true, trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
          ],
          sex: [
            { required: true, trigger: 'blur' }
          ],
          password: [
            { required: true, validator: validatePass, trigger: 'blur' }
          ],
          confirm_password: [
            { required: true, validator: validatePass2, trigger: 'blur' }
          ],
          avtor: [
            { required: true }
          ]
        },
        loginForm: {
          usernames: '',
          passwords: '',
        },
        rulesLogin: {
          usernames: [
            { required: true, trigger: 'blur' }
          ],
          passwords: [
            { required: true, trigger: 'blur' }
          ]
        },
        contForms: null,
        touchData: {
          startX: 0,
          startY: 0,
          movingX: 0,
          movingY: 0,
          differX: 0,
          differY: 0,
          coefficient: coefficient,
          criticalAngle: 45 / coefficient,
          isLogin: true,
        }
      }
    },
    methods: {
      handleClose() {
        if (this.$refs.form) {
          this.$refs.form.clearValidate()
        } else if (this.$refs.loginForms) {
          this.$refs.loginForms.clearValidate()
        }
        this.initLogin()
        this.initSign()
        this.changeLoginModel(false)
      },
      openModelMethod() {
        this.$nextTick(() => {
          if (this.screenWidth > 768) {
            this.ocultar_login_sign_up()
          } else {
            this.contForms = this.$refs.contForms
            this.touchData.isLogin = true
            this.mobileToLogin()
          }
        })
      },
      /* 选择头像 */
      chooseAvtor(index) {
        this.userForm.avtor = "/static/avtor/avtor" + (index + 1) + ".jpg"
      },
      /* 注册请求提交 */
      submitClick() {
        let that = this
        this.$nextTick(() => {
          this.$refs['form'].validate((valid) => {
            if (valid) {
              this.$http.post('/apis/api/users/addUser', this.userForm).then(res => {
                if (res.code == 1) {
                  let param = {
                    username: that.userForm.username,
                    password: that.userForm.password,
                  }
                  that.btnLoading = true
                  that.sockets.subscribe(param.username, (data) => {
                    that.submitLogin()
                  });
                  that.$store.dispatch('login', param).then(function (result) {
                    that.btnLoading = false
                    if (result.code == 10001) {
                      /* 请求绑定微信二维码图片 */
                      console.log(param);
                      that.$store.dispatch('getAssesionToken', param).then(result => {
                        if (result.code == 1) {
                          that.changeLoginCodeModel({
                            modelFlag: true,
                            img: result.date + '?' + Math.random()
                          })
                        }
                      })
                    }
                  })
                }
              })
            }
          });
        })
      },
      /* 登录提交 */
      submitLogin() {
        let that = this
        this.$nextTick(() => {
          this.$refs['loginForms'].validate((valid) => {
            if (valid) {
              let param = {
                username: this.loginForm.usernames,
                password: this.loginForm.passwords,
              }
              that.btnLoading = true
              that.$store.dispatch('login', param).then(function (res) {
                that.btnLoading = false
                if (res.code == 10001) {
                  /* 请求绑定微信二维码图片 */
                  that.sockets.subscribe(param.username, (data) => {
                    that.submitLogin()
                  });
                  that.$store.dispatch('getAssesionToken', param).then(result => {
                    if (result.code == 1) {
                      that.changeLoginCodeModel({
                        modelFlag: true,
                        img: result.date + '?' + Math.random()
                      })
                    }
                  })
                }
              }, function (res) {
                console.log(res);
                that.btnLoading = false
              })
            }
          });
        })
      },
      /* 扫码登录 */
      qrLogin() {

      },
      /* 动画JS */
      cambiar_login() {
        this.initLogin()
        this.$refs.loginForms.clearValidate()
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
        this.initSign()
        this.$refs.form.clearValidate()
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
      /* 初始化表单 */
      initLogin() {
        this.loginForm = {
          usernames: '',
          passwords: '',
        }
      },
      initSign() {
        this.userForm = {
          username: '',
          useremail: '',
          sex: '',
          password: '',
          confirm_password: '',
          avtor: '/static/avtor/avtor1.jpg'
        }
      },
      /* 移动端ToLogin/ToSign */
      mobileToLogin() {
        this.$refs.loginForms.clearValidate()
        this.contForms.style.transform = 'rotateY(0deg)'
        this.$refs.contLogin.style.zIndex = 2
        this.$refs.contLogin.style.opacity = 1
        this.$refs.contSign.style.zIndex = 1
        this.$refs.contSign.style.opacity = 0
        this.$refs.contForms.style.height = '350px'
      },
      mobileToSign() {
        this.$refs.form.clearValidate()
        this.contForms.style.transform = 'rotateY(-180deg)'
        this.$refs.contLogin.style.zIndex = 1
        this.$refs.contLogin.style.opacity = 0
        this.$refs.contSign.style.zIndex = 2
        this.$refs.contSign.style.opacity = 1
        this.$refs.contForms.style.height = '550px'
      },
      ...mapMutations(['changeLoginModel', 'changeLoginCodeModel'])
    },
    computed: {
      ...mapState({
        loginModel: state => state.baseStates.loginModel,
        isPc: state => state.baseStates.isPc
      })
    }
  }
</script>

<style lang="scss" scoped type="text/scss">
  @import "../../style/login";
  /deep/ .el-dialog {
    background-color: transparent;
    box-shadow: none;
    width: 640px;
    .el-dialog__header {
      padding: 0;
    }
    .el-dialog__body {
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
          padding-top: 0;
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
    &.xs-screen {
      width: 80%;
    }
  }
</style>
