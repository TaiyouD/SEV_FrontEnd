<template>
  <div v-if="this.user.selectedRole == 'Admin' || (this.user.selectedRole == 'Faculty') || (this.user.selectedRole == 'Accompanist')">
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
              {{ selectedDate || "Upcoming "}}
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
        <v-data-table v-if="isAdmin && (isCurrent || isUpcoming)" :headers="headersAdmin" :items="filteredEvents" :search="search" :items-per-page="5" :sort-by="['eventTitle', 'date', 'startTime', 'endTime']" :sort-desc="[false]">
          <template #item="{ item }">
            <tr>
              <td>{{ item.eventTitle }}</td>
              <td>{{ item.date }}</td>
              <td>{{ convertTime(item.startTime) }} - {{ convertTime(item.endTime) }}</td>

              <td >
                <template item-value="isReady">
                  <div v-if="isUpcoming || isCurrent">
                  <v-icon v-if="item.isReady" color="green" class="mx-1">mdi-check-bold</v-icon>
                  <div v-else>
                    <v-icon color="red darken-3" class="mx-1" @click="confirmIsReady(item)">mdi-alpha-x-box-outline</v-icon>
                  </div>
                  </div>
                  </template>

                  <v-dialog v-model="showReadyDialog" max-width="500">
                    <v-card>
                      <v-card-title class="headline">Set Event Ready</v-card-title>
                      <v-card-text>
                        Are you sure you want to make this event available for students to sign up?
                      </v-card-text>
                      <v-card-actions>
                        <v-btn color="primary" text @click="yesIsConfirmReady()">Approve</v-btn>
                        <v-btn text @click="showReadyDialog = false">Cancel</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
              </td> 


              <td>
                <template item-value="availability">
                <v-icon color="primary" class="mx-4" @click="goToMaintainAvailability(item)">mdi-calendar-plus-outline</v-icon>
                </template>
            </td>
        
              <td>
                <template item-value="students">
                <v-icon color="primary" class="mx-4" @click="goToStudents(item)">mdi-account-group</v-icon>
                </template>
            </td>

            <td>
              <template item-value="eventsession">
                <v-icon color="primary" class="mx-4" @click="viewEventSessions(item)">mdi-table-eye</v-icon>
                </template>
              </td>

              <td>
                <div class="d-flex justify-end">
                  <v-icon v-if="isUpcoming || isCurrent" color="primary" @click="editEvent(item)">mdi-pencil</v-icon>
                  <v-icon color="error" @click="deleteEvent(item)">mdi-delete</v-icon>
                </div>
              </td>
            </tr>
            </template>
          </v-data-table>

          <v-dialog v-model="showDeleteDialog" max-width="500">
            <v-card>
              <v-card-title class="headline">Confirm Delete</v-card-title>
              <v-card-text>
                Are you sure you want to delete this event?
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" text @click="showDeleteDialog = false">Cancel</v-btn>
                <v-btn color="error" text @click="deleteEventConfirmed">Delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-data-table v-if="isAdmin && isPast" :headers="headersAdminPast" :items="filteredEvents" :search="search" :items-per-page="5" :sort-by="['eventTitle', 'date', 'startTime', 'endTime']" :sort-desc="[false]">
            <template #item="{ item }">
              <tr>
                <td>{{ item.eventTitle }}</td>
                <td>{{ item.date }}</td>
                <td>{{ convertTime(item.startTime) }} - {{ convertTime(item.endTime) }}</td>
  
          
                <td>
                  <template item-value="students">
                  <v-icon color="primary" class="mx-4" @click="goToStudents(item)">mdi-account-group</v-icon>
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
  


          <v-data-table v-if="(isFaculty || isAccompanist) && (isUpcoming || isCurrent)" :headers="headersFaculty" :items="filteredEvents" :search="search" :items-per-page="5" :sort-by="['eventTitle', 'date', 'startTime', 'endTime']" :sort-desc="[false]">
            <template #item="{ item }">
              <tr>
                <td>{{ item.eventTitle }}</td>
                <td>{{ item.date }}</td>
                <td>{{ convertTime(item.startTime) }} - {{ convertTime(item.endTime) }}</td>
           
                <td>  
                  <template item-value="availability">
                    <!--Dialog Availability Faculty and Accompanist-->
                  
                    <v-icon color="primary" dark class="mx-4" @click="getAvailability(item) && displayDialog()">
                      mdi-calendar-plus-outline
                      </v-icon>

              <v-dialog v-model="display_dialog" persistent max-width="800" :retain-focus="false">
                <v-card>
                  <v-card-title>
                    <v-toolbar id="navbar-maroon">
                    <span class="text-h5">View Availability</span>
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
                          <v-text-field class=" mr-4" width="260"
                            v-model="editedEvent.date"
                            label="Event Date"
                            filled
                            disabled
                            append-icon="mdi-calendar-today"
                          ></v-text-field >
      
                          <!--  Event Start Time Below -->
                          <v-text-field class=" mr-4" width="250"
                            label="Event Start Time"
                            v-model="editedEvent.startTime"
                            filled
                            disabled
                            append-icon="mdi-timer-music-outline"
                          ></v-text-field>
      
                          <!--Event End Time Slot-->
                          <!-- :item-text="item => `${events.startTime} ${events.endTime}`" -->
                          <v-text-field width="250"
                          v-model="editedEvent.endTime"
                            label="Event End Time"
                            filled
                            disabled
                            append-icon="mdi-timer-music"> 
                          </v-text-field>     
                          </div>
                      </div>  
                   
                    <div v-for="(availability, index) in originalAvailabilities" :key="index">
                      
                      <div style="text-align: center;">
                        <div class="d-flex flex-row align-items-center justify-content-center bg-surface-variant" max-width="780">
                          
                          <!-- Availability Start Time Below -->
                          <v-menu
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                            class="mr-4"
                            width="260"
                            v-model="availability.startTime"
                            label="Available Start Time"
                            return-object
                            single-line
                            filled
                            append-icon="mdi-clock-in"
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            v-model="availability.startTime"
                            format="ampm"
                            class="custom-picker-add"
                            :minute-steps="5"
                            :allowed-minutes="[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]"
                          ></v-time-picker>
                        </v-menu>

                        <!-- Availability End Time Below -->
                          <v-menu
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                            class="mr-4"
                            width="260"
                            v-model="availability.endTime"
                            label="Available End Time"
                            return-object
                            single-line
                            filled
                            append-icon="mdi-clock-in"
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            v-model="availability.endTime"
                            format="ampm"
                            class="custom-picker-add"
                            :minute-steps="5"
                            :allowed-minutes="[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]"
                          ></v-time-picker>
                        </v-menu>
                                            
                          <v-icon v-if="originalAvailabilities.length > 1" class="ml-4 mb-6" size="28" color="primary" @click="removeAvailability(availability, index)">mdi-trash-can-outline</v-icon>
                          <br>

                          <v-dialog v-model="deleteAvailabilityDialog" max-width="500">
                            <v-card>
                              <v-card-title class="headline">Confirm Delete</v-card-title>
                              <v-card-text>
                                Are you sure you want to delete this availability?
                              </v-card-text>
                              <v-card-actions>
                                <v-btn color="primary" text @click="deleteAvailabilityDialog = false">Cancel</v-btn>
                                <v-btn color="error" text @click="deleteAvailabilityConfirmed">Delete</v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </div></div>
                    </div>  
                    <div style="text-align: center;">
                      <v-icon v-if="displayPlusIcon && !noAvailability" color="primary" size="36" @click="addAvailability = true; displayPlusIcon = false">mdi-plus-box-outline</v-icon>
                    </div>
                    <div v-if="addAvailability || noAvailability">
                            <div v-for="(availability, index) in listAvailabilities" :key="index">
                              
                              <div style="text-align: center;">
                                <div class="d-flex flex-row align-items-center justify-content-center bg-surface-variant" max-width="780">

                                  <!-- Availability Start Time Below -->
                                <v-menu
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                  class="mr-4"
                                  width="260"
                                  v-model="availability.startTime"
                                  label="Available Start Time"
                                  return-object
                                  single-line
                                  filled
                                  readonly
                                  append-icon="mdi-clock-in"
                                    v-bind="attrs"
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                <v-time-picker
                                  v-model="availability.startTime"
                                  format="ampm"
                                  class="custom-picker-add"
                                  :minute-steps="5"
                                  :allowed-minutes="[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]"
                                ></v-time-picker>
                              </v-menu>

                                <!-- Availability End Time Below -->
                                  <v-menu
                                  :close-on-content-click="false"
                                  transition="scale-transition"
                                  offset-y
                                  min-width="auto"
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                    class="mr-4"
                                    width="260"
                                    v-model="availability.endTime"
                                    label="Available End Time"
                                    return-object
                                    single-line
                                    readonly
                                    filled
                                    append-icon="mdi-clock-in"
                                      v-bind="attrs"
                                      v-on="on"
                                    ></v-text-field>
                                  </template>
                                  <v-time-picker
                                    v-model="availability.endTime"
                                    format="ampm"
                                    class="custom-picker-add"
                                    :minute-steps="5"
                                    :allowed-minutes="[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]"
                                  ></v-time-picker>
                                </v-menu>                                                  
                                  <v-icon class="ml-4 mb-6" size="28" color="primary" @click="removeEmptyAvailability(availability, index)">mdi-trash-can-outline</v-icon>
                                  <br>
                                </div></div>
                            </div>                         
                            
                          
                          <div style="text-align: center;">
                              <v-icon color="primary" size="36" @click="moreAvailability()">mdi-plus-box-outline</v-icon>
                          </div>
                        </div>
                            
                       
                    </v-form>
                    </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="success" @click="saveAvailability(item)">
                      Save
                    </v-btn>
                    <v-btn color="error" @click=" display_dialog = false; listAvailabilities = [
                      {
                        startTime:'',
                        endTime:''
                      }
                    ]">
                      Cancel
                    </v-btn>
                  
                  </v-card-actions>
                </v-card>
              </v-dialog>
                  </template>
                </td>

                <td>
                  <template item-value="students">
                  <v-icon color="primary" class="mx-3" @click="goToStudents(item)">mdi-account-group</v-icon>
                  </template>
                </td>
            
                <td>
                  <template item-value="eventsession">
                  <v-icon color="primary" class="mx-7" @click="viewEventSessions(item)">mdi-table-eye</v-icon>
                  </template>
              </td>
              </tr>
              </template>
            </v-data-table>

            <v-data-table v-if="(isFaculty || isAccompanist) && isPast" :headers="headersFacultyPast" :items="filteredEvents" :search="search" :items-per-page="5" :sort-by="['eventTitle', 'date', 'startTime', 'endTime']" :sort-desc="[false]">
              <template #item="{ item }">
                <tr>
                  <td>{{ item.eventTitle }}</td>
                  <td>{{ item.date }}</td>
                  <td>{{ convertTime(item.startTime) }} - {{ convertTime(item.endTime) }}</td>
              
                  <td>
                    <template item-value="students">
                    <v-icon color="primary" class="mx-3" @click="goToStudents(item)">mdi-account-group</v-icon>
                    </template>
                  </td>
              
                  <td>
                    <template item-value="eventsession">
                    <v-icon color="primary" class="mx-7" @click="viewEventSessions(item)">mdi-table-eye</v-icon>
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
      showDeleteDialog: false,
      deleteEventId: null,
      deleteAvailabilityId: null,
      deleteIndex: null,
      readyEvent: null,
      showReadyDialog: false,
      deleteAvailabilityDialog:false,
      user:{},
      role:{},
      tempRole:{},
      display_dialog: false,
      isAdmin:false,
      isFaculty:false,
      isAccompanist:false,
      displayIcon:false,
      isUpcoming:false,
      isCurrent:false,
      isPast:false,
      facultyId:null,
      accompanistId:null,
      editedEvent:{
        eventTitle:"",
        eventType:"",
        startTime:"",
        endTime:""
      },
      listAvailabilities:[
        {
          startTime:'',
          endTime:''
        }
      ],
      availabilities:{},
      availability:{
        startTime:'',
        endTime:''
      },
      addAvailability:false,
      displayPlusIcon:true,
      noAvailability:false,
      originalAvailabilities:[],
      showTextField: false,
      found:false,
      search: "",
      events: [],
      filteredEvents: [],
      eventsList: ["All Events", "Junior", "Jury", "Hearing", "Scholarship", "Senior"],
      selectedEvent: null,
      filteredDates: [],
      eventsDate: ["Current", "Past", "Upcoming "],
      selectedDate: "Upcoming ",
      selectedFilter: null,
      upcomingList:[],
      currentList:[],
      pastList:[],
      message: "Add, Edit or Delete Events",
      headersAdmin: [
        { text: "Event Title", value: "eventTitle", sortable: false },
        { text: "Date", value: "date", sortable: false },
        { text: "Time", value: "time", sortable: false },
        { text: "Ready", value: "isReady", sortable: false },//not display this unless is upcoming
        { text: "Availability", value: "availability", sortable: false }, //not display this unless is upcoming
        { text: "Students", value: "students", sortable: false },
        { text: "Event Sessions", value: "eventsession", sortable: false }
      ],
      headersAdminPast: [
        { text: "Event Title", value: "eventTitle", sortable: false },
        { text: "Date", value: "date", sortable: false },
        { text: "Time", value: "time", sortable: false },
        { text: "Students", value: "students", sortable: false },
        { text: "Event Sessions", value: "eventsession", sortable: false }
      ],
      headersFaculty: [
        { text: "Event Title", value: "eventTitle", sortable: false },
        { text: "Date", value: "date", sortable: false },
        { text: "Time", value: "time", sortable: false },
        { text: "Availability", value: "availability", sortable: false }, //not display this unless is upcoming
        { text: "Students", value: "students", sortable: false },
        { text: "Event Sessions", value: "eventsession", sortable: false }
      ],
      headersFacultyPast: [
        { text: "Event Title", value: "eventTitle", sortable: false },
        { text: "Date", value: "date", sortable: false },
        { text: "Time", value: "time", sortable: false },
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
            const now = new Date();
            const timezoneOffset = now.getTimezoneOffset() * 60 * 1000; // Convert to milliseconds
            const today = new Date(now.getTime() - timezoneOffset).toDateString();

              
              this.events = response.data;
              // this.filteredEvents = response.data;

              // filter past events
              this.pastList = this.events.filter((event) => {
                const eventDate = new Date(event.date);
                return eventDate < new Date(today);
              });

              // filter current events
              this.currentList = this.events.filter((event) => {
                const eventDate = new Date(event.date);
                return (eventDate.toDateString() === today);
              });

              // filter upcoming events
              this.upcomingList = this.events.filter((event) => {
                const eventDate = new Date(event.date);
                return eventDate > new Date(today + " 23:59:59");
              });
            this.filteredEvents = this.upcomingList;
            this.isUpcoming = true;
            console.log('filtered events', this.filteredEvents)

            console.log('current', this.currentList)
            console.log('past', this.pastList)
            console.log('upcoming', this.upcomingList)

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

      // const date = new Date(`1/1/2000 ${time}`);
      // const options = { hour: 'numeric', minute: '2-digit', hour12: true };
      // const formattedTime = date.toLocaleTimeString([], options);
      // return formattedTime;

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
      if (this.selectedDate) {
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

    //Manage events
    addEvent() {
      this.$router.push({ name: "addevent", params: { EventId: this.id } });
    },
    editEvent(event) {
      this.$router.push({ name: "editevent", params: { id: event.id } });
    },
    deleteEvent(event) {
      this.deleteEventId = event.id;
      this.showDeleteDialog = true;
    },

    //Alert message before deleting event
    deleteEventConfirmed() {
      EventServices.delete(this.deleteEventId)
        .then(() => {
          const index = this.events.findIndex(e => e.id === this.deleteEventId);
          this.events.splice(index, 1);
          this.filterData();
          this.message = "Event was deleted successfully!";
        })
        .catch((error) => {
          console.log(error);
        });
      this.showDeleteDialog = false;
    },

    //handling role conditions
    retrieveRole() {
        RoleServices.getRoleForUser(this.user.userId)
          .then((response) => {
            console.log('response role here', response.data)
            for (let i = 0; i < response.data.length; i++){
              if (response.data[i].roleType == this.user.selectedRole) {
                this.role = response.data[i];
              }
            }
            if (this.user.selectedRole == "Admin"){
              this.isAdmin=true
            }
            else{
              this.displayIcon=true
            }
            if (this.user.selectedRole == "Faculty"){
              this.isFaculty=true
              this.facultyId = response.data[0].id
              console.log("faculty Id", this.facultyId)

            }
            if (this.user.selectedRole == "Accompanist" && this.user.selectedRole != null){
              this.isAccompanist=true
              this.accompanistId = response.data[0].id
              console.log("accompanist Id", this.accompanistId)
            }
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },

      //handling filter date condition
    dateCondition(){
      if (this.selectedDate == "Upcoming "){
        this.isUpcoming=true
        this.isCurrent=false
        this.isPast=false
      }
      if (this.selectedDate == 'Current'){
        this.isCurrent = true
        this.isUpcoming=false
        this.isPast=false
      }
      if(this.selectedDate == "Past"){
        this.isPast = true;
        this.isCurrent = false
        this.isUpcoming=false
      }
    },
    //get selected event info and open confirmation message
    confirmIsReady(event){ 
      this.readyEvent = {...event};
      this.showReadyDialog = true;
    },
    //save is ready = true on the seected event
    yesIsConfirmReady(){
      this.readyEvent.isReady = true;
      console.log('event', this.readyEvent)
      EventServices.update(this.readyEvent.id, this.readyEvent)
      this.showReadyDialog = false;
      window.location.reload(); 
    },
    //admin direct to maintain availability page 
    goToMaintainAvailability(event){
      this.$router.push({ name: "maintainavailability", params: { eventId: event.id } });
    },
    
    //go to list of students signed up for event
    goToStudents(event){
      this.$router.push({ name: "viewstudentsevent", params: { eventId: event.id } });
    },

    //go to event sessions page
    viewEventSessions(event){
      this.$router.push({ name: "maintaineventsession", params: { eventId: event.id } });
    },

    //availability for faculyt/accompanist

    //get all avaiabilities for the selected event and for the specific role
    async getAvailability(event){
        // set the edited student data to the clicked student
        console.log("event selected")
        console.log(event)
        this.editedEvent = { ...event };

        //reinitialize variables specially after close a dialog and call this function again
        this.availabilities = []
        this.originalAvailabilities = []
        this.availability={
        startTime:'',
        endTime:''
      }
        this.message= "Add, Edit or Delete Events";
        this.listAvailabilities=[{
          startTime:'',
          endTime:''
        }];        
        this.found = false;
        this.addAvailability=false;
        this.noAvailability=false;

        //get all availabilities
        await AvailabilityServices.getAll()
        .then((response) => {
          console.log("response", response.data)
            const resul = [];
            //getting event depending if is accompanist or faculty
            for(let i = 0; i < response.data.length; i++){
              if(response.data[i].eventId == event.id){
                if (this.isAccompanist){
                  if (response.data[i].accompanistId == this.role.id){
                      resul.push(response.data[i]);
                      this.accompanistId = this.role.id
                      this.found = true}
                  }
                if (this.isFaculty){
                  if (response.data[i].facultyId == this.role.id){
                    resul.push(response.data[i]);
                    this.facultyId = this.role.id
                    this.found = true
                  }
                }
              }
            }
            if (this.found){
              this.availability = resul[0]; //just handling one availability
              console.log(this.listAvailabilities)
              this.originalAvailabilities = resul;
              this.displayPlusIcon=true;
            }            
            else{
              this.noAvailability=true;
            }
        })
        console.log("availability", this.availability)
        console.log("availabilities", this.availabilities)
        console.log('availability lenght', this.availabilities.length)
       // await this.displayDialog();
    },
    displayDialog(){
      this.display_dialog = true;
    },

    //add more availability slots
    moreAvailability() {
      this.listAvailabilities.push({
        startTime: '',
        endTime: '',
        id: null
      });
    },

    removeAvailability(availability, index) {
      this.deleteAvailabilityId = availability.id;
      this.deleteIndex = index;
      this.deleteAvailabilityDialog = true;
    },

    //remove an existing availability slots after confirmed
    deleteAvailabilityConfirmed() {
      AvailabilityServices.delete(this.deleteAvailabilityId)
        .then(() => {
          this.originalAvailabilities.splice(this.deleteIndex, 1);
          this.message = "Event was deleted successfully!";
        })
        .catch((error) => {
          console.log(error);
        });
      this.deleteAvailabilityDialog=false;
      this.getAvailability(this.editedEvent);
    },

    //remove empty availability slots
    removeEmptyAvailability(item, index) {
      console.log("here 1", item)
      this.listAvailabilities.splice(index, 1);
      console.log("here 2")
    },

    //save changes to availability times
    async saveAvailability(item) { 
      console.log("item", item)
      //this.listAvailabilities.unshift(this.availability)
      console.log("list of availabilities", this.listAvailabilities)
      //create a new availability if us adding a new one
        for (let i = 0; i < this.listAvailabilities.length; i++){
          if(this.listAvailabilities[i].startTime != "" || this.listAvailabilities[i].endTime != ""){
            var data = {
              facultyId: this.facultyId,
              accompanistId: this.accompanistId,
              eventId: item.id,
              startTime: this.listAvailabilities[i].startTime,
              endTime: this.listAvailabilities[i].endTime
            };
            await AvailabilityServices.create(data) 
              .then((response) => {
                console.log("add " + response.data);
              })
              .catch((e) => {
                this.message = e.response.data.message;
              });
        }}
        //update an availability if it already exists
          for (let i = 0; i < this.originalAvailabilities.length; i++){
            await AvailabilityServices.update(this.originalAvailabilities[i].id,this.originalAvailabilities[i]) 
            .then(() => {
              this.message = 'The Availability was updated successfully!';
            })
            .catch(e => {
              this.message = e.response.data.message;
            });
        }
        this.display_dialog = false;
        this.getAvailability(item);
        //this.listAvailabilities.shift(this.availability)

      },

  },
};
</script>
