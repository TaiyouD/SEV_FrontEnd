
<template >
  <div v-if="this.role.roleType == 'Admin'">
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
  </div>
</template>

<style scoped>
.card-text {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.card-title {
  font-size: 180%;
  font-weight: normal;
  width: 100%;
}

.card-icon {
  font-size: 270%;
}
</style>

<script>
import RoleServices from "../services/roleServices.js";
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
    role:{
      roleType:""
    },
  }),
  async created(){
    this.user = Utils.getStore("user");
    await this.retrieveRole();
  },
  methods: {
      async retrieveRole() {
        await RoleServices.getRoleForUser(this.user.userId)
          .then((response) => {
            for (let i = 0; i < response.data.length; i++){
              if (response.data[i].roleType == this.user.selectedRole) {
                this.role = response.data[i];
              }
            }
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
    }
};
</script>
