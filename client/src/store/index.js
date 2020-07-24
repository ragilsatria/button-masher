import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    count: 0,
    timer: 5000,
    disabled: false,
    socket: null,
    rooms: []
  },
  mutations: {
    createUser(state, payload) {
      state.users.push(payload);
      router.push({ path: '/rooms' });
    },
    ADD_COUNT(state, payload) {
      // state.timer = 10000
      state.count++
    },
    STOP_COUNT(state, payload) {
      state.disabled = true
    },
    SET_SOCKET(state, payload) {
      state.socket = payload;
    },
    SET_ROOMS(state, payload) {
      state.rooms = payload;
    },
  },
  actions: {
  },
  modules: {
  }
})
