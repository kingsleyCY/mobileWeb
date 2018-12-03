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
    SET_USERINFO: function (state, param) {
      state[param[0]] = param[1]
    },
    REMOVE_USERINFO: function (state) {
      state.username = null
      state.usereamil = null
      state.avtor = null
      state.sex = null
      state.root = null
    }
  },
  actions: {
    login({commit}, param) {
      return new Promise((resolve, reject) => {
        axios.post('/apis/api/status/login', param).then(res => {
          if (res.code == 1) {
            // console.log(res);
            localStorage.setItem("sessionid", res.date.sessionid)
            localStorage.setItem("userInfo", JSON.stringify(res.date.userInfo))
            /* 登录信息存储在Vuex */
            commit("SET_USERINFO", ["username", res.date.userInfo.username])
            commit("SET_USERINFO", ["useremail", res.date.userInfo.useremail])
            commit("SET_USERINFO", ["avtor", res.date.userInfo.avtor])
            commit("SET_USERINFO", ["sex", res.date.userInfo.sex])
            commit("SET_USERINFO", ["root", res.date.userInfo.root])
            common.shoeMessege('success', "登录成功，welcome " + param.username)
            commit("changeLoginModel", false)
            commit("changeLoginCodeModel", false)
            resolve(res)
          } else {
            localStorage.setItem("sessionid", "")
            resolve(res)
          }
        }).catch(res => {
          reject(res)
        })
      })
    },
    layout({commit}, param) {
      axios.post('/apis/api/status/layout', param).then(res => {
        if (res.code == 1) {
          localStorage.setItem("sessionid", "")
          localStorage.setItem("userInfo", "")
        }
      })
    },
    clear_session({commit}) {
      localStorage.setItem("sessionid", "")
      localStorage.setItem("userInfo", "")
      commit('REMOVE_USERINFO')
    }
  }
}
export default userInfo
