// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible'
import $ from 'jquery'
import axios from 'axios'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/display.css';
import 'element-ui/lib/theme-chalk/index.css';
import 'swiper/dist/css/swiper.css';
import '@/style/index.scss'
import store from './store'


Vue.config.productionTip = false
Vue.use(ElementUI);


// axios.defaults.baseURL = process.env.BASE_API;
if(process.env.BASE_API) {
  axios.defaults.baseURL = process.env.BASE_API;
}
axios.interceptors.response.use(function (response) {
  if(response.data.code == 1) {
    return response.data.date
  }else {
    ElementUI.Message({
      message: response.data.mess,
      type: 'warning'
    })
  }
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})
Vue.prototype.$http = axios


router.beforeEach((to, from, next) => {
  // let fullPath = ['/forOurs', '/myIntroduce']
  let fullPath = []
  if (!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    var isPc = true
  }
  if(fullPath.indexOf(to.fullPath) >= 0 && isPc) {
    store.state.baseStates.allClient = true
  }else {
    store.state.baseStates.allClient = false
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
