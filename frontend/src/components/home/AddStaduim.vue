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
            <p class="error" v-if="error != ''">
              {{ error }}
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
  watch: {
    addStaduimDialog(newVal) {
      this.dialog = newVal;
    },
  },
  data() {
    return {
      dialog: this.addStaduimDialog,
      counts: 10,

      error: "",
      loading: false,

      name: "",
      city: "",
      address: "",
      rows: "",
      rowSeats: "",
    };
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
      if (!value) {
        return "This Field is Required";
      }
      return true;
    },
    async addStaduim() {
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
      this.closeAddStaduim();
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
