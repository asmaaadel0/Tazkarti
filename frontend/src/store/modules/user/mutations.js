export default {
  setUser(state, payload) {
    state.user = payload;
  },
  setDone(state, payload) {
    state.done = payload;
  },
  setUsers(state, payload) {
    state.users = payload;
  },
  setUnAuthorizedUsers(state, payload) {
    state.unAuthorizedUsers = payload;
  },
};
