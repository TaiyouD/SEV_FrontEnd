<template>
    <div v-if="this.role.roleType != null">
      <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
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

import RoleServices from "../services/roleServices";
import Utils from "@/config/utils.js";

export default {
  name: "addaccompanist",
  data() {
    return {
      valid: false,
      user: {
        id: null,
        firstName:"",
        lastName:"",
        isApproved: false
      },
      role: {
        id: null,
        roleType: "Accompanist",
        isApproved: false
      },
      message: "Enter data and click save.",
    };
  },
  async created(){
    this.user = Utils.getStore("user");
    await this.retrieveRole();
  },
  methods: {
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
    saveAccompanist() {
        //send notification to admin
      var data = {
        //firstName: this.user.firstName,
        //lastName: this.user.lastName,
        roleType: this.role.roleType,
        isApproved: this.role.isApproved
      };
      RoleServices.create(data)
        .then((response) => {
          this.role.id = response.data.id;
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