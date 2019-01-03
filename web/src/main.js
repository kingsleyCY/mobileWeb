// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible'

const $ = require("jquery") // 分离打包
import Share from 'vue-social-share'
import ElementUI from 'element-ui';
import '@/style/index.scss'
import store from './store'
import commonBase from './common/index'
import VueSocketIO from 'vue-socket.io';

require("../static/comment/js/main")
require("../static/comment/js/sinaFaceAndEffec")
Vue.config.productionTip = false
Vue.prototype.common = new commonBase()
Vue.use(Share)
Vue.use(ElementUI);
Vue.use(new VueSocketIO({
  debug: true,
  // connection: 'http://192.168.1.118:8806'
  connection: 'http://139.196.127.127:8806'
}))
if (process.env.BASE_API) {
  /*axios.defaults.baseURL = process.env.BASE_API;*/
  Vue.prototype.BASE_URL = process.env.BASE_API;
} else {
  Vue.prototype.BASE_URL = process.env.STATICS_API;
}
router.beforeEach((to, from, next) => {
  let fullPath = []
  let isPc
  if (!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    isPc = true
    store.state.baseStates.isPc = true
  } else {
    store.state.baseStates.isPc = false
  }
  if (document.body.clientWidth < 768) {
    store.state.baseStates.xsScreen = true
  } else {
    store.state.baseStates.xsScreen = false
  }
  if (fullPath.indexOf(to.fullPath) >= 0 && isPc) {
    store.state.baseStates.allClient = true
  } else {
    store.state.baseStates.allClient = false
  }
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
