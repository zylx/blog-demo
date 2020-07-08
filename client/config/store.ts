import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default () => {
  return new Vuex.Store({
    state: {
      user: JSON.parse(localStorage.getItem("user")) || null,
      token: JSON.parse(localStorage.getItem("token")) || ''
    },
    getters: {
      getUser: (state) => state.user,
      getToken: (state) => state.token
    },
    mutations: {
      setUser(state, params) {
        state.user = params.user;
        // 数据持久化
        localStorage.setItem("user", JSON.stringify(params.user));
      },
      setToken(state, params) {
        state.token = params.token;
        localStorage.setItem("token", JSON.stringify(params.token));
      },
      logOut(state) {
        console.log("logOut -> state", state)
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        state.user = null;
        state.token = "";
      }
    }
  });
};
