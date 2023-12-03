<template>
  <div class="not-found-user-page-container">
    <div class="not-found-user-page-box">
      <div class="not-found-logo">
        <v-img src="../assets/not-found.jpg" alt="not found" />
      </div>
      <div class="header-content">
        <p>404 - Not Found.</p>
      </div>
      <div class="paragraph-content">
        <p>Sorry, the page you are looking for does not exist.</p>
      </div>
      <div>
        <v-btn class="btn" @click="$router.push('/matches')">Go Home</v-btn>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
p {
  margin: 0;
  padding: 0;
}
.not-found-user-page-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
}
.not-found-logo,
.not-found-logo img {
  width: 200px;
  height: 200px;
}
.not-found-user-page-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.header-content {
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  color: #1c1c1c;
  margin-top: 32px;
  margin-bottom: 20px;
}
.paragraph-content {
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: #1c1c1c;
  margin-top: 0;
  margin-bottom: 32px;
}
.btn {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.go-home-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 9999px;
  background-color: var(--main-white-color);
  z-index: 55;
  opacity: 0;
}
.go-home-button:hover::before {
  opacity: 0.08;
}
.user-agreement {
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  color: #878a8c;
  margin-top: 15px;
  text-align: center;
  margin: 0 auto;
  max-width: 100%;
  padding: 36px 0;
  width: 476px;
}
</style>
