'use strict'
/* 正式环境 */
console.log(process.env.npm_lifecycle_event);
var BASE_API, /* 请求数据URL */
  STATICS_API, /* 静态资源URL */
  BASE_URL; /* 页面访问路径 */
if (process.env.npm_lifecycle_event == 'cbuild') { /*dev*/
  BASE_API = '"https://dev.lionynn.cn"'
  STATICS_API = '"https://dev.lionynn.cn"'
  BASE_URL = 'http://dev.lioncc.cn'
} else if (process.env.npm_lifecycle_event == 'build') { /*master*/
  BASE_API = '"https://lionynn.cn"'
  STATICS_API = '"https://lionynn.cn"'
  BASE_URL = 'http://lioncc.cn'
}
module.exports = {
  NODE_ENV: '"production"',
  BASE_API: BASE_API,
  STATICS_API: STATICS_API,
  BASE_URL: BASE_URL
}
