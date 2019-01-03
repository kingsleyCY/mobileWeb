import request from '@/api/request'

/* 获取基本配置参数 */
export function getBaseText(param) {
  return request({
    url: '/apis/api/status/baseText',
    method: 'POST',
    data: param
  })
}

/* 文章列表数据 */
export function articleList(param) {
  return request({
    url: '/apis/api/article/all',
    method: 'GET',
    params: param
  })
}

/* 文章详情 */
export function articleDeatil(param) {
  return request({
    url: '/apis/api/article/findOne',
    method: 'POST',
    data: param
  })
}

/* 添加文章 */
export function addArticle(param) {
  return request({
    url: '/apis/api/article/addArticle',
    method: 'POST',
    data: param
  })
}

/* 编辑文章 */
export function editArticle(param) {
  return request({
    url: '/apis/api/article/updateArticle',
    method: 'POST',
    data: param
  })
}
