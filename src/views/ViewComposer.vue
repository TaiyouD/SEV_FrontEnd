
<template>
  <div>
    <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Composer View</v-toolbar-title>
        <v-spacer></v-spacer>
          <v-text-field v-model="search" prepend-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
      </v-toolbar>
      <br />
      <v-card>
        <v-card-title>
          {{ "All Composers" }}
          <v-spacer></v-spacer>
          <v-btn class="mx-2" color="success" @click="addComposer(id)">Add Composer</v-btn>
        </v-card-title>
        <v-card-text>
          <b>{{ message }}</b>
        </v-card-text>
        <v-data-table :headers="headers" :items="composers" :search="search" :items-per-page="5">
          <template #item="{ item }">
            <tr>
              <td>{{ item.firstName }}</td>
              <td>{{ item.lastName }}</td>
              <td>{{ item.nationality }}</td>
              <td>{{ item.birthday }}</td>
              <td>{{ item.deathDate }}</td>
              <td>
                <v-icon color="primary" @click="editComposer(item)">mdi-pencil</v-icon>
                <v-icon color="error" @click="deleteComposer(item)">mdi-delete</v-icon>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>

import ComposerServices from "../services/composerServices";

export default {
  name: "view-composers",
  props: ["id"],
  data() {
    return {
      search: "",
      composers: [],
      message: "Add, Edit or Delete Composers",
      headers: [
        { text: "First Name", value: "firstName" },
        { text: "Last Name", value: "lastName" },
        { text: "Nationality", value: "nationality" },
        { text: "Birthday", value: "birthday" },
        { text: "Death Date", value: "deathDate" },
      ],
    };
  },
  mounted() {
    this.retrieveComposers();
  },
  methods: {
    retrieveComposers() {
      ComposerServices.getAll()
        .then((response) => {
          this.composers = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    addComposer() {
      this.$router.push({ name: "addcomposer", params: { ComposerId: this.id } });
    },
    editComposer(composer) {
      this.$router.push({ name: "editcomposer", params: { id: composer.id } });
    },
    deleteComposer(composer) {
      if (confirm(`Are you sure you want to delete ${composer.firstName} ${composer.lastName}?`)) {
        ComposerServices.delete(composer.id)
          .then(() => {
            const index = this.composers.indexOf(composer);
            this.composers.splice(index, 1);
            this.message = `${composer.firstName} ${composer.lastName} deleted successfully.`;
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      }
    },
  },
};
</script>

<style></style>