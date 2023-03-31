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
              id="language"
              label="Language"
              required
              :items="[{ text: 'Afrikaans', value: 'Afrikaans' },
                      { text: 'Albanian', value: 'Albanian' },
                      { text: 'Arabic', value: 'Arabic' },
                      { text: 'Armenian', value: 'Armenian' },
                      { text: 'Azerbaijani', value: 'Azerbaijani' },
                      { text: 'Basque', value: 'Basque' },
                      { text: 'Belarusian', value: 'Belarusian' },
                      { text: 'Bulgarian', value: 'Bulgarian' },
                      { text: 'Catalan', value: 'Catalan' },
                      { text: 'Chinese (Simplified)', value: 'Chinese (Simplified)' },
                      { text: 'Chinese (Traditional)', value: 'Chinese (Traditional)' },
                      { text: 'Croatian', value: 'Croatian' },
                      { text: 'Czech', value: 'Czech' },
                      { text: 'Danish', value: 'Danish' },
                      { text: 'Dutch', value: 'Dutch' },
                      { text: 'English', value: 'English' },
                      { text: 'Estonian', value: 'Estonian' },
                      { text: 'Filipino', value: 'Filipino' },
                      { text: 'Finnish', value: 'Finnish' },
                      { text: 'French', value: 'French' },
                      { text: 'German', value: 'German' },
                      { text: 'Greek', value: 'Greek' },
                      { text: 'Hungarian', value: 'Hungarian' },
                      { text: 'Indonesian', value: 'Indonesian' },
                      { text: 'Irish', value: 'Irish' },
                      { text: 'Italian', value: 'Italian' },
                      { text: 'Japanese', value: 'Japanese' },
                      { text: 'Korean', value: 'Korean' },
                      { text: 'Lithuanian', value: 'Lithuanian' },
                      { text: 'Malay', value: 'Malay' },
                      { text: 'Norwegian', value: 'Norwegian' },
                      { text: 'Polish', value: 'Polish' },
                      { text: 'Portuguese', value: 'Portuguese' },
                      { text: 'Romanian', value: 'Romanian' },
                      { text: 'Russian', value: 'Russian' },
                      { text: 'Spanish', value: 'Spanish' },
                      { text: 'Swedish', value: 'Swedish' },
                      { text: 'Thai', value: 'Thai' },
                      { text: 'Turkish', value: 'Turkish' },
                      { text: 'Ukrainian', value: 'Ukrainian' }]"
          ></v-select>
          <v-textarea
            v-model="song.translation"
            id="translation"
            label="Translation"
            required
            rows="2"
            cols="5"
          ></v-textarea>
          
          <div class="d-flex align-center">
            <div class="ml-auto">
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="updateSong()"
              >
                Save
              </v-btn>

                <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
              </div>
            </div>
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
      valid: false,
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