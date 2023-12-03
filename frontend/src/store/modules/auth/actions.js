export default {
  async signup(context, payload) {
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
      role: payload.role,
    };
    const baseurl = payload.baseurl;

    const response = await fetch(baseurl + "/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    });

    const responseData = await response.json();
    if (response.status == 200) {
      localStorage.setItem("accessToken", responseData.token);
      localStorage.setItem("userName", responseData.userName);
      localStorage.setItem("role", responseData.role);
      context.commit("setUser", {
        userName: responseData.userName,
        accessToken: responseData.token,
        role: responseData.role,
      });

      context.commit("setRole", responseData.role);
    }

    if (response.status == 400) {
      const error = new Error(responseData.error);
      throw error;
    }
  },

  async login(context, payload) {
    const userInfo = {
      userName: payload.userName,
      password: payload.password,
    };
    const baseurl = payload.baseurl;

    const response = await fetch(baseurl + "/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    });

    const responseData = await response.json();
    if (response.status == 200) {
      localStorage.setItem("accessToken", responseData.token);
      localStorage.setItem("userName", responseData.userName);
      localStorage.setItem("role", responseData.role);
      context.commit("setUser", {
        userName: responseData.userName,
        accessToken: responseData.token,
        role: responseData.role,
      });
    }

    if (response.status == 400) {
      const error = new Error(responseData.error);
      throw error;
    }
  },
};
