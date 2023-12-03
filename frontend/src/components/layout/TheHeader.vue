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
        <v-btn @click="showAddMatch" class="btn">Add Matche</v-btn>
        <v-btn @click="addStadium" class="btn">Add Stadium</v-btn>
        <v-btn @click="editProfile" class="btn">Edit Profile</v-btn>
        <v-btn @click="logout" class="btn">Logout</v-btn>
      </div>
    </v-app-bar>
    <v-dialog v-model="addMatchDialog" max-width="600">
      <v-card class="details-dialog">
        <v-card-title class="details-title">Add Match</v-card-title>
        <v-card-text class="center">
          <v-form ref="form" @submit.prevent="addMatch()">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  prepend-inner-icon="mdi-soccer"
                  label="Team 1"
                  required
                  class="input-label"
                  v-model="homeTeam"
                  :rules="[validateInput]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  prepend-inner-icon="mdi-soccer"
                  class="input-label"
                  label="Team 2"
                  required
                  v-model="awayTeam"
                  :rules="[validateInput]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  prepend-inner-icon="mdi-map-outline"
                  label="venue"
                  required
                  class="input-label"
                  v-model="venue"
                  :rules="[validateInput]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  prepend-inner-icon="mdi-account-outline"
                  label="Last Name"
                  required
                  class="input-label"
                  v-model="lastName"
                  :rules="[validateInput]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  prepend-inner-icon="mdi-calendar-clock"
                  type="datetime-local"
                  label="Date"
                  class="input-label"
                  v-model="dateTime"
                  :rules="[validateInput]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Main Referee"
                  prepend-inner-icon="mdi-account-outline"
                  class="input-label"
                  v-model="mainReferee"
                  :rules="[validateInput]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="First Linesman"
                  prepend-inner-icon="mdi-account-outline"
                  class="input-label"
                  v-model="firstLinesman"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Second Linesman"
                  prepend-inner-icon="mdi-account-outline"
                  class="input-label"
                  v-model="secondLinesman"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  type="number"
                  label="Ticket Price"
                  prepend-inner-icon="mdi-currency-usd"
                  class="input-label"
                  v-model="ticketPrice"
                ></v-text-field>
              </v-col>
              <p class="error" v-if="errorUserName != ''">
                {{ errorUserName }}
              </p>
              <v-col cols="12"> </v-col>

              <v-card-actions>
                <v-btn @click="closeAddMatch" class="btn">Close</v-btn>
                <v-spacer></v-spacer>
                <v-btn type="submit" class="btn" block :loading="loading"
                  >Sign Up</v-btn
                >
              </v-card-actions>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userName: localStorage.getItem("userName"),
      role: localStorage.getItem("role"),
      id: localStorage.getItem("id"),

      addMatchDialog: false,

      homeTeam: "",
      awayTeam: "",
      venue: "",
      dateTime: "",
      mainReferee: "",
      firstLinesman: "",
      secondLinesman: "",
      ticketPrice: 0,
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
    showAddMatch() {
      this.addMatchDialog = true;
    },
    closeAddMatch() {
      this.addMatchDialog = false;
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
