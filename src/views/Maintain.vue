

<template>
    <div>
      <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
      <v-container>
        <v-toolbar>
          <v-toolbar-title>Maintain</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <br><br><br><br><br>
        <v-row justify="center">
          <v-col md="4">
            <v-card class="elevation-10 hover" @click="$router.push('/maintaincomposer')">
              <v-card-title>Composers</v-card-title>
            </v-card>
          </v-col>
  
          <v-col md="4">
            <v-card class="elevation-10 hover" @click="$router.push('/maintaininstrument')">
              <v-card-title>Instruments</v-card-title>
            </v-card>
          </v-col>
  
          <v-col md="4">
            <v-card class="elevation-10 hover" @click="$router.push('/maintainlevel')">
              <v-card-title>Levels</v-card-title>
            </v-card>
          </v-col>
  
          <v-col md="4">
            <v-card class="elevation-10 hover" @click="$router.push('/maintainrole')">
              <v-card-title>Roles</v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>  