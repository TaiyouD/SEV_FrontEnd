<template>
  
    <div>
      <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
        <v-container>
            <v-toolbar>
                <v-toolbar-title>Please Select an Event to Sign Up For</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-title>{{this.message}}</v-toolbar-title>
            </v-toolbar>
        </v-container>
        <v-container>
        <div class="border d-flex align-items-start" >
            <v-row justify="space-around">
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
        </v-row>
        </div>
        </v-container>
        
    <!-- This is where the multiple tab container is going to go  -->
    <div>
        <div class="wrapper">
    <!-- ============================This was where calendar was============================ -->
    <h2>Available Time Slots</h2>
    <v-container>
        <v-card>
          <v-card-title>
            Select Upcoming Event
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
            :items="listOfEvents"
            :items-per-page="10"
          >
          <template #item="{ item }">
            <tr>
              <!-- =================================Dialog Box========================= -->
              <!-- <td>Something</td> -->
<!-- v-model = "dialog" -->
              <v-dialog  max-width="900px">
                  <template v-slot:activator="{ on, attrs}">
                    <td v-bind="attrs"
                      v-on="on">{{ item.eventType }}</td>

                      <td v-bind="attrs"
                      v-on="on">{{item.date}}</td>
            </template>
      <v-card>
        <v-card-title>
    <div style="float: center; margin:auto;">
    <div style="display: inline-block; text-align: center;">

        <!-- ===============Timeslot ==================== -->
            Add a time slot where students can see what slots are already taken 
      <!-- <timeslot :min="5"></timeslot> -->
      <!-- :items="Object.keys(listOfEventsSession).map((key) => ({text:key, value:listOfEventsSession[key]}))" -->
      <!-- {{  getAccompanist(listOfRoles)}} -->
      <v-select 
        :items=accompanists
        v-model="accompanist"
        item-text= "fName"
        label="Select Accompanist"
        return-object
        single-line
        filled
    ></v-select>
    <v-select 
        :items="listOfRoles"
        item-title="Time Slot"
        item-value=""
        label="Select Time Slot"
        return-object
        single-line
        filled
    ></v-select>

        <!-- Instructor Select Below -->
    <div style="text-align: center;">
    <div style="display: inline-flex; padding-top: 20px;  width: 780px;" >
    <v-select style="padding-right: 30px; width: 100px;"
    
        :items="listOfRoles"
        item-title="state2"
        label="Select Instructor"
        return-object
        single-line
        filled
     ></v-select>
                

                    <!--  Instrument Select Below -->
    <v-select   style="width: 100px;"
        item-title="Instrument"
        item-value=""
        label="Select Voice or Instrument"
        return-object
        single-line
        filled
    ></v-select>
    </div>
</div>
                   
<v-container fluid>
    <v-text-field
      name="input-7-1"
      label="Selection Title"
      filled
      auto-grow
    ></v-text-field>
  </v-container>

  <v-select style="padding-top: 8px;"
        item-title="date"
        label="Select Composer"
        return-object
        single-line
        filled
     ></v-select>

    <!-- ===========Button for missing song, composer, and submit =================-->
    <div style="text-align: center;">
<div style="display:inline-block; margin:auto;">
<v-btn color="success" variant="tonal" style="text-align: center;">
    Submit
</v-btn>
<router-link to="/addaccompanist" tag="v-btn">
<v-btn color="success" variant="tonal" style="text-align: center; margin-left: 20px;">
    Missing an Accompanist?
</v-btn>
</router-link>
<router-link to="/addsong" tag="v-btn">
  <v-btn color="success" variant="tonal" style="text-align: center; margin-left: 20px;">
      Missing a Song?
  </v-btn>
  </router-link>
</div>
</div>

    </div>
    </div>
    <!-- ============End of button============== -->

        </v-card-title>
      </v-card>

              </v-dialog>

              <td>
                <div class="d-flex justify-end">
                  <!-- <v-icon color="primary" @click="editEvent(item)">mdi-pencil</v-icon>
                  <v-icon color="error" @click="deleteEvent(item)">mdi-delete</v-icon> -->
                </div>
              </td>
            </tr>
          </template>

          </v-data-table>
        </v-card>
      </v-container>
    </div>
    </div>
    </div>

