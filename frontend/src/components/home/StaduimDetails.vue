<template>
  <v-card class="staduim-card">
    <v-card-text class="text-center match-day">
      <v-img
        src="@/assets/small-stadium.jpg"
        alt="Home Image"
        class="home-image"
      ></v-img>
      <div class="text-block">
        <h3>Staduim: {{ index + 1 }}</h3>
      </div>
    </v-card-text>
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
    index: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.match-day {
  position: relative;
  background: rgba(255, 255, 255, 0.7);
  padding: 8px;
}
.text-block {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: var(--color-white);
}
.margin-top {
  margin-top: 1rem;
}
.center {
  text-align: center;
}
.staduim-card {
  position: relative;
  overflow: hidden;
  width: 20rem;
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
.details-title {
  color: var(--color-white);
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

b {
  color: var(--color-white);
  margin-right: 0.5rem;
}
</style>
