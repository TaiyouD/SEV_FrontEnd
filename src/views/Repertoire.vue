<template>
    <div v-if="this.role.roleType != null">
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
              :items="instrumentRole"
              item-tile="Instrument"
              item-text="instrument.type" 
              return-object
              single-line
              label="Select Voice/Instrument"
              @change="retrieveInstructor"
              v-model="selected"
          ></v-select>
        <div v-else>
            {{ instrumentRole[0].instrument.type }} 
        </div>
        </div>
        <h4>Instructor: {{ instructorRole.user.fName }} {{ instructorRole.user.lName }}</h4> 
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
            :items="repertoireSongs"
            :items-per-page="50"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <div>
                <v-icon small class="mx-4" @click="editSong()">
                  mdi-pencil
                </v-icon>

                <v-icon small class="mx-4" @click="deleteSong(item)">
                  mdi-trash-can
                </v-icon>
              </div>
            </template>
          </v-data-table>
        </v-card>
        <br>
        <router-link to="/addpiecerepertoire">
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
  import RoleServices from "../services/roleServices";
  import instrumentRoleServices from "../services/instrumentRoleServices";

  export default {
    name: "repertoire-list",
    props: [],
    data() {
      return {
        view_dialog: false,
        instrumentRole: {
          id: null,
          instrument: {
            type:""
          },
          song: {},
          privateInstructortId: "",
          accompanistId: ""
        },
        selected: [],
        search: "",
        role:{},
        instructorRole:{
          user:{
            fName:"",
            lName:""
          }
        },
        repertoireSongs: [],
        currentRepertoire: null,
        currentIndex: -1,
        user: {},
        composer: {},
        message: "Search, Edit or Delete Pieces",
        headers: [
          { text: "Piece Title", value: "song.title" },
          { text: "Composer", value: "song.composer.lastName" },
          { text: "Semester", value: "semester"},
          { text: "Actions", value: "actions", sortable: false }
        ]
      };
    },
    computed: {
    showDropdown() {
      return this.instrumentRole.length > 1;
      }
   },
    async created() {
      this.user = Utils.getStore("user");
      await this.retrieveRole();
      await this.retrieveInstrumentRoles();
      await this.retrieveSongs();
      if(this.instrumentRole.length <= 1){
          await this.retrieveInstructorOneInstrument();
      }
    },
    methods: {
      editSong(song) {
        this.$router.push({ name: "edit", params: { id: song.id } }); //ter isso? ou criar pág pra isso
      },
       viewSong() {
         //this.$router.push({ name: "view", params: { id: song.id } });// mesmo de cima
          this.edit_dialog = false;
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
      async retrieveRole() {
        await RoleServices.getRoleForUser(this.user.userId)
          .then((response) => {
            this.role = response.data[0];
            /*this.roleId2 = this.role.map(function(el) {
                return el.id;});*/
            console.log('role');
            console.log(this.role);
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      async retrieveInstrumentRoles() {
        /*var roleId2 = this.role.map(function(el) {
            return el.id;});
          console.log('role');   */ 
        await instrumentRoleServices.getAllForUser(this.role.id)
          .then((response) => {
            this.instrumentRole = response.data;
            console.log('instrumentRole');
            console.log(this.instrumentRole);
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      async retrieveSongs() {
        await RepertoireSongServices.getAllForUser(this.role.id)
          .then((response) => {
            this.repertoireSongs = response.data;
            console.log('song');
            console.log(this.repertoireSongs);
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      async retrieveInstructor() {
        console.log("instructor id")
        console.log(this.selected)
        console.log(this.instrumentRole[0].privateInstructorId)
        await RoleServices.get(this.selected.privateInstructorId)
          .then((response) => {
            this.instructorRole = response.data;
            /*this.roleId2 = this.role.map(function(el) {
                return el.id;});*/
            console.log('instructor');
            console.log(this.instructorRole);
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      async retrieveInstructorOneInstrument() {
          console.log("instructor id")
          console.log(this.instrumentRole[0].privateInstructorId)
          await RoleServices.get(this.instrumentRole[0].privateInstructorId)
            .then((response) => {
              this.instructorRole = response.data;
              /*this.roleId2 = this.role.map(function(el) {
                  return el.id;});*/
              console.log('instructor');
              console.log(this.instructorRole);
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
      }
    }
  };
  </script>

<style>

</style>
  