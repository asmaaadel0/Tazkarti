import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  state() {
    return {
      user: {},
      done: false,
    };
  },
  mutations,
  actions,
  getters,
};
