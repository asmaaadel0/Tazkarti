<template>
  <v-app>
    <the-header></the-header>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import TheHeader from "@/components/layout/TheHeader.vue";
export default {
  name: "App",
  components: {
    TheHeader,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
:root {
  --color-primary: rgb(40, 108, 8);
  --color-Primary-light: rgb(65, 154, 23);
  --color-Primary-dark: rgb(27, 80, 3);

  --color-grey-dark: #525252;
  --color-grey-dark-2: #3f3f3f;

  --color-white: #ffff;
}
</style>
