import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      nickname: '',
      permission: 0,
      avatar: null,
      sex: null,
      introduction: null
    },
    isLogined: false
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      state.isLogined = true
    },
    clearUser (state) {
      state.user = {
        nickname: '',
        permission: 0,
        avatar: null,
        sex: null,
        introduction: null
      }
      state.isLogined = false
      localStorage.removeItem('websiteToken')
    }
  },
  actions: {
  },
  modules: {
  }
})
