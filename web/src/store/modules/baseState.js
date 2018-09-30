const baseStates = {
  state: {
    allClient: false,
    isPc: null,
    loginModel: false
  },
  mutations: {
    changeAllClient(state, flag) {
      state.allClient = flag
    },
    changeLoginModel(state, flag) {
      state.loginModel = flag
    },
  },
  actions: {

  }
}

export default baseStates
