<template>
    <div>
      <v-img src="../assets/church-window-1.jpg" max-height="100" />
      <v-container>
        <br />
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

                <v-dialog
                  v-model="edit_dialog"
                  persistent
                  max-width="800"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <!-- <div class="d-flex justify-end"> -->
                    <v-icon color="primary" v-bind="attrs" v-on="on" small class="mx-4">
                    mdi-pencil
                    </v-icon>
                  <!-- </div> -->
                  </template>
                  <v-card>
                    <v-card-title   >
                      <v-toolbar id="navbar-maroon">
                      <span class="text-h5">Edit Event Session</span>
                    </v-toolbar>
                    </v-card-title>
                    <v-card-text>
                      <v-container>

                    <v-form ref="form" v-model="valid" lazy validation>

                  <!-- Select Hearing Date Below -->
                    <!-- <v-text-field
                      class="mt-6"
                      item-text="events.eventType"
                      label="Event Type"
                      single-line
                      filled
                      disabled
                      readonly
                      append-icon="mdi-calendar-today"
                  ></v-text-field> -->

                  <div style="text-align: center;">
                  <div class="d-flex flex-row bg-surface-variant" max-width = "780" >
    
                    <!--  Event Type Below -->
                    <v-text-field class=" mr-4" width = "260"
                        v-model="select"
                        item-title=""
                        item-value=""
                        label="Event Type"
                        return-object
                        single-line
                        filled
                        disabled
                        append-icon="mdi-instrument-triangle"
                    ></v-text-field>
    
    
                     <!-- Date Below -->
                    <v-text-field  class=" mr-4" width = "260"
                        item-text=""
                        label="Event Date"
                        return-object
                        single-line
                        filled
                        disabled
                        readonly
                        append-icon="mdi-calendar-today"
                    ></v-text-field>
    
    
                    <!-- mdi-human-male-board -->

                    <!--Event Time Slot-->
                    <!-- :item-text="item => `${events.startTime} ${events.endTime}`" -->
                    <v-text-field width = "260"
                        item-text=""
                        label="Event Duration"
                        return-object
                        single-line
                        filled
                        disabled
                        append-icon="mdi-timer-sand"
                    ></v-text-field>     
                    </div>
                </div>


                <div style="text-align: center;">
                <div class="d-flex flex-row bg-surface-variant" max-width = "780" >
                <v-select class=" mr-4"  width = "360" 
                    item-title="Time Slot"
                    item-value=""
                    label="Select Start Time"
                    return-object
                    single-line
                    filled
                    append-icon="mdi-clock-outline"
                ></v-select>

                <v-text-field class=" mr-0"  width = "360" 
                item-title="Time Slot"
                item-value=""
                label="End Time"
                return-object
                single-line
                filled
                readonly
                append-icon="mdi-clock-outline"
              ></v-text-field>

                </div></div>


                <div style="text-align: center;">
                <div class="d-flex flex-row bg-surface-variant" max-width = "780" >

                <!--  Instrument Select Below -->
                <v-select class=" mr-4" width = "260"
                    v-model="select"
                    :items="items4"
                    item-title="Instrument"
                    item-value=""
                    label="Select Voice/Instrument"
                    return-object
                    single-line
                    filled
                    append-icon="mdi-instrument-triangle"
                ></v-select>


                 <!-- Instructor Select Below -->
                <v-text-field  class=" mr-4" width = "260"
                    :items="items2"
                    item-title="state2"
                    label="Instructor"
                    return-object
                    single-line
                    filled
                    readonly
                    append-icon="mdi-school-outline"
                ></v-text-field>


                <!-- mdi-human-male-board -->
                <v-autocomplete width = "260"
                    :items="items2"
                    label="Accompanist"
                    return-object
                    single-line
                    filled
                    append-icon="mdi-account-outline"
                ></v-autocomplete>     
                </div>
            </div>

                <v-select 
                    item-title="song"
                    label="Select Piece"
                    return-object
                    single-line
                    filled
                    append-icon="mdi-file-music-outline"
                ></v-select>
            
                      </v-form>
                      </v-container>
                      <!-- <small>*indicates required field</small> -->
                    </v-card-text>
                    <v-card-actions>
                      <router-link to="/addaccompanist" tag="v-btn">
                        <v-btn color="primary" class="mr-4">
                          Add Accompanist
                        </v-btn>
                      </router-link>
                      <router-link to="/addsongrepertoire" tag="v-btn">
                        <v-btn color="primary">
                          Add Piece
                        </v-btn>
                      </router-link>
                  
                      <v-spacer></v-spacer>
                      <v-btn
                        color="primary"
                        class="mr-2"
                        @click="editEventSession()"
                      >
                        Save
                      </v-btn>
                      <v-btn
                        color="primary"
                        
                        @click="edit_dialog = false"
                      >
                        Close
                      </v-btn>
                    
                    </v-card-actions>
                  </v-card>
                </v-dialog>


                <v-icon small class="mx-4" @click="editEventSession(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small class="mx-4" @click="viewEventSession(item)">
                  mdi-format-list-bulleted-type
                </v-icon>
                <v-icon v-if="getRoleType()" small class="mx-4" @click="deleteSong(item)">
                  mdi-trash-can
                </v-icon>
              </div>
            </template>
          </v-data-table>
        </v-card>
        <br>
      </v-container>


      <!--here-->
      
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
        <v-card-title   >
          <v-toolbar id="navbar-maroon">
          <span class="text-h5">Edit Event Session</span>
        </v-toolbar>
        </v-card-title>
        <v-card-text>
          <v-container>

          <v-form ref="form" v-model="valid" lazy validation>
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
        append-icon="mdi-calendar-today"
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
        append-icon="mdi-account-outline"
    ></v-select>

    <v-select 
        item-title="Time Slot"
        item-value=""
        label="Select Time Slot"
        return-object
        single-line
        filled
        append-icon="mdi-clock-outline"
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
        append-icon="mdi-school-outline"
     ></v-select>
     <!-- mdi-human-male-board -->
     <v-select class=" mr-4" width = "260"
        :items="items2"
        label="Select Duration"
        return-object
        single-line
        filled
        append-icon="mdi-timer-sand"
     ></v-select>     

    <!--  Instrument Select Below -->
    <v-select
       width = "260"
        v-model="select"
        :items="items4"
        item-title="Instrument"
        item-value=""
        label="Select Voice/Instrument"
        return-object
        single-line
        filled
        append-icon="mdi-instrument-triangle"
    ></v-select>
    </div>
