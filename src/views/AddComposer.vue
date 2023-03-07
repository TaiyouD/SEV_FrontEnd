<template>
    <div>
      <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
      <v-container>
        <v-toolbar>
          <v-toolbar-title>New Composer</v-toolbar-title>
          <!-- <v-spacer></v-spacer>
          <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
        </v-toolbar>
  
        <br />
        <h4>{{ message }}</h4>
        <br />
        <v-form ref="form" v-model="valid" lazy validation>
          <v-text-field
            v-model="composer.firstName"
            id="firstName"
            :counter="50"
            label="First Name"
          ></v-text-field>
          <v-text-field
            v-model="composer.lastName"
            id="lastName"
            :counter="50"
            label="Last Name"
            required
            ></v-text-field>
            <v-text-field
            v-model="composer.nationality"
            id="nationality"
            :counter="30"
            label="Nationality"
            ></v-text-field>
            <v-text-field
            v-model="composer.birthday"
            id="birthday"
            :counter="10"
            label="Birth Year"
            ></v-text-field>
            <v-text-field
            v-model="composer.deathDate"
            id="deathDate"
            :counter="10"
            label="Death Year"
            ></v-text-field>
  
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="saveComposer()"
          >
            Save
          </v-btn>
  
          <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
        </v-form>
      </v-container>
    </div>
  </template>

<script>
import ComposerServices from "../services/composerServices";

export default {
  name: "addcomposer",
  data() {
    return {
      valid: false,
      composer: {
        id: null,
        firstName:"",
        lastName:"",
        nationality: "",
        birthday:"",
        deathDate:""
      },
      message: "Enter data and click save. Leave it blank if you do not know an information. Last name is required.",
    };
  },

  methods: {
    saveComposer() {
        //check if composer last name exists
      var data = {
        firstName: this.composer.firstName,
        lastName: this.composer.lastName,
        nationality: this.composer.nationality,
        birthday: this.composer.birthday,
        deathDate: this.composer.deathDate
      };
      ComposerServices.create(data)
        .then((response) => {
          this.composer.id = response.data.id;
          console.log("add " + response.data);
          this.$router.push({ name: "composer" });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: "composer" });
    },
  },
};
</script>
<style></style>