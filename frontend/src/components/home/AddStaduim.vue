<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card class="details-dialog">
      <v-card-title class="details-title">Add Staduim </v-card-title>
      <v-card-text class="center">
        <v-form ref="form" @submit.prevent="addMatch()">
          <v-row>
            <v-col cols="18" sm="6">
              <v-text-field
                prepend-inner-icon="mdi-stadium"
                label="Staduim Name"
                required
                class="input-label"
                v-model="staduimName"
                :rules="[validateInput]"
              ></v-text-field>
            </v-col>
            <v-col cols="18" sm="6">
              <v-text-field
                type="number"
                label="Row Number"
                prepend-inner-icon="mdi-view-sequential"
                class="input-label"
                v-model="ticketPrice"
              ></v-text-field>
            </v-col>
            <v-col cols="18" sm="6">
              <v-text-field
                type="number"
                label="Number Of Seats Ber Row"
                prepend-inner-icon="mdi-seat"
                class="input-label"
                v-model="ticketPrice"
              ></v-text-field>
            </v-col>
            <p class="error" v-if="errorUserName != ''">
              {{ errorUserName }}
            </p>
            <v-col cols="12"> </v-col>

            <div class="seats">
              <v-icon
                v-for="count in counts"
                :key="count"
                icon="mdi-seat"
                size="large"
                color="success"
              ></v-icon>
            </div>
          </v-row>
          <v-card-actions>
            <v-btn @click="closeAddMatch" class="btn">Close</v-btn>
            <v-spacer></v-spacer>
            <v-btn type="submit" class="btn" block :loading="loading"
              >Add Staduim</v-btn
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
    addStaduimDialog: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    addStaduimDialog(newVal) {
      this.dialog = newVal;
    },
  },
  data() {
    return {
      dialog: this.addStaduimDialog,
      counts: 10,

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
    showAddStaduim() {
      this.dialog = true;
    },
    closeAddMatch() {
      this.$emit("close-staduim");
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
.seats {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
  align-items: center;
  align-content: flex-start;
  gap: 10px;
  margin: auto;
  margin-bottom: 3rem;
}
.btn,
.details-title {
  color: var(--color-primary);
}
</style>
