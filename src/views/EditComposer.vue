
<template>
  <div>
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
          :counter="50"
          label="First Name"
          required
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
          :counter="50"
          label="Nationality"
          required
        ></v-text-field>
        <v-text-field
          v-model="composer.birthday"
          id="birthday"
          :counter="50"
          label="Birthday"
          required
        ></v-text-field>
        <v-text-field
          v-model="composer.deathDate"
          id="deathDate"
          :counter="50"
          label="Death Date"
          required
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="updateComposer()"
        >
          Save
        </v-btn>

        <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>

import ComposerServices from "../services/instrumentServices";

export default {
  name: "editcomposer",
  props: ['id'],
data() {
  return {
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
methods: {
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