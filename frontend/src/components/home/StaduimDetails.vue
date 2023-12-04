<template>
  <v-card class="staduim-card">
    <v-card-text class="text-center team-info">
      <p class="details-title"><b>Name:</b> {{ staduim.name }}</p>
    </v-card-text>
    <v-card-text class="text-center team-info">
      <p class="details-title"><b>City:</b> {{ staduim.city }}</p>
    </v-card-text>
    <v-card-text class="text-center team-info">
      <p class="details-title"><b>Address:</b> {{ staduim.address }}</p>
    </v-card-text>
    <v-card-text class="text-center team-info">
      <p class="details-title"><b>Rows:</b> {{ staduim.rows }}</p>
    </v-card-text>
    <v-card-text class="text-center team-info">
      <p class="details-title"><b>Row Seats:</b> {{ staduim.rowSeats }}</p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    staduim: {
      type: Object,
      required: true,
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
.staduim-card {
  position: relative;
  overflow: hidden;
  background: #d7dade;
  width: 20rem;
}

.team-info {
  position: relative;
}
.details-title {
  color: var(--color-primary-light);
  margin-bottom: 0.5rem;
}

b {
  color: var(--color-primary-light);
  margin-right: 0.5rem;
}
</style>
