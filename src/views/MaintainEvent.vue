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

          <v-data-table v-if="isFaculty" :headers="headersFaculty" :items="filteredEvents" :search="search" :items-per-page="5" :sort-by="['eventType', 'date', 'startTime', 'endTime']" :sort-desc="[false]">
            <template #item="{ item }">
              <tr>
                <td>{{ item.eventType }}</td>
                <td>{{ item.date }}</td>
                <td>{{ convertTime(item.startTime) }}</td>
                <td>{{ convertTime(item.endTime) }}</td>
                <td>{{ item.duration }}</td>
           
                <td>  
                  <template item-value="availability">
                    <!--Dialog Availability Faculty and Accompanist-->

              <v-dialog v-if="vAddAvailability" v-model="display_dialog" persistent max-width="800" :retain-focus="false">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon color="grey" dark v-bind="attrs" v-on="on" class="mx-4" @click="addAvailability(item)">
                  mdi-calendar-plus-outline
                  </v-icon>
                </template>
                <v-card>
                  <v-card-title>
                    <v-toolbar id="navbar-maroon">
                    <span class="text-h5">Add Availability</span>
                    </v-toolbar>
                  </v-card-title>
                  <v-card-text>
                      <h3 class="mt-2 ">{{ message }}</h3>
                      <v-form ref="form" v-model="valid" lazy validation>
      
                        <v-text-field class=" mt-2" 
                            
                            label="Name"
                            return-object
                            filled
                            disabled
                            append-icon="mdi-account-box-outline"
                          >{{ name }}
                        </v-text-field>
                  
      
      
                      <div style="text-align: center;">
                        <div class=" mt-2 d-flex flex-row bg-surface-variant" max-width = "780" >
      
                            <!-- Date Below -->
                          <v-text-field class=" mr-4" width = "260"
                            
                            label="Event Date"
                            return-object
            
                            filled
                            disabled
                            append-icon="mdi-calendar-today"
                          ></v-text-field >
      
                          <!--  Event Type Below -->
                          <v-text-field class=" mr-4" width = "260"
                            label="Event Type"
                            return-object
                            single-line
                            filled
                            disabled
                            append-icon="mdi-instrument-triangle"
                          ></v-text-field>
      
                          <!--Event Time Slot-->
                          <!-- :item-text="item => `${events.startTime} ${events.endTime}`" -->
                          <v-text-field width = "260"
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
                        <div class=" mt-2 d-flex flex-row bg-surface-variant" max-width = "780" >
                          <!--  Event Type Below -->
                          <!-- v-model="availability.startTime"
                            id="startTime" -->
                          <v-select class=" mr-4" width = "260"
                            
                            label="Available Start Time"
                            return-object
                            single-line
                            filled
                            append-icon="mdi-clock-in"
                          ></v-select>
      
                          <!--Event Time Slot-->
                          <!-- :item-text="item => `${events.startTime} ${events.endTime}`" -->
                          <!-- v-model="availability.endTime"
                            id="endTime" -->
                          <v-select width = "260"
                            
                            label="Available End Time"
                            return-object
                            single-line
                            filled
                            append-icon="mdi-clock-out"
                          ></v-select>     
                          </div>
                      </div>
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
                  <template item-value="eventsession">
                  <v-icon color="primary" @click="viewEventSessions(item)">mdi-table-eye</v-icon>
                  </template>
              </td>


              </tr>
              </template>
            </v-data-table>

              <!--Dialog to Edit Event Session-->
                <v-dialog v-model="edit_dialog" persistent max-width="800" :retain-focus="false">
                <template v-slot:activator="{ on, attrs }">
                  <div class="d-flex justify-end">
                    <v-icon v-if="vEditEventSession" color="primary" v-bind="attrs" v-on="on">mdi-pencil</v-icon>
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
                    <v-btn color="primary" @click=" display_dialog = false">
                      Close
                    </v-btn>
                  
                  </v-card-actions>
                </v-card>
              </v-dialog>

      </v-card>
    </v-container>
  </div>
</template>

<script>

import EventServices from "../services/eventServices";
import Utils from "@/config/utils.js";
import RoleServices from "../services/roleServices";
import AvailabilityServices from "../services/roleServices";

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
      vEditEventSession:false,
      displayIcon:false,
      vAddAvailability:false,
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
      ],
      headersFaculty: [
        { text: "Event Type", value: "eventType", sortable: false },
        { text: "Date", value: "date", sortable: false },
        { text: "Start Time", value: "startTime", sortable: false },
        { text: "End Time", value: "endTime", sortable: false },
        { text: "Duration", value: "duration", sortable: false },
        { text: "Availability", value: "availability", sortable: false },
        { text: "Event Sessions", value: "eventsession", sortable: false },
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
            if (response.data[0].roleType == "Faculty" || (this.role.roleType == "Accompanist" && this.role.roleType != null)){
              this.isFaculty=true
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
    },
    viewEventSessions(event){
      this.$router.push({ name: "maitaineventsession", params: { eventId: event.id } });
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