
<template>
    <div>
      <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
      <v-container>
        <v-toolbar>
          <v-btn icon to="/maintain">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-toolbar-title>Event View</v-toolbar-title>
          <v-spacer></v-spacer>
            <v-text-field v-model="search" prepend-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        </v-toolbar>
        <br />
        <v-card>
          <v-card-title>
            {{ "All Events" }}
            <v-spacer></v-spacer>
            <v-menu>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" color="primary">
                {{ selectedEvent || "All Events" }}
                <v-icon>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="event in eventsList" :key="event" @click="filterEvents(event)">
                <v-list-item-title>{{ event }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
            <v-btn class="mx-2" color="success" @click="addEvent(id)">Create Event</v-btn>
          </v-card-title>
          <v-card-text>
            <b>{{ message }}</b>
          </v-card-text>
          <v-data-table :headers="headers" :items="filteredEvents" :search="search" :items-per-page="5" :sort-by="['eventType']" :sort-desc="[false]">
            <template #item="{ item }">
              <tr>
                <td>{{ item.eventType }}</td>
                <td>{{ item.date }}</td>
                <td>{{ item.startTime }}</td>
                <td>{{ item.endTime }}</td>
                <td>{{ item.duration }}</td>
                <td>{{ item.isReady ? '&#10003;' : '' }}</td>
                <td>
                  <div class="d-flex justify-end">
                    <v-icon color="primary" @click="editEvent(item)">mdi-pencil</v-icon>
                    <v-icon color="error" @click="deleteEvent(item)">mdi-delete</v-icon>
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
  
  import EventServices from "../services/eventServices";
  
  export default {
    name: "maintainevent",
    props: ["id"],
    data() {
      return {
        search: "",
        events: [],
        filteredEvents: [],
        eventsList: ["All Events", "Junior", "Jury", "Recital", "Scholarship", "Senior"],
        selectedEvent: null,
        message: "Add, Edit or Delete Events",
        headers: [
          { text: "Event Type", value: "eventType", sortable: false },
          { text: "Date", value: "date", sortable: false },
          { text: "Start Time", value: "startTime", sortable: false },
          { text: "End Time", value: "endTime", sortable: false },
          { text: "Duration", value: "duration", sortable: false },
          { text: "Ready", value: "isReady", sortable: false },
        ],
      };
    },
    mounted() {
      this.retrieveEvents();
    },
    methods: {
    retrieveEvents() {
      return new Promise((resolve, reject) => {
          EventServices.getAll()
          .then((response) => {
              this.events = response.data;
              this.filteredEvents = response.data;
              resolve();
          })
          .catch((e) => {
              this.message = e.response.data.message;
              reject(e);
          });
      });
      },
      filterEvents(event) {
      if (event === "All Events") {
        this.selectedEvent = null;
        this.filteredEvents = this.events;
      } else {
        this.selectedEvent = event;
        this.filteredEvents = this.events.filter((e) => e.eventType === event);
      }
    },
      addEvent() {
        this.$router.push({ name: "addevent", params: { EventId: this.id } });
      },
      editEvent(event) {
        this.$router.push({ name: "editevent", params: { id: event.id } });
      },
      deleteEvent(event) {
        if (confirm(`Are you sure you want to delete this ${event.eventType} Event?`)) {
          EventServices.delete(event.id)
            .then(() => {
              const index = this.events.indexOf(event);
              this.events.splice(index, 1);
              this.message = `${event.eventType} deleted successfully.`;

              // Remove the deleted event from filteredEvents as well
              this.filteredEvents = this.events.filter(e => e.eventType === this.selectedEvent || !this.selectedEvent);
            })
            .catch((e) => {
              this.message = e.response.data.message;
            });
        }
      },
    },
  };
  </script>