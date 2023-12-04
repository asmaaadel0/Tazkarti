<template>
  <div class="row">
    <div class="child1">
      <v-list>
        <v-list-item v-for="user in users" :key="user.id" class="center">
          <v-row class="margin">
            <v-col cols="6">
              <button class="text-left px-2" @click="showUserDetails(user.id)">
                {{ user.userName }}
              </button>
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
            <v-col cols="5"
              ><v-btn
                class="mx-1 mx-md-3"
                fab
                dark
                small
                color="green"
                @click="approveUser(user.id)"
              >
                Approve User
                <v-icon dark> mdi-account-check-outline </v-icon>
              </v-btn>
            </v-col>
            <v-col cols="5">
              <v-btn
                class="mx-1 mx-md-3"
                fab
                dark
                small
                color="red"
                @click="disApproveUser(user.id)"
              >
                Disapprove User
                <v-icon dark> mdi-account-remove-outline </v-icon>
              </v-btn></v-col
            ></v-row
          ></v-card-text
        >
      </v-card>
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

      try {
        await this.$store.dispatch("loadUnAuthorizedUsers", {
          baseurl: this.$baseurl,
        });
      } catch (error) {
        this.error = error.message || "Something went wrong";
        if (error.message == "Server Error") {
          this.$router.push("/internal-server-error");
        }
      }
      this.users = this.$store.getters["unAuthorizedUsers"];
      this.loading = false;
    },
    async approveUser(id) {
      this.loading = true;

      try {
        await this.$store.dispatch("approveUser", {
          baseurl: this.$baseurl,
          id: id,
        });
      } catch (error) {
        this.error = error.message || "Something went wrong";
        if (error.message == "Server Error") {
          this.$router.push("/internal-server-error");
        }
      }
      this.loadUsers();
      this.loading = false;
    },
    async disApproveUser(id) {
      this.loading = true;

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
      }
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
.v-row {
  justify-content: center;
}
.margin {
  margin: 0.5rem 0;
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
  /* color: var(--color-white); */
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
