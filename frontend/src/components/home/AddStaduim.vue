<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card class="details-dialog">
      <v-card-title class="details-title">Add Staduim </v-card-title>
      <v-card-text class="center">
        <v-form ref="form" @submit.prevent="addStaduim()">
          <v-row>
            <v-col cols="18" sm="6">
              <v-text-field
                prepend-inner-icon="mdi-stadium"
                label="Staduim Name"
                required
                class="input-label"
                v-model="name"
                :rules="[validateInput]"
              ></v-text-field>
            </v-col>
            <v-col cols="18" sm="6">
              <v-text-field
                prepend-inner-icon="mdi-stadium"
                label="City"
                required
                class="input-label"
                v-model="city"
                :rules="[validateInput]"
              ></v-text-field>
            </v-col>
            <v-col cols="18" sm="6">
              <v-text-field
                prepend-inner-icon="mdi-stadium"
                label="Address"
                required
                class="input-label"
                v-model="address"
                :rules="[validateInput]"
              ></v-text-field>
            </v-col>
            <v-col cols="18" sm="6">
              <v-text-field
                type="number"
                label="Row Number"
                prepend-inner-icon="mdi-view-sequential"
                class="input-label"
                v-model="rows"
              ></v-text-field>
            </v-col>
            <v-col cols="18" sm="6">
              <v-text-field
                type="number"
                label="Number Of Seats Ber Row"
                prepend-inner-icon="mdi-seat"
                class="input-label"
                v-model="rowSeats"
              ></v-text-field>
            </v-col>
            <v-col cols="12"> </v-col>
            <v-col></v-col>
            <v-col>
              <v-icon
                v-for="k in counts"
                :key="k"
                class="seat-icon"
                size="large"
                color="success"
                >mdi-seat</v-icon
              >
            </v-col>
            <v-col></v-col>
          </v-row>
          <v-alert v-if="confirmed" shaped type="success">
            Stadium is added successfully
          </v-alert>
          <v-alert v-if="error" shaped type="error">{{ error }} </v-alert>
          <v-card-actions>
            <v-btn @click="closeAddStaduim" class="btn">Close</v-btn>
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
  created() {
    this.confirmed = false;
  },
  watch: {
    addStaduimDialog(newVal) {
      this.dialog = newVal;
    },
  },
  data() {
    return {
      dialog: this.addStaduimDialog,
      // counts: 10,

      error: "",
      loading: false,
      confirmed: false,

      name: "",
      city: "",
      address: "",
      rows: "",
      rowSeats: "",
    };
  },
  computed: {
    counts() {
      return this.rows * this.rowSeats;
    },
  },
  methods: {
    showAddStaduim() {
      this.dialog = true;
    },
    closeAddStaduim() {
      this.$emit("close-staduim");
      this.dialog = false;
    },
    validateInput(value) {
      this.confirmed = false;
      if (!value) {
        return "This Field is Required";
      }
      return true;
    },
    async addStaduim() {
      if (this.rowSeats > 10) {
        this.error = "max number of seats per row is 10";
        return;
      } else if (this.rowSeats < 5) {
        this.error = "min number of seats per row is 5";
        return;
      }
      if (this.rows > 10) {
        this.error = "max number of row is 10";
        return;
      } else if (this.rowSeats < 1) {
        this.error = "min number of row is 1";
        return;
      }
      if (
        !this.name ||
        !this.city ||
        !this.address ||
        !this.rows ||
        !this.rowSeats
      ) {
        return;
      }
      this.loading = true;
      this.error = "";
      const actionPayload = {
        name: this.name,
        city: this.city,
        address: this.address,
        rows: this.rows,
        rowSeats: this.rowSeats,

        baseurl: this.$baseurl,
      };

      try {
        await this.$store.dispatch("addStaduim", actionPayload);
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
.error {
  color: red;
  font-size: 1rem;
}
</style>
