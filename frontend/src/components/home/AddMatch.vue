<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card class="details-dialog">
      <v-card-title class="details-title">Add Match </v-card-title>
      <v-card-text class="center">
        <v-form ref="form" @submit.prevent="addMatch()">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                prepend-inner-icon="mdi-soccer"
                label="Team 1"
                required
                class="input-label"
                v-model="homeTeam"
                :rules="[validateInput]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                prepend-inner-icon="mdi-soccer"
                class="input-label"
                label="Team 2"
                required
                v-model="awayTeam"
                :rules="[validateInput]"
              ></v-text-field>
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
          <v-alert v-if="confirmed" shaped type="success">
            Match is added successfully
          </v-alert>
          <v-alert v-if="error" shaped type="error">{{ error }} </v-alert>
          <v-card-actions>
            <v-btn @click="closeAddMatch" class="btn">Close</v-btn>
            <v-spacer></v-spacer>
            <v-btn type="submit" class="btn" block :loading="loading"
              >Add Match</v-btn
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
  },
  watch: {
    addMatchDialog(newVal) {
      this.dialog = newVal;
    },
  },
  data() {
    return {
      dialog: this.addMatchDialog,

      homeTeam: "",
      awayTeam: "",
      venue: "",
      dateTime: "",
      mainReferee: "",
      firstLinesman: "",
      secondLinesman: "",
      ticketPrice: null,

      error: "",

      loading: false,
      confirmed: false,
    };
  },
  created() {
    this.confirmed = false;
  },
  methods: {
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
    async addMatch() {
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

      this.loading = false;
      this.confirmed = true;
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
