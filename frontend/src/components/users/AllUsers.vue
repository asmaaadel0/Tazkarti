<template>
  <v-container>
    <v-list>
      <v-list-item v-for="(user, index) in users" :key="index" class="center">
        <v-row class="margin">
          <v-col cols="6">
            <button class="text-left px-2" @click="showUserDetails(id)">
              {{ user.userName }}
            </button>
          </v-col>
          <v-col cols="6"
            ><v-btn color="green" @click="showUserDetails(id)">
              Show Details
              <v-icon dark> mdi-account-outline </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      users: [],
    };
  },
  async created() {
    if (localStorage.getItem("accessToken")) {
      this.loading = true;
      await this.loadUsers();
    }
    this.loading = false;
  },
  methods: {
    async loadUsers() {
      this.loading = true;

      try {
        await this.$store.dispatch("loadAllUsers", {
          baseurl: this.$baseurl,
        });
      } catch (error) {
        this.error = error.message || "Something went wrong";
        if (error.message == "Server Error") {
          this.$router.push("/internal-server-error");
        }
      }
      this.users = this.users.concat(this.$store.getters["users"]);
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.v-col {
  flex-grow: 0;
}
.margin {
  margin: 0.5rem 0;
}
</style>
