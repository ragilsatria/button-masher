import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    socket: null,
    rooms: []
  },
  mutations: {
    createUser(state, payload) {
      state.users.push(payload);
      router.push({path: '/rooms'});
    },
    SET_SOCKET(state, payload) {
      state.socket = payload;
    },
    SET_ROOMS(state, payload){
      state.rooms = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
