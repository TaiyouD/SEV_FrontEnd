<template>
  <div>
    <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Add Song</v-toolbar-title>
      </v-toolbar>
      <br />
      <h4>{{ message }}</h4>
      <br />
      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field
          v-model="song.title"
          id="title"
          :counter="50"
          label="Title"
          required
        ></v-text-field>
        <v-select 
        :items="selected"
        item-title="Composer"
        item-value=""
        label="Select Composer"
        v-model="selected"
        return-object
        single-line
        filled
    ></v-select>
    <router-link to="/addcomposer" tag="v-btn">
      <v-btn color="success" class="mr-4">
          Missing Composers?
      </v-btn>
      </router-link>
      <br><br>


        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="saveSong()"
        >
          Save
        </v-btn>

        <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import LessonServices from "../services/lessonServices";
export default {
  name: "add-song",
  props: ["composerId"],
  data() {
    return {
      valid: true,
      song: {
        id: null,
        title: "",
        selected: []
      },
      message: "Enter data and click save",
    };
  },
  methods: {
    saveSong() {
      var data = {
        title: this.song.title,
        composerId: this.composerId
      };
      LessonServices.createSong(this.composerId, data)
        .then((response) => {
          this.song.id = response.data.id;

          this.$router.push({ name: "view", params: { id: this.composerId } });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: "addpiecerepertoire", params: { id: this.composerId } });
    },
  },
};
</script>
<style></style>
