export default {
  async loadAllMatches(context, payload) {
    const baseurl = payload.baseurl;
    // const page = payload.page;
    // const hasNext = payload.hasNext;

    // if (hasNext) {
    const response = await fetch(baseurl + "/api/match/viewMatches?page=1", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const responseData = await response.json();
    if (response.status == 200) {
      const matches = [];

      // const hasNext = responseData.has_next;

      for (let i = 0; i < responseData.matches.length; i++) {
        const match = {
          id: responseData.matches[i]._id,
          homeTeam: responseData.matches[i].homeTeam,
          awayTeam: responseData.matches[i].awayTeam,
          venue: responseData.matches[i].venue,
          dateTime: responseData.matches[i].dateTime,
          mainReferee: responseData.matches[i].mainReferee,
          firstLinesman: responseData.matches[i].firstLinesman,
          secondLinesman: responseData.matches[i].secondLinesman,
          ticketPrice: responseData.matches[i].ticketPrice,
          seats: responseData.matches[i].seats,
        };
        matches.push(match);
      }
      context.commit("setMatches", matches);
      // context.commit("setHasNext", hasNext);
      // context.commit("setPage", page + 1);
    }

    if (!response.ok) {
      const error = new Error(responseData.error);
      throw error;
    }
    // }
  },

  async addMatch(context, payload) {
    const baseurl = payload.baseurl;

    const match = {
      homeTeam: payload.homeTeam,
      awayTeam: payload.awayTeam,
      venue: payload.venue,
      dateTime: payload.dateTime,
      mainReferee: payload.mainReferee,
      firstLinesman: payload.firstLinesman,
      secondLinesman: payload.secondLinesman,
      ticketPrice: payload.ticketPrice,
    };

    const response = await fetch(baseurl + "/api/match/createMatch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(match),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.err || responseData.msg);
      throw error;
    }
  },

  async loadAllStaduims(context, payload) {
    const baseurl = payload.baseurl;

    const response = await fetch(baseurl + "/api/stadium/getStadiums", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const responseData = await response.json();

    if (response.status == 200) {
      const staduims = [];

      for (let i = 0; i < responseData.length; i++) {
        const staduim = {
          id: responseData[i]._id,
          name: responseData[i].name,
          city: responseData[i].city,
          address: responseData[i].address,
          rows: responseData[i].rows,
          rowSeats: responseData[i].rowSeats,
        };
        staduims.push(staduim);
      }
      context.commit("setStaduims", staduims);
    }

    if (!response.ok) {
      const error = new Error(responseData.error);
      throw error;
    }
  },

  async addStaduim(context, payload) {
    const baseurl = payload.baseurl;

    const staduim = {
      name: payload.name,
      city: payload.city,
      address: payload.address,
      rows: payload.rows,
      rowSeats: payload.rowSeats,
    };

    const response = await fetch(baseurl + "/api/stadium/createStadium", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(staduim),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.err || responseData.msg);
      throw error;
    }
  },

  async reserveSeat(context, payload) {
    const baseurl = payload.baseurl;

    const details = {
      matchId: payload.matchId,
      seatNumber: payload.seatNumber,
      userName: payload.userName,
    };

    const response = await fetch(baseurl + "/api/ticket/reserveTicket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(details),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.error || responseData.msg);
      throw error;
    }
  },
};
