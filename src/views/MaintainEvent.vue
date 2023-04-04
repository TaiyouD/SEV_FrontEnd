<template>
  <div>
    <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
    <v-container>
      <v-toolbar>
        <v-btn v-if="isAdmin" icon to="/maintain">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-icon v-if="displayIcon" class="mr-8">align_vertical_top</v-icon>
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
              <td>{{ item.eventTitle }}</td>
              <td>{{ item.eventType }}</td>
              <td>{{ item.date }}</td>
              <td>{{ convertTime(item.startTime) }}</td>
              <td>{{ convertTime(item.endTime) }}</td>

              <td>
                <template item-value="availability">
                <v-icon v-if="vAddAvailability" color="primary" class="mx-4" @click="goToMaintainAvailability(item)">mdi-calendar-plus-outline</v-icon>
                </template>
            </td>
              
              <td>{{ item.isReady ? '&#10003;' : '' }}</td> 

              <td>
                <template item-value="students">
                <v-icon color="primary" class="mx-4">mdi-account-group</v-icon>
                </template>
            </td>

              <td>
                <div class="d-flex justify-end">
                  <v-icon v-if="isCurrentUpcoming" color="primary" @click="editEvent(item)">mdi-pencil</v-icon>
                  <v-icon v-if="isPast" color="error" @click="deleteEvent(item)">mdi-delete</v-icon>
                </div>
              </td>
            </tr>
            </template>
          </v-data-table>

          <v-data-table v-if="isFaculty || isAccompanist" :headers="headersFaculty" :items="filteredEvents" :search="search" :items-per-page="5" :sort-by="['eventType', 'date', 'startTime', 'endTime']" :sort-desc="[false]">
            <template #item="{ item }">
              <tr>
                <td>{{ item.eventTitle }}</td>
                <td>{{ item.eventType }}</td>
                <td>{{ item.date }}</td>
                <td>{{ convertTime(item.startTime) }}</td>
                <td>{{ convertTime(item.endTime) }}</td>
           
                <td>  
                  <template item-value="availability">
                    <!--Dialog Availability Faculty and Accompanist-->
                  
                    <v-icon v-if="vAddAvailability" color="primary" dark class="mx-4" @click="getAvailability(item)">
                      mdi-calendar-plus-outline
                      </v-icon>

              <v-dialog v-model="display_dialog" persistent max-width="800" :retain-focus="false">
                <v-card>
                  <v-card-title>
                    <v-toolbar id="navbar-maroon">
                    <span class="text-h5">Edit Availability</span>
                    </v-toolbar>
                  </v-card-title>
                  <v-card-text>
                      <h3 class="mt-2 ">{{ message }}</h3>
                      <v-form ref="form" lazy validation>
                        <br>
      
                        <div style="text-align: center;">
                        <div class=" d-flex flex-row bg-surface-variant" max-width = "780" >

                        <v-text-field class=" mr-4" width = "260"
                            v-model="editedEvent.eventTitle"
                            label="Event Title"
                            filled
                            disabled
                            append-icon="mdi-book-music-outline">
                        </v-text-field>
                      
                        <!--  Event Type Below -->
                          <v-text-field class=" mr-4" width = "260"
                            label="Event Type"
                            v-model="editedEvent.eventType"
                            filled
                            disabled
                            append-icon="mdi-instrument-triangle"
                          ></v-text-field>
                          </div></div>
      
                      <div style="text-align: center;">
                        <div class=" mt-2 d-flex flex-row bg-surface-variant" max-width = "780" >
      
                            <!-- Date Below -->
                          <v-text-field class=" mr-4" width = "260"
                            v-model="editedEvent.date"
                            label="Event Date"
                            filled
                            disabled
                            append-icon="mdi-calendar-today"
                          ></v-text-field >
      
                          <!--  Event Start Time Below -->
                          <v-text-field class=" mr-4" width = "250"
                            label="Event Start Time"
                            v-model="editedEvent.startTime"
                            filled
                            disabled
                            append-icon="mdi-timer-music-outline"
                          ></v-text-field>
      
                          <!--Event End Time Slot-->
                          <!-- :item-text="item => `${events.startTime} ${events.endTime}`" -->
                          <v-text-field width = "250"
                          v-model="editedEvent.endTime"
                            label="Event End Time"
                            filled
                            disabled
                            append-icon="mdi-timer-music"> 
                          </v-text-field>     
                          </div>
                      </div>
                      <div style="text-align: center;">
                        <div class=" mt-2 d-flex flex-row bg-surface-variant" max-width = "780" >
                          <!--  Availability Start Time Below -->
                          <!-- v-model="availability.startTime"
                            id="startTime" -->
                          <v-text-field class=" mr-4" width = "260"
                          v-model="availability.startTime"
                            label="Available Start Time"
                            return-object
                            single-line
                            filled
                            append-icon="mdi-clock-in"
                          ></v-text-field>
      
                          <!--Event Time Slot-->
                          <!-- :item-text="item => `${events.startTime} ${events.endTime}`" -->
                          <!-- v-model="availability.endTime"
                            id="endTime" -->
                          <v-text-field width = "260"
                            v-model="availability.endTime"
                            label="Available End Time"
                            single-line
                            filled
                            append-icon="mdi-clock-out"
                          ></v-text-field>     
                          </div>
                      </div>
                        <v-checkbox v-model="showTextField" label="More Availability"/>
                        <div style="text-align: center;">
                        <div class=" mt-2 d-flex flex-row bg-surface-variant" max-width = "780" >
                        <v-text-field v-if="showTextField" class=" mr-4" width="260"
                        v-model="availability.startTime"
                          label="Available Start Time"
                          return-object
                          single-line
                          filled
                          append-icon="mdi-clock-in"
                        ></v-text-field>
                        <v-text-field v-if="showTextField" width="260"
                        v-model="availability.endTime"
                        label="Available End Time"
                        single-line
                        filled
                        append-icon="mdi-clock-out"
                      ></v-text-field>    
                        </div></div>
                    </v-form>
                    </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="saveAvailability(item)">
                      Save
                    </v-btn>
                    <v-btn color="primary" @click=" display_dialog = false">
                      Cancel
                    </v-btn>
                  
                  </v-card-actions>
                </v-card>
              </v-dialog>
                  </template>
                </td>

                <td>
                  <template item-value="students">
                  <v-icon color="primary" class="mx-4">mdi-account-group</v-icon>
                  </template>
                </td>
            
                <td>
                  <template item-value="eventsession">
                  <v-icon color="primary" class="mx-4" @click="viewEventSessions(item)">mdi-table-eye</v-icon>
                  </template>
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
  name: "maintainevent",
  props: ["id"],
  data() {
    return {
      user:{},
      role:{},
      tempRole:{},
      display_dialog: false,
      isAdmin:false,
      isFaculty:false,
      isAccompanist:false,
      vEditEventSession:false,
      displayIcon:false,
      vAddAvailability:false,
      isPast:false,
      isCurrentUpcoming:false,
      facultyId:null,
      accompanistId:null,
      showTextField: false,
      editedEvent:{
        eventTitle:"",
        eventType:"",
        startTime:"",
        endTime:""
      },
      availabilities:{},
      availability:[{
        startTime:"",
        endTime:""
      }],
      found:false,
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
        { text: "Event Title", value: "eventTitle", sortable: false },
        { text: "Event Type", value: "eventType", sortable: false },
        { text: "Date", value: "date", sortable: false },
        { text: "Start Time", value: "startTime", sortable: false },
        { text: "End Time", value: "endTime", sortable: false },
        { text: "Availability", value: "availability", sortable: false }, //not display this unless is upcoming
        { text: "Ready", value: "isReady", sortable: false },
        { text: "Students", value: "students", sortable: false },
      ],
      headersFaculty: [
        { text: "Event Title", value: "eventTitle", sortable: false },
        { text: "Event Type", value: "eventType", sortable: false },
        { text: "Date", value: "date", sortable: false },
        { text: "Start Time", value: "startTime", sortable: false },
        { text: "End Time", value: "endTime", sortable: false },
        { text: "Availability", value: "availability", sortable: false }, //not display this unless is upcoming
        { text: "Students", value: "students", sortable: false },
        { text: "Event Sessions", value: "eventsession", sortable: false }
      ],
    };
  },
  mounted() {
    this.retrieveEvents();
  },
  created(){
    this.user = Utils.getStore("user");
    this.retrieveRole();
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
            else{
              this.displayIcon=true
            }
            if (response.data[0].roleType == "Faculty"){
              this.isFaculty=true
            }
            if (this.role.roleType == "Accompanist" && this.role.roleType != null){
              this.isAccompanist=true
            }
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
    dateCondition(){
      // if(this.selectedDate == "Upcoming " && this.role.roleType != "Admin"){
      //     this.vEditEventSession = true
      // }
      // else{
      //   this.vEditEventSession = false
      // }
      if (this.selectedDate == "Upcoming "){
        this.vAddAvailability=true
      }
      else{
        this.vAddAvailability=false
      }
      if (this.selectedDate == "Upcoming " || this.selectedDate == 'Current'){
        this.isCurrentUpcoming=true
      }
      else{
        this.isCurrentUpcoming=false
      }
      if(this.selectedDate == "Past"){
        this.isPast = true;
      }
      else{
        this.isPast = false
      }
    },
    viewEventSessions(event){
      this.$router.push({ name: "maintaineventsession", params: { eventId: event.id } });
    },
    async getAvailability(event){
        // Set the edited student data to the clicked student
        this.checkRole()
        console.log("event selected")
        console.log(event)
        this.editedEvent = { ...event };
        await AvailabilityServices.getAll()
        .then((response) => {
            const resul = [];
            this.availabilities = response.data;
            console.log("availabilities", this.availabilities)
            for(let i = 0; i < response.data.length; i++){
              if(response.data[i].eventId == event.id){
                if (this.isAccompanist){
                  if (response.data[i].accompanistId == this.role.id){
                      resul.push(this.availabilities[i]);
                      this.accompanistId = this.role.id
                      this.found = true
                    }
                  }
                if (this.isFaculty){
                  if (response.data[i].facultyId == this.role.id){
                    resul.push(this.availabilities[i]);
                    this.facultyId = this.role.id
                    this.found = true
                  }
                }
              }
            }
            if (this.found){
              this.availability = resul[0];
            }            
        })
        console.log("availability", this.availability)
        await this.displayDialog();
    },
    displayDialog(){
      this.display_dialog = true;
    },
    goToMaintainAvailability(event){
      this.$router.push({ name: "maintainavailability", params: { eventId: event.id } });
    },
    checkRole(){
      if(this.isFaculty){
        this.facultyId = this.role.id
        console.log("faculty Id", this.facultyId)
      }
      if(this.isAccompanist){
        this.accompanistId = this.role.id
        console.log("accompanist Id", this.accompanistId)
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
      console.log("item", item)
      console.log("faculty Id", this.facultyId)      
      console.log("accompanist Id", this.accompanistId)
      // console.log('isReady', this.editedEvent.isReady )
      if(!this.editedEvent.isReady){
        var data = {
          facultyId: this.facultyId,
          accompanistId: this.accompanistId,
          eventId: item.eventId,
          startTime: this.availability.startTime,
          endTime: this.availability.endTime
        };
        AvailabilityServices.create(data) 
          .then((response) => {
            this.availability.id = response.data.id;
            console.log("add " + response.data);
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
        //   this.editedEvent.isReady = true;
        //   console.log('here event',this.editedEvent)
        // EventServices.update(this.editedDate.id, this.editedDate)
        }
        else{
          AvailabilityServices.update(this.availability.id,this.availability) 
          .then(() => {
            this.message = 'The Availability was updated successfully!';
          })
          .catch(e => {
            this.message = e.response.data.message;
          });
        }
        this.display_dialog = false;
      },

  },
};
</script>