
<template>
    <div v-if="this.role.roleType == 'Admin'">
      <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
      <v-container>
        <v-toolbar>
          <v-btn icon to="/maintainevent">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-toolbar-title>Availability View</v-toolbar-title>
          <v-spacer></v-spacer>
            <v-text-field v-model="search" prepend-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        </v-toolbar>
        <br />
        <v-card>
          <v-card-title>
            {{ "All Availability" }}
            <v-icon class="ml-1">mdi-clock-outline</v-icon>
            <v-spacer></v-spacer>
            <v-btn class="mx-2" color="success" @click="addAvailability(id)">Add Availability</v-btn>
          </v-card-title>
          <v-card-text>
            <b>{{ message }}</b>
          </v-card-text>
          <v-data-table :headers="headers" :items="availability" :search="search" :items-per-page="5" :sort-by="['startTime', 'endTime']" :sort-desc="[false]">
            <template #item="{ item }">
              <tr>
                <td>{{ item.startTime }}</td>
                <td>{{ item.endTime }}</td>
                <td>
                  <div class="d-flex justify-end">
                    <v-icon color="primary" @click="editAvailability(item)">mdi-pencil</v-icon>
                    <v-icon color="error" @click="deleteAvailability(item)">mdi-delete</v-icon>
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
  
  import AvailabilityServices from "../services/availabilityServices.js";
  import RoleServices from "../services/roleServices";
  import Utils from "@/config/utils.js";
  
  export default {
    name: "maintainavailability",
    props: ["eventId"],
    data() {
      return {
        user:{},
        role:{},
        search: "",
        availability: [],
        message: "Add, Edit or Delete Availability",
        headers: [
          { text: "Start Time", value: "startTime", sortable: false },
          { text: "End Time", value: "endTime", sortable: false },
        ],
      };
    },
    mounted() {
      this.retrieveAvailability();
      this.user = Utils.getStore("user");
  },
  async created(){
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
      retrieveAvailability() {
        AvailabilityServices.getAll()
          .then((response) => {
            this.availability = response.data;
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      addAvailability() {
        this.$router.push({ name: "addavailability", params: { AvailabilityId: this.id } });
      },
      editAvailability(availability) {
        this.$router.push({ name: "editavailability", params: { id: availability.id } });
      },
      deleteAvailability(availability) {
        if (confirm(`Are you sure you want to delete this availability?`)) {
          AvailabilityServices.delete(availability.id)
            .then(() => {
              const index = this.availability.indexOf(availability);
              this.availability.splice(index, 1);
              this.message = `Availability deleted successfully.`;
            })
            .catch((e) => {
              this.message = e.response.data.message;
            });
        }
      },
    },
  };
  </script>