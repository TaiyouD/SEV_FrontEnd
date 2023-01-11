<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Tutorial Add</v-toolbar-title>
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
          @click="saveTutorial()"
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
import Utils from "@/config/utils.js";

export default {
  name: "add-tutorial",
  data() {
    return {
      valid: false,
      user: {},
      tutorial: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      message: "Enter data and click save",
    };
  },
  mounted() {
    this.user = Utils.getStore("user");
  },
  methods: {
    saveTutorial() {
      var data = {
        title: this.tutorial.title,
        description: this.tutorial.description,
        published: true,
        userId: this.user.userId,
      };
      TutorialServices.create(data)
        .then((response) => {
          this.tutorial.id = response.data.id;
          console.log("add " + response.data);
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
};
</script>
<style></style>
