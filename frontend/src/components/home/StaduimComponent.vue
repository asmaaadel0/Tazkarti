<template>
  <v-container fluid>
    <v-row class="staduims">
      <v-col v-for="(staduim, index) in staduims" :key="staduim.id">
        <staduim-details :staduim="staduim" :index="index"></staduim-details>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import StaduimDetails from "./StaduimDetails.vue";
export default {
  components: {
    StaduimDetails,
  },
  data() {
    return {
      loading: false,
      staduims: [],
    };
  },
  async created() {
    this.loading = true;
    await this.loadStaduims();
    this.loading = false;
  },
  methods: {
    async loadStaduims() {
      this.loading = true;

      try {
        await this.$store.dispatch("loadAllStaduims", {
          baseurl: this.$baseurl,
        });
      } catch (error) {
        this.error = error.message || "Something went wrong";
        if (error.message == "Server Error") {
          this.$router.push("/internal-server-error");
        }
      }
      this.staduims = this.staduims.concat(this.$store.getters["staduims"]);
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.v-col {
  flex-grow: 0;
}
.staduims {
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
