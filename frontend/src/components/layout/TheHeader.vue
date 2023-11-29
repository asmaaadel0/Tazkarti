<template>
  <v-app-bar app>
    <v-img src="@/assets/logo.jpg" alt="Logo" class="header-logo"></v-img>
    <v-app-bar-title class="header-title">Tazkarti</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn @click="matches" class="btn">Matches</v-btn>
    <v-btn v-if="isLoggedIn" @click="reservation" class="btn"
      >Reservation</v-btn
    >
    <v-btn v-if="!isLoggedIn" @click="signup" class="btn">Sign Up</v-btn>
    <v-btn v-if="!isLoggedIn" @click="login" class="btn">Login</v-btn>
    <v-btn v-if="isLoggedIn" @click="editProfile" class="btn"
      >Edit Profile</v-btn
    >
    <v-btn v-if="isLoggedIn" @click="logout" class="btn">Logout</v-btn>
  </v-app-bar>
</template>
<script>
export default {
  data() {
    return {
      isLoggedIn: false,
    };
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
      // Implement logout logic
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
  color: var(--color-primary);
  margin-left: -9rem;
}
</style>
