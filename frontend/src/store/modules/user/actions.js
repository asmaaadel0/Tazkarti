export default {
  async getUser(context, payload) {
    const baseurl = payload.baseurl;

    const response = await fetch(baseurl + "/api/user/getUser/:" + payload.id, {
      method: "POST",
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
};
