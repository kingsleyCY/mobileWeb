import axios from 'axios'
import commonBase from './../../common/index'
const common = new commonBase()

const userInfo = {
  state: {
    username: null,
    usereamil: null,
    avtor: null,
    sex: null,
    root: null
  },
  mutations: {
    SET_USERINFO: function(state, param) {
      state[param[0]] = param[1]
    }
  },
  actions: {
    login({commit}, param) {
      axios.post('/apis/api/status/login', param).then(res => {
        if (res.code == 1) {
          // console.log(res);
          localStorage.setItem("sessionId", res.date.sessionId)
          localStorage.setItem("userInfo", JSON.stringify(res.date.userInfo))
          /* 登录信息存储在Vuex */
          commit("SET_USERINFO", ["username", res.date.userInfo.username])
          commit("SET_USERINFO", ["useremail", res.date.userInfo.useremail])
          commit("SET_USERINFO", ["avtor", res.date.userInfo.avtor])
          commit("SET_USERINFO", ["sex", res.date.userInfo.sex])
          commit("SET_USERINFO", ["root", res.date.userInfo.root])

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
