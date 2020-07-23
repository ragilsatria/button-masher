import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
  },
  mutations: {
    createUser(state, payload) {
      state.users.push(payload);
      router.push({path: '/'});
    },
  },
  actions: {
  },
  modules: {
  }
})
