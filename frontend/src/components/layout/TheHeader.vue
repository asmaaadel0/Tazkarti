<template>
  <div>
    <v-app-bar app>
      <v-img src="@/assets/logo.jpg" alt="Logo" class="header-logo"></v-img>
      <v-app-bar-title class="header-title">Tazkarti</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-app-bar-title class="username" v-if="userName"
        >HI {{ userName }}🎉</v-app-bar-title
      >
      <div v-if="!role | (role == 'fan')">
        <v-btn @click="matches" class="btn">Matches</v-btn>
        <v-btn @click="staduims" class="btn">Staduims</v-btn>
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
        <v-btn @click="matches" class="btn">Matches</v-btn>
        <v-btn @click="showAddMatch" class="btn">Add Matche</v-btn>
        <v-btn @click="showAddStaduim" class="btn">Add Stadium</v-btn>
        <v-btn @click="editProfile" class="btn">Edit Profile</v-btn>
        <v-btn @click="logout" class="btn">Logout</v-btn>
      </div>
      <div v-if="role == 'admin'">
        <v-btn @click="showUsers" class="btn">Users</v-btn>
        <v-btn @click="showRequests" class="btn">Requests</v-btn>
        <v-btn @click="editProfile" class="btn">Edit Profile</v-btn>
        <v-btn @click="logout" class="btn">Logout</v-btn>
      </div>
    </v-app-bar>
    <add-match
      :addMatchDialog="addMatchDialog"
      @close-match="closeAddMatch"
    ></add-match>
    <add-staduim
      :addStaduimDialog="addStaduimDialog"
      @close-staduim="closeAddStaduim"
    ></add-staduim>
  </div>
</template>
<script>
import AddMatch from "../home/AddMatch.vue";
import AddStaduim from "../home/AddStaduim.vue";
export default {
  components: {
    AddMatch,
    AddStaduim,
  },
  data() {
    return {
      userName: localStorage.getItem("userName"),
      role: localStorage.getItem("role"),
      id: localStorage.getItem("id"),

      addMatchDialog: false,
      addStaduimDialog: false,
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
    staduims() {
      this.$router.push("/staduims");
    },
    reservation() {
      this.$router.push("/reservation");
    },
    showUsers() {
      this.$router.push("/users");
    },
    showRequests() {
      this.$router.push("/requests");
    },
    showAddMatch() {
      this.addMatchDialog = true;
    },
    closeAddMatch() {
      this.addMatchDialog = false;
    },
    showAddStaduim() {
      this.addStaduimDialog = true;
    },
    closeAddStaduim() {
      this.addStaduimDialog = false;
    },
    addStadium() {},
    logout() {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userName");
      localStorage.removeItem("role");
      localStorage.removeItem("id");
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