</template>
  
  <script>
  import eventServices from "../services/eventServices";
  import eventSessionServices from "../services/eventServices";
  import roleServices from "../services/rolesServices";
  import availabilityServices from "../services/availabilityServices";
  import userServices from "../services/userServices";
  import Utils from "@/config/utils.js"
  //import popup from '../components/popup'
  //import timeslot from '../components/time-slot.vue'

  export default {
    name: "events-list",
    components: {
      // popup
      //timeslot
    },
    data() {
      return {
        listOfEvents: [], //Change this later --- this is the events
        listOfEventsSession: [],
        listOfRoles: [],
        accompanist: null,
        accompanists: [],
        availabilities: [],
        users: [],
        search: "",
        currentIndex: -1,
        title: "",
        user: {},
        message: "Music Department",
        headers: [
          { text: "Title", value: "title" },
          { text: "Date", value: "date" },
          //{ text: "Actions", value: "actions", sortable: false },
        ],

      };
    },
    async created() {
      this.user = Utils.getStore("user"); // This util grabs the specific users' role information
      await this.retrieveRoles();
      await this.retrieveEvents();
      await this.retrieveEventSessions();
      await this.retrieveUsers();
      await this.retrieveAvailabilities();
      this.accompanists = await this.getAccompanist();
    },
    methods: {
      editEvent(event) {
        this.$router.push({ name: "edit", params: { id: event.id } });
      },
      viewEvent(event) {
        this.$router.push({ name: "view", params: { id: event.id } });
      },
      async retrieveEvents() {
        await eventServices.getAll()
          .then((response) => {
            this.listOfEvents = response.data;
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      async retrieveEventSessions() {
        await eventSessionServices.getAll()
          .then((response) => {
            this.listOfEventsSession = response.data;
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      async retrieveRoles(){
        await roleServices.getAll()
          .then((response) => {
            this.listOfRoles = response.data;
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      async retrieveAvailabilities(){
        await availabilityServices.getAll()
          .then((response) => {
            this.availabilities = response.data;
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      async retrieveUsers(){
        await userServices.getAll()
          .then((response) => {
            this.users = response.data;
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      refreshList() {
        this.retrieveEvents();
        this.currentevent = null;
        this.currentIndex = -1;
      },
      setActiveEvent(event, index) {
        this.currentevent = event;
        this.currentIndex = event ? index : -1;
      },

      async getAccompanist(){
        //const accompanists = [];
        //accompanists = roles.filter(item => item.roleType === 'Student').map(item => item.roleType)
        const accompanist = []
        for (let i = 0; i < this.listOfRoles.length; i++){
          //console.log(this.listOfRoles[i].roleType)
          if (this.listOfRoles[i].roleType === 'Accompanist'){
            //console.log(this.listOfRoles[i].roleType)
            accompanist.push(userServices.get(this.listOfRoles[i].id))
          

          //console.log(this.users)
            // for (let x = 0; x < this.users.length; x++){
            //   console.log("Test")
            //   if (this.listofRoles[i].userId === this.users[x].id){
            //     this.accompanists.push(this.users[x].fName)
            //   }
            }
          }
          console.log(accompanist)
          return accompanist
        }
        //return accompanists
      },
      
      // getEventId(){
      //   for (let i = 0; i < this.availabilities.length; i++){
      //     //if (this.availabilities[i].eventId ===)
      //   }
      // }
    

    
  };
  </script>
  


  <style lang="css">
  * {
    margin: 0;
    padding: 0;
    font-family: 'Karla', sans-serif;
  }
  .wrapper {
    float: center;
    width: 100%;
    min-height: 100vh;
    background-color: white;
    margin: 0;
    padding: 20px;
    padding-left: 150px;
    padding-right: 150px;
    
  }
  .change__style {
    background-color: white;
    font-size: 1em;
    margin-bottom: 10px;
    padding: 5px;
  }

    .dialog{
    background:white;
    justify-content:center; 
    display:flex
  }
</style>