<template>
  <v-container fluid>
    <v-row class="matches">
      <v-col v-for="match in matches" :key="match.id">
        <match-details :match="match"></match-details>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MatchDetails from "./MatchDetails.vue";
export default {
  components: {
    MatchDetails,
  },
  data() {
    return {
      matches: [
        {
          id: 1,
          date: "2023-12-01",
          team1: { name: "Team A", image: "../../assets/teamA.png" },
          team2: { name: "Team B", image: "../../assets/teamA.png" },
          time: "01:00",
          venue: "Cairo",
          referee: "Ahmed",
          linesmen: ["Adel", "Osama"],
        },
        {
          id: 2,
          date: "2023-12-01",
          team1: { name: "Team A", image: "../../assets/teamA.png" },
          team2: { name: "Team B", image: "../../assets/teamA.png" },
          time: "01:00",
          venue: "Cairo",
          referee: "Ahmed",
          linesmen: ["Adel", "Osama"],
        },
        {
          id: 3,
          date: "2023-12-01",
          team1: { name: "Team A", image: "../../assets/teamA.png" },
          team2: { name: "Team B", image: "../../assets/teamA.png" },
          time: "01:00",
          venue: "Cairo",
          referee: "Ahmed",
          linesmen: ["Adel", "Osama"],
        },
        {
          id: 4,
          date: "2023-12-01",
          team1: { name: "Team A", image: "../../assets/teamA.png" },
          team2: { name: "Team B", image: "../../assets/teamA.png" },
          time: "01:00",
          venue: "Cairo",
          referee: "Ahmed",
          linesmen: ["Adel", "Osama"],
        },
        {
          id: 5,
          date: "2023-12-01",
          team1: { name: "Team A", image: "../../assets/teamA.png" },
          team2: { name: "Team B", image: "../../assets/teamA.png" },
          time: "01:00",
          venue: "Cairo",
          referee: "Ahmed",
          linesmen: ["Adel", "Osama"],
        },
      ],
    };
  },
};
</script>

<style scoped>
.v-col {
  flex-grow: 0;
}
.matches {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: flex-start;
  gap: 10px;
  margin: auto;
}
</style>
