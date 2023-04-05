<template>
<div v-if="this.role.roleType != null">
  <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
  <v-container>
    <v-toolbar>
      <v-toolbar-title>Add Piece to Repertoire</v-toolbar-title>
    </v-toolbar>
    <br />
    <h4>{{ message }}</h4>
    <br />
    <v-form ref="form" v-model="valid" lazy validation>
      <v-autocomplete
      v-model="select"
      :search-input.sync="search"
      :loading="loading"
      :items="song"
      item-text="title"
      class="mr-4"
      density="comfortable"
      hide-no-data
      hide-details
      label="Title"
      single-line
      return-object
      required
      ></v-autocomplete>
      <br>
    <router-link to="/addsong" >
    <v-btn color="primary" class="mr-4">
        Missing Piece?
    </v-btn>
    </router-link>
    <br><br>

    <v-text-field
    v-model="repertoireSong.semester"
    id="semester"
    :counter="15"
    label="Current Semester. Example: Spring 2023"
    required
    ></v-text-field>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="saveSongRepertoire()"
      >
        Save
      </v-btn>

      <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
    </v-form>
  </v-container>
</div>
</template>

<script>
import SongServices from "../services/songServices";
import RepertoireSongServices from "../services/repertoireSongServices";
import Utils from "@/config/utils.js";
import RoleServices from "../services/roleServices";
export default {
name: "add-piece-repertoire",
data() {
  return {
    valid: true,
    loading: false,
    search: null,
    select: null,
    repertoireSong: {
      id: null,
      semester: ""
    },
    message: "Enter data and click save",
    song: [],
    user:{},
    role:{}
  };
},
mounted() {
  this.user = Utils.getStore("user");
},
async created(){
  const result = await SongServices.getAll();
  this.song = result.data;
  await this.retrieveRole();
},/*
watch: {
    search (val) {
      val && val !== this.select && this.querySelections(val)
    }
  },*/
methods: {
  getSongs(){
    return SongServices.getAll();
  },/*
  querySelections (v) {
        console.log("song2");
        console.log(this.song[this.select.id-1].title);
        this.loading = true
        console.log(this.select.title);
        // Simulated ajax query
        setTimeout(() => {
          this.select = this.song.title.filter(e => {
            return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          })
          this.loading = false
        }, 500)
  },*/
  async retrieveRole() {
      await RoleServices.getRoleForUser(this.user.userId)
        .then((response) => {
          this.role = response.data[0];
          console.log('role');
          console.log(this.role.id);
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  saveSongRepertoire() {
    var data = {
      semester: this.repertoireSong.semester,
      songId: this.select.id,
      studentId: this.role.id
    };
    RepertoireSongServices.create(data)
      .then((response) => {
        this.repertoireSong.id = response.data.id;
        console.log("add " + response.data);
        this.$router.push({ name: "repertoire"});
      })
      .catch((e) => {
        this.message = e.response.data.message;
      });
  },
  cancel() {
    this.$router.push({ name: "repertoire"});
  },
},
};
</script>
<style></style>