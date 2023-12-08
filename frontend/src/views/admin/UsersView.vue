<template>
  <div class="row">
    <div class="child1">
      <v-list>
        <v-list-item v-for="user in users" :key="user.id" class="center">
          <v-row class="margin">
            <v-col cols="6">
              <b class="text-left px-2" @click="showUserDetails(user.id)">
                {{ user.userName }}
              </b>
            </v-col>
            <v-col cols="6"
              ><v-btn color="green" @click="showUserDetails(user.id)">
                Show Details
                <v-icon dark> mdi-account-outline </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
    </div>
    <div class="child2">
      <v-card class="staduim-card" v-if="showDetails">
        <v-card-text class="text-center team-info">
          <p class="details-title"><b>Username:</b> {{ user.userName }}</p>
        </v-card-text>
        <v-card-text class="text-center team-info">
          <p class="details-title"><b>First Name:</b> {{ user.firstName }}</p>
        </v-card-text>
        <v-card-text class="text-center team-info">
          <p class="details-title"><b>Second Name: </b>{{ user.lastName }}</p>
        </v-card-text>
        <v-card-text class="text-center team-info">
          <p class="details-title">
            <b>Email Address: </b>{{ user.emailAddress }}
          </p>
        </v-card-text>
        <v-card-text class="text-center team-info">
          <p class="details-title"><b>City: </b>{{ user.city }}</p>
        </v-card-text>
        <v-card-text class="text-center team-info">
          <p class="details-title"><b>Address: </b>{{ user.address }}</p>
        </v-card-text>
        <v-card-text class="text-center team-info">
          <p class="details-title"><b>Birth Date: </b> {{ birthDate }}</p>
        </v-card-text>
        <v-card-text class="text-center team-info">
          <p class="details-title"><b>Gender: </b> {{ user.gender }}</p>
        </v-card-text>
        <v-card-text class="text-center team-info">
          <p class="details-title"><b>Role: </b>{{ user.role }}</p>
        </v-card-text>
        <v-card-text class="text-center team-info">
          <v-row>
            <v-col cols="5">
              <v-btn
                class="mx-1 mx-md-3"
                fab
                dark
                small
                color="red"
                @click="disApproveUser(user.id)"
              >
                Remove User
                <v-icon dark> mdi-account-remove-outline </v-icon>
              </v-btn></v-col
            ></v-row
          ></v-card-text
        >
      </v-card>
      <v-col cols="12">
        <v-alert v-if="confirmed" shaped type="success">
          Removed Successfully
        </v-alert>
        <v-alert v-if="error" shaped type="error">{{ error }} </v-alert>
      </v-col>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      users: [],

      user: {},
      showDetails: false,
      birthDate: "",

      error: "",
      confirmed: false,
    };
  },
  async beforeMount() {
    if (localStorage.getItem("role") != "admin") {
      this.$router.push("/");
    }
    if (localStorage.getItem("accessToken")) {
      this.loading = true;
      await this.loadUsers();
    }
    this.loading = false;
    this.confirmed = false;
    this.error = "";
  },
  methods: {
    date() {
      const dateTime = new Date(this.user.birthDate);
      const year = dateTime.getFullYear();
      const month = dateTime.getMonth() + 1;
      const day = dateTime.getDate();
      this.birthDate = day + "-" + month + "-" + year;
    },
    showUserDetails(id) {
      this.getUserById(id);
      this.date();
      this.showDetails = true;
    },
    getUserById(userId) {
      this.user = this.users.find((user) => user.id === userId);
    },
    async loadUsers() {
      this.loading = true;
      this.error = "";

      try {
        await this.$store.dispatch("loadAllUsers", {
          baseurl: this.$baseurl,
        });
      } catch (error) {
        this.error = error.message || "Something went wrong";
        if (error.message == "Server Error") {
          this.$router.push("/internal-server-error");
        }
        this.loading = false;
        return;
      }
      this.users = this.$store.getters["users"];
      this.loading = false;
      this.error = "";
    },

    async disApproveUser(id) {
      this.loading = true;
      this.confirmed = false;
      this.error = "";

      try {
        await this.$store.dispatch("disApproveUser", {
          baseurl: this.$baseurl,
          id: id,
        });
      } catch (error) {
        this.error = error.message || "Something went wrong";
        if (error.message == "Server Error") {
          this.$router.push("/internal-server-error");
        }
        this.loading = false;
        return;
      }
      this.confirmed = true;
      this.success = "User is Disapproved Successfully";
      this.loadUsers();
      this.loading = false;
      this.showDetails = false;
    },
  },
};
</script>

<style scoped>
.row {
  display: flex;
  height: auto;
  min-height: 100vh;
}
.child1 {
  flex-basis: 30%;
  width: 30%;
  text-align: center;
  align-items: center;
  margin: auto;
  background-color: var(--color-primary);
  border-right: 2px var(--color-primary) solid;
  max-height: 100vh;
  overflow-y: auto;
}
.v-col {
  flex-grow: 0;
}
.margin {
  margin: 0.5rem 0;
}
.text-left {
  color: var(--color-black);
  font-size: 1rem;
}
.child2 {
  flex-basis: 70%;
  width: 70%;
  text-align: center;
}
.staduim-card {
  margin-top: 2rem;
}
.details-title {
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}
b {
  color: var(--color-primary);
  margin-right: 0.5rem;
}

@media (max-width: 500px) {
  .row {
    flex-direction: column;
  }
}
</style>
