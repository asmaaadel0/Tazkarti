<template>
  <v-container fluid>
    <v-alert v-if="confirmed" shaped type="success">
      Reservation Cancelled Successfully
    </v-alert>
    <v-alert v-if="error" shaped type="error">{{ error }} </v-alert>
    <v-row class="reservations">
      <v-col v-for="(reservation, index) in reservations" :key="reservation.id">
        <reservation-details
          :reservation="reservation"
          :index="index"
          @cancel-reservation="cancelReservation"
        ></reservation-details>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ReservationDetails from "./ReservationDetails.vue";
export default {
  components: {
    ReservationDetails,
  },
  data() {
    return {
      loading: false,
      reservations: [],

      confirmed: false,
      error: false,
    };
  },
  async created() {
    this.loading = true;
    await this.loadReservations();
    this.loading = false;
    this.confirmed = false;
  },
  methods: {
    async cancelReservation(id) {
      this.loading = true;
      this.confirmed = false;
      this.error = "";

      try {
        await this.$store.dispatch("deleteReservation", {
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
      this.loadReservations();
      this.loading = false;
      this.showDetails = false;
    },
    async loadReservations() {
      this.loading = true;

      try {
        await this.$store.dispatch("loadAllReservations", {
          baseurl: this.$baseurl,
        });
      } catch (error) {
        this.error = error.message || "Something went wrong";
        if (error.message == "Server Error") {
          this.$router.push("/internal-server-error");
        }
      }
      this.reservations = this.$store.getters["reservations"];
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.v-col {
  flex-grow: 0;
}
.reservations {
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
