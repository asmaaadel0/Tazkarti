export default {
  setUser(state, payload) {
    state.userName = payload.userName;
    state.accessToken = payload.accessToken;
    state.role = payload;
  },
};
