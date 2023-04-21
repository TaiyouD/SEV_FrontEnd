
<template>
  <div v-if="this.role.roleType == 'Admin'">
    <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
    <v-container>
      <v-toolbar>
        <v-btn icon to="/maintain">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>Composer View</v-toolbar-title>
        <v-spacer></v-spacer>
          <v-text-field v-model="search" prepend-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
      </v-toolbar>
      <br />
      <v-card>
        <v-card-title>
          {{ "All Composers" }}
          <v-icon class="ml-1">mdi-account-music</v-icon>
          <v-spacer></v-spacer>
          <v-btn class="mx-2" color="success" @click="addComposer(id)">Add Composer</v-btn>
        </v-card-title>
        <v-card-text>
          <b>{{ message }}</b>
        </v-card-text>
        <v-data-table :headers="headers" :items="composers" :search="search" :items-per-page="5" :sort-by="['firstName']" :sort-desc="[false]">
          <template #item="{ item }">
            <tr>
              <td>{{ item.firstName }}</td>
              <td>{{ item.lastName }}</td>
              <td>{{ item.nationality }}</td>
              <td>{{ item.birthday }}</td>
              <td>{{ item.deathDate }}</td>
              <td>
                <div class="d-flex justify-end">
                  <v-icon color="primary" @click="editComposer(item)">mdi-pencil</v-icon>
                </div>
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
import RoleServices from "../services/roleServices";
import Utils from "@/config/utils.js";

export default {
  name: "maintaincomposer",
  props: ["id"],
  data() {
    return {
      user:{},
      role:{},
      search: "",
      composers: [],
      message: "Add, Edit or Delete Composers",
      headers: [
        { text: "First Name", value: "firstName", sortable: false },
        { text: "Last Name", value: "lastName", sortable: false },
        { text: "Nationality", value: "nationality", sortable: false },
        { text: "Birthday", value: "birthday", sortable: false },
        { text: "Death Date", value: "deathDate", sortable: false },
      ],
    };
  },
  mounted() {
    this.retrieveComposers();
  },
  async created(){
    this.user = Utils.getStore("user");
    await this.retrieveRole();
  },
  methods: {
    async retrieveRole() {
        await RoleServices.getRoleForUser(this.user.userId)
          .then((response) => {
            for (let i = 0; i < response.data.length; i++){
              if (response.data[i].roleType == this.user.selectedRole) {
                this.role = response.data[i];
              }
            }
           })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
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
  },
};
</script>