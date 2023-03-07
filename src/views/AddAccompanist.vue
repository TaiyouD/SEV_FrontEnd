<template>
    <div>
      <v-container>
        <v-toolbar>
          <v-toolbar-title>New Accompanist</v-toolbar-title>
          <!-- <v-spacer></v-spacer>
          <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
        </v-toolbar>
  
        <br />
        <h4>{{ message }}</h4>
        <br />
        <v-form ref="form" v-model="valid" lazy validation>
          <v-text-field
            v-model="user.firstName"
            id="firstName"
            :counter="50"
            label="First Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.lastName"
            id="lastName"
            :counter="50"
            label="Last Name"
            required
            ></v-text-field>
              
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="saveAccompanist()"
          >
            Save
          </v-btn>
  
          <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
        </v-form>
      </v-container>
    </div>
  </template>

<script>
import AccompanistServices from "../services/composerServices";

export default {
  name: "addaccompanist",
  data() {
    return {
      valid: false,
      user: {
        id: null,
        firstName:"",
        lastName:""      },
      message: "Enter data and click save.",
    };
  },

  methods: {
    saveAccompanist() {
        //check if accompanist first and last name exists
      var data = {
        firstName: this.user.firstName,
        lastName: this.user.lastName
      };
      AccompanistServices.create(data)
        .then((response) => {
          this.user.id = response.data.id;
          console.log("add " + response.data);
          this.$router.push({ name: "signupevents" });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: "signupevents" });
    },
  },
};
</script>
<style></style>