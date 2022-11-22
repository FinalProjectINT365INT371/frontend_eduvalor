import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: null,
    token: null,
    loginStatus:false
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    setLoginStatus(state, loginStatus) {
      state.loginStatus= loginStatus;
    },
  },
  actions: {},
  getters: {
    getUserData(state) {
      return state;
    },
  },
});