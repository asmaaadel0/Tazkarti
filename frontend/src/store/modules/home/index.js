import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  state() {
    return {
      matches: [],
      staduims: [],
      reservations: [],
      hasNext: true,
      page: 1,
      match: {},
    };
  },
  mutations,
  actions,
  getters,
};
