import request from '@/api/request'

/* 获取留言列表 */
export function getMessList(param) {
  return request({
    url: '/api/comments/all',
    method: 'POST',
    data: param
  })
}

/* 添加留言 */
export function addMess(param) {
  return request({
    url: '/api/comments/add',
    method: 'POST',
    data: param
  })
}

/* 回复 */
export function addApply(param) {
  return request({
    url: '/api/comments/replyComments',
    method: 'POST',
    data: param
  })
}

/* 点印 */
export function addYin(param) {
  return request({
    url: '/api/comments/addImprint',
    method: 'POST',
    data: param
  })
}
