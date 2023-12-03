<template>
  <div class="login-box">
    <div class="header-box">
      <p class="header-text" id="login-card-title">Welcome Back to Tazkarti</p>
    </div>
    <div class="form-box">
      <p class="signin-text">Sign in to your account</p>
      <v-form>
        <v-sheet width="320" class="mx-auto">
          <v-form ref="form" @submit.prevent="login()">
            <v-text-field
              prepend-inner-icon="mdi-account-outline"
              label="Username"
              required
              class="input-label"
              v-model="username"
              :rules="[validateUsername]"
            ></v-text-field>
            <v-text-field
              type="password"
              class="input-label"
              prepend-inner-icon="mdi-lock-outline"
              label="Password"
              required
              v-model="password"
              :rules="[validatePassword]"
            ></v-text-field>
            <p class="error" v-if="error != ''">
              {{ error }}
            </p>
            <v-btn type="submit" block class="mt-2 btn" :loading="loading"
              >Sign In</v-btn
            >
          </v-form>
          <hr class="form-separator" />

          <p class="signin-text">
            Don't have an account? please
            <router-link to="/signup" class="link signin-link"
              >Sign Up</router-link
            >
          </p>
        </v-sheet></v-form
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",

      error: "",
      loading: false,
    };
  },
  methods: {
    validateUsername(value) {
      if (!value) {
        return "Username is required";
      }
      return true;
    },
    validatePassword(value) {
      if (!value) {
        return "Password is required";
      }
      if (value.length < 8) {
        return "Password must be more than 8 charachters";
      }
      return true;
    },

    async login() {
      if (!this.username || !this.password) {
        return;
      }
      this.loading = true;
      this.error = "";
      const actionPayload = {
        userName: this.username,
        password: this.password,

        baseurl: this.$baseurl,
      };
      try {
        await this.$store.dispatch("login", actionPayload);
      } catch (err) {
        this.error = err.message;
        this.loading = false;
        return;
      }

      this.loading = false;
      this.$router.replace("/matches");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Inter");
.error {
  color: red;
  font-size: 1rem;
}
.header-box {
  margin: 1rem;
}
.header-text {
  color: var(--color-primary);
  text-align: center;
  font-family: Poppins;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
}
.sub-header-text {
  font-size: 1rem;
  margin-bottom: 1rem;
  font-weight: 400;
  color: var(--color-grey-dark);
  font-family: "Poppins", sans-serif;
}
.signin-text {
  margin-bottom: 1rem;
  color: var(--color-grey-dark);
  text-align: center;
  font-family: Poppins;
  font-size: 1rem;
  font-style: normal;
  line-height: normal;
  margin-bottom: 3rem;
}
.input-label {
  color: var(--color-grey-dark-2);
  font-family: Poppins;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border-radius: 0.25rem;
  background: rgba(240, 237, 255, 0.2);
  width: 100%;
  flex-shrink: 0;
  text-align: start;
  align-items: start;
}
.btn {
  border-radius: 8px;
  background: linear-gradient(
    134deg,
    var(--color-primary) 0%,
    var(--color-primary) 100%
  );
  box-shadow: 0px 8px 21px 0px rgba(0, 0, 0, 0.16);
  color: var(--color-white);
}
.forgot-password-container {
  text-align: right;
  margin-bottom: 1rem;
}

.link {
  color: var(--color-primary);
  font-family: Poppins;
  font-size: 1rem;
  font-style: normal;
  font-weight: 100;
  line-height: normal;
  text-decoration: none;
}
.signin-link {
  color: var(--color-primary);
  font-weight: 400;
}
.form-separator {
  border: none;
  border-top: 1px solid #baa2f9;
  margin: 20px 0;
}
.error-field {
  margin-bottom: 2rem;
}
.v-input__details {
  display: none !important;
}
</style>
