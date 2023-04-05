
<template>
    <div v-if="this.role.roleType == 'Admin'">
      <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
      <v-container>
        <v-toolbar>
          <v-btn icon to="/maintain">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-toolbar-title>Piece View</v-toolbar-title>
          <v-spacer></v-spacer>
            <v-text-field v-model="search" prepend-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        </v-toolbar>
        <br />
        <v-card>
          <v-card-title>
            {{ "All Pieces" }}
            <v-icon class="ml-1">mdi-playlist-music</v-icon>
            <v-spacer></v-spacer>
            <v-btn class="mx-2" color="success" @click="addSong(id)">Add Piece</v-btn>
          </v-card-title>
          <v-card-text>
            <b>{{ message }}</b>
          </v-card-text>
          <v-data-table :headers="headers" :items="songs" :search="search" :items-per-page="5" :sort-by="['title']" :sort-desc="[false]">
            <template #item="{ item }">
              <tr>
                <td>{{ item.title }}</td>
                <td>{{ item.composer.firstName }} {{ item.composer.lastName }}</td>
                <td>{{ item.language }}</td>
                <td>{{ item.translation ? '&#10003;' : '' }}</td>
                <td>
                  <div class="d-flex justify-end">
                    <v-icon color="primary" @click="editSong(item)">mdi-pencil</v-icon>
                  </div>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-container>
    </div>
  </template>
  
  <script>
  
  import SongServices from "../services/songServices";
  import RoleServices from "../services/roleServices";
  import Utils from "@/config/utils.js";
  
  export default {
    name: "maintainsong",
    props: ["id"],
    data() {
      return {
        user:{},
        role:{},
        search: "",
        songs: [],
        message: "Add, Edit or Delete Pieces",
        headers: [
          { text: "Title", value: "title", sortable: false },
          { text: "Composer", value: "composer", sortable: false },
          { text: "Language", value: "language", sortable: false },
          { text: "Translation", value: "translation", sortable: false },
        ],
      };
    },
    mounted() {
      this.retrieveSongs();
      this.user = Utils.getStore("user");
    },
    async created() {
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
      retrieveSongs() {
        console.log("songs")
        console.log(this.songs)
        SongServices.getAll()
          .then((response) => {
            this.songs = response.data;
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      addSong() {
        this.$router.push({ name: "addsong", params: { SongId: this.id } });
      },
      editSong(song) {
        this.$router.push({ name: "editsong", params: { id: song.id } });
      },
    },
  };
  </script>