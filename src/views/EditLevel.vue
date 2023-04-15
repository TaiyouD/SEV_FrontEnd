
<template>
    <div v-if="this.role.roleType == 'Admin'">
      <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
      <v-container>
        <v-toolbar>
          <v-toolbar-title>Edit: {{ levelNumber }}</v-toolbar-title>
        </v-toolbar>
        <br />
        <h4>{{ message }}</h4>
        <br />
        <v-form ref="form" v-model="valid" lazy validation>
          <v-textarea
            v-model="level.oneHourDescription"
            id="oneHourDescription"
            label="One Hour Description"
            rows="5"
            cols="10"
            required
          ></v-textarea>
          <v-textarea
            v-model="level.twoHourDescription"
            id="twoHourDescription"
            label="Two Hour Description"
            rows="5"
            cols="10"
            required
          ></v-textarea>
  
          <div class="d-flex align-center">
            <div class="ml-auto">
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="updateLevel()"
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
  
  import LevelServices from "../services/levelServices";
  import RoleServices from "../services/roleServices";
  import Utils from "@/config/utils.js";
  
  export default {
    name: "editlevel",
    props: ['id'],
  data() {
    return {
      user:{},
      role:{},
      level: {
        oneHourDescription: '',
        twoHourDescription: ''
      },
      message: '',
      valid: false
    }
  },
  mounted() {
    this.getLevel(this.id);
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
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      getLevel(id) {
        LevelServices.get(id)
          .then(response => {
            this.level = response.data;
            this.levelNumber = this.level.levelNumber;
          })
          .catch(e => {
            this.message = e.response.data.message;
          });
      },
      updateLevel() {
        LevelServices.update(this.id, this.level)
          .then(() => {
            this.message = 'The Level was updated successfully!';
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