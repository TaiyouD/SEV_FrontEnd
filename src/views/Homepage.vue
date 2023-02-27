<template>
  
  <div >
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

      <v-card
    class="mx-auto"
    max-width="1600"
  >
    <!-- <v-system-bar
      color="indigo darken-2"
      dark
    >
      <v-spacer></v-spacer>

      <v-icon icon="mdi-window-minimize"></v-icon>

      <v-icon icon="mdi-window-maximize"></v-icon>

      <v-icon icon="mdi-close"></v-icon>
    </v-system-bar>

    <v-toolbar
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Discover</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon="mdi-magnify"></v-btn>
    </v-toolbar> -->
    
    <v-container fluid  >
      <v-row dense>
        <v-col >
        <v-carousel v-model="model" height="400">
          <v-carousel-item
            v-for="slide in slides"
          :key="slide.title"
          >
            <v-img
              :src="slide.src"
              height="400px"
         
            >
              <v-row
                class="fill-height"
                align="center"
                justify="center"
              >
                <div class="display-3"> {{ slide.title }}</div>
              </v-row>
            </v-img>
          </v-carousel-item>
        </v-carousel>
        </v-col>
        <v-col
          class= "text-white"
          v-for="card in cards"
          :key="card.title"
          :cols="card.flex">
          <v-card>
            <v-img
              :src="card.src"
              class="align-end text-white"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="400px"
              cover
              
            >
              <v-card-title class="text-white" v-text="card.title"></v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn size="small" color="surface-variant" variant="text" icon="mdi-heart"></v-btn>

              <v-btn size="small" color="surface-variant" variant="text" icon="mdi-bookmark"></v-btn>

              <v-btn size="small" color="surface-variant" variant="text" icon="mdi-share-variant"></v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
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
        slides: [
          {title: "picture 1", src: "../assets/music-notes-bg1.jpg"},
          {title: "picture 2", src: "../assets/music-notes-bg2.jpg"},
          {title: "picture 3", src: "../assets/church-window-1.jpg"},
          {title: "picture 4", src: "../assets/piano-1.jpg"},
          {title: "picture 5", src: "../assets/piano-2.jpg"},
          // 'primary',
          // 'secondary',
          // 'yellow darken-2',
          // 'red',
          // 'orange',
        ],
        cards: [
        // { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
        { title: 'Music gives life to the campus of Oklahoma Christian! Our entire campus, no matter what your major, is invited to join choir, band, orchestra and musical performances.', src: '', flex: 6 },
        { title: 'Develop your voice, advance your craft and invest your talent in musical pursuits alongside professors who value individuality and take the time to pour into students one-on-one.', src: "../assets/piano-2.jpg", flex: 12 },
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
  