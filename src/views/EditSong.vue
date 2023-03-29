
<template>
    <div>
      <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
      <v-container>
        <v-toolbar>
          <v-toolbar-title>Edit Piece</v-toolbar-title>
        </v-toolbar>
        <br />
        <h4>{{ message }}</h4>
        <br />
        <v-form ref="form" v-model="valid" lazy validation>
          <v-text-field
            v-model="song.title"
            id="title"
            label="Title"
            required
          ></v-text-field>
          <v-select 
            v-model="song.language"
            clearable
            :items="countries"
            item-title="title"
            item-text="title"
            item-value="code"
            label="Language"
            return-object
            single-line
          ></v-select>
          <v-textarea
            v-model="song.translation"
            id="translation"
            label="Translation"
            required
            rows="2"
            cols="5"
          ></v-textarea>
          
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="updateSong()"
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
  
  export default {
    name: "editsong",
    props: ['id'],
  data() {
    return {
      song: {
        title: '',
        language: '',
        translation: ''
      },
      message: '',
      valid: false
    }
  },
  mounted() {
    this.getSong(this.id);
  },
  methods: {
      getSong(id) {
        SongServices.get(id)
          .then(response => {
            this.song = response.data;
          })
          .catch(e => {
            this.message = e.response.data.message;
          });
      },
      updateSong() {
        SongServices.update(this.id, this.song)
          .then(() => {
            this.message = 'The Piece was updated successfully!';
          })
          .catch(e => {
            this.message = e.response.data.message;
          });
          this.$router.go(-1);
      },
      cancel() {
        this.$router.go(-1);
      }
    }
  };
  </script>