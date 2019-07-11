import request from '../../api/request'

const baseStates = {
  state: {
    allClient: false,
    isPc: null,
    loginModel: false,
    loginCodeModel: false,
    loginCodeObj: {},
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
      state.loginCodeModel = args.modelFlag ? args.modelFlag : false
      state.loginCodeObj = args.loginCodeObj ? args.loginCodeObj : {}
    },
    changeUserModel(state, flag) {
      state.userModel = flag
    }
  },
  actions: {
    getAssesionToken: function ({ commit }, param) {
      // console.log('---');
      return new Promise((resolve, reject) => {
        request.post('/api/wx/getAccessToken', param).then(res => {
          resolve(res)
        }).then(res => {
          reject(res)
        })
      })
    }
  }
}
export default baseStates
