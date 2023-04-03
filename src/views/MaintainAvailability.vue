
<template>
    <div>
      <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
      <v-container>
        <v-toolbar>
          <v-btn icon to="/maintain">
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
  
  import AvailabilityServices from "../services/availabilityServices";
  
  export default {
    name: "maintainavailability",
    props: ["id"],
    data() {
      return {
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
    },
    methods: {
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