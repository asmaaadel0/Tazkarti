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
    this.loading = true;
    if (localStorage.getItem("accessToken")) {
      // let hasNext = this.$store.getters["hasNext"];
      // console.log("finish1");
      // while (hasNext != false) {
      //   console.log("finish2");
      //   await this.loadMatches();
      //   hasNext = this.$store.getters["hasNext"];
      // }
      // console.log("finish3");
    }
    await this.loadMatches();
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
