import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { getUserInFoAPI } from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '', // 保存token字符串
    userInfo: {} // 保存用户信息
  },
  getters: {
    // nickname: (state) => {
    //   return state.userInfo.nickname
    // }
    nickname: state => state.userInfo.nickname, // 昵称
    username: state => state.userInfo.username, // 用户名
    user_pic: state => state.userInfo.user_pic // 头像
  },
  mutations: {
    // 保存token
    updateToken (state, val) {
      state.token = val
    },
    updateUserInfo (state, val) {
      state.userInfo = val
    }
  },
  actions: {
    async getUserInfoActions (store) {
      const { data: res } = await getUserInFoAPI()
      console.log(res)
      store.commit('updateUserInfo', res.data)
    }
  },
  modules: {
  },
  plugins: [
    createPersistedState() // 注入持久化插件
  ]
})
