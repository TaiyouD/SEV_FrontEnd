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
      
    <v-row justify="center">
    <v-dialog
      v-model="edit_dialog"
      persistent
      max-width="800"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-icon
          color="grey"
          dark
          v-bind="attrs"
          v-on="on"
          small 
          class="mx-4"
        >
        mdi-pencil
        </v-icon>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit Event Session</span>
        </v-card-title>
        <v-card-text>
          <v-container>
          <!-- <v-banner
          v-model="banner"
          transition="slide-y-transition"
          >
          By editing the event session and
          clicking the submit button you will notifiy an 
          Admin of your event session change and it will be either approved or disapproved.
            <template v-slot:actions="{ dismiss }">
              <v-btn
                text
                color="primary"
                @click="dismiss"
            >
              Dismiss
            </v-btn>
          </template>
        </v-banner> -->

          <v-form ref="form" v-model="valid" lazy validation>
          <!-- <v-text-field
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
          ></v-text-field> -->
  
                            
       <!-- Select Hearing Date Below -->
       <v-select 
        class="mt-6"
        :items="selected"
        label="Select Available Event Dates"
        @change="selectButton"
        v-model="selected"
        item-title="date"
        return-object
        single-line
        filled
        disabled
     ></v-select>


                     <!-- Accompanist Select Below -->
    <v-select 
        :items="selected2"
        item-title="Accompanist"
        item-value=""
        label="Select Accompanist"
        @change="selectButton"
        v-model="selected2"
        return-object
        single-line
        filled
    ></v-select>

    <v-select 

        item-title="Time Slot"
        item-value=""
        label="Select Time Slot"
        return-object
        single-line
        filled
    ></v-select>

        <!-- Instructor Select Below -->
    <div style="text-align: center;">
    <div class="d-flex flex-row bg-surface-variant" max-width = "780" >
    
    <v-select class=" mr-4"  width = "260"
        :items="items2"
        item-title="state2"
        label="Select Instructor"
        return-object
        single-line
        filled
     ></v-select>

     <v-select class=" mr-4" width = "260"
        :items="items2"

        label="Select Duration"
        return-object
        single-line
        filled
     ></v-select>
                

                    <!--  Instrument Select Below -->
    <v-select
       width = "260"
        v-model="select"
        :items="items4"
        item-title="Instrument"
        item-value=""
        label="Select Voice or Instrument"
        return-object
        single-line
        filled
    ></v-select>
    </div>
</div>

    <v-select 
        item-title="song"
        label="Select Piece"
        return-object
        single-line
        filled
     ></v-select>
 

  <!-- <v-select style="padding-top: 8px;"
        item-title="date"
        label="Select Composer"
        return-object
        single-line
        filled
     ></v-select> -->
          </v-form>
          </v-container>
          <!-- <small>*indicates required field</small> -->
        </v-card-text>
        <v-card-actions>
          <router-link to="/addaccompanist" tag="v-btn">
            <v-btn color="primary" text>
              Add Accompanist
            </v-btn>
          </router-link>
          <router-link to="/addsongrepertoire" tag="v-btn">
            <v-btn color="primary" text>
              Add Piece
            </v-btn>
          </router-link>
       
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="updateEventSession()"
          >
            Save
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="edit_dialog = false"
          >
            Close
          </v-btn>
         
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="view_dialog"
      persistent
      max-width="800"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-icon
          color="grey"
          dark
          v-bind="attrs"
          v-on="on"
          small 
          class="mx-4"
        >
        mdi-format-list-bulleted-type
        </v-icon>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">View Event Session</span>
        </v-card-title>
        <v-card-text>
          <v-container>
          <!-- <v-banner
          v-model="banner"
          transition="slide-y-transition"
          >
          By editing the event session and
          clicking the submit button you will notifiy an 
          Admin of your event session change and it will be either approved or disapproved.
          <template v-slot:actions="{ dismiss }">
            <v-btn
              text
              color="primary"
              @click="dismiss"
            >
              Dismiss
            </v-btn>
          </template>
        </v-banner> -->

          <v-form ref="form" v-model="valid" lazy validation>
          <!-- <v-text-field
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
          ></v-text-field> -->
  
                            
       <!-- Select Hearing Date Below -->
       <v-text-field 
        class="mt-6"
        :items="selected"
        label="Event Date"
        @change="selectButton"
        v-model="selected"
        item-title="date"
        return-object
        single-line
        filled
        disabled
     ></v-text-field>


                     <!-- Accompanist Select Below -->
    <v-text-field  
        :items="selected2"
        item-title="Accompanist"
        item-value=""
        label="Accompanist"
        @change="selectButton"
        v-model="selected2"
        return-object
        single-line
        filled
        disabled
    ></v-text-field >

    <v-text-field  

        item-title="Time Slot"
        item-value=""
        label="Time Slot"
        return-object
        single-line
        filled
        disabled
    ></v-text-field >

        <!-- Instructor Select Below -->
    <div style="text-align: center;">
    <div class="d-flex flex-row bg-surface-variant" max-width = "780" >
    
    <v-text-field  class=" mr-4"  width = "260"
        :items="items2"
        item-title="state2"
        label="Instructor"
        return-object
        single-line
        filled
        disabled
     ></v-text-field >

     <v-text-field  class=" mr-4" width = "260"
        :items="items2"

        label="Duration"
        return-object
        single-line
        filled
        disabled
     ></v-text-field >
                

                    <!--  Instrument Select Below -->
    <v-text-field 
       width = "260"
        v-model="select"
        :items="items4"
        item-title="Instrument"
        item-value=""
        label="Voice or Instrument"
        return-object
        single-line
        filled
        disabled
    ></v-text-field>
    </div>
</div>

    <v-text-field 
        item-title="song"
        label="Piece"
        return-object
        single-line
        filled
        disabled
     ></v-text-field>
 

  <!-- <v-select style="padding-top: 8px;"
        item-title="date"
        label="Select Composer"
        return-object
        single-line
        filled
     ></v-select> -->
          </v-form>
          </v-container>
          <!-- <small>*indicates required field</small> -->
        </v-card-text>
        <v-card-actions>
          <router-link to="/critique" tag="v-btn">
          <v-btn color="primary"
            text>
          View Critiques
          </v-btn>
          </router-link>
       
          <v-spacer></v-spacer>
          
          <v-btn
            color="primary"
            text
            @click="view_dialog = false"
          >
            Close
          </v-btn>
         
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
      <!-- <v-icon small class="mx-4" @click="deleteSong(item)">
                  mdi-trash-can
                </v-icon> -->
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
        view_dialog: false,
        edit_dialog: false,
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
      updateEventSession() {
        // this.$router.push({ name: "edit", params: { id: eventSession.id } });
        this.edit_dialog = false;
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
  