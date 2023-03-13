<template>
    <div>
      <v-img src="../assets/church-window-1.jpg" max-height="100" />
      <v-container>
        <!-- <v-toolbar>
          <v-toolbar-title>My Repertoire</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-title>{{this.message}}</v-toolbar-title> 
        </v-toolbar> -->
        <br />
        <!-- <h3>Voice/Instrument: {{ instrumentId }} 
        <v-select class="dropdown"
          :items="items"
          filled 
          label="Select Voice/Instrument"
          ></v-select>
        </h3> 
        <h4>Instructor: {{ accompanistId }}</h4> -->
        <br /><br />
        <v-card>
          <v-card-title>
            Upcoming Events
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-card-text>
            <b>{{ message }}</b>
          </v-card-text>
          <v-data-table
            :headers="headers"
            :search="search"
            :items="events"
            :items-per-page="50"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <div>
                <v-icon small class="mx-4" @click="editEvent(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small class="mx-4" @click="viewEvent(item)">
                  mdi-format-list-bulleted-type
                </v-icon>
                <!-- <v-icon small class="mx-4" @click="deleteSong(item)">
                  mdi-trash-can
                </v-icon> -->
              </div>
            </template>
          </v-data-table>
        </v-card>
        <br>
        <!-- <router-link to="/addsong" tag="v-btn">
          <v-btn color="success" class="mr-4">
              Add Song
          </v-btn>
        </router-link> -->
      </v-container>
    </div>
  </template>
  
  <script>
  import eventServices from "../services/eventServices";
  //import eventSessionServices from "../services/eventSessionServices";
  import Utils from "@/config/utils.js";

  export default {
    name: "Events-list",
    data() {
      return {
        search: "",
        events: [],
        eventSession:[],
        currentEvent: null,
        currentEventSession: null,
        currentIndex: -1,
        title: "",
        user: {},
        message: "Search, Edit or Cancel Events",
        headers: [
          { text: "Event Id", value: "id" },
          { text: "Date", value: "date" },
          { text: "Start Time", value: "startTime"},
          { text: "End Time", value: "endTime"},
          { text: "Duration", value: "duration"},
          { text: "Capstone Level", value: "capstoneLevel"},
          { text: "Is Ready", value: "isReady"}
        ],
        items:['Instrument 1', 'Instrument 2', 'Instrument 3']
      };
    },
    mounted() {
      this.user = Utils.getStore("user");
      this.retrieveEvents();
    },
    methods: {
      editEvent(event) {
        this.$router.push({ name: "edit", params: { id: event.id } });
      },
      viewEvent(event) {
        this.$router.push({ name: "view", params: { id: event.id } });
      },
      deleteEvent(event) {
        eventServices.delete(event.id)
          .then(() => {
            this.retrieveEvents();
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      retrieveEvents() {
        eventServices.getAllForUser(this.user.userId)
          .then((response) => {
            this.events = response.data;
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      refreshList() {
        this.retrieveEvents();
        this.currentEvent = null;
        this.currentIndex = -1;
      },
      setActiveEvent(event, index) {
        this.currentEvent = event;
        this.currentIndex = event ? index : -1;
      },
      removeAllEvents() {
        eventServices.deleteAll()
          .then((response) => {
            console.log(response.data);
            this.refreshList();
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
    },
  };
  </script>

  <style>

  .dropdown {
    width:38%;
  }
</style>
  