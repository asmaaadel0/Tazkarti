<template>
  <v-card class="reservation-card">
    <v-card-text class="text-center team-info margin">
      <p class="details-title">
        {{ match.homeTeam }} <b class="vs">vs</b> {{ match.awayTeam }}
      </p>
    </v-card-text>
    <v-card-text class="center">
      <p class="details-title"><b>Match Venue: </b>{{ match.venue }}</p>
      <p class="details-title"><b>Date: </b>{{ date }}</p>
      <p class="details-title"><b>Time: </b>{{ time }}</p>
    </v-card-text>
    <v-card-text class="text-center team-info">
      <p class="details-title"><b>Price:</b> {{ reservation.price }}</p>
    </v-card-text>
    <v-card-text class="text-center team-info">
      <p class="details-title">
        <b>Seat Number:</b> {{ reservation.seatNumber }}
      </p>
    </v-card-text>
    <v-btn block @click="cancelReservation()" color="red"
      ><v-icon size="24">mdi-close</v-icon> Cancel Reservation</v-btn
    >
  </v-card>
</template>

<script>
export default {
  props: {
    reservation: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      match: {},
    };
  },
  computed: {
    date() {
      const dateTime = new Date(this.match.dateTime);
      const year = dateTime.getFullYear();
      const month = dateTime.getMonth() + 1;
      const day = dateTime.getDate();
      return day + "-" + month + "-" + year;
    },
    time() {
      const dateTime = new Date(this.match.dateTime);
      const hours = dateTime.getHours();
      const minutes = dateTime.getMinutes();
      const seconds = dateTime.getSeconds();
      return hours + ":" + minutes + ":" + seconds;
    },
  },
  beforeMount() {
    this.getMatchDetails();
  },
  methods: {
    cancelReservation() {
      this.$emit("cancel-reservation", this.reservation.id);
    },
    async getMatchDetails() {
      this.loading = true;

      try {
        await this.$store.dispatch("loadMatch", {
          baseurl: this.$baseurl,
          id: this.reservation.matchId,
        });
      } catch (error) {
        this.error = error.message || "Something went wrong";
        if (error.message == "Server Error") {
          this.$router.push("/internal-server-error");
        }
      }
      this.match = this.$store.getters["match"];
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.center {
  text-align: center;
}
.reservation-card {
  position: relative;
  overflow: hidden;
  width: 20rem;
  background: -webkit-linear-gradient(
    to right,
    var(--color-blue-dark-1),
    var(--color-blue-dark-2)
  );
  background: linear-gradient(
    to right,
    var(--color-blue-dark-1),
    var(--color-blue-dark-2)
  );
  width: 20rem;
}

.team-info {
  position: relative;
}
.details-title {
  color: var(--color-white);
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

b {
  color: var(--color-white);
  margin-right: 0.5rem;
}
.vs {
  color: var(--color-primary-light);
}
</style>
