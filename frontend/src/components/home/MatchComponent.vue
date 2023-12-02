<template>
  <v-container fluid>
    <v-row class="matches">
      <v-col v-for="match in matches" :key="match.id">
        <match-details :match="match"></match-details>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MatchDetails from "./MatchDetails.vue";
export default {
  components: {
    MatchDetails,
  },
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
    }
    this.loading = false;
  },
  methods: {
    async loadMatches(title) {
      this.loading = true;
      let afterMod = "";
      if (title == "after") {
        afterMod = this.after;
      }
      try {
        await this.$store.dispatch("loadAllMatches", {
          baseurl: this.$baseurl,
          afterMod: afterMod,
        });
      } catch (error) {
        this.error = error.message || "Something went wrong";
        if (error.message == "Server Error") {
          this.$router.push("/internal-server-error");
        }
      }
      // this.matches = this.matches.concat(
      //   this.$store.getters["matches/matches"]
      // );
      this.matches = this.$store.getters["matches"];
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
