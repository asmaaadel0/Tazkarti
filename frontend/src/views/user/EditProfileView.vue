<template>
  <v-container class="edit-profile-container">
    <v-row>
      <v-col cols="12" md="6" offset-md="3">
        <v-card>
          <v-card-title class="headline">Edit Profile</v-card-title>
          <v-card-text>
            <v-form>
              <v-sheet width="500" class="mx-auto">
                <v-form ref="form" @submit.prevent="saveProfile()">
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="Email"
                        outlined
                        v-model="user.emailAddress"
                        readonly
                        class="contact"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="Username"
                        outlined
                        v-model="user.userName"
                        readonly
                        class="contact"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        prepend-inner-icon="mdi-account-outline"
                        label="First Name"
                        required
                        class="input-label"
                        v-model="user.firstName"
                        :rules="[validateInput]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        prepend-inner-icon="mdi-account-outline"
                        label="Last Name"
                        required
                        class="input-label"
                        v-model="user.lastName"
                        :rules="[validateInput]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        prepend-inner-icon="mdi-calendar-outline"
                        type="date"
                        label="Birth Date"
                        class="input-label"
                        v-model="date"
                        :rules="[validateInput]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select
                        v-model="user.gender"
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
                        v-model="user.city"
                        :rules="[validateInput]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="Address (Optional)"
                        prepend-inner-icon="mdi-map-marker"
                        class="input-label"
                        v-model="user.address"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        type="password"
                        label="password"
                        prepend-inner-icon="mdi-lock-outline"
                        class="input-label"
                        v-model="user.password"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-alert v-if="confirmed" shaped type="success">
                        Stadium is added successfully
                      </v-alert>
                      <v-alert v-if="error" shaped type="error"
                        >{{ error }}
                      </v-alert>
                    </v-col>
                    <v-col cols="12">
                      <v-btn
                        type="submit"
                        block
                        class="mt-2 btn"
                        :loading="loading"
                        >Update Profile</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-form>
              </v-sheet>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      user: {
        address: "",
        isPending: "",
        _id: "",
        userName: "sdsc",
        password: "",
        firstName: "",
        lastName: "",
        birthDate: "",
        gender: null,
        city: "",
        emailAddress: "asdfg",
        role: "",
        createdIn: "",
      },
      genderOptions: ["male", "female"],
      date: "",

      error: "",
      confirmed: false,

      loading: false,
    };
  },
  async created() {
    if (localStorage.getItem("accessToken")) {
      this.loading = true;
      await this.getUser();
      this.calcDate();
    }
    this.loading = false;
  },
  beforeMount() {
    if (!localStorage.getItem("accessToken")) {
      this.$router.push("/");
    }
    this.confirmed = false;
    this.error = "";
  },
  methods: {
    calcDate() {
      const originalDateString = this.user.birthDate;

      const originalDate = new Date(originalDateString);

      const formattedDate = `${originalDate.getFullYear()}-${(
        originalDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${originalDate
        .getDate()
        .toString()
        .padStart(2, "0")}`;

      this.date = formattedDate;
    },
    validateInput(value) {
      this.confirmed = false;
      this.error = "";
      if (!value) {
        return "This field is required";
      }
      return true;
    },
    async getUser() {
      this.loading = true;
      this.confirmed = false;
      this.error = "";

      try {
        await this.$store.dispatch("getUser", {
          baseurl: this.$baseurl,
          id: localStorage.getItem("id"),
        });
      } catch (error) {
        this.error = error.message || "Something went wrong";
        if (error.message == "Server Error") {
          this.$router.push("/internal-server-error");
        }
      }
      this.user = this.$store.getters["user"];
      this.loading = false;
      this.confirmed = true;
    },
    async saveProfile() {
      if (
        !this.user.userName ||
        !this.user.password ||
        !this.user.firstName ||
        !this.user.lastName ||
        !this.user.birthDate ||
        !this.user.gender ||
        !this.user.city ||
        !this.user.emailAddress ||
        !this.user.address
      ) {
        return;
      }
      this.loading = true;
      this.confirmed = false;
      this.error = "";

      const actionPayload = {
        userName: this.user.userName,
        password: this.user.password,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        birthDate: this.user.birthDate,
        gender: this.user.gender,
        city: this.user.city,
        address: this.user.address,
        emailAddress: this.user.emailAddress,

        baseurl: this.$baseurl,
      };
      try {
        await this.$store.dispatch("editUser", actionPayload);
      } catch (err) {
        this.error = err.message;
        this.loading = false;
        return;
      }

      this.loading = false;
      this.confirmed = true;
    },
  },
};
</script>

<style scoped>
.edit-profile-container {
  margin-top: 20px;
}
.btn,
.headline {
  color: var(--color-primary);
}
.contact {
  color: black;
}
.error {
  color: red;
  font-size: 1rem;
}
</style>
