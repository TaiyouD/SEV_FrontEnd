<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Tutorial Edit</v-toolbar-title>
        <!-- <v-spacer></v-spacer>
        <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
      </v-toolbar>
      <br />
      <h4>{{ message }}</h4>
      <br />
      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field
          v-model="tutorial.title"
          id="title"
          :counter="50"
          label="Title"
          required
        ></v-text-field>
        <v-text-field
          v-model="tutorial.description"
          id="description"
          :counter="50"
          label="Description"
          required
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="updateTutorial()"
        >
          Save
        </v-btn>

        <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import TutorialServices from "../services/tutorialServices";

export default {
  name: "edit-tutorial",
  props: ["id"],
  data() {
    return {
      valid: false,
      tutorial: {},
      message: "Enter data and click save",
    };
  },
  methods: {
    retrieveTutorial() {
      TutorialServices.get(this.id)
        .then((response) => {
          this.tutorial = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },

    updateTutorial() {
      var data = {
        title: this.tutorial.title,
        description: this.tutorial.description,
      };
      TutorialServices.update(this.id, data)
        .then((response) => {
          this.tutorial.id = response.data.id;
          this.$router.push({ name: "tutorials" });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: "tutorials" });
    },
  },
  mounted() {
    this.retrieveTutorial();
  },
};
</script>
<style></style>
