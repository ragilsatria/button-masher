import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    count: 0,
    timer: 10000,
    disabled: false,
  },
  mutations: {
    createUser(state, payload) {
      state.users.push(payload);
      router.push({path: '/'});
    },
    ADD_COUNT(state, payload) {
      state.timer = 10000
      state.count ++
    },
    STOP_COUNT(state,payload) {
      state.disabled = true
    },
  },
  actions: {
  },
  modules: {
  }
})
