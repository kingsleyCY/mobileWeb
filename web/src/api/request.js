import axios from 'axios'
import store from "../store";
import { Message } from 'element-ui'

var instance = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 1000
});

instance.interceptors.request.use(config => {
  config.withCredentials = true
  let sessionid = localStorage.getItem("sessionid");
  /* 判断是否存在token，如果存在的话，则每个http header都加上token */
  if (sessionid) {
    config.headers.sessionid = sessionid;
  } else {
    config.headers.sessionid = "";
  }
  return config;
}, err => {
  return Promise.reject(err);
});
instance.interceptors.response.use(function (response) {
  if (response.data.code == 1) { /* 数据获取成功 */
    return response.data
  } else if (response.data.code == 0) {
    return response.data
  } else if (response.data.code == 10000) { /* 数据获取失败 */
    Message({
      message: response.data.mess,
      type: 'warning'
    })
    return response.data
  } else if (response.data.code == 100001) { /*登录过期*/
    Message({
      message: "登录过期，请重新登录",
      type: 'warning'
    })
    store.dispatch('clear_session')
    return response.data
  } else if (response.data.code == 10001) {
    Message({
      message: "您还未绑定微信，请扫码绑定微信",
      type: 'warning'
    })
    return response.data
  }
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default instance
