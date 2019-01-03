import Vue from 'vue'
//import Vuex from 'vuex'
import baseStates from "./modules/baseState"
import userInfor from "./modules/userInfo"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    baseStates, userInfor
  }
})

export default store
