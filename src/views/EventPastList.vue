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
            Past Events
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
            :items="eventSessions"
            :items-per-page="50"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <div>
                <v-icon small class="mx-4" @click="editEventSession(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small class="mx-4" @click="viewEventSession(item)">
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
  //import eventServices from "../services/eventServices";
  import eventSessionServices from "../services/eventSessionServices";
  import Utils from "@/config/utils.js";

  export default {
    name: "upcoming-events-list",
    data() {
      return {
        search: "",
        events: [],
        eventSessions:[],
        currentEvent: null,
        currentEventSession: null,
        currentIndex: -1,
        overlay: false,
        title: "",
        user: {},
        message: "Search, Edit or Cancel EventSessions",
        headers: [
          { text: "Event Session Id", value: "id" },
          { text: "Student Id", value: "date" },
          { text: "Instructor Id", value: "date" },
          { text: "Accompanist Id", value: "date" },
          { text: "Event Id", value: "date" },
          { text: "Start Time", value: "startTime"},
          { text: "End Time", value: "endTime"},
          //{ text: "Duration", value: "duration"},
          //{ text: "Event Type", value: "eventType"},
          //{ text: "Is Ready", value: "isReady"}
        ],
        //items:['Instrument 1', 'Instrument 2', 'Instrument 3']
      };
    },
    mounted() {
      this.user = Utils.getStore("user");
      this.retrieveEventSessions();
    },
   
    methods: {
      editEventSession(eventSession) {
        this.$router.push({ name: "edit", params: { id: eventSession.id } });
      },
      viewEventSession(eventSession) {
        this.$router.push({ name: "view", params: { id: eventSession.id } });
      },
      deleteEventSession(eventSession) {
        eventSessionServices.delete(eventSession.id)
          .then(() => {
            this.retrieveEventSessions();
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      retrieveEventSessions() {
        eventSessionServices.getAllForUser(this.user.userId)
          .then((response) => {
            this.eventSessions = response.data;
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      refreshList() {
        this.retrieveEventSessions();
        this.currentEventSession = null;
        this.currentIndex = -1;
      },
      setActiveEventSession(eventSession, index) {
        this.currentEventSession = eventSession;
        this.currentIndex = eventSession ? index : -1;
      },
      removeAllEventSessions() {
        eventSessionServices.deleteAll()
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
  