
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
            <v-icon class="ml-1">mdi-calendar-check</v-icon>
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

          <v-menu>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" color="Burnt orange" class="ml-2">
                {{ selectedDate || "All Dates" }}
                <v-icon>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="event in eventsDate" :key="event" @click="filterDates(event)">
                <v-list-item-title>{{ event }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
            <v-btn class="mx-2" color="success" @click="addEvent(id)">Create Event</v-btn>
          </v-card-title>
          <v-card-text>
            <b>{{ message }}</b>
          </v-card-text>
          <v-data-table :headers="headers" :items="filteredEvents" :search="search" :items-per-page="5" :sort-by="['eventType', 'date', 'startTime', 'endTime']" :sort-desc="[false]">
            <template #item="{ item }">
              <tr>
                <td>{{ item.eventType }}</td>
                <td>{{ item.date }}</td>
                <td>{{ convertTime(item.startTime) }}</td>
                <td>{{ convertTime(item.endTime) }}</td>
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
        filteredDates: [],
        eventsDate: ["All Dates", "Current", "Past", "Upcoming "],
        selectedDate: null,
        selectedFilter: null,
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
              this.filteredDates = response.data;
              resolve();
          })
          .catch((e) => {
              this.message = e.response.data.message;
              reject(e);
          });
      });
      },
      convertTime(time) {
        const date = new Date(`1/1/2000 ${time}`);
        const formattedTime = date.toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'});
        return formattedTime;
      },
      filterEvents(filter) {
        this.selectedEvent = filter;
        this.selectedFilter = filter;
        this.filterData();
      },
      filterDates(filter) {
        this.selectedDate = filter;
        this.selectedFilter = filter;
        this.filterData();
      },
      filterData() {
        let filteredData = this.events;

        if (this.selectedEvent && this.selectedEvent !== "All Events") {
          filteredData = filteredData.filter(event => event.eventType === this.selectedEvent);
        }

        if (this.selectedDate && this.selectedDate !== "All Dates") {
          if (this.selectedDate === "Current") {
            const now = new Date();
            const timezoneOffset = now.getTimezoneOffset() * 60 * 1000; // Convert to milliseconds
            const today = new Date(now.getTime() - timezoneOffset).toDateString();
            filteredData = filteredData.filter(event => new Date(event.date).toDateString() === today);
          } else if (this.selectedDate === "Past") {
            const now = new Date();
            const timezoneOffset = now.getTimezoneOffset() * 60 * 1000; // Convert to milliseconds
            const today = new Date(now.getTime() - timezoneOffset).toDateString();
            filteredData = filteredData.filter(event => new Date(event.date) < new Date(today));
          } else if (this.selectedDate === "Upcoming ") {
            const now = new Date();
            const timezoneOffset = now.getTimezoneOffset() * 60 * 1000; // Convert to milliseconds
            const today = new Date(now.getTime() - timezoneOffset).toDateString();
            filteredData = filteredData.filter(event => new Date(event.date) > new Date(today + " 23:59:59")); // Need to include" 23:59:59" to not show the current date
          }
        }

        this.filteredEvents = filteredData;
        this.filteredDates = filteredData;
      },
      addEvent() {
        this.$router.push({ name: "addevent", params: { EventId: this.id } });
      },
      editEvent(event) {
        this.$router.push({ name: "editevent", params: { id: event.id } });
      },
      deleteEvent(event) {
        EventServices.delete(event.id)
          .then(() => {
            const index = this.events.findIndex(e => e.id === event.id);
            this.events.splice(index, 1);
            this.filterData();
            this.message = "Event was deleted successfully!";
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
    },
  };

  </script>