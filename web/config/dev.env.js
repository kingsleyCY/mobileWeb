'use strict'
/* 开发环境 */
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

console.log(process.env.npm_lifecycle_event);
var BASE_API,  /* 请求数据URL */
  STATICS_API,  /* 静态资源URL */
  BASE_URL; /* 页面访问路径 */
if(process.env.npm_lifecycle_event == 'cdev') { /*dev*/
  STATICS_API = '"http://localhost:8804"'
}else if(process.env.npm_lifecycle_event == 'dev') { /*master*/
  STATICS_API = '"http://localhost:8801"'
}
BASE_API = 'null'
BASE_URL = '"http://localhost:8080"'
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: BASE_API,
  STATICS_API: STATICS_API,
  BASE_URL: BASE_URL
})
