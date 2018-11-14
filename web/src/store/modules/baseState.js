import axios from 'axios'

const baseStates = {
  state: {
    allClient: false,
    isPc: null,
    loginModel: false,
    userModel: false,
    xsScreen: null
  },
  mutations: {
    changeAllClient(state, flag) {
      state.allClient = flag
    },
    changeLoginModel(state, flag) {
      state.loginModel = flag
    },
    changeUserModel(state, flag) {
      state.userModel = flag
    }
  },
  actions: {
    getAssesionToken: function () {
      axios.post('/apis/api/wx/getAccessToken').then(res => {

      })
    }
  }
}
export default baseStates
