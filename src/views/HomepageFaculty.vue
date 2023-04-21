<template>
  
  <div v-if="this.role.roleType == 'Faculty' || (this.role.roleType == 'Accompanist')">
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
                  :items-per-page="5"
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
                <router-link class="routerLink" v-if="user != null" :to="{ name: 'maintainevent' }">
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
              <v-card-title class="white--text">How to-do for Faculty</v-card-title>
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
                      Add Private Hours for Student
                    </h3>
                    <p>
                      If you are a OC instructor you should follow this proccess to add private hours to your students:
                      <br>
                      <br>1. Click on the View Students Button on the Menu Bar.
                      <br>2. From the View Students page search the list of students to find the desired student.
                      <br>3. Once you have found the desired student on the actions column of the students click on the pencil.
                      <br>4. Then you can edit the student's level and change the private hours.
                      <br>5. After all information has been filled out click Save.
                      <br>6. Then you can view the changed hours on the View Students page.
                      <br><br> If you are missing a student click on the add student button on the bottom left of the View Student page.
                    </p>
                  </v-carousel-item>
                  <v-carousel-item>
                    <h3>
                      Add Availability for a Event
                    </h3>
                    <p>
                      An OC faculty you should follow this proccess to add availability for a Event:
                      <br>
                      <br>1. Click on the Events Button on the Menu Bar.
                      <br>2. From the Events page you can view the Upcoming Events with the help of the dropdown on the right side of the page.
                      <br>3. When you find the Event you are looking click the Availability icon for the event you wish to view.
                      <br>4. Then add the time(s) you are availability to attend the event.
                      <br>5. Click Save after all information has been filled out.
                      <br><br> If you can't find the event you are looking for use the search bar to find it.
                    </p>
                  </v-carousel-item>
                  <v-carousel-item>
                    <h3>
                      Add Critique for Student's Performance
                    </h3>
                    <p>
                      An OC Faculty member you should follow this proccess to add a critique for a student's performance:
                      <br>
                      <br>1. Click on the Events Button on the Menu Bar.
                      <br>2. From the Events page you can view the Current Events with the help of the dropdown on the right side of the page.
                      <br>3. When you find the Event you are looking click the Event Session icon for the event you wish to view.
                      <br>3. After that you will be taken to the eventsession page .
                      <br>4. From that page find the performance you are looking for than click on the icon Critique column.
                      <br>5. Than you will be taken to the page to add your critique of the performance.
                      <br>6. Fill out the information you find neccessary for the critique than click the save button on the bottom of the page.
                      <br><br> If you can't find the event or event session you are looking for use the search bar to find it.
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
                  :items-per-page="5"
                  height="330"
                >
                  <template v-slot:[`item.actions`]="{ item }">
                    <div>
                      <!-- <v-icon small class="mx-4" @click="viewNotification(item)">
                        mdi-format-list-bulleted-type
                      </v-icon> -->
                      <v-icon small class="mx-4" @click="deleteNotification(item)">
                        mdi-close
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
    import EventSessionServices from "../services/eventSessionServices";
    import NotificationServices from "../services/notificationServices";
    import roleServices from "@/services/roleServices";
    import Utils from "@/config/utils.js";
    export default {
      name: "home-page-faculty",
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
          found: false,
          eventstemp:[],
          filteredEvents:[],
          currentEvent: null,
          currentEventIndex: -1,
          eventHeaders: [
            { text: "Event Title", value: "event.eventTitle", sortable: false },
            { text: "Date", value: "event.date", sortable: false },
            { text: "Start Time", value: "event.startTime", sortable: false },
            { text: "End Time", value: "event.endTime", sortable: false },
          ],
          title: "",
          user: {},
          role:{},
          message: "Welcome to the Music Department",
          model: 0,
          alert: true,
          name: "",
          initials: "",
          search:""
        };
      },
      async created() {
        this.resetMenu();
      },
      async mounted() {
        this.resetMenu();
        await this.retrieveRole();
        this.retrieveEvents();
        await this.retrieveNotifications(); 
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
      async retrieveRole() {
      await roleServices.getRoleForUser(this.user.userId)
        .then((response) => {
          for (let i = 0; i < response.data.length; i++){
              if (response.data[i].roleType == this.user.selectedRole) {
                this.role = response.data[i];
              }
            }
          console.log("role: " + this.role.roleType);
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
      },
      retrieveEvents() {
      EventSessionServices.getAll()
        .then((response) => {
          for(let i = 0; i < response.data.length; i++){
            if (response.data[i].privateInstructorId == this.role.id){
              this.found = false;
              for(let j = 0; j < this.events.length; j++){
                if(response.data[i].eventId == this.events[j].eventId){
                    this.found = true;
                }                
              }
              if(!this.found){
                this.events.push(response.data[i]);
              }
          }
        }
          const now = new Date();
          const timezoneOffset = now.getTimezoneOffset() * 60 * 1000; // Convert to milliseconds
          const today = new Date(now.getTime() - timezoneOffset).toDateString();


          // filter upcoming events
          this.eventstemp = this.events.filter((event) => {
              const eventDate = new Date(event.event.date);
              return eventDate > new Date(today + " 23:59:59");});
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
      },
      // editTutorial(tutorial) {
      //   this.$router.push({ name: "edit", params: { id: tutorial.id } });
      // },
      // viewTutorial(tutorial) {
      //   this.$router.push({ name: "view", params: { id: tutorial.id } });
      // },
      deleteNotification(notification) {
        NotificationServices.delete(notification.id)
          .then(() => {
            this.retrieveNotifications();
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      async retrieveNotifications() {
        await NotificationServices.getNotificationsForRole(this.role.id)
          .then((response) => {
            this.notifications = response.data;
            console.log(this.notifications)
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      // refreshList() {
      //   this.retrieveNotifications();
      //   this.currentNotification = null;
      //   this.currentIndex = -1;
      // },
      // setActiveNotification(notification, index) {
      //   this.currentNotification = notification;
      //   this.currentIndex = notification ? index : -1;
      // },
      },
    };
</script>
    
<style>
  .routerLink{
      text-decoration: none;
  }
</style>