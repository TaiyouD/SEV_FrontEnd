<template>
    <div v-if="this.currentRole.roleType != null">
      <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
      <v-container>
        <v-toolbar>
          <v-toolbar-title>New Accompanist</v-toolbar-title>
        </v-toolbar>
        <br />
        <h4>{{ message }}</h4>
        <br />
        <v-form ref="form" v-model="valid" lazy validation>
          <v-text-field
            v-model="user.fName"
            id="fName"
            label="First Name"
            required
        ></v-text-field>
        <v-text-field
            v-model="user.lName"
            id="lName"
            label="Last Name"
            required
        ></v-text-field>
        <v-text-field
            v-model="user.email"
            id="email"
            label="Email"
            required
        ></v-text-field>
              
        <div class="d-flex align-center">
            <div class="ml-auto">
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="saveUserAndRole"
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

// I am getting an error that says this.saveUser is not a function. Why?

import RoleServices from "../services/roleServices";
import Utils from "@/config/utils.js";
import UserServices from "../services/userServices";

export default {
  name: "addaccompanist",
  data() {
    return {
      valid: false,
      user: {
          id: null,
          fName: '',
          lName: '',
          email: '',
        },
      role: {
        id: null,
        roleType: "Accompanist",
        isApproved: false
      },
      currentUser:{},
      currentRole:{},
      message: "Enter data and click save.",
    };
  },
  async created(){
    this.currentUser = Utils.getStore("user");
    await this.retrieveRole();
  },
  methods: {
      async retrieveRole() {
        await RoleServices.getRoleForUser(this.currentUser.userId)
          .then((response) => {
            this.currentRole = response.data[0];
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      async saveUserAndRole() {
        await this.saveUser();
        await this.saveRole();
      },
      async saveUser() {
      var userData = {
          fName: this.user.fName,
          lName: this.user.lName,
          email: this.user.email,
      };
      await UserServices.create(userData)
        .then((response) => {
        this.user.id = response.data.id;
        })
        .catch((e) => {
        this.message = e.response.data.message;
      });
    },
    async saveRole() {
        var roleData = {
            roleType: this.role.roleType,
            isApproved: this.role.isApproved,
            userId: this.user.id
        }; 
        await RoleServices.create(roleData)
        .then((response) => {
            this.role.id = response.data.id;
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