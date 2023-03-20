

<template>
    <div>
      <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
      <v-container>
        <v-toolbar>
          <v-toolbar-title>Maintain Roles</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <br><br><br><br><br>
        <v-row justify="center">
          <v-col md="4">
            <v-card class="elevation-10 hover" @click="$router.push('/viewaccompanist')">
              <v-card-title>Accompanists</v-card-title>
            </v-card>
          </v-col>
  
          <v-col md="4">
            <v-card class="elevation-10 hover" @click="$router.push('/viewcomposer')">
              <v-card-title>Composers</v-card-title>
            </v-card>
          </v-col>
  
          <v-col md="4">
            <v-card class="elevation-10 hover" @click="$router.push('/viewinstrument')">
              <v-card-title>Instruments</v-card-title>
            </v-card>
          </v-col>
  
          <v-col md="4">
            <v-card class="elevation-10 hover" @click="$router.push('/viewlevel')">
              <v-card-title>Levels</v-card-title>
            </v-card>
          </v-col>
  
          <v-col md="4">
            <v-card class="elevation-10 hover" @click="$router.push('/viewinstructor')">
              <v-card-title>Instructors</v-card-title>
            </v-card>
          </v-col>
  
          <v-col md="4">
            <v-card class="elevation-10 hover" @click="$router.push('/viewfaculty')">
              <v-card-title>Faculties</v-card-title>
            </v-card>
          </v-col>
  
          <v-col md="4">
            <v-card class="elevation-10 hover" @click="$router.push('/viewadmin')">
              <v-card-title>Admins</v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>  