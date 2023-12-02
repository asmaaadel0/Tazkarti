<template>
  <v-container class="edit-profile-container">
    <v-row>
      <v-col cols="12" md="6" offset-md="3">
        <v-card>
          <v-card-title class="headline">Edit Profile</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="saveProfile">
              <v-row>
                <v-col>
                  <v-subheader>Contact Information</v-subheader>
                  <v-text-field
                    label="Email"
                    outlined
                    v-model="user.emailAddress"
                    readonly
                  ></v-text-field>
                  <v-text-field
                    label="Username"
                    outlined
                    v-model="user.userName"
                    readonly
                  ></v-text-field>
                  <v-subheader>Personal Information</v-subheader>
                  <v-text-field
                    label="First Name"
                    outlined
                    v-model="user.firstName"
                  ></v-text-field>
                  <v-text-field
                    label="Last Name"
                    outlined
                    v-model="user.lastName"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-btn type="submit" class="btn">Save Profile</v-btn>
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
        gender: "",
        city: "",
        emailAddress: "asdfg",
        role: "",
        createdIn: "",
      },

      loading: false,
    };
  },
  async created() {
    if (localStorage.getItem("accessToken")) {
      this.loading = true;
      // await this.getUser();
    }
    this.loading = false;
  },
  methods: {
    async getUser() {
      this.loading = true;

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
    },
    saveProfile() {
      console.log("Profile saved:", this.user);
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
</style>
