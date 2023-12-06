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
      <p class="team-name">
        {{ match.homeTeam }} <b>vs</b> {{ match.awayTeam }}
      </p>
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
      <v-btn block @click="editMatch()" class="margin-top" v-if="isManager"
        >Edit Match Details</v-btn
      >
      <v-btn block @click="reserveMatch()" v-else class="margin-top"
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
            <b>Ticket Price: </b>{{ match.ticketPrice }}
          </p>
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

        <v-card-title class="details-title">Available Seats</v-card-title
        ><v-container>
          <v-row v-for="row in this.match.seats" :key="row">
            <v-col v-for="col in row" :key="col" @click="chooseSeat(col)">
              <v-icon
                class="seat-icon"
                size="large"
                :color="!col.isReserved ? 'success' : 'grey darken-3'"
                >mdi-seat</v-icon
              >
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn @click="closeDetails" class="btn">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="reserve" max-width="600">
      <v-card>
        <v-row class="details-dialog">
          <v-col cols="18" sm="6">
            <v-text-field
              type="number"
              label="Credit Card"
              prepend-inner-icon="mdi-credit-card"
              class="input-label"
              v-model="creditCard"
            ></v-text-field>
          </v-col>
          <v-col cols="18" sm="6">
            <v-text-field
              type="password"
              label="Pin Number"
              prepend-inner-icon="mdi-lock"
              class="input-label"
              v-model="pinNumber"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-card-title class="details-title">Choose Your Seat</v-card-title>

        <v-container>
          <v-row v-for="row in this.match.seats" :key="row">
            <v-col v-for="col in row" :key="col" @click="chooseSeat(col)">
              <div class="seat">
                <v-icon
                  class="seat-icon"
                  size="large"
                  :color="!col.isReserved ? 'success' : 'grey darken-3'"
                  >mdi-seat</v-icon
                >
              </div>
            </v-col>
          </v-row>
        </v-container>
        <v-col cols="12">
          <v-alert v-if="confirmed" shaped type="success">
            Seat is Reserved successfully
          </v-alert>
          <v-alert v-if="error" shaped type="error">{{ error }} </v-alert>
        </v-col>
        <v-card-actions>
          <v-col> <v-btn @click="closeReserve" class="btn">Close</v-btn></v-col>
          <v-col>
            <v-btn
              type="submit"
              class="btn"
              block
              :loading="loading"
              @click="reserveTicket"
              >Reserve</v-btn
            ></v-col
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <add-match
      :addMatchDialog="editMatchDialog"
      :isEdited="true"
      :match="match"
      @close-match="closeEditMatch"
    ></add-match>
  </v-card>
</template>

<script>
import AddMatch from "../home/AddMatch.vue";
export default {
  components: {
    AddMatch,
  },
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
      loading: false,

      creditCard: "",
      pinNumber: "",
      choosenSeat: "",

      editMatchDialog: false,
    };
  },
  computed: {
    isManager() {
      return localStorage.getItem("role") == "manager";
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
    numRows() {
      return this.match.seats.length;
    },
    numSeatsRow() {
      return this.match.seats[0].length;
    },
  },
  created() {
    this.error = "";
    this.confirmed = false;
    this.loading = false;
  },
  methods: {
    showDetails() {
      this.dialog = true;
    },
    closeDetails() {
      this.dialog = false;
    },
    reserveMatch() {
      if (!localStorage.getItem("accessToken")) {
        this.$router.push("/login");
      }
      this.reserve = true;
      this.confirmed = false;
      this.loading = false;
    },
    closeReserve() {
      this.reserve = false;
      this.confirmed = false;
      this.loading = false;
    },
    editMatch() {
      if (!localStorage.getItem("accessToken")) {
        this.$router.push("/login");
      }
      this.editMatchDialog = true;
      this.confirmed = false;
      this.loading = false;
    },
    closeEditMatch() {
      this.editMatchDialog = false;
    },
    chooseSeat(seat) {
      this.error = "";
      this.confirmed = false;
      this.choosenSeat = seat.number;
    },
    async reserveTicket() {
      this.error = "";
      this.confirmed = false;
      if (this.creditCard.length != 14) {
        this.error = "Enter valid Credit Card";
        return;
      }
      if (this.pinNumber.length != 4) {
        this.error = "Enter valid Pin Number";
        return;
      }
      if (!this.choosenSeat) {
        this.error = "Choose Your Seat!";
        return;
      }
      const actionPayload = {
        matchId: this.match.id,
        seatNumber: this.choosenSeat,
        userName: localStorage.getItem("userName"),

        baseurl: this.$baseurl,
      };

      try {
        await this.$store.dispatch("reserveSeat", actionPayload);
      } catch (err) {
        this.error = err.message;
        this.loading = false;
        return;
      }

      this.loading = false;
      this.confirmed = true;
      this.$emit("refresh");
    },
  },
};
</script>

<style scoped>
.details-dialog {
  margin: 2rem;
}
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
.seat {
  border-radius: 20%;
  width: 1.8rem;
}
.seat:hover {
  background-color: yellow;
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
