import axios from 'axios'

const userInfo = {
  state: {

  },
  mutations: {

  },
  actions: {
    login(state, param, callback) {
      axios.post('/apis/api/status/login', param).then(res => {
        if (res.code == 1) {
          localStorage.setItem("sessionId", res.date.sessionId)
          console.log(callback);
          callback && callback(res)
        }else {
          localStorage.setItem("sessionId", "")
        }
      })
    },
    layout(state, param, callback) {
      axios.post('/apis/api/status/layout', param).then(res => {
        if (res.code == 1) {
          localStorage.setItem("sessionId", "")
          callback && callback()
        }
      })
    }
  }
}

export default userInfo
