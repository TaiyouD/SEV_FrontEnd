<template>
  <div v-if="this.role.roleType == 'Admin' || (this.role.roleType == 'Faculty') || (this.role.roleType == 'Accompanist')">
    <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
    <v-container>
      <v-toolbar>
        <v-btn v-if="isFaculty || isAccomp || isAdmin" icon to="/maintainevent">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
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
        <v-spacer><h4>Time: {{ convertTime(event.startTime) }} - {{convertTime(event.endTime)}}</h4> </v-spacer>
      </div>
      <br>
      <div class="line"></div>
      <br>
      <v-card>
        <v-card-title>
          {{ "All Event Sessions" }}
          <v-icon class="ml-1">mdi-calendar-check</v-icon>
          <v-spacer></v-spacer>
        </v-card-title>
          
        <v-card-text>
          <b>{{ message }}</b>
        </v-card-text>
          <v-data-table v-if="isFaculty" :headers="headersFaculty" :items="eventsessions" :search="search" :items-per-page="5" :sort-by="['eventTitle', 'date', 'startTime', 'endTime']" :sort-desc="[false]">
            <template #item="{ item }">
              <tr>

                <td>{{ convertTime(item.startTime) }}</td>
                <td>{{ convertTime(item.endTime) }}</td>
           
                <td>
                  <template item-value="accompanist">
                  <v-icon color="primary" class="mx-4" @click="getAccompanist(item)">mdi-account-eye</v-icon>
                  <v-dialog v-model="accomp_dialog" persistent max-width="700" :retain-focus="false">
                    <v-card>
                      <v-card-title>
                        <v-toolbar id="navbar-maroon">
                        <span class="text-h5">View Accompanist</span>
                        </v-toolbar>
                      </v-card-title>
                      <v-card-text>
                          <h3 class="mt-2 ">{{ message }}</h3>
                          <v-form ref="form" lazy validation>
                            <br>
          
                            <div style="text-align: center;">
                            <div class=" d-flex flex-row bg-surface-variant" max-width="780" >
    
                            <v-text-field class="mr-4" width="360"
                                v-model="accompanist.user.fName"
                                label="First Name"
                                filled
                                disabled
                                append-icon="mdi-account">
                            </v-text-field>
                          
                            <!--  Last Name Below -->
                              <v-text-field class=" mr-4" width="360"
                                label="Last Name"
                                v-model="accompanist.user.lName"
                                filled
                                disabled
                                append-icon="mdi-account"
                              ></v-text-field>
                              </div></div>

                            <!--  Email Below -->
                              <v-text-field class=" mr-4"
                                label="Email"
                                v-model="accompanist.user.email"
                                filled
                                disabled
                                append-icon="mdi-email"
                              ></v-text-field>
    
                        </v-form>
                        </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click=" accomp_dialog = false">
                          Back
                        </v-btn>
                      
                      </v-card-actions>
                    </v-card>
                  </v-dialog>

                  </template>
                </td>
           
                <td>
                  <template item-value="students">
                  <v-icon color="primary" class="mx-4"  @click="getStudent(item)">mdi-account-eye</v-icon>
                  <v-dialog v-model="student_dialog" persistent max-width="700" :retain-focus="false">    
                    <v-card>
                      <v-card-title>
                      <v-toolbar id="navbar-maroon">
                        <span class="text-h5">View Student</span>
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
                                v-model="student.user.fName"
                                label="First Name"
                                disabled
                                append-icon="mdi-account"
                              ></v-text-field>
                            </v-col>
                            <v-col>
                              <v-text-field class=" mr-4"  width = "390" 
                                v-model="student.user.lName"
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
                                v-model="student.user.email"
                                label="Email"
                                disabled
                                append-icon="mdi-email"
                              ></v-text-field>
                            </v-col>
      
                          <!-- Student ID input field -->
                            <v-col>
                              <v-text-field class=" mr-4"  width = "390" 
                                v-model="student.studentId"
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
                              v-model="student.studentMajor"
                              label="Major"
                              disabled
                              append-icon="mdi-school"
                            ></v-text-field>
                          </v-col>
      
      
                          <!-- Classification input field -->
                            <v-col>
                              <v-text-field class=" mr-4" width = "390"
                                v-model="student.studentClassification"
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
                            v-model="student.studentSemester"
                            label="Semester"
                            disabled
                            append-icon="mdi-book-open-page-variant"
                            ></v-text-field>
                          </v-col>                    
                          
                            <!-- Level input field -->
                            <v-col>
                              <v-text-field class=" mr-4"  width = "250"
                              v-model="student.level.levelNumber"
                              label="Level"
                              disabled
                              append-icon="mdi-signal"
                              ></v-text-field>
                            </v-col>
      
                          <!-- Private hours input field -->
                            <v-col>
                              <v-text-field class="mr-4"  width = "250"
                                v-model="student.studentPrivateHours"
                                label="Enter Private Lesson Hours"
                                disabled
                                append-icon="mdi-account-music"
                              ></v-text-field>
                            </v-col>
                          </v-row>
      
                          </div></div>
      
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                       <v-spacer></v-spacer>
                        <v-btn color="primary" @click=" student_dialog = false">Back</v-btn>
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

                <td>
                  <template v-if="item.hasPassed === null">
                    <v-btn color="primary" small>Add</v-btn>
                  </template>
                  <template v-else-if="item.hasPassed">
                    <span class="green--text">Passed</span>
                  </template>
                  <template v-else>
                    <span class="red--text">Failed</span>
                  </template>
                </td>

              </tr>
              </template>
            </v-data-table>

            <v-data-table v-if="isAccomp" :headers="headersAccomp" :items="eventsessions" :search="search" :items-per-page="5" :sort-by="['eventTitle', 'date', 'startTime', 'endTime']" :sort-desc="[false]">
              <template #item="{ item }">
                <tr>
  
                  <td>{{ convertTime(item.startTime) }}</td>
                  <td>{{ convertTime(item.endTime) }}</td>

                  <td>
                    <template item-value="faculty">
                    <v-icon color="primary" class="mx-4">mdi-account-eye</v-icon>
                    </template>
                  </td>
             
                  <td>
                    <template item-value="students"> 
                    <v-icon color="primary" class="mx-4">mdi-account-eye</v-icon>
                    <v-dialog v-model="student_dialog" persistent max-width="700" :retain-focus="false">    
                      <v-card>
                        <v-card-title>
                        <v-toolbar id="navbar-maroon">
                          <span class="text-h5">View Student</span>
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
                                  v-model="student.user.fName"
                                  label="First Name"
                                  disabled
                                  append-icon="mdi-account"
                                ></v-text-field>
                              </v-col>
                              <v-col>
                                <v-text-field class=" mr-4"  width = "390" 
                                  v-model="student.user.lName"
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
                                  v-model="student.user.email"
                                  label="Email"
                                  disabled
                                  append-icon="mdi-email"
                                ></v-text-field>
                              </v-col>
        
                            <!-- Student ID input field -->
                              <v-col>
                                <v-text-field class=" mr-4"  width = "390" 
                                  v-model="student.studentId"
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
                                v-model="student.studentMajor"
                                label="Major"
                                disabled
                                append-icon="mdi-school"
                              ></v-text-field>
                            </v-col>
        
        
                            <!-- Classification input field -->
                              <v-col>
                                <v-text-field class=" mr-4" width = "390"
                                  v-model="student.studentClassification"
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
                              v-model="student.studentSemester"
                              label="Semester"
                              disabled
                              append-icon="mdi-book-open-page-variant"
                              ></v-text-field>
                            </v-col>                    
                            
                              <!-- Level input field -->
                              <v-col>
                                <v-text-field class=" mr-4"  width = "250"
                                v-model="student.level.levelNumber"
                                label="Level"
                                disabled
                                append-icon="mdi-signal"
                                ></v-text-field>
                              </v-col>
        
                            <!-- Private hours input field -->
                              <v-col>
                                <v-text-field class="mr-4"  width = "250"
                                  v-model="student.studentPrivateHours"
                                  label="Enter Private Lesson Hours"
                                  disabled
                                  append-icon="mdi-account-music"
                                ></v-text-field>
                              </v-col>
                            </v-row>
        
                            </div></div>
        
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                         <v-spacer></v-spacer>
                          <v-btn color="primary" @click=" student_dialog = false">Back</v-btn>
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

