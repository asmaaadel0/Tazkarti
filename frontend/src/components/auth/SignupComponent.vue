<template>
  <div class="login-box">
    <div class="header-box">
      <p class="header-text" id="login-card-title">Welcome to Tazkarti</p>
    </div>
    <div class="form-box">
      <p class="signup-text">Create Your Account</p>
      <v-form>
        <v-sheet width="500" class="mx-auto">
          <v-form ref="form" @submit.prevent="signup()">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  prepend-inner-icon="mdi-account-outline"
                  label="Username"
                  required
                  class="input-label"
                  v-model="username"
                  :rules="[validateInput]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  type="password"
                  class="input-label"
                  prepend-inner-icon="mdi-lock-outline"
                  label="Password"
                  required
                  v-model="password"
                  :rules="[validatePassword]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  prepend-inner-icon="mdi-account-outline"
                  label="First Name"
                  required
                  class="input-label"
                  v-model="firstName"
                  :rules="[validateInput]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  prepend-inner-icon="mdi-account-outline"
                  label="Last Name"
                  required
                  class="input-label"
                  v-model="lastName"
                  :rules="[validateInput]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  prepend-inner-icon="mdi-calendar-outline"
                  type="date"
                  label="Birth Date"
                  class="input-label"
                  v-model="birthDate"
                  :rules="[validateInput]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="gender"
                  :items="genderOptions"
                  label="Gender"
                  prepend-inner-icon="mdi-gender-male-female"
                  class="input-label"
                  :rules="[validateInput]"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="city"
                  prepend-inner-icon="mdi-map-marker"
                  class="input-label"
                  v-model="city"
                  :rules="[validateInput]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Address (Optional)"
                  prepend-inner-icon="mdi-map-marker"
                  class="input-label"
                  v-model="address"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  prepend-inner-icon="mdi-email-outline"
                  label="Email"
                  required
                  class="input-label"
                  v-model="email"
                  :rules="[validateInput] && [validateEmail]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-radio-group v-model="selectedRole" :rules="[validateInput]">
                  <v-radio label="Manager" value="manager"></v-radio>
                  <v-radio label="Fan" value="fan"></v-radio>
                </v-radio-group>
              </v-col>
              <p class="error" v-if="errorUserName != ''">
                {{ errorUserName }}
              </p>
              <v-col cols="12">
                <v-btn type="submit" block class="mt-2 btn" :loading="loading"
                  >Sign Up</v-btn
                >
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
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      birthDate: "",
      gender: null,
      genderOptions: ["Male", "Female", "Other"],
      city: "",
      address: "",
      email: "",
      selectedRole: null,

      errorUserName: "",

      loading: false,
    };
  },

  methods: {
    validateInput(value) {
      if (!value) {
        return "This field is required";
      }
      return true;
    },
    validateEmail(value) {
      if (/^[a-zA-Z0-9\\/*+;&%?#@!^()_="\-:~`|[\]{}\s]*$/i.test(value)) {
        return "Enter valid Email";
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
    async signup() {
      // console.log(this.username);
      // console.log(this.password);
      // console.log(this.firstName);
      // console.log(this.lastName);
      // console.log(this.birthDate);
      // console.log(this.gender);
      // console.log(this.city);
      // console.log(this.address);
      // console.log(this.email);
      // console.log(this.selectedRole);
      if (
        !this.username ||
        !this.password ||
        !this.firstName ||
        !this.lastName ||
        !this.birthDate ||
        !this.gender ||
        !this.city ||
        !this.email ||
        !this.selectedRole
      ) {
        return;
      }
      this.loading = true;
      this.errorUserName = "";
      const actionPayload = {
        userName: this.username,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        birthDate: this.birthDate,
        gender: this.gender,
        city: this.city,
        address: this.address,
        emailAddress: this.email,
        role: this.selectedRole,

        baseurl: this.$baseurl,
      };
      try {
        const response = await this.$store.dispatch("signup", actionPayload);
        if (response.status == 200) {
          this.$router.replace("/matches");
        }
      } catch (err) {
        this.errorUserName = err;
      }

      this.loading = false;
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
.v-col-sm-6 {
  padding: 3px;
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
.signup-text {
  margin-bottom: 1rem;
  color: var(--color-grey-dark);
  text-align: center;
  font-family: Poppins;
  font-size: 1rem;
  font-style: normal;
  line-height: normal;
  margin-bottom: 2rem;
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
.link {
  color: var(--main-button, var(--color-primary));
  font-family: Poppins;
  font-size: 1rem;
  font-style: normal;
  font-weight: 100;
  line-height: normal;
  text-decoration: none;
}
.signup-link {
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
