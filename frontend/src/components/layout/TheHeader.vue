<template>
  <v-app-bar app>
    <v-img src="@/assets/logo.jpg" alt="Logo" class="header-logo"></v-img>
    <v-app-bar-title class="header-title">Tazkarti</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-app-bar-title class="username" v-if="userName"
      >HI {{ userName }}🎉</v-app-bar-title
    >
    <div v-if="!role | (role == 'fan')">
      <v-btn @click="matches" class="btn">Matches</v-btn>
      <v-btn v-if="userName" @click="reservation" class="btn"
        >Reservation</v-btn
      >
      <v-btn v-if="!userName" @click="signup" class="btn">Sign Up</v-btn>
      <v-btn v-if="!userName" @click="login" class="btn">Login</v-btn>
      <v-btn v-if="userName" @click="editProfile" class="btn"
        >Edit Profile</v-btn
      >
      <v-btn v-if="userName" @click="logout" class="btn">Logout</v-btn>
    </div>
    <div v-if="role == 'manager'">
      <v-btn @click="addMatch" class="btn">Add Matche</v-btn>
      <v-btn @click="reservation" class="btn">Add Stadium</v-btn>
      <v-btn @click="editProfile" class="btn">Edit Profile</v-btn>
      <v-btn @click="logout" class="btn">Logout</v-btn>
    </div>
  </v-app-bar>
</template>
<script>
export default {
  data() {
    return {
      userName: localStorage.getItem("userName"),
      role: localStorage.getItem("role"),
    };
  },
  watch: {
    $route: "handleRouteChange",
  },
  methods: {
    handleRouteChange() {
      this.userName = localStorage.getItem("userName");
      this.role = localStorage.getItem("role");
    },
    login() {
      this.$router.push("/login");
    },
    signup() {
      this.$router.push("/signup");
    },
    matches() {
      this.$router.push("/matches");
    },
    reservation() {
      this.$router.push("/reservation");
    },
    logout() {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userName");
      localStorage.removeItem("role");
      this.$router.push("/matches");
      this.userName = localStorage.getItem("userName");
      this.role = localStorage.getItem("role");
    },
    editProfile() {
      this.$router.push("/edit-profile");
    },
  },
};
</script>

<style scoped>
.header-logo {
  height: 50px;
  margin-left: -5rem;
}
.btn {
  color: var(--color-primary);
}
.header-title {
  font-size: 2rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-primary);
}
.username {
  color: black;
  text-transform: uppercase;
  font-size: 1.5rem;
  font-weight: 500;
}
</style>
