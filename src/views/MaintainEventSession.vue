<template>
  <div v-if="this.role.roleType == 'Admin' || this.role.roleType == 'Faculty' || this.role.roleType == 'Accompanist'">
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
      <div class="line"></div>
      
        <br>
      <div style="display: flex; justify-content: space-between; text-align: center;">
        <v-spacer><h4>Event Title: {{event.eventTitle}} </h4> </v-spacer>
        <v-spacer><h4>Event Type: {{event.eventType}} </h4> </v-spacer>
        <v-spacer><h4>Date: {{event.date}} </h4> </v-spacer>
        <v-spacer><h4>Time: {{ event.startTime }} - {{event.endTime}}</h4> </v-spacer>
      </div>
      <br>
      <div class="line"></div>
      <br>
      <v-card>
        <v-card-title>
          {{ "All Events" }}
          <v-icon class="ml-1">mdi-calendar-check</v-icon>
          <v-spacer></v-spacer>
        </v-card-title>
          
        <v-card-text>
          <b>{{ message }}</b>
        </v-card-text>
          <v-data-table v-if="isFaculty" :headers="headersFaculty" :items="eventsessions" :search="search" :items-per-page="5" :sort-by="['eventType', 'date', 'startTime', 'endTime']" :sort-desc="[false]">
            <template #item="{ item }">
              <tr>

                <td>{{ convertTime(item.startTime) }}</td>
                <td>{{ convertTime(item.endTime) }}</td>
                <td>{{ item.duration }}</td>
           
                <td>
                  <template item-value="accompanist">
                  <v-icon color="primary" class="mx-4">mdi-account-eye</v-icon>
                  </template>
                </td>
           
                <td>
                  <template item-value="students"> <!--change to view which student is there-->
                  <v-icon color="primary" class="mx-4">mdi-account-eye</v-icon>

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

            <v-data-table v-if="isAccomp" :headers="headersAccomp" :items="eventsessions" :search="search" :items-per-page="5" :sort-by="['eventType', 'date', 'startTime', 'endTime']" :sort-desc="[false]">
              <template #item="{ item }">
                <tr>
  
                  <td>{{ convertTime(item.startTime) }}</td>
                  <td>{{ convertTime(item.endTime) }}</td>
                  <td>{{ item.duration }}</td>

                  <td>
                    <template item-value="faculty">
                    <v-icon color="primary" class="mx-4">mdi-account-eye</v-icon>
                    </template>
                  </td>
             
                  <td>
                    <template item-value="students"> <!--change to view which student is there-->
                    <v-icon color="primary" class="mx-4">mdi-account-eye</v-icon>
                    <v-dialog v-model="editDialog" persistent max-width="800" :retain-focus="false">
  
                      <template v-slot:activator="{ on, attrs }">
                        <!-- <div class="d-flex justify-end"> -->
                        <v-icon color="primary" v-bind="attrs" v-on="on" small class="mx-4" @click="editStudent(item)" >
                        mdi-pencil
                        </v-icon>
                      <!-- </div> -->
                      </template>
        
                      <v-card>
                        <v-card-title>
                        <v-toolbar id="navbar-maroon">
                          <span class="text-h5">Edit Student</span>
                        </v-toolbar>
                      </v-card-title>
                        <v-card-text>
                          <v-container>
        
                          <div style="text-align: center;">
                          <div class="d-flex flex-row bg-surface-variant" max-width = "780" >
        
                            <!-- Name input field -->
                            <v-row>
                              <v-col>
                                <v-text-field class=" mr-4"  width = "380" 
                                  v-model="editedStudent.user.fName"
                                  label="First Name"
                                  disabled
                                  append-icon="mdi-account"
                                ></v-text-field>
                              </v-col>
                              <v-col>
                                <v-text-field class=" mr-4"  width = "390" 
                                  v-model="editedStudent.user.lName"
                                  label="Last Name"
                                  disabled
                                  append-icon="mdi-account"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            </div></div>
        
                          <div style="text-align: center;">
                          <div class="d-flex flex-row bg-surface-variant" max-width = "780" >
                            <!-- Email input field -->
                            <v-row>
                              <v-col>
                                <v-text-field class=" mr-4"  width = "380" 
                                  v-model="editedStudent.user.email"
                                  label="Email"
                                  disabled
                                  append-icon="mdi-email"
                                ></v-text-field>
                              </v-col>
        
                            <!-- Student ID input field -->
                              <v-col>
                                <v-text-field class=" mr-4"  width = "390" 
                                  v-model="editedStudent.studentId"
                                  label="Student ID"
                                  disabled
                                  append-icon="mdi-badge-account-horizontal"
                                ></v-text-field>
                              </v-col>
                            </v-row>
        
                            </div></div>
        
        
                          <div style="text-align: center;">
                          <div class="d-flex flex-row bg-surface-variant" max-width = "780" >
        
        
                          <!-- Major input field -->
                            <v-row>
                            <v-col>
                              <v-text-field class=" mr-4" width = "380"
                                v-model="editedStudent.studentMajor"
                                label="Major"
                                disabled
                                append-icon="mdi-school"
                              ></v-text-field>
                            </v-col>
        
        
                            <!-- Classification input field -->
                              <v-col>
                                <v-text-field class=" mr-4" width = "390"
                                  v-model="editedStudent.studentClassification"
                                  label="Classification"
                                  disabled
                                  append-icon="mdi-bag-personal"
                                ></v-text-field>
                              </v-col>              
                            </v-row>
        
                            </div></div>
        
                            <div style="text-align: center;">
                            <div class="d-flex flex-row bg-surface-variant" max-width = "780" >
        
                            <!-- Semester input field -->
                            <v-row>
                            <v-col>
                              <v-text-field class=" mr-4" width = "260"
                              v-model="editedStudent.studentSemester"
                              label="Semester"
                              disabled
                              append-icon="mdi-book-open-page-variant"
                              ></v-text-field>
                            </v-col>                    
                            
                              <!-- Level input field -->
                              <v-col>
                                <v-text-field class=" mr-4"  width = "250"
                                v-model="editedStudent.level.levelNumber"
                                label="Level"
                                required
                                append-icon="mdi-signal"
                                ></v-text-field>
                              </v-col>
        
                            <!-- Private hours input field -->
                              <v-col>
                                <v-text-field class="mr-4"  width = "250"
                                  v-model="editedStudent.studentPrivateHours"
                                  label="Enter Private Lesson Hours"
                                  required
                                  append-icon="mdi-account-music"
                                ></v-text-field>
                              </v-col>
                            </v-row>
        
                            </div></div>
        
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                         <v-spacer></v-spacer>
                          <v-btn color="primary" class="mx-2" @click="saveStudent(item)">Save</v-btn>
                          <v-btn color="error" class="mx-2" @click="editDialog = false">Cancel</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
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
  name: "maintaineventsession",
  props: ["eventId"],
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
      headersFaculty: [
        { text: "Start Time", value: "startTime", sortable: false },
        { text: "End Time", value: "endTime", sortable: false },
        { text: "Duration", value: "duration", sortable: false },
        { text: "Accompanist", value: "accompanist", sortable: false },
        { text: "Student", value: "student", sortable: false },
        { text: "Critique", value: "critique", sortable: false }
      ],
      headersAccomp: [
        { text: "Start Time", value: "startTime", sortable: false },
        { text: "End Time", value: "endTime", sortable: false },
        { text: "Duration", value: "duration", sortable: false },
        { text: "Faculty", value: "Faculty", sortable: false },
        { text: "Student", value: "student", sortable: false },
        { text: "Critique", value: "critique", sortable: false }
      ]
    };
  },
  mounted() {
    this.retrieveEvents();
  },
  async created(){
    this.user = Utils.getStore("user");
    await this.retrieveRole();
    await this.retrieveThisEvent();
    await this.retrieveEventSessions();
  },
  methods: {
    async retrieveThisEvent() {
        await EventServices.get(this.eventId)
        .then((response) => {
            this.event = response.data;
        })
        .catch((e) => {
            this.message = e.response.data.message;
        });
    },
    async retrieveEventSessions(){
      await EventSessionServices.getAllForEvent(this.eventId)
        .then((response) => {
            console.log('event session', response.data)
            this.eventsessionsevent = response.data;
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
          if (this.eventsessionsevent[i].studentId == this.role.id){
            this.eventsessions.push(this.eventsessionsevent[i]);
          }
        }
      }
      if (this.role.roleType == "Student" || this.role.roleType == "Incoming Student"){
        for (let i = 0; i < this.eventsessionsevent.length; i++) {
          if (this.eventsessionsevent[i].accompanistId == this.role.id){
            this.eventsessions.push(this.eventsessionsevent[i]);
          }
        }
      this.filteredEvents = this.eventsessions;
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
    async retrieveRole() {
        await RoleServices.getRoleForUser(this.user.userId)
          .then((response) => {
            this.role = response.data[0];
            if (response.data[0].roleType == "Faculty"){
              this.isFaculty=true
            }
            if (response.data[0].roleType == "Accompanist"){
              this.isAccomp=true
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
      // if(this.selectedDate == "Upcoming " || this.selectedDate == "Current"){
      //   this.$router.push({ name: "add-critique", params: { eventSessionId: item.id } });
      // }
      // else if(this.selectedDate == "Past"){
      //   this.$router.push({ name: "view-critique", params: { eventSessionId: item.id } });
      // }
      this.$router.push({ name: "addcritique", params: { eventSessionId: item.id } });
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