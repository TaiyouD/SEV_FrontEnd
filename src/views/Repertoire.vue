<template>
    <div>
      <v-container>
        <v-toolbar>
          <v-toolbar-title>My Repertoire</v-toolbar-title>
          <!-- <v-spacer></v-spacer>
          <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
        </v-toolbar>
        <br />
        <h3>Voice/Instrument: {{ instrumentId }} 
        <dropdown
          title="Select a Voice/Instrument"
          text="Click to filter"
          :items-drop="[
            {text: 'Item 1'},
            {text: 'Item 2'}
          ]">
        </dropdown>
        </h3> <!--make it select a drop down box-->
        <h4>Instructor: {{ accompanistId }}</h4>
        <br /><br />
        <v-card>
          <v-card-title>
            Repertoire
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
            :items="songs"
            :items-per-page="50"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <div>
                <v-icon small class="mx-4" @click="editSong(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small class="mx-4" @click="viewSong(item)">
                  mdi-format-list-bulleted-type
                </v-icon>
                <v-icon small class="mx-4" @click="deleteSong(item)">
                  mdi-trash-can
                </v-icon>
              </div>
            </template>
          </v-data-table>
        </v-card>
      </v-container>
    </div>
  </template>
  
  <script>
  import SongServices from "../services/songServices";
  import Utils from "@/config/utils.js";

  export default {
    name: "repertoire-list",
    data() {
      return {
        search: "",
        songs: [],
        currentRepertoire: null,
        currentIndex: -1,
        title: "",
        user: {},
        message: "Search, Edit or Delete Songs",
        headers: [
          { text: "Song Title", value: "song_title" },
          { text: "Composer", value: "composer" },
          { text: "Date Added", value: "date_added"}
        ]
      };
    },
    mounted() {
      this.user = Utils.getStore("user");
      this.retrieveSongs();
    },
    methods: {
      editSong(song) {
        this.$router.push({ name: "edit", params: { id: song.id } });
      },
      viewSong(song) {
        this.$router.push({ name: "view", params: { id: song.id } });
      },
      deleteSong(song) {
        SongServices.delete(song.id)
          .then(() => {
            this.retrieveSongs();
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      retrieveSongs() {
        SongServices.getAllForUser(this.user.userId)
          .then((response) => {
            this.songs = response.data;
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      refreshList() {
        this.retrieveSongs();
        this.currentSong = null;
        this.currentIndex = -1;
      },
      setActiveSong(song, index) {
        this.currentSong = song;
        this.currentIndex = song ? index : -1;
      },
      removeAllSongs() {
        SongServices.deleteAll()
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
  