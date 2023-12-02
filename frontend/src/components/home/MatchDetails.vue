<template>
  <v-card class="match-card">
    <v-card-text class="text-center match-day">
      <h3>{{ date }}</h3>
    </v-card-text>
    <v-card-text class="text-center team-info">
      <v-img
        src="../../assets/teamA.png"
        alt="Team 1"
        class="team-image"
      ></v-img>
      <p class="team-name">{{ match.homeTeam }}</p>
    </v-card-text>
    <v-card-text class="text-center team-info">
      <v-img
        src="../../assets/teamA.png"
        alt="Team 2"
        class="team-image"
      ></v-img>
      <p class="team-name">{{ match.awayTeam }}</p>

      <v-btn block @click="showDetails()" class="margin-top"
        >View Details</v-btn
      >
    </v-card-text>
    <v-dialog v-model="dialog" max-width="600">
      <v-card class="details-dialog">
        <v-card-title class="details-title">Match Details</v-card-title>
        <v-card-text class="center">
          <p class="details-text"><b>Match Venue: </b>{{ match.venue }}</p>
          <p class="details-text"><b>Date: </b>{{ date }}</p>
          <p class="details-text"><b>Time: </b>{{ time }}</p>
          <p class="details-text">
            <b>Main Referee: </b>{{ match.mainReferee }}
          </p>
          <p class="details-text">
            <b>First Linesman: </b>{{ match.firstLinesman }}
          </p>
          <p class="details-text">
            <b>Second Linesman: </b>{{ match.secondLinesman }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeDetails" class="btn">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  props: {
    match: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
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
  methods: {
    showDetails() {
      this.dialog = true;
    },
    closeDetails() {
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
.margin-top {
  margin-top: 1rem;
}
.center {
  text-align: center;
}
.btn {
  background-color: var(--color-primary-light);
  color: var(--color-white);
}
.match-card {
  position: relative;
  overflow: hidden;
  background: #141e30;
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

.team-image {
  width: 100%;
  max-height: 100px;
  object-fit: cover;
}

.match-day {
  background: rgba(255, 255, 255, 0.7);
  padding: 8px;
}
.team-name {
  color: var(--color-white);
  font-size: 1rem;
}

.details-title {
  color: var(--color-primary-light);
}
b {
  color: var(--color-primary-light);
}
</style>
