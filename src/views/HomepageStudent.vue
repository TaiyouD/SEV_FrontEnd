<template>
  
    <div>
      <v-parallax src="../assets/music-notes-bg1.jpg" height="100" />
      <v-container>
        
      <v-toolbar>
          <v-toolbar-title>Hello! {{this.name}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-title>{{this.message}}</v-toolbar-title>
      </v-toolbar>
        <!-- <br /><br /> -->
      <!-- <div  class="mx-auto">
      <v-alert
        v-model="alert"
        dismissible
        color="primary"
        border="top"
        elevation="8"
        colored-border
       
      >
       Hello!
       {{this.name}}
      </v-alert>
      </div>
      <div class="text-center">
        <v-btn
          v-if="!alert"
          dark
          @click="alert = true"
        >
          Reset Alert
        </v-btn>
      </div> -->
    </v-container>
      <v-sheet
      class="mx-auto"
      max-width="1200"
    >
    <v-container fluid>
        <v-row dense>
          <v-col cols="12">
            <v-card>
              <v-img
                src="../assets/piano-1.jpg"
                class="align-end text-white"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="60"
                cover
              >
              <v-card-title class="white--text">Upcoming Events</v-card-title>
              </v-img>
  
              <v-card-text>
                <v-data-table
                  :headers="eventHeaders"
                  :search="eventsearch"
                  :items="eventstemp"
                  :items-per-page="50"
                >
                  <!-- <template v-slot:[`item.actions`]="{ item }">
                    <div>
                      <v-icon small class="mx-4" @click="editTutorial(item)">
                        mdi-pencil
                      </v-icon>
                      <v-icon small class="mx-4" @click="viewTutorial(item)">
                        mdi-format-list-bulleted-type
                      </v-icon>
                      <v-icon small class="mx-4" @click="deleteTutorial(item)">
                        mdi-trash-can
                      </v-icon>
                    </div>
                  </template> -->
                </v-data-table>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <router-link class="routerLink" v-if="user != null" :to="{ name: 'maintaineventstudent' }">
                  <v-btn size="small" 
                  color="surface-variant" variant="text" text>
                  CLICK TO SEE DETAILS
                  <v-icon>mdi-arrow-right</v-icon>
                  </v-btn>
                </router-link>
              </v-card-actions>
            </v-card>
            
          </v-col>
          <v-col cols="5">
            <v-card>
              <v-img
                src="../assets/piano-1.jpg"
                class="align-end text-white"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="60"
                cover
              >
              <v-card-title class="white--text">How to Sign-Up for Events</v-card-title>
              </v-img>
  
              <v-card-text>
                <v-carousel
                  height="400"
                  hide-delimiter-background
                  show-arrows-on-hover
                >
                  <template v-slot:prev="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      icon
                    > <v-icon>mdi-arrow-left</v-icon></v-btn>
                  </template>
                  <template v-slot:next="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      icon
                    > <v-icon>mdi-arrow-right</v-icon></v-btn>
                  </template>
                  <v-carousel-item>
                    <h3>
                      Sign-Up for Jury Recital
                    </h3>
                    <p>
                      An OC student you should follow this proccess to sign-up for a Jury Recital:
                      <br>
                      <br>1. Click on the Sign-Up Button on the Menu Bar.
                      <br>2. From the Sign-Up page select the avaliable Jury Recital from the list of upcoming events.
                      <br>3. After selecting the event find and select a start time for your performance that fit your avaliablity.
                      <br>4. Then fill out the rest of the information necessary for your Jury performance.
                      <br>5. Click Submit after all information has been filled out.
                      <br><br> If you are missing a piece or can't find a Accompanist click on the provided buttons to fill out the forms to find or add them.
                    </p>
                  </v-carousel-item>
                  <v-carousel-item>
                    <h3>
                      Sign-Up for Recital Hearing
                    </h3>
                    <p>
                      An OC student you should follow this proccess to sign-up for a Recital Hearing:
                      <br>
                      <br>1. Click on the Sign-Up Button on the Menu Bar.
                      <br>2. From the Sign-Up page select the avaliable Recital Hearing from the list of upcoming events.
                      <br>3. After selecting the event find and select a start time for your performance that fit your avaliablity.
                      <br>4. Then fill out the rest of the information necessary for your Recital Hearing performance.
                      <br>5. Click Submit after all information has been filled out.
                      <br><br> If you are missing a piece or can't find a Accompanist click on the provided buttons to fill out the forms to find or add them.
                    </p>
                  </v-carousel-item>
                  <v-carousel-item>
                    <h3>
                      Sign-Up for Capstone
                    </h3>
                    <p>
                      An OC student you should follow this proccess to sign-up for a Senior or Junior Capstone Recital:
                      <br>
                      <br>1. Click on the Sign-Up Button on the Menu Bar.
                      <br>2. From the Sign-Up page select the avaliable Capstone event for yourself either being Junior or Senior from the list of upcoming events.
                      <br>3. After selecting the event find and select a start time for your performance that fit your avaliablity.
                      <br>4. Then fill out the rest of the information necessary for your Capstone performance.
                      <br>5. Click Submit after all information has been filled out.
                      <br><br> If you are missing a piece or can't find a Accompanist click on the provided buttons to fill out the forms to find or add them.
                    </p>
                  </v-carousel-item>
                </v-carousel>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <!-- <v-btn size="small" 
                href="https://www.oc.edu/academics/undergraduate-programs/music"
                target="_blank"
                rel="noreferrer"
                color="surface-variant" variant="text" text>
                CLICK TO LEARN MORE
                <v-icon>mdi-arrow-right</v-icon>
                </v-btn> -->
              </v-card-actions>
            </v-card>
          </v-col>
  
          <v-col cols="7">
            <v-card>
              <v-img
                src="../assets/piano-1.jpg"
                class="align-end text-white"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="60"
                cover
              >
              <v-card-title class="white--text">Notification</v-card-title>
              </v-img>
              <v-card-title>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-card-text >
                <v-data-table
                  :headers="notificationHeaders"
                  :search="notificationsearch"
                  :items="notifications"
                  :items-per-page="50"
                  height="330"
                >
                  <template v-slot:[`item.actions`]="{ item }">
                    <div>
                      <v-icon small class="mx-4" @click="viewNotification(item)">
                        mdi-format-list-bulleted-type
                      </v-icon>
                      <v-icon small class="mx-4" @click="deleteNotification(item)">
                        mdi-trash-can
                      </v-icon>
                    </div>
                  </template>
                </v-data-table>
              </v-card-text>
  
              <!-- <v-card-actions>
                <v-spacer></v-spacer> 
                <v-btn size="small" color="surface-variant" variant="text" icon>
                  <v-icon>mdi-arrow-right</v-icon>
                </v-btn>
              </v-card-actions> -->
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      </v-sheet>
    </div>
</template>
    
<script>
    import EventServices from "../services/eventServices";
    import roleServices from "@/services/roleServices";
    import Utils from "@/config/utils.js";
    export default {
      name: "home-page",
      data() {
        return {
          notificationsearch: "",
          notifications: [],
          currentNotification: null,
          currentNotificationIndex: -1,
          notificationHeaders: [
            { text: "Title", value: "title" },
            { text: "Description", value: "description" },
            { text: "Actions", value: "actions", sortable: false },
          ],

          eventsearch: "",
          events: [],
          eventstemp:[],
          filteredEvents:[],
          currentEvent: null,
          currentEventIndex: -1,
          eventHeaders: [
            { text: "Event Title", value: "eventTitle", sortable: false },
            { text: "Event Type", value: "eventType", sortable: false },
            { text: "Date", value: "date", sortable: false },
            { text: "Start Time", value: "startTime", sortable: false },
            { text: "End Time", value: "endTime", sortable: false },
          ],
          title: "",
          user: {},
          message: "Welcome to the Music Department",
          model: 0,
          alert: true,
          name: "",
          initials: "",
        };
      },
      async created() {
        this.resetMenu();
      },
      async mounted() {
        this.resetMenu();
        this.retrieveRole();
        this.retrieveEvents();
      },
      methods: {
        resetMenu() {
        this.user = null;
        // ensures that their name gets set properly from store
        this.user = Utils.getStore("user");
        if (this.user != null) {
          this.initials = this.user.fName[0] + this.user.lName[0];
          this.name = this.user.fName + " " + this.user.lName;
        }
      },
      retrieveRole() {
      roleServices.getRoleForUser(this.user.userId)
        .then((response) => {
          this.role = response.data[0];
          console.log("role: " + this.role.roleType);
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
      },
      retrieveEvents() {
      EventServices.getAll()
        .then((response) => {
          this.eventstemp = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
        // for (let i = 0; i < this.eventstemp.length; i++) {
        //   console.log("events dates");
        //   console.log(this.eventstemp[i].date);
        // }
        console.log(this.eventstemp[0].date);
      },
    //   retrieveEventsPerRole(){
    //   if (this.role.roleType == "Faculty"){
    //     for (let i = 0; i < this.eventstemp.length; i++) {
    //       if (this.eventstemp[i].privateInstructorId == this.role.id){
    //         this.events.push(this.eventstemp[i]);
    //       }
    //     }
    //   }
    //   if (this.role.roleType == "Accompanist"){
    //     for (let i = 0; i < this.eventstemp.length; i++) {
    //       if (this.eventstemp[i].studentId == this.role.id){
    //         this.events.push(this.eventstemp[i]);
    //       }
    //     }
    //   }
    //   if (this.role.roleType == "Student" || this.role.roleType == "Incoming Student"){
    //     for (let i = 0; i < this.eventstemp.length; i++) {
    //       if (this.eventstemp[i].accompanistId == this.role.id){
    //         this.events.push(this.eventstemp[i]);
    //       }
    //     }
    //   this.filteredEvents = this.events;
    //   }
    //   console.log('event per role', this.events);
    // },
    // convertTime(time) {
    //   const date = new Date(`1/1/2000 ${time}`);
    //   const formattedTime = date.toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'});
    //   return formattedTime;
    // },
    // filterEvents(filter) {
    //   this.selectedEvent = filter;
    //   this.selectedFilter = filter;
    //   this.filterData();
    // },
    // filterDates(filter) {
    //   this.selectedDate = filter;
    //   this.selectedFilter = filter;
    //   this.filterData();
    // },
    // filterData() {
    //   this.dateCondition();
    //   let filteredData = this.events;
    //   if (this.selectedEvent && this.selectedEvent !== "All Events") {
    //     filteredData = filteredData.filter(event => event.eventType === this.selectedEvent);
    //   }
    //   if (this.selectedDate && this.selectedDate !== "All Dates") {
    //     if (this.selectedDate === "Current") {
    //       const now = new Date();
    //       const timezoneOffset = now.getTimezoneOffset() * 60 * 1000; // Convert to milliseconds
    //       const today = new Date(now.getTime() - timezoneOffset).toDateString();
    //       filteredData = filteredData.filter(event => new Date(event.date).toDateString() === today);
    //     } else if (this.selectedDate === "Past") {
    //       const now = new Date();
    //       const timezoneOffset = now.getTimezoneOffset() * 60 * 1000; // Convert to milliseconds
    //       const today = new Date(now.getTime() - timezoneOffset).toDateString();
    //       filteredData = filteredData.filter(event => new Date(event.date) < new Date(today));
    //     } else if (this.selectedDate === "Upcoming ") {
    //       const now = new Date();
    //       const timezoneOffset = now.getTimezoneOffset() * 60 * 1000; // Convert to milliseconds
    //       const today = new Date(now.getTime() - timezoneOffset).toDateString();
    //       filteredData = filteredData.filter(event => new Date(event.date) > new Date(today + " 23:59:59")); // Need to include" 23:59:59" to not show the current date
    //     }
    //   }
    //   this.filteredEvents = filteredData;
    //   this.filteredDates = filteredData;
    // },




      // refreshList() {
      //   this.retrieveEvents();
      //   this.currentEvent = null;
      //   this.currentIndex = -1;
      // },
      // setActiveEvent(event, index) {
      //   this.currentEvent = event;
      //   this.currentIndex = event ? index : -1;
      // },
      },
    };
</script>
    
<style>
  .routerLink{
      text-decoration: none;
  }
</style>