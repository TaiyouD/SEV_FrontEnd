
<template>
  <div v-if="this.role.roleType = 'Admin'">
    <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
    <v-container align="center">
      <v-toolbar>
        <v-toolbar-title>Maintain</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <br><br><br>
      <v-row>
        <v-col v-for="(card, index) in cards" :key="index" cols="6">
          <v-row justify="center">
            <v-col>
              <v-card class="elevation-10 hover" @click="$router.push(card.path)" max-width="600" height="95">
                <v-card-text class="card-text">
                  <div class="card-title">{{ card.title }}</div>
                  <v-icon class="card-icon">{{ card.icon }}</v-icon>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <br><br>
    <div class="bottom-line"></div>
  </div>
</template>

<style scoped>
.card-text {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 34px;
}

.card-title {
  font-size: 24px;
  font-weight: normal;
  width: 100%;
}

.card-icon {
  font-size: 38px;
}

.bottom-line {
  border-top: 1.5px solid black;
  margin-top: 10px;
}
</style>

<script>
import RoleServices from "../services/roleServices";
import Utils from "@/config/utils.js";
export default {
  data: () => ({
    cards: [
      { title: "Users", path: "/maintainrole", icon: "mdi-account-group" },
      { title: "Events", path: "/maintainevent", icon: "mdi-calendar-check" },
      { title: "Composers", path: "/maintaincomposer", icon: "mdi-account-music" },
      { title: "Pieces", path: "/maintainsong", icon: "mdi-playlist-music" },
      { title: "Instruments", path: "/maintaininstrument", icon: "mdi-piano" },
      { title: "Levels", path: "/maintainlevel", icon: "mdi-signal" }
    ], 
    user:{},
    role:{}
  }),
  mounted() {
      this.retrieveAvailability();
      this.user = Utils.getStore("user");
  },
  async created(){
    await this.retrieveRole();
  },
  methods: {
      async retrieveRole() {
        await RoleServices.getRoleForUser(this.user.userId)
          .then((response) => {
            this.role = response.data[0];
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
    }
};
</script>
