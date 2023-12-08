<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card class="details-dialog">
      <v-card-title class="details-title"
        >Add Match {{ dateTime }}</v-card-title
      >
      <v-card-text class="center">
        <v-form ref="form" @submit.prevent="submitMatch">
          <v-row>
            <v-col cols="12" sm="6">
              <v-select
                :items="teamOptions"
                v-model="homeTeam"
                label="Team 1"
                required
                prepend-inner-icon="mdi-soccer"
                class="input-label"
                :rules="[validateInput]"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                :items="teamOptions"
                v-model="awayTeam"
                label="Team 2"
                required
                prepend-inner-icon="mdi-soccer"
                class="input-label"
                :rules="[validateInput]"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                prepend-inner-icon="mdi-map-outline"
                label="venue"
                required
                class="input-label"
                v-model="venue"
                :rules="[validateInput]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                prepend-inner-icon="mdi-calendar-clock"
                type="datetime-local"
                label="Date"
                class="input-label"
                v-model="dateTime"
                :rules="[validateInput]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                label="Main Referee"
                prepend-inner-icon="mdi-account-outline"
                class="input-label"
                v-model="mainReferee"
                :rules="[validateInput]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                label="First Linesman"
                prepend-inner-icon="mdi-account-outline"
                class="input-label"
                v-model="firstLinesman"
                :rules="[validateInput]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                label="Second Linesman"
                prepend-inner-icon="mdi-account-outline"
                class="input-label"
                v-model="secondLinesman"
                :rules="[validateInput]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                type="number"
                label="Ticket Price"
                prepend-inner-icon="mdi-currency-usd"
                class="input-label"
                v-model="ticketPrice"
                :rules="[validateInput]"
              ></v-text-field>
            </v-col>
            <v-col cols="12"> </v-col>
          </v-row>
          <v-alert v-if="confirmed && isEdited" shaped type="success">
            Match is Edited successfully
          </v-alert>
          <v-alert v-if="confirmed && !isEdited" shaped type="success">
            Match is added successfully
          </v-alert>
          <v-alert v-if="error" shaped type="error">{{ error }} </v-alert>
          <v-card-actions>
            <v-col>
              <v-btn @click="closeAddMatch" class="btn">Close</v-btn></v-col
            >
            <v-col>
              <v-spacer></v-spacer>

              <v-btn
                type="submit"
                class="btn"
                block
                :loading="loading"
                v-if="isEdited"
                >Edit Match</v-btn
              >
              <v-btn type="submit" class="btn" block :loading="loading" v-else
                >Add Match</v-btn
              ></v-col
            >
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    addMatchDialog: {
      type: Boolean,
      required: true,
    },
    isEdited: {
      type: Boolean,
      required: true,
    },
    match: {
      type: Object,
      required: true,
    },
  },
  watch: {
    addMatchDialog(newVal) {
      this.dialog = newVal;
    },
  },
  data() {
    return {
      dialog: this.addMatchDialog,

      homeTeam: this.match.homeTeam,
      awayTeam: this.match.awayTeam,
      venue: this.match.venue,
      dateTime: this.match.dateTime,
      mainReferee: this.match.mainReferee,
      firstLinesman: this.match.firstLinesman,
      secondLinesman: this.match.secondLinesman,
      ticketPrice: this.match.ticketPrice,

      error: "",
      teams: [],

      loading: false,
      confirmed: false,
    };
  },
  created() {
    this.loading = false;
    this.confirmed = false;
    this.loadTeams();
    if (this.isEdited) {
      this.formatDateTime();
    }
  },
  computed: {
    teamOptions() {
      return this.teams.map((team) => team.name);
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
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      return hours + ":" + minutes;
    },
  },
  methods: {
    formatDateTime() {
      this.dateTime = this.date + "T" + this.time;
    },
    showAddMatch() {
      this.dialog = true;
    },
    closeAddMatch() {
      this.$emit("close-match");
      this.dialog = false;
    },
    validateInput(value) {
      this.confirmed = false;
      if (!value) {
        return "This Field is Required";
      }
      return true;
    },
    async loadTeams() {
      this.loading = true;
      try {
        await this.$store.dispatch("loadAllTeams", {
          baseurl: this.$baseurl,
        });
      } catch (error) {
        this.error = error.message || "Something went wrong";
        if (error.message == "Server Error") {
          this.$router.push("/internal-server-error");
        }
      }
      this.teams = this.$store.getters["teams"];
      console.log(this.teams);
      this.loading = false;
    },
    async submitMatch() {
      if (
        !this.homeTeam ||
        !this.awayTeam ||
        !this.venue ||
        !this.dateTime ||
        !this.mainReferee ||
        !this.firstLinesman ||
        !this.secondLinesman ||
        !this.ticketPrice
      ) {
        return;
      }
      this.loading = true;
      this.error = "";
      if (!this.isEdited) {
        const actionPayload = {
          homeTeam: this.homeTeam,
          awayTeam: this.awayTeam,
          venue: this.venue,
          dateTime: this.dateTime,
          mainReferee: this.mainReferee,
          firstLinesman: this.firstLinesman,
          secondLinesman: this.secondLinesman,
          ticketPrice: this.ticketPrice,

          baseurl: this.$baseurl,
        };
        try {
          await this.$store.dispatch("addMatch", actionPayload);
        } catch (err) {
          this.error = err.message;
          this.loading = false;
          return;
        }
      } else {
        const actionPayload = {
          homeTeam: this.homeTeam,
          awayTeam: this.awayTeam,
          venue: this.venue,
          dateTime: this.dateTime,
          mainReferee: this.mainReferee,
          firstLinesman: this.firstLinesman,
          secondLinesman: this.secondLinesman,
          ticketPrice: this.ticketPrice,

          id: this.match.id,

          baseurl: this.$baseurl,
        };
        try {
          await this.$store.dispatch("editMatch", actionPayload);
        } catch (err) {
          this.error = err.message;
          this.loading = false;
          return;
        }
      }
      this.loading = false;
      this.confirmed = true;
      this.$emit("refresh-match");
    },
  },
};
</script>

<style scoped>
.btn,
.details-title {
  color: var(--color-primary);
}
.error {
  color: red;
  font-size: 1rem;
}
</style>