</div>

    <v-select 
        item-title="song"
        label="Select Piece"
        return-object
        single-line
        filled
        append-icon="mdi-file-music-outline"
     ></v-select>
 
          </v-form>
          </v-container>
          <!-- <small>*indicates required field</small> -->
        </v-card-text>
        <v-card-actions>
          <router-link to="/addaccompanist" tag="v-btn">
            <v-btn color="primary" class="mr-4">
              Add Accompanist
            </v-btn>
          </router-link>
          <router-link to="/addsongrepertoire" tag="v-btn">
            <v-btn color="primary">
              Add Piece
            </v-btn>
          </router-link>
       
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            class="mr-2"
            @click="editEventSession()"
          >
            Save
          </v-btn>
          <v-btn
            color="primary"
            
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
          <v-toolbar id="navbar-maroon">
          <span class="text-h5">View Event Session</span>
          </v-toolbar>
        </v-card-title>
        <v-card-text>
          <v-container>

        <v-form ref="form" v-model="valid" lazy validation>
             
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
        append-icon="mdi-calendar-today"
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
        append-icon="mdi-account-outline"
    ></v-text-field >

    <v-text-field  
        item-title="Time Slot"
        item-value=""
        label="Time Slot"
        return-object
        single-line
        filled
        disabled
        append-icon="mdi-clock-outline"
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
        append-icon="mdi-school-outline"
     ></v-text-field >

     <v-text-field  class=" mr-4" width = "260"
        :items="items2"
        label="Duration"
        return-object
        single-line
        filled
        disabled
        append-icon="mdi-timer-sand"
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
        append-icon="mdi-instrument-triangle"
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
        append-icon="mdi-file-music-outline"
     ></v-text-field>
 
          </v-form>
          </v-container>
          <!-- <small>*indicates required field</small> -->
        </v-card-text>
        <v-card-actions>
          <router-link to="/critique" tag="v-btn">
          <v-btn color="primary">
          View Critiques
          </v-btn>
          </router-link>
       
          <v-spacer></v-spacer>
          
          <v-btn
            color="primary"
            @click="view_dialog = false"
          >
            Close
          </v-btn>
         
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="delete_dialog"
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
        mdi-trash-can
        </v-icon>
      </template>
      <v-card>
        <v-card-title>
          <v-toolbar id="navbar-maroon">
          <span class="text-h5">Cancel Event Session</span>
          </v-toolbar>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy validation>
          <v-container>
          <p class="font-weight-heavy mt-6">
            By clicking the submit button you will notifiy an 
            Admin of your desire to cancel the event session and it will be either approved or disapproved.
          </p>
          </v-container>
          </v-form>

          <!-- <small>*indicates required field</small> -->
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            @click="deleteEventSession()"
          >
            Submit
          </v-btn>
       
          <v-spacer></v-spacer>
          
          <v-btn
            color="primary"
            @click=" delete_dialog = false"
          >
            Close
          </v-btn>
         
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
    </div>
    
  </template>
  
  <script>
  import EventServices from "../services/eventServices";
  import EventSessionServices from "../services/eventSessionServices";
  import RoleServices from "../services/roleServices";
  import Utils from "@/config/utils.js";

  export default {
    name: "upcoming-events-list",
    data() {
      return {
        search: "",
        events: [],
        eventSessions:[],
        eventSession:[],
        currentEvent: null,
        currentEventSession: null,
        currentIndex: -1,
        view_dialog: false,
        edit_dialog: false,
        delete_dialog: false,
        title: "",
        //valid:true,
        user: {},
        role: {},
        message: "Search, View or Edit  Event Sessions",
        headers: [
          { text: "Event", value: "eventType" },
          { text: "Date", value: "date" },
          { text: "Start Time", value: "startTime" },
          { text: "End Time", value: "endTime" },
          { text: "Actions", value: "actions", sortable: false }
          // { text: "Event Id", value: "date" },
          // { text: "Start Time", value: "startTime"},
          // { text: "End Time", value: "endTime"},
          //{ text: "Duration", value: "duration"},
          //{ text: "Event Type", value: "eventType"},
          //{ text: "Is Ready", value: "isReady"}
        ],
      };
    },
    async created(){   
      this.user = Utils.getStore("user"); 
      console.log('user');
      console.log(this.user.userId);
      await this.retrieveRole();
      await this.retrieveEvents();
      await this.retrieveEventSessions();
    },   
    methods: {
      async retrieveRole() {
          await RoleServices.getRoleForUser(this.user.userId)
            .then((response) => {
              this.role = response.data[0];
              console.log('role');
              console.log(this.role.id);
            })
            .catch((e) => {
              this.message = e.response.data.message;
            });
        },
        async retrieveEventSessions() {
          await EventSessionServices.get(1)
            .then((response) => {
              this.eventSession = response.data;
            })
            .catch((e) => {
              this.message = e.response.data.message;
            });

          await EventSessionServices.getAllForUser(this.role.id)
            .then((response) => {
              this.eventSessions = response.data;
            })
            .catch((e) => {
              this.message = e.response.data.message;
            });
      },
      async retrieveEvents() {
        if (this.role.roleType == "Student"){
          await EventSessionServices.getAllForUser(this.role.id)
          .then((response) => {
            this.eventSessions = response.data;

          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
          }
      else{
        await EventServices.getAll()
          .then((response) => {
            this.events = response.data;
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
          }
      },
      getRoleType() {
         console.log(this.role.roleType)
            if (this.role.roleType == "Admin"){
              return true
            }
            else{
              return false
            }
        },
      editEventSession() {
        // this.$router.push({ name: "edit", params: { id: eventSession.id } });
        this.edit_dialog = false;
      },
      viewEventSession(eventSession) {
        this.$router.push({ name: "view", params: { id: eventSession.id } });
      },
      deleteEventSession(eventSession) {
        EventSessionServices.delete(eventSession.id)
          .then(() => {
            this.edit_dialog = false;
            this.retrieveEventSessions();
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
        EventSessionServices.deleteAll()
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
  