<template>
  <div>
    <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
    <v-container>
      <v-toolbar>
        <v-btn icon to="/maintainevent">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>My Event Sessions</v-toolbar-title>
        <v-spacer></v-spacer>
          <v-text-field v-model="search" prepend-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
      </v-toolbar>
      <br />
      <div style="display: flex; justify-content: space-between; text-align: center;">
        <h4>Event: {{event.eventType}} </h4>
        <h4>Date: {{event.date}} </h4>
        <h4>Time: {{ event.startTime }} - {{event.endTime}}</h4>
      </div>
      <br>
      <v-card>
        <v-card-title>
          {{ "All Events" }}
          <v-icon class="ml-1">mdi-calendar-check</v-icon>
          <v-spacer></v-spacer>
          <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" color="red darken-4" dark>
              <span class="white--text">{{ selectedEvent || "All Events" }}</span>
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
            <v-btn v-bind="attrs" v-on="on" color="primary" class="ml-2">
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
          <v-btn v-if="isAdmin" class="mx-2" color="success" @click="addEvent(id)">Create Event</v-btn>
        </v-card-title>
        <v-card-text>
          <b>{{ message }}</b>
        </v-card-text>
        <v-data-table v-if="isAdmin" :headers="headersAdmin" :items="filteredEvents" :search="search" :items-per-page="5" :sort-by="['eventType', 'date', 'startTime', 'endTime']" :sort-desc="[false]">
          <template #item="{ item }">
            <tr>
              <td>{{ item.eventType }}</td>
              <td>{{ item.date }}</td>
              <td>{{ convertTime(item.startTime) }}</td>
              <td>{{ convertTime(item.endTime) }}</td>
              <td>{{ item.duration }}</td>
              <td>{{ item.isReady ? '&#10003;' : '' }}</td> 

              <td>
                <template item-value="students">
                <v-icon color="primary" class="mx-4">mdi-account-group</v-icon>
                </template>
            </td>

              <td>
                <div class="d-flex justify-end">
                  <v-icon color="primary" @click="editEvent(item)">mdi-pencil</v-icon>
                  <v-icon color="error" @click="deleteEvent(item)">mdi-delete</v-icon>
                </div>
              </td>
            </tr>
            </template>
          </v-data-table>

          <v-data-table v-if="isFaculty" :headers="headersFaculty" :items="filteredEvents" :search="search" :items-per-page="5" :sort-by="['eventType', 'date', 'startTime', 'endTime']" :sort-desc="[false]">
            <template #item="{ item }">
              <tr>
                <td>{{ item.eventType }}</td>
                <td>{{ item.date }}</td>
                <td>{{ convertTime(item.startTime) }}</td>
                <td>{{ convertTime(item.endTime) }}</td>
                <td>{{ item.duration }}</td>
           
                <td>
                  <template item-value="students"> <!--change to view which student is there-->
                  <v-icon color="primary" class="mx-4">mdi-account-group</v-icon>
                  </template>
                </td>

                <td>
                  <template item-value="critique">
                  <v-icon color="primary" class="mx-4" @click="maintainCritique(item)">mdi-list-box-outline</v-icon>
                  </template>
                </td>
              </tr>
              </template>
            </v-data-table>

            <v-data-table v-if="isStudent" :headers="headersStudent" :items="filteredEvents" :search="search" :items-per-page="5" :sort-by="['eventType', 'date', 'startTime', 'endTime']" :sort-desc="[false]">
              <template #item="{ item }">
                <tr>
                  <td>{{ item.eventType }}</td>
                  <td>{{ item.date }}</td>
                  <td>{{ convertTime(item.startTime) }}</td>
                  <td>{{ convertTime(item.endTime) }}</td>
                  <td>{{ item.duration }}</td>
   
                  <td>
                    <template item-value="critique">
                    <v-icon color="primary" v-if="vAddCritique" class="mx-4" @click="maintainCritique(item)">mdi-list-box-outline</v-icon>
                    </template>
                  </td>
                
                  <td>
                                  <!--Dialog to Edit Event Session-->
                  <v-dialog persistent max-width="800" :retain-focus="false">
                    <template v-slot:activator="{ on, attrs }">
                      <div class="d-flex justify-end">
                        <v-icon color="primary" v-bind="attrs" v-on="on">mdi-pencil</v-icon>
                     </div>
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
                        <v-btn color="primary" class="mr-2" @click="editEventSession()">
                          Save
                        </v-btn>
                        <v-btn color="primary" @click="display_dialog == false">
                          Close
                        </v-btn>
                      
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </td>
                </tr>
                </template>
              </v-data-table>

      </v-card>
    </v-container>
  </div>
