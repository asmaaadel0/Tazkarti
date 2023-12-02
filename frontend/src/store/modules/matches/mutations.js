export default {
  setMatches(state, payload) {
    state.matches = payload;
  },
  setHasNext(state, payload) {
    state.hasNext = payload;
  },
  setPage(state, payload) {
    state.page = payload;
  },
};
