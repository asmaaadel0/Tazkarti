<template>
  <v-app-bar app>
    <v-img src="@/assets/logo.jpg" alt="Logo" class="header-logo"></v-img>
    <v-app-bar-title class="header-title">Tazkarti</v-app-bar-title>
    <v-spacer></v-spacer>
    {{ userName }}
    <v-btn @click="matches" class="btn">Matches</v-btn>
    <v-btn v-if="userName" @click="reservation" class="btn">Reservation</v-btn>
    <v-btn v-if="!userName" @click="signup" class="btn">Sign Up</v-btn>
    <v-btn v-if="!userName" @click="login" class="btn">Login</v-btn>
    <v-btn v-if="userName" @click="editProfile" class="btn">Edit Profile</v-btn>
    <v-btn v-if="userName" @click="logout" class="btn">Logout</v-btn>
  </v-app-bar>
</template>
<script>
export default {
  computed: {
    userName() {
      return localStorage.getItem("userName");
    },
  },
  methods: {
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
      window.location.reload();
    },
    editProfile() {
      // Implement edit profile logic
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
</style>