</template>

<script>

import EventServices from "../services/eventServices.js";
import Utils from "@/config/utils.js";
import RoleServices from "../services/roleServices.js";
import AvailabilityServices from "../services/availabilityServices.js";

export default {
  name: "maintaineventsession",
  props: ["eventId"],
  data() {
    return {
      user:{},
      role:{},
      event:{},
      tempRole:{},
      display_dialog: false,
      isAdmin:false,
      isFaculty:false,
      isStudent:false,
      vEditEventSession:false,
      vAddAvailability:false,
      vAddCritique:false,
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
      headersAdmin: [
        { text: "Event Type", value: "eventType", sortable: false },
        { text: "Date", value: "date", sortable: false },
        { text: "Start Time", value: "startTime", sortable: false },
        { text: "End Time", value: "endTime", sortable: false },
        { text: "Duration", value: "duration", sortable: false },
        { text: "Ready", value: "isReady", sortable: false },
        { text: "Students", value: "students", sortable: false },
      ],
      headersFaculty: [
        { text: "Event Type", value: "eventType", sortable: false },
        { text: "Date", value: "date", sortable: false },
        { text: "Start Time", value: "startTime", sortable: false },
        { text: "End Time", value: "endTime", sortable: false },
        { text: "Duration", value: "duration", sortable: false },
        { text: "Students", value: "students", sortable: false },
        { text: "Critique", value: "critique", sortable: false }
      ],
      headersStudent: [
        { text: "Event Type", value: "eventType", sortable: false },
        { text: "Date", value: "date", sortable: false },
        { text: "Start Time", value: "startTime", sortable: false },
        { text: "End Time", value: "endTime", sortable: false },
        { text: "Duration", value: "duration", sortable: false },
        { text: "Critique", value: "critique", sortable: false },
        { text: "Edit Event", value: "edit", sortable: false },
        
      ],
    };
  },
  mounted() {
    this.retrieveEvents();
  },
  created(){
    this.user = Utils.getStore("user");
    this.retrieveRole();
    this.retrieveThisEvent();
    this.retrieveEventSessions();
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
    retrieveThisEvent() {
        EventServices.get(this.eventId)
        .then((response) => {
            this.event = response.data;
        })
        .catch((e) => {
            this.message = e.response.data.message;
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
      this.dateCondition();
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
    retrieveRole() {
        RoleServices.getRoleForUser(this.user.userId)
          .then((response) => {
            this.role = response.data[0];
            if (response.data[0].roleType == "Admin"){
              this.isAdmin=true
            }
            if (response.data[0].roleType == "Faculty" || (this.role.roleType == "Accompanist" && this.role.roleType != null)){
              this.isFaculty=true
            }
            if (response.data[0].roleType == "Student" || response.data[0].roleType == "Incoming Student"){
              this.isStudent=true
            }
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
    dateCondition(){
      if (this.selectedDate == "Upcoming "){ //find a better solution to display right on "All Events"
        this.vAddAvailability=true
        this.vAddCritique=false
      }
      else if(this.selectedDate == "All Events" || this.selectedDate == null){
        this.vAddAvailability=false
        this.vAddCritique=false
      }
      else{
        this.vAddAvailability=false
        this.vAddCritique=true
      }
    },
    viewEventSessions(event){
      this.$router.push({ name: "maintaineventsession", params: { eventId: event.id } });
    },
    displayDialog(){
      this.display_dialog = true;
    },
    maintainCritique(item){
      if(this.selectedDate == "Upcoming " || this.selectedDate == "Current"){
        this.$router.push({ name: "add-critique", params: { eventSessionId: item.id } });
      }
      else if(this.selectedDate == "Past"){
        this.$router.push({ name: "view-critique", params: { eventSessionId: item.id } });
      }
    },
    addAvailability(availability) { //change
      // Set the edited student data to the clicked student
      console.log("event")
      console.log(availability)
      this.editedStudent = { ...availability };
      // Show the edit dialog
      this.display_dialog = true;
    },
    saveAvailability(item) { //change
        var data = {
          facultyId: this.role.id,
          accompanistId: this.role.id,
          eventId: item.id,
          startTime: this.availability.startTime,
          endTime: this.availability.endTime
        };
        AvailabilityServices.create(data)
          .then((response) => {
            this.repertoireSong.id = response.data.id;
            console.log("add " + response.data);
            this.$router.push({ name: "eventupcoming"});
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
        this.display_dialog = false;
      },

  },
};
</script> 