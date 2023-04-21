<template>
  <div v-if = "this.role.roleType  == 'Student' || this.role.roleType == 'Incoming Student' || this.role.roleType == 'Accompanist'">
    <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
    <v-container>
      <v-toolbar>
        <v-btn v-if="isFaculty || isAccomp" icon to="/maintainevent">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-icon v-if="isStudent" class="mr-8">align_vertical_top</v-icon>
        <v-toolbar-title>My Event Sessions</v-toolbar-title>
        <v-spacer></v-spacer>
          <v-text-field v-model="search" prepend-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
      </v-toolbar>
      <br />


      <v-card>
        <v-card-title>
          {{ "All Events Sessions" }}
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
              {{ selectedDate || "Upcoming" }}
              <v-icon>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="event in eventsDate" :key="event" @click="filterDates(event)">
              <v-list-item-title>{{ event }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        </v-card-title>
        <v-card-text>
          <b>{{ message }}</b>
        </v-card-text>

        <v-data-table v-if="isStudent" :headers="headersStudent" :items="filteredEvents" :search="search" :items-per-page="5" :sort-by="['eventType', 'date', 'startTime', 'endTime']" :sort-desc="[false]">
              <template #item="{ item }">
                <tr>

                  <td>{{ item.event.eventTitle }}</td>
                  <td>{{ item.event.eventType }}</td>
                  <td>{{ item.event.date }}</td>
                  <td>{{ convertTime(item.startTime) }}</td>
                  <td>{{ convertTime(item.endTime) }}</td>
                  <!-- <td>{{ item.duration }}</td> -->
   
                  <td>
                    <template item-value="critique">
                    <v-icon color="primary" v-if="vAddCritique" class="mx-4" @click="maintainCritique(item)">mdi-list-box-outline</v-icon>
                    </template>
                  </td>
                
                  <td>
                                  <!--Dialog to Edit Event Session-->
                  <v-dialog v-model="display_dialog" persistent max-width="800" :retain-focus="false">
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
    
                      <v-form ref="form" lazy validation>
    
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
                            item-title=""
                            item-value=""
                            v-model="selectedEventType"
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
                      item-title="state2"
                      label="Instructor"
                      return-object
                      single-line
                      filled
                      readonly
                      append-icon="mdi-school-outline"
                  ></v-text-field>
                  
    
                <!-- Instructor Select Below -->
                  <!-- mdi-human-male-board -->
                  <v-autocomplete width = "260"
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
                        <v-btn color="primary" @click="display_dialog = false">
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
import EventSessionServices from "../services/eventSessionServices.js";
import Utils from "@/config/utils.js";
import RoleServices from "../services/roleServices.js";
import AvailabilityServices from "../services/availabilityServices.js";

export default {
  name: "maintaineventstudent",
  data() {
    return {
      user:{},
      role:{},
      event:{},
      tempRole:{},
      display_dialog: false,
      isFaculty:false,
      isAccomp:false,
      isStudent:false,
      vEditEventSession:false,
      vAddAvailability:false,
      vAddCritique:false,
      search: "",
      events: [],
      eventsessionsevent:[],
      eventsessions:[],
      filteredEvents: [],
      eventsList: ["All Events", "Junior", "Jury", "Recital", "Scholarship", "Senior"],
      selectedEvent: null,
      filteredDates: [],
      eventsDate: ["All Dates", "Current", "Past", "Upcoming "],
      selectedDate: null,
      selectedFilter: null,
      message: "Add, Edit or Delete Events",
      headersStudent: [
        { text: "Event Title", value: "event.eventTitle", sortable: false },
        { text: "Event Type", value: "event.eventType", sortable: false },
        { text: "Date", value: "event.date", sortable: false },
        { text: "Start Time", value: "startTime", sortable: false },
        { text: "End Time", value: "endTime", sortable: false },
        //{ text: "Duration", value: "duration", sortable: false },
        // { text: "Faculty", value: "faculty", sortable: false },
        // { text: "Accompanist", value: "accompanist", sortable: false },
        { text: "Critique", value: "critique", sortable: false },
        { text: "", sortable: false}      
      ],
      filteredEventsSession: [],
      //filteredEvents: [],
    };
  },
  mounted() {
    //this.retrieveEvents();
    this.retrieveEventSessions();
    
  },
  async created(){
    this.user = Utils.getStore("user");
    await this.retrieveRole();
    
    //await this.retrieveThisEvent();
    //await this.retrieveEventSessions();

  },
  methods: {
  retrieveEvents() {
    return new Promise((resolve, reject) => {
        EventServices.getAll()
        .then((response) => {
          for(let i = 0; i < response.data.length; i++){
          if (response.data[i].studentId == this.role.id){
            this.events.push(response.data[i])
            this.filteredEvents.push(response.data[i])
            console.log("This is the filteredEvents", this.filteredEvents)
            this.filteredDates.push(response.data[i])
          }}
            resolve();
        })
        .catch((e) => {
            this.message = e.response.data.message;
            reject(e);
        });
    });
    },
    // async retrieveThisEvent() {
    //     await EventServices.get(this.eventId)
    //     .then((response) => {
    //         this.event = response.data;
    //     })
    //     .catch((e) => {
    //         this.message = e.response.data.message;
    //     });
    // },
    async retrieveEventSessions(){
        await EventSessionServices.getAll()
        .then((response) => {
          const now = new Date();
          //const timezoneOffset = now.getTimezoneOffset() * 60 * 1000; // Convert to milliseconds
          //const today = new Date(now.getTime() - timezoneOffset).toDateString();
          const tomorrow = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
          
          for(let i = 0; i < response.data.length; i++){
          if (response.data[i].studentId == this.role.id){
            this.events.push(response.data[i])
            //this.filteredEvents.push(response.data[i])
            this.filteredDates.push(response.data[i])
            // this.eventsessionsevent = response.data;
          }
          } 
            console.log("tomorrow", tomorrow)
            this.upcomingList = this.events.filter((event => new Date(event.event.date) >= tomorrow));
            this.filteredEvents = this.upcomingList;
            this.isUpcoming = true;
            console.log('filtered events', this.filteredEvents)


          console.log('event session2', this.events[0])
        })
        .catch((e) => {
            this.message = e.response.data.message;
        });
      await this.retrieveEventSessionPerRole();
    },
    retrieveEventSessionPerRole(){
      if (this.role.roleType == "Faculty"){
        for (let i = 0; i < this.eventsessionsevent.length; i++) {
          if (this.eventsessionsevent[i].privateInstructorId == this.role.id){
            this.eventsessions.push(this.eventsessionsevent[i]);
          }
        }
      }
      if (this.role.roleType == "Accompanist"){
        for (let i = 0; i < this.eventsessionsevent.length; i++) {
          if (this.eventsessionsevent[i].accompanistId == this.role.id){
            this.eventsessions.push(this.eventsessionsevent[i]);
          }
        }
      }
      if (this.role.roleType == "Student" || this.role.roleType == "Incoming Student"){
        for (let i = 0; i < this.eventsessionsevent.length; i++) {
          if (this.eventsessionsevent[i].studentId == this.role.id){
            //console.log("Testing" , this.eventsessionsevent[i].studentId)
            this.eventsessions.push(this.eventsessionsevent[i]);
          }
        }
      this.filteredEventsSession = this.eventsessions;
      }
      console.log('event per role', this.eventsessions);
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
      let filteredData = this.events 
      console.log("fiter", this.filteredEvents)
      if (this.selectedEvent && this.selectedEvent !== "All Events") {
        filteredData = filteredData.filter(event => event.event.eventType === this.selectedEvent);
      }
      if (this.selectedDate && this.selectedDate !== "All Dates") {
        if (this.selectedDate === "Current") {
          const now = new Date();
          const timezoneOffset = now.getTimezoneOffset() * 60 * 1000; // Convert to milliseconds
          const today = new Date(now.getTime() - timezoneOffset).toDateString();
          filteredData = filteredData.filter(event => new Date(event.event.date).toDateString() === today);
        } else if (this.selectedDate === "Past") {
          const now = new Date();
          const timezoneOffset = now.getTimezoneOffset() * 60 * 1000; // Convert to milliseconds
          const today = new Date(now.getTime() - timezoneOffset).toDateString();
          filteredData = filteredData.filter(event => new Date(event.event.date) < new Date(today));
        } else if (this.selectedDate === "Upcoming ") {
          const now = new Date();
          const timezoneOffset = now.getTimezoneOffset() * 60 * 1000; // Convert to milliseconds
          const today = new Date(now.getTime() - timezoneOffset).toDateString();
          filteredData = filteredData.filter(event => new Date(event.event.date) > new Date(today + " 23:59:59")); // Need to include" 23:59:59" to not show the current date
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
    async retrieveRole() {
        await RoleServices.getRoleForUser(this.user.userId)
          .then((response) => {
            for (let i = 0; i < response.data.length; i++){
              if (response.data[i].roleType == this.user.selectedRole) {
                this.role = response.data[i];
              }
            }
            this.role = response.data[0];
            if (response.data[0].roleType == "Faculty"){
              this.isFaculty=true
            }
            if (response.data[0].roleType == "Accompanist"){
              this.isAccomp=true
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
    // viewEventSessions(event){
    //   this.$router.push({ name: "maintaineventsession", params: { eventId: event.id } });
    // },
    displayDialog(){
      this.display_dialog = true;
    },
    maintainCritique(item){
    if(this.selectedDate == "Past"){
        this.$router.push({ name: "critique", params: { eventSessionId: item.id } });
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
<style>
.line {
  border-top: 1.5px solid black;
  margin: 10px auto;
  width: 96.5%;
}
</style>