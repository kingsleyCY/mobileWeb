import axios from 'axios'

const baseStates = {
  state: {
    allClient: false,
    isPc: null,
    loginModel: false,
    loginCodeModel: false,
    loginCodeSrc: '',
    userModel: false,
    xsScreen: null,
    env: process.env
  },
  mutations: {
    changeAllClient(state, flag) {
      state.allClient = flag
    },
    changeLoginModel(state, flag) {
      state.loginModel = flag
    },
    changeLoginCodeModel(state, args) {
      state.loginCodeModel = args.modelFlag?args.modelFlag:false
      state.loginCodeSrc = args.img?args.img:''
    },
    changeUserModel(state, flag) {
      state.userModel = flag
    }
  },
  actions: {
    getAssesionToken: function ({commit}, param) {
      return new Promise((resolve, reject) => {
        axios.post('/apis/api/wx/getAccessToken', param).then(res => {
          resolve(res)
        }).then(res => {
          reject(res)
        })
      })
    }
  }
}
export default baseStates
