 
<template>
  <div>
    <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
    <v-container>
      <v-toolbar>
        <v-btn v-if="role.roleType == 'Admin'" icon to="/maintain">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>Level View</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <br />
      <v-card>
        <v-card-title>
          {{ "All Levels" }}
          <v-icon class="ml-1">mdi-signal</v-icon>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text>
          <b>{{ message }}</b>
        </v-card-text>
        <v-data-table :headers="headers" :items="levels" :search="search" hide-default-footer>
          <template #item="{ item }">
            <tr>
              <td class="no-wrap">{{ item.levelNumber }}</td> 
              <td style="white-space: pre-line">{{ item.oneHourDescription }}</td>
              <td style="white-space: pre-line">{{ item.twoHourDescription }}</td>

              <td>
                <div v-if="role.roleType == 'Admin'" class="d-flex justify-end">
                  <v-icon color="primary" @click="editLevel(item)">mdi-pencil</v-icon>
                </div>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
    <br />
  </div>
</template>

<style>
  .no-wrap {
    white-space: nowrap;
  }
</style>
  
<script>

import Utils from "@/config/utils.js";
// import AuthServices from "@/services/authServices";
import roleServices from "@/services/roleServices";
import LevelServices from "../services/levelServices";

export default {
  name: "maintain-level",
  props: ["id"],
  data() {
    return {
      search: "",
      levels: [],
      message: "Edit Level Descriptions",
      headers: [
        { text: "Level", value: "levelNumber", sortable: false },
        { text: "One Hour Description", value: "oneHourDescription", sortable: false },
        { text: "Two Hour Description", value: "twoHourDescription", sortable: false },
      ],
      user: {},
      role: {},
      initials: "",
      name: "",
    };
  },

  async created() {
    this.resetMenu();
  },
  async mounted() {
    this.resetMenu();
    this.retrieveRole();
    this.retrieveLevels();
  },
  methods: {
    retrieveRole() {
      roleServices.getRoleForUser(this.user.userId)
      .then((response) => {
        this.role = response.data[0];
        console.log("role: " + this.role.roleType);
      })
      .catch((e) => {
        this.message = e.response.data.message;
      });
    },
    resetMenu() {
      this.user = null;
      // ensures that their name gets set properly from store
      this.user = Utils.getStore("user");
      if (this.user != null) {
        this.initials = this.user.fName[0] + this.user.lName[0];
        this.name = this.user.fName + " " + this.user.lName;
      }
    },
    retrieveLevels() {
      LevelServices.getAll()
        .then((response) => {
          this.levels = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    editLevel(level) {
      this.$router.push({ name: "editlevel", params: { id: level.id } });
    },
  },
};
</script>