export default {
  setUser(state, payload) {
    state.userName = payload.userName;
    state.accessToken = payload.accessToken;
  },
  setRole(state, payload) {
    state.role = payload;
  },
};
