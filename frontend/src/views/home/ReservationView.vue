<template>
  <v-container fluid>
    <div class="home">
      <v-img
        src="@/assets/staduim2.jpg"
        alt="Home Image"
        class="home-image"
      ></v-img>
      <div class="text-block">
        <h1>Welcome To Tazkarti Website</h1>
        <p>Here you can reserve your tickets.</p>
      </div>
    </div>
    <reservation-component></reservation-component>
  </v-container>
</template>
<script>
import ReservationComponent from "../../components/home/ReservationComponent.vue";
export default {
  components: {
    ReservationComponent,
  },
};
</script>

<style scoped>
.home-image {
  width: 90%;
  max-height: 90%;
  object-fit: cover;
  object-position: 50% 55%;
  opacity: 90%;
  filter: brightness(60%);
  border-radius: 50px;
  display: block;
  margin: 10px auto;
}
.home {
  position: relative;
}

.text-block {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.text-block h1 {
  color: var(--color-white);
  font-size: 46px;
  line-height: 56px;
  font-weight: bold;
  font-family: "IBM Plex Sans", sans-serif;
  border-width: 10px;
  border-color: black;
}

.text-block p {
  color: var(--color-white);
  font-size: 20px;
  line-height: 56px;
  font-family: "IBM Plex Sans", sans-serif;
  border-width: 10px;
  border-color: black;
}

@media (max-width: 625px) {
  .text-block h1 {
    font-size: 30px;
  }
  .text-block p {
    font-size: 15px;
  }
}
</style>
