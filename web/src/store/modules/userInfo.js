import axios from 'axios'
import commonBase from './../../common/index'
const common = new commonBase()

const userInfo = {
  state: {

  },
  mutations: {

  },
  actions: {
    login({commit}, param) {
      axios.post('/apis/api/status/login', param).then(res => {
        if (res.code == 1) {
          console.log(res);
          localStorage.setItem("sessionId", res.date.sessionId)
          localStorage.setItem("userInfo", JSON.stringify(res.date.userInfo))
          common.shoeMessege('success', "登录成功，welcome " + param.username)
          commit("changeLoginModel", false)
        }else {
          localStorage.setItem("sessionId", "")
        }
      })
    },
    layout({commit}, param) {
      axios.post('/apis/api/status/layout', param).then(res => {
        if (res.code == 1) {
          localStorage.setItem("sessionId", "")
          localStorage.setItem("userInfo", "")
        }
      })
    }
  }
}

export default userInfo
