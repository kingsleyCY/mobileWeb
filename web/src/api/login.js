import request from '@/api/request'

/* 注册 */
export function register(param) {
  return request({
    url: '/api/users/addUser',
    method: 'POST',
    data: param
  })
}

/* 编辑用户信息 */
export function editUserDetail(id, param) {
  return request({
    url: '/api/users/editUserDetail/' + id,
    method: 'POST',
    data: param
  })
}

/* 注销 */
export function layout() {
  return request({
    url: '/api/status/layout',
    method: 'POST',
  })
}

/* 上传阿里云 */
export function uploadFile(param) {
  return request({
    url: '/api/upload/oss',
    method: 'POST',
    data: param,
    contentType: false,
    processData: false,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}
