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

  async editMatch(context, payload) {
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
    const id = payload.id;

    const response = await fetch(baseurl + "/api/match/editMatch/" + id, {
      method: "PUT",
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
      seatNumbers: payload.seatNumber,
      userName: payload.userName,
    };
    // console.log(details);

    const response = await fetch(baseurl + "/api/ticket/reserveTicket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(details),
    });

    const responseData = await response.json();
    // console.log(responseData);

    if (!response.ok) {
      const error = new Error(responseData.error || responseData.msg);
      throw error;
    }
  },

  async loadAllReservations(context, payload) {
    const baseurl = payload.baseurl;
    const userName = localStorage.getItem("userName");

    const response = await fetch(
      baseurl + "/api/ticket/allTickets/" + userName,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    const responseData = await response.json();

    if (response.status == 200) {
      const reservations = [];

      for (let i = 0; i < responseData.tickets.length; i++) {
        const reservation = {
          id: responseData.tickets[i]._id,
          matchId: responseData.tickets[i].matchId,
          seatNumber: responseData.tickets[i].seatNumber,
          userName: responseData.tickets[i].userName,
          price: responseData.tickets[i].price,
        };
        reservations.push(reservation);
      }
      context.commit("setReservations", reservations);
    }

    if (!response.ok) {
      const error = new Error(responseData.error);
      throw error;
    }
  },

  async loadMatch(context, payload) {
    const baseurl = payload.baseurl;

    const id = payload.id;

    const response = await fetch(baseurl + "/api/match/viewMatch/" + id, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const responseData = await response.json();
    if (response.status == 200) {
      const match = {
        id: responseData._id,
        homeTeam: responseData.homeTeam,
        awayTeam: responseData.awayTeam,
        venue: responseData.venue,
        dateTime: responseData.dateTime,
        mainReferee: responseData.mainReferee,
        firstLinesman: responseData.firstLinesman,
        secondLinesman: responseData.secondLinesman,
        ticketPrice: responseData.ticketPrice,
        seats: responseData.seats,
      };
      context.commit("setMatch", match);
    }

    if (!response.ok) {
      const error = new Error(responseData.error);
      throw error;
    }
    // }
  },

  async deleteReservation(context, payload) {
    const baseurl = payload.baseurl;
    const id = payload.id;
    const body = {
      userName: localStorage.getItem("userName"),
    };

    const response = await fetch(baseurl + "/api/ticket/deleteTicket/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(body),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.error);
      throw error;
    }
  },

  async loadAllTeams(context, payload) {
    const baseurl = payload.baseurl;
    const response = await fetch(baseurl + "/api/team/getTeams", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const responseData = await response.json();
    if (response.status == 200) {
      const teams = [];

      for (let i = 0; i < responseData.length; i++) {
        const match = {
          id: responseData[i]._id,
          name: responseData[i].name,
          logo: responseData[i].logo,
        };
        teams.push(match);
      }
      context.commit("setTeams", teams);
    }

    if (!response.ok) {
      const error = new Error(responseData.error);
      throw error;
    }
    // }
  },

  async loadTeamImage(context, payload) {
    const baseurl = payload.baseurl;

    const teamName = payload.teamName;

    const response = await fetch(
      baseurl + "/api/team/getTeamLogo?team=" + teamName,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const responseData = await response.json();
    if (response.status == 200) {
      context.commit("setTeamImage", responseData.teamImageURL);
    }

    if (!response.ok) {
      const error = new Error(responseData.error);
      throw error;
    }
  },
};
