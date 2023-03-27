
<template>
  <div>
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
              <v-card class="elevation-10 hover" @click="$router.push(card.path)" max-width="600" height="150">
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
  margin-top: 20px;
}
</style>

<script>
export default {
  data: () => ({
    cards: [
      { title: "Composers", path: "/maintaincomposer", icon: "mdi-music-note" },
      { title: "Instruments", path: "/maintaininstrument", icon: "mdi-guitar-electric" },
      { title: "Levels", path: "/maintainlevel", icon: "mdi-numeric-3-box-multiple-outline" },
      { title: "Roles", path: "/maintainrole", icon: "mdi-account-group" }
    ]
  })
};
</script>
