<template>
  <v-container>
    <v-list>
      <v-list-item-group v-for="(userList, index) in userLists" :key="index">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="headline">{{
              userList.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-for="(user, userIndex) in userList.users"
          :key="userIndex"
        >
          <v-list-item-content>
            <v-list-item-title>{{ user.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      matches: [],
    };
  },
  async created() {
    if (localStorage.getItem("accessToken")) {
      this.loading = true;
      await this.loadMatches();
      // let hasNext = this.$store.getters["hasNext"];
      // console.log("finish1");
      // while (hasNext != false) {
      //   console.log("finish2");
      //   await this.loadMatches();
      //   hasNext = this.$store.getters["hasNext"];
      // }
      // console.log("finish3");
    }
    this.loading = false;
  },
  methods: {
    async loadMatches() {
      this.loading = true;
      // let page = this.$store.getters["page"];
      // let hasNext = this.$store.getters["hasNext"];

      try {
        await this.$store.dispatch("loadAllMatches", {
          baseurl: this.$baseurl,
          // page: page,
          // hasNext: hasNext,
        });
      } catch (error) {
        this.error = error.message || "Something went wrong";
        if (error.message == "Server Error") {
          this.$router.push("/internal-server-error");
        }
      }
      this.matches = this.matches.concat(this.$store.getters["matches"]);
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.v-col {
  flex-grow: 0;
}
.matches {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: flex-start;
  gap: 10px;
  margin: auto;
}
</style>
