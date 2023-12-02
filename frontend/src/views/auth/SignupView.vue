<template>
  <div class="row">
    <logo-image class="child1"></logo-image>
    <div class="child2">
      <signup-component></signup-component>
    </div>
  </div>
</template>

<script>
import SignupComponent from "../../components/auth/SignupComponent.vue";
import LogoImage from "../../components/layout/LogoImage.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "RigesterPage",
  components: {
    SignupComponent,
    LogoImage,
  },
});
</script>
<style scoped>
.row {
  display: flex;
  height: auto;
  min-height: 100vh;
}
.child1 {
  flex-basis: 50%;
  width: 50%;
  text-align: center;
  background-color: var(--color-primary);
}
.child2 {
  flex-basis: 50%;
  width: 50%;
  text-align: center;
  margin-top: 2rem;
}

@media (max-width: 1100px) {
  .child1 {
    display: none;
  }
  .child2 {
    flex-basis: 100%;
    width: auto;
    padding: 0;
  }
}
</style>
