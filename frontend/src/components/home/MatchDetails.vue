<template>
  <v-card class="match-card">
    <!-- <v-card-text class="text-center match-day">
      <h3>{{ date }}</h3>
    </v-card-text> -->
    <v-card-text class="text-center match-day">
      <!-- <v-img
        src="@/assets/ball.jpg"
        alt="Home Image"
        class="home-image"
      ></v-img> -->
      <div class="text-block">
        <h3>{{ date }}</h3>
      </div>
    </v-card-text>
    <v-card-text class="text-center team-info margin">
      <!-- <v-img
        src="../../assets/teamA.png"
        alt="Team 1"
        class="team-image"
      ></v-img> -->
      <p class="team-name">{{ match.homeTeam }} vs {{ match.awayTeam }}</p>
    </v-card-text>
    <v-card-text class="text-center team-info">
      <!-- <v-img
        src="../../assets/teamA.png"
        alt="Team 2"
        class="team-image"
      ></v-img>
      <p class="team-name">{{ match.awayTeam }}</p> -->

      <v-btn block @click="showDetails()" class="margin-top"
        >View Details</v-btn
      >
      <v-btn block @click="reserveMatch()" v-if="isFan" class="margin-top"
        >Reserve</v-btn
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
    <v-dialog v-model="reserve" max-width="600">
      <v-card class="details-dialog">
        <v-card-title class="details-title">Choose Your Seat</v-card-title>
        <v-col>
          <v-icon
            v-for="k in 10"
            :key="k"
            class="seat-icon"
            size="large"
            color="success"
            >mdi-seat</v-icon
          >
        </v-col>
        <v-col cols="12">
          <v-alert v-if="confirmed" shaped type="success">
            Seat is Reserved successfully
          </v-alert>
          <v-alert v-if="error" shaped type="error">{{ error }} </v-alert>
        </v-col>
        <v-card-actions>
          <v-col> <v-btn @click="closeReserve" class="btn">Close</v-btn></v-col>
          <v-col>
            <v-btn type="submit" class="btn" block :loading="loading"
              >Reserve</v-btn
            ></v-col
          >
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
      reserve: false,

      error: "",
      confirmed: false,
    };
  },
  computed: {
    isFan() {
      return localStorage.getItem("role") == "fan";
    },
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
  created() {
    this.error = "";
    this.confirmed = false;
  },
  methods: {
    showDetails() {
      this.dialog = true;
    },
    closeDetails() {
      this.dialog = false;
    },
    reserveMatch() {
      this.reserve = true;
    },
    closeReserve() {
      this.reserve = false;
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
  font-size: 1.5rem;
}

.details-title {
  color: var(--color-primary-light);
}
b {
  color: var(--color-primary-light);
}
.margin {
  margin-top: 2rem;
  font-size: 4rem !important;
}
</style>
