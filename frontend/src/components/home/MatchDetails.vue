<template>
  <v-card class="match-card">
    <v-card-text class="match-day">
      <div>
        <h3>{{ date }}</h3>
      </div>
      <div>
        <h3>{{ time }}</h3>
      </div>
    </v-card-text>
    <v-card-text class="team-box">
      <v-img
        :src="'http://' + homeTeamImage"
        alt="Team 1"
        class="team-image"
      ></v-img>
      <p class="team-name">
        {{ match.homeTeam }}
      </p>
    </v-card-text>
    <v-card-text class="text-center"><b class="vs">vs</b></v-card-text>
    <v-card-text class="team-box">
      <v-img
        :src="'http://' + awayTeamImage"
        alt="Team 1"
        class="team-image"
      ></v-img>
      <p class="team-name">
        {{ match.awayTeam }}
      </p>
    </v-card-text>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card-text>
          <b><v-icon size="small">mdi-currency-usd</v-icon> Price</b>
          <p class="team-name">
            {{ match.ticketPrice }}
          </p>
        </v-card-text></v-col
      >
      <v-col cols="12" sm="6">
        <v-card-text>
          <b><v-icon size="small">mdi-map-outline</v-icon> Venue</b>
          <p class="team-name">
            {{ match.venue }}
          </p>
        </v-card-text></v-col
      ></v-row
    >
    <v-row>
      <v-col cols="4">
        <v-card-text>
          <b><v-icon size="small">mdi-account-outline</v-icon> Main Referee</b>
          <p class="team-name">
            {{ match.mainReferee }}
          </p>
        </v-card-text></v-col
      ><v-col cols="4">
        <v-card-text>
          <b> First Linesman</b>
          <p class="team-name">
            {{ match.firstLinesman }}
          </p>
        </v-card-text></v-col
      >
      <v-col cols="4">
        <v-card-text>
          <b> Second Linesman</b>
          <p class="team-name">
            {{ match.secondLinesman }}
          </p>
        </v-card-text></v-col
      ></v-row
    >
    <v-row>
      <v-card-text>
        <v-btn block @click="editMatch()" class="margin-top" v-if="isManager"
          >Edit Match Details</v-btn
        >
        <v-btn block @click="reserveMatch()" v-else class="margin-top"
          >Reserve</v-btn
        >
      </v-card-text></v-row
    >
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
            <v-col v-for="col in row" :key="col">
              <div class="seat">
                <v-icon
                  @click="chooseSeat(col)"
                  v-if="!col.isReserved"
                  class="seat-icon seat-reserved"
                  size="large"
                  color="success"
                  >mdi-seat</v-icon
                >
                <v-icon
                  v-else
                  class="seat-icon"
                  size="large"
                  color="grey darken-3"
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
      @refresh-match="refresh"
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
      reserve: false,
      homeTeamImage: "",
      awayTeamImage: "",

      error: "",
      confirmed: false,
      loading: false,

      creditCard: "",
      pinNumber: "",
      choosenSeats: [],

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
      let month = dateTime.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      let day = dateTime.getDate();
      if (day < 10) {
        day = "0" + day;
      }
      return year + "-" + month + "-" + day;
    },
    time() {
      const dateTime = new Date(this.match.dateTime);
      const hours = dateTime.getHours();
      let minutes = dateTime.getMinutes();
      let seconds = dateTime.getSeconds();
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
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
    this.loadHomeTeamImage();
    this.loadAwayTeamImage();
  },
  methods: {
    async loadHomeTeamImage() {
      this.loading = true;

      try {
        await this.$store.dispatch("loadTeamImage", {
          baseurl: this.$baseurl,
          teamName: this.match.homeTeam,
        });
      } catch (error) {
        this.error = error.message || "Something went wrong";
        if (error.message == "Server Error") {
          this.$router.push("/internal-server-error");
        }
      }
      this.homeTeamImage = this.$store.getters["teamImage"];
      this.loading = false;
    },
    async loadAwayTeamImage() {
      this.loading = true;

      try {
        await this.$store.dispatch("loadTeamImage", {
          baseurl: this.$baseurl,
          teamName: this.match.awayTeam,
        });
      } catch (error) {
        this.error = error.message || "Something went wrong";
        if (error.message == "Server Error") {
          this.$router.push("/internal-server-error");
        }
      }
      this.awayTeamImage = this.$store.getters["teamImage"];
      this.loading = false;
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
      this.choosenSeats.push(seat.number);
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
      if (!this.choosenSeats) {
        this.error = "Choose Your Seat!";
        return;
      }

      const arrayValues = Object.values(this.choosenSeats);
      let array = [];
      arrayValues.forEach((value) => {
        array.push(value);
      });
      const actionPayload = {
        matchId: this.match.id,
        seatNumber: array,
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
    refresh() {
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

.team-image {
  width: 30%;
  max-height: 60px;
  object-fit: cover;
  margin-right: 2rem;
  align-self: flex-start;
}

.match-day {
  background: rgba(255, 255, 255, 0.7);
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
}
.team-name {
  color: var(--color-white);
  font-size: 1rem;
  width: 70%;
}
.seat {
  border-radius: 20%;
  width: 1.8rem;
}
.seat-reserved:hover {
  background-color: yellow;
  cursor: pointer;
}

.details-title {
  color: var(--color-primary-light);
}
b {
  color: var(--color-primary-light);
  font-size: 0.8rem;
}
.team-box {
  font-size: 4rem !important;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
}
.vs {
  font-size: 2rem !important;
}
</style>
