export default {
  async signup(context, payload) {
    const userInfo = {
      userName: payload.username,
      password: payload.password,
      firstName: payload.firstName,
      lastName: payload.lastName,
      birthDate: payload.birthDate,
      gender: payload.gender,
      city: payload.city,
      addres: payload.addres,
      emailAddress: payload.emailAddress,
      role: payload.selectedRole,
    };
    const baseurl = payload.baseurl;

    const response = await fetch(baseurl + "/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    });

    const responseData = await response.json();
    if (response.ok) {
      if (responseData.token && responseData.username) {
        localStorage.setItem("accessToken", responseData.Token);
        localStorage.setItem("userName", responseData.userName);
        localStorage.setItem("role", responseData.role);
        context.commit("setUser", {
          userName: responseData.userName,
          accessToken: responseData.Token,
        });

        context.commit("setRole", responseData.role);
      }
    }
    if (!response.ok) {
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

    if (response.ok) {
      if (responseData.token && responseData.username) {
        localStorage.setItem("accessToken", responseData.Token);
        localStorage.setItem("userName", responseData.userName);
        localStorage.setItem("setRole", responseData.role);
        context.commit("setUser", {
          userName: responseData.userName,
          accessToken: responseData.Token,
          response: response,
        });
        context.commit("setRole", responseData.role);
      }
    }
    if (!response.ok) {
      const error = new Error(responseData.error);
      throw error;
    }
  },
};
