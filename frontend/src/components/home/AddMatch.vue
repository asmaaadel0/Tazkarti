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
                prepend-inner-icon="mdi-account-outline"
                label="Last Name"
                required
                class="input-label"
                v-model="lastName"
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
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                label="Second Linesman"
                prepend-inner-icon="mdi-account-outline"
                class="input-label"
                v-model="secondLinesman"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                type="number"
                label="Ticket Price"
                prepend-inner-icon="mdi-currency-usd"
                class="input-label"
                v-model="ticketPrice"
              ></v-text-field>
            </v-col>
            <p class="error" v-if="errorUserName != ''">
              {{ errorUserName }}
            </p>
            <v-col cols="12"> </v-col>

            <v-card-actions>
              <v-btn @click="closeAddMatch" class="btn">Close</v-btn>
              <v-spacer></v-spacer>
              <v-btn type="submit" class="btn" block :loading="loading"
                >Add Match</v-btn
              >
            </v-card-actions>
          </v-row>
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
      ticketPrice: 0,
    };
  },
  methods: {
    showAddMatch() {
      this.dialog = true;
    },
    closeAddMatch() {
      this.$emit("close-match");
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
.btn,
.details-title {
  color: var(--color-primary);
}
</style>
