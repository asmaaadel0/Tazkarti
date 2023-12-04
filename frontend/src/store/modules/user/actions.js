export default {
  async getUser(context, payload) {
    const baseurl = payload.baseurl;

    const response = await fetch(baseurl + "/api/user/getUser/" + payload.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    const responseData = await response.json();

    if (response.status == 200) {
      const user = {
        address: responseData.user.address,
        isPending: responseData.user.isPending,
        _id: responseData.user._id,
        userName: responseData.user.userName,
        password: responseData.user.password,
        firstName: responseData.user.firstName,
        lastName: responseData.user.lastName,
        birthDate: responseData.user.birthDate,
        gender: responseData.user.gender,
        city: responseData.user.city,
        emailAddress: responseData.user.emailAddress,
        role: responseData.user.role,
        createdIn: responseData.user.createdIn,
      };
      context.commit("setUser", user);
    }

    if (response.status == 400) {
      const error = new Error(responseData.error);
      throw error;
    }
  },
  async editUser(context, payload) {
    const userInfo = {
      userName: payload.userName,
      password: payload.password,
      firstName: payload.firstName,
      lastName: payload.lastName,
      birthDate: payload.birthDate,
      gender: payload.gender,
      city: payload.city,
      address: payload.address,
      emailAddress: payload.emailAddress,
    };
    const baseurl = payload.baseurl;
    context.commit("setDone", false);

    const response = await fetch(
      baseurl + "/api/user/editUser/" + localStorage.getItem("id"),
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(userInfo),
      }
    );

    const responseData = await response.json();
    if (response.status == 200) {
      context.commit("setDone", true);
    }

    if (response.status == 400) {
      context.commit("setDone", false);
      const error = new Error(responseData.error);
      throw error;
    }
  },
  async loadAllUsers(context, payload) {
    const baseurl = payload.baseurl;

    const response = await fetch(baseurl + "/api/user/allUsers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    const responseData = await response.json();

    if (response.status == 200) {
      const users = [];

      for (let i = 0; i < responseData.users.length; i++) {
        const user = {
          id: responseData.users[i]._id,
          userName: responseData.users[i].userName,
          isPending: responseData.users[i].isPending,
          address: responseData.users[i].address,
          firstName: responseData.users[i].firstName,
          lastName: responseData.users[i].lastName,
          birthDate: responseData.users[i].birthDate,
          gender: responseData.users[i].gender,
          city: responseData.users[i].city,
          emailAddress: responseData.users[i].emailAddress,
          role: responseData.users[i].role,
        };
        users.push(user);
      }
      context.commit("setUsers", users);
    }

    if (!response.ok) {
      const error = new Error(responseData.error);
      throw error;
    }
  },
  async loadUnAuthorizedUsers(context, payload) {
    const baseurl = payload.baseurl;

    const response = await fetch(baseurl + "/api/user/unAuthorizedUers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    const responseData = await response.json();

    if (response.status == 200) {
      const users = [];

      for (let i = 0; i < responseData.users.length; i++) {
        const user = {
          id: responseData.users[i]._id,
          userName: responseData.users[i].userName,
          isPending: responseData.users[i].isPending,
          address: responseData.users[i].address,
          firstName: responseData.users[i].firstName,
          lastName: responseData.users[i].lastName,
          birthDate: responseData.users[i].birthDate,
          gender: responseData.users[i].gender,
          city: responseData.users[i].city,
          emailAddress: responseData.users[i].emailAddress,
          role: responseData.users[i].role,
        };
        users.push(user);
      }
      context.commit("setUnAuthorizedUsers", users);
    }

    if (!response.ok) {
      const error = new Error(responseData.error);
      throw error;
    }
  },
  async approveUser(context, payload) {
    const baseurl = payload.baseurl;
    const id = payload.id;
    context.commit("setDone", false);

    const response = await fetch(baseurl + "/api/user/approveUser/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    const responseData = await response.json();
    if (response.status == 200) {
      context.commit("setDone", true);
    }

    if (response.status == 400) {
      context.commit("setDone", false);
      const error = new Error(responseData.error);
      throw error;
    }
  },
  async disApproveUser(context, payload) {
    const baseurl = payload.baseurl;
    const id = payload.id;
    context.commit("setDone", false);

    const response = await fetch(baseurl + "/api/user/deleteUser/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    const responseData = await response.json();
    if (response.status == 200) {
      context.commit("setDone", true);
    }

    if (response.status == 400) {
      context.commit("setDone", false);
      const error = new Error(responseData.error);
      throw error;
    }
  },
};
