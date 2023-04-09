
<template>
  <div v-if="this.role.roleType == 'Admin'">
    <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Edit Composer</v-toolbar-title>
      </v-toolbar>
      <br />
      <h4>{{ message }}</h4>
      <br />
      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field
          v-model="composer.firstName"
          id="firstName"
          label="First Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="composer.lastName"
          id="lastName"
          label="Last Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="composer.nationality"
          id="nationality"
          label="Nationality"
          required
        ></v-text-field>
        <v-text-field
          v-model="composer.birthday"
          id="birthday"
          label="Birthday"
          required
        ></v-text-field>
        <v-text-field
          v-model="composer.deathDate"
          id="deathDate"
          label="Death Date"
          required
        ></v-text-field>

        <div class="d-flex align-center">
            <div class="ml-auto">
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="updateComposer()"
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

import ComposerServices from "../services/composerServices";
import RoleServices from "../services/roleServices";
import Utils from "@/config/utils.js";

export default {
  name: "editcomposer",
  props: ['id'],
data() {
  return {
    user:{},
    role:{},
    composer: {
      firstName: '',
      lastName: '',
      nationality: '',
      birthday: '',
      deathDate: ''
    },
    message: '',
    valid: false
  }
},
mounted() {
  this.getComposer(this.id);
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
    getComposer(id) {
      ComposerServices.get(id)
        .then(response => {
          this.composer = response.data;
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    updateComposer() {
      ComposerServices.update(this.id, this.composer)
        .then(() => {
          this.message = 'The composer was updated successfully!';
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