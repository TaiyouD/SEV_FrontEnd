<template>
  
    <div>
      <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
      <v-container>
      <v-toolbar>
          <v-toolbar-title>Hello!</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-title>{{this.message}}</v-toolbar-title>
      </v-toolbar>
       <!-- <br /><br /> -->
      </v-container>
    <v-container>
    <div class="border d-flex align-items-start" >
    <v-row justify="space-around">
      <!-- <v-icon @click="model--">mdi-minus</v-icon>
      {{ model }}
      <v-icon @click="model++">mdi-plus</v-icon> -->
      <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    </v-row>
    <v-carousel v-model="model" height="400">
      <v-carousel-item
        v-for="(color, i) in colors"
        :key="color"
      >
        <v-sheet
          :color="color"
          height="100%"
          tile
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="display-3">Slide {{ i + 1 }}</div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
       </div>
      </v-container>
        <v-container>

        <v-card>
          <!-- <v-card-title>
            Tutorials
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-card-text>
            <b>{{ message }}</b>
          </v-card-text>
          <v-data-table
            :headers="headers"
            :search="search"
            :items="tutorials"
            :items-per-page="50"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <div>
                <v-icon small class="mx-4" @click="editTutorial(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small class="mx-4" @click="viewTutorial(item)">
                  mdi-format-list-bulleted-type
                </v-icon>
                <v-icon small class="mx-4" @click="deleteTutorial(item)">
                  mdi-trash-can
                </v-icon>
              </div>
            </template>
          </v-data-table> -->
        </v-card>
      </v-container>
    </div>
  </template>
  
  <script>
  import TutorialServices from "../services/tutorialServices";
  import Utils from "@/config/utils.js";
  
  export default {
    name: "tutorials-list",
    data() {
      return {
        search: "",
        tutorials: [],
        currentTutorial: null,
        currentIndex: -1,
        title: "",
        user: {},
        message: "Music Department",
        headers: [
          { text: "Title", value: "title" },
          { text: "Description", value: "description" },
          { text: "Actions", value: "actions", sortable: false },
        ],
        colors: [
          'primary',
          'secondary',
          'yellow darken-2',
          'red',
          'orange',
        ],
        model: 0,
      };
    },
    mounted() {
      this.user = Utils.getStore("user");
      this.retrieveTutorials();
    },
    methods: {
      editTutorial(tutorial) {
        this.$router.push({ name: "edit", params: { id: tutorial.id } });
      },
      viewTutorial(tutorial) {
        this.$router.push({ name: "view", params: { id: tutorial.id } });
      },
      deleteTutorial(tutorial) {
        TutorialServices.delete(tutorial.id)
          .then(() => {
            this.retrieveTutorials();
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      retrieveTutorials() {
        TutorialServices.getAllForUser(this.user.userId)
          .then((response) => {
            this.tutorials = response.data;
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      refreshList() {
        this.retrieveTutorials();
        this.currentTutorial = null;
        this.currentIndex = -1;
      },
      setActiveTutorial(tutorial, index) {
        this.currentTutorial = tutorial;
        this.currentIndex = tutorial ? index : -1;
      },
      removeAllTutorials() {
        TutorialServices.deleteAll()
          .then((response) => {
            console.log(response.data);
            this.refreshList();
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
    },
  };
  </script>
  