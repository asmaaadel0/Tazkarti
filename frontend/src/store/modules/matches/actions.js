export default {
  async loadAllMatches(context, payload) {
    const baseurl = payload.baseurl;
    const page = payload.page;
    const hasNext = payload.hasNext;

    if (hasNext) {
      const response = await fetch(
        baseurl + "/api/match/viewMatches?page=" + page,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const responseData = await response.json();
      if (response.status == 200) {
        const matches = [];

        const hasNext = responseData.has_next;

        for (let i = 0; i < responseData.matches.length; i++) {
          const match = {
            _id: responseData.matches[i]._id,
            homeTeam: responseData.matches[i].homeTeam,
            awayTeam: responseData.matches[i].awayTeam,
            venue: responseData.matches[i].venue,
            dateTime: responseData.matches[i].dateTime,
            mainReferee: responseData.matches[i].mainReferee,
            firstLinesman: responseData.matches[i].firstLinesman,
            secondLinesman: responseData.matches[i].secondLinesman,
            __v: responseData.matches[i].__v,
          };
          matches.push(match);
        }
        context.commit("setMatches", matches);
        context.commit("setHasNext", hasNext);
        context.commit("setPage", page + 1);
      }

      if (response.status == 400) {
        const error = new Error(responseData.error);
        throw error;
      }
    }
  },
};