export default {
  name: "maintaineventsession",
  props: ["eventId"],
  data() {
    return {
      user:{},
      role:{},
      event:{},
      tempRole:{},
      accomp_dialog: false,
      student_dialog: false,
      isAdmin: false,
      isFaculty:false,
      isAccomp:false,
      search: "",
      accompanist:{
        user:{
          fName:"",
          lName:"",
          email:""
        }
      },
      student:{
        user:{
          fName:"",
          lName:"",
          email:""
        },
        level:{
          levelNumber:null
        }
      },
      events: [],
      eventsessionsevent:[],
      eventsessions:[],
      isCurrentEvent:false,
      isPastEvent:false,
      isUpcomingEvent:false,
      message: "Add, Edit or Delete Events",
      headersFaculty: [
        { text: "Start Time", value: "startTime", sortable: false },
        { text: "End Time", value: "endTime", sortable: false },
        { text: "Accompanist", value: "accompanist", sortable: false },
        { text: "Student", value: "student", sortable: false },
        { text: "Critique", value: "critique", sortable: false },
        { text: "Passed", value: "passed", sortable: false }
      ],
      headersAccomp: [
        { text: "Start Time", value: "startTime", sortable: false },
        { text: "End Time", value: "endTime", sortable: false },
        { text: "Faculty", value: "faculty", sortable: false },
        { text: "Student", value: "student", sortable: false },
        { text: "Critique", value: "critique", sortable: false }
      ],
      headersAdmin: [
        { text: "Start Time", value: "startTime", sortable: false },
        { text: "End Time", value: "endTime", sortable: false },
        { text: "Faculty", value: "faculty", sortable: false },
        { text: "Accompanist", value: "accompanist", sortable: false },
        { text: "Student", value: "student", sortable: false },
        { text: "Critique", value: "critique", sortable: false },
        { text: "Passed", value: "passed", sortable: false }
      ],
    };
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

            const eventDate = new Date(response.data.date);
            const now = new Date();
            const timezoneOffset = now.getTimezoneOffset() * 60 * 1000;
            const today = new Date(now.getTime() - timezoneOffset);
            const midnight = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

            // check if it is a past event
            if (eventDate < today) {
              this.isPastEvent = true;
            }

            // check if it is a current event
            if (eventDate >= today && eventDate <= midnight) {
              this.isCurrentEvent = true;
            }

            // check if it is an upcoming event
            if (eventDate > midnight) {
              this.isUpcomingEvent = true;
            }
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
      if (this.role.roleType == "Admin"){
            this.eventsessions=this.eventsessionsevent
        }
      console.log('event per role', this.eventsessions);
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
            if (response.data[0].roleType == "Admin"){
              this.isAdmin=true
            }
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      displayHasPassed(){
        for(let i = 0; i < this.eventsessions.length; i++){
          if (this.eventsessions[i] == ""){
            //passed and green
          }
          else if (this.eventsessions[i] == false){
            //failed and red
          }
          else{
            //button to select the has passed
          }
        }
      },
      convertTime(time) {
      const date = new Date(`1/1/2000 ${time}`);
      const formattedTime = date.toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'});
      return formattedTime;
    },
    maintainCritique(item){
      if(this.isUpcomingEvent|| this.isCurrentEvent){
        this.$router.push({ name: "addcritique", params: { eventSessionId: item.id } });
      }
      else{
        this.$router.push({ name: "critique", params: { eventSessionId: item.id } });
      }
    },
    getAccompanist(accompanist) { 
      console.log('got accomp', accompanist)
      RoleServices.get(accompanist.accompanistId)
      .then((response) => {
            this.accompanist = response.data;
            console.log('accompanist');
            console.log(this.accompanist);
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });

      // Show the edit dialog
      this.accomp_dialog = true;
    },
    getStudent(student) { 
      RoleServices.get(student.studentId)
      .then((response) => {
            this.student = response.data;
            console.log('accompanist');
            console.log(this.student);
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });

      // Show the edit dialog
      this.student_dialog = true;
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