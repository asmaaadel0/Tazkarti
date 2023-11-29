<template>
  <div class="login-box">
    <div class="header-box">
      <p class="header-text" id="login-card-title">Welcome to Tazkarti</p>
    </div>
    <div class="form-box">
      <p class="signup-text">Create Your Account</p>
      <input-form>
        <v-sheet width="500" class="mx-auto">
          <v-form ref="form">
            <v-row>
              <!-- First Line -->
              <v-col cols="12" sm="6">
                <v-text-field
                  prepend-inner-icon="mdi-account-outline"
                  label="Username"
                  required
                  class="input-label"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  type="password"
                  class="input-label"
                  prepend-inner-icon="mdi-lock-outline"
                  label="Password"
                  required
                ></v-text-field>
              </v-col>

              <!-- Second Line -->
              <v-col cols="12" sm="6">
                <v-text-field
                  prepend-inner-icon="mdi-account-outline"
                  label="First Name"
                  required
                  class="input-label"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  prepend-inner-icon="mdi-account-outline"
                  label="Last Name"
                  required
                  class="input-label"
                ></v-text-field>
              </v-col>

              <!-- Third Line -->
              <v-col cols="12" sm="6">
                <v-text-field
                  prepend-inner-icon="mdi-calendar-outline"
                  label="Birth Date"
                  required
                  class="input-label"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="gender"
                  :items="genderOptions"
                  label="Gender"
                  prepend-inner-icon="mdi-gender-male-female"
                  class="input-label"
                ></v-select>
              </v-col>

              <!-- Fourth Line -->
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Address"
                  prepend-inner-icon="mdi-map-marker"
                  class="input-label"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  prepend-inner-icon="mdi-email-outline"
                  label="Email"
                  required
                  class="input-label"
                ></v-text-field>
              </v-col>

              <!-- Fifth Line -->
              <v-col cols="12">
                <v-radio-group v-model="selectedRole">
                  <v-radio label="Manager" value="manager"></v-radio>
                  <v-radio label="Fan" value="fan"></v-radio>
                </v-radio-group>
              </v-col>

              <!-- Sixth Line -->
              <v-col cols="12">
                <v-btn type="submit" block class="mt-2 btn">Sign Up</v-btn>
              </v-col>
            </v-row>
          </v-form>
          <hr class="form-separator" />

          <p class="signup-text">
            Already have an account?
            <router-link to="/login" class="link signup-link"
              >Login</router-link
            >
          </p>
        </v-sheet>
      </input-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gender: null,
      genderOptions: ["Male", "Female", "Other"],
      selectedRole: null,
    };
  },
  // other component options...
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Inter");
.header-box {
  margin: 1rem;
}
.v-col-sm-6 {
  padding: 3px;
}
.header-text {
  color: rgb(40, 108, 8);
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
  color: #525252;
  font-family: "Poppins", sans-serif;
}
.signup-text {
  margin-bottom: 1rem;
  color: #525252;
  text-align: center;
  font-family: Poppins;
  font-size: 1rem;
  font-style: normal;
  line-height: normal;
  margin-bottom: 2rem;
}
.input-label {
  color: var(--white-gray, #494747);
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
  background: linear-gradient(134deg, rgb(40, 108, 8) 0%, rgb(40, 108, 8) 100%);
  box-shadow: 0px 8px 21px 0px rgba(0, 0, 0, 0.16);
  color: #ffff;
}
.link {
  color: var(--main-button, rgb(40, 108, 8));
  font-family: Poppins;
  font-size: 1rem;
  font-style: normal;
  font-weight: 100;
  line-height: normal;
  text-decoration: none;
}
.signup-link {
  color: rgb(40, 108, 8);
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
