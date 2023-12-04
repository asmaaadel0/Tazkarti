<template>
  <div class="row">
    <div class="child1">test</div>
    <div class="child2">test</div>
  </div>
</template>
<script>
export default {
  beforeMount() {
    if (localStorage.getItem("role") != "admin") {
      this.$router.push("/");
    }
  },
};
</script>

<style scoped>
.row {
  display: flex;
  height: auto;
  min-height: 100vh;
}
.child1 {
  flex-basis: 30%;
  width: 30%;
  text-align: center;
  background-color: var(--color-primary);
}
.child2 {
  flex-basis: 70%;
  width: 70%;
  text-align: center;
  margin-top: 5rem;
}

@media (max-width: 500px) {
  .row {
    flex-direction: column;
  }
}
</style>
