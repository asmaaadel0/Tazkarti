import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  state() {
    return {
      matches: [],
      staduims: [],
      hasNext: true,
      page: 1,
    };
  },
  mutations,
  actions,
  getters,
};
