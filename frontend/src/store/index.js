import { createStore } from "vuex";
import authModule from "./modules/auth/index.js";
import matchesModule from "./modules/matches/index.js";

const store = createStore({
  modules: {
    auth: authModule,
    matches: matchesModule,
  },
  state() {
    return {
      userName: localStorage.getItem("userName"),
      accessToken: localStorage.getItem("accessToken"),
      role: localStorage.getItem("role"),
    };
  },
  getters: {
    getUserName(state) {
      return state.userName;
    },
    getAccessToken(state) {
      return state.accessToken;
    },
    getRole(state) {
      return state.role;
    },
  },
});

export default store;
