<template>
  <div class="row">
    <!-- <div class="child1">test</div>
    <div class="child2">test</div> -->
    <v-container>
      <v-list>
        <v-list-item-group v-for="(userList, index) in userLists" :key="index">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="headline">{{
                userList.title
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            v-for="(user, userIndex) in userList.users"
            :key="userIndex"
          >
            <v-list-item-content>
              <v-list-item-title>{{ user.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-container>
  </div>
</template>
<script>
export default {
  beforeMount() {
    if (localStorage.getItem("role") != "admin") {
      this.$router.push("/");
    }
  },
  data() {
    return {
      userLists: [
        {
          title: "Admins",
          users: [
            { name: "Admin 1", email: "admin1@example.com" },
            { name: "Admin 2", email: "admin2@example.com" },
          ],
        },
        {
          title: "Moderators",
          users: [
            { name: "Moderator 1", email: "moderator1@example.com" },
            { name: "Moderator 2", email: "moderator2@example.com" },
          ],
        },
        // Add more lists as needed
      ],
    };
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
  flex-basis: 50%;
  width: 50%;
  text-align: center;
  background-color: var(--color-primary);
}
.child2 {
  flex-basis: 50%;
  width: 50%;
  text-align: center;
  margin-top: 5rem;
}

@media (max-width: 500px) {
  .row {
    flex-direction: column;
  }
}
</style>
