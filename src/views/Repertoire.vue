<template>
    <div>
      <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
      <v-container>
        <v-toolbar>
          <v-toolbar-title>My Repertoire</v-toolbar-title>
          <!-- <v-spacer></v-spacer>
          <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
        </v-toolbar>
        <br />
        <div class="d-flex align-center">
          <h4 class="mr-3">Voice/Instrument: </h4>
          <v-select v-if="showDropdown" 
              :items="instrumentRole.instrumentId"
              item-tile="Instrument"
              item-value="type" 
              return-object
              single-line
              label="Select Voice/Instrument"
              v-model="instrumentRole.instrumentId"
          ></v-select>
        <div v-else>
            {{ instrumentRole.instrumentId[0] }}
        </div>
        </div>
        <h4>Instructor: {{ instrumentRole.privateInstructortId }}</h4> <!--Como pegar o nome?-->
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
        <br>
        <router-link to="/addpiecerepertoire" tag="v-btn">
          <v-btn color="primary" class="mr-4">
              Add Piece
          </v-btn>
          </router-link>
      </v-container>
    </div>
  </template>
  
  <script>
  import RepertoireSongServices from "../services/repertoireSongServices";
  import Utils from "@/config/utils.js";
  import instrumentRoleServices from "../services/instrumentRoleServices";
  import instrumentServices from "../services/instrumentServices";

  export default {
    name: "repertoire-list",
    props: [],
    data() {
      return {
        instrumentRole: {
          id: null,
          instrumentId: [],
          privateInstructortId: "",
          accompanistId: ""
        },
        instrument: {
          id: null,
          type: "", 
          isVoice: ""
        },
        search: "",
        songs: [],
        currentRepertoire: null,
        currentIndex: -1,
        user: {},
        message: "Search, Edit or Delete Pieces",
        headers: [
          { text: "Piece Title", value: "title" },
          { text: "Composer", value: "composer" },
          { text: "Semester", value: "semester"}
        ]
      };
    },
    computed: {
    showDropdown() {
      return this.instrumentRole.instrumentId.length > 1;
      }
   },
    mounted() {
      this.user = Utils.getStore("user"); 
      this.instrumentRole = instrumentRoleServices.getAllForUser(this.id);
      this.instrument = instrumentServices.getAll();
      this.retrieveSongs();
    },
    methods: {
      editSong(song) {
        this.$router.push({ name: "edit", params: { id: song.id } }); //ter isso? ou criar pág pra isso
      },
      viewSong(song) {
        this.$router.push({ name: "view", params: { id: song.id } });// mesmo de cima
      },
      deleteSong(song) {
        RepertoireSongServices.delete(song.id)
          .then(() => {
            this.retrieveSongs();
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      retrieveSongs() {
        RepertoireSongServices.getAllForUser(this.user.userId)
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
        RepertoireSongServices.deleteAll()
          .then((response) => {
            console.log(response.data);
            this.refreshList();
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      /*
      onSelect() {
      this.selectedItem = null;
      }*/
    }
  };
  </script>

<style>

</style>
  