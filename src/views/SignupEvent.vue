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

  <div>
    <div class="wrapper">
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
              :items="listOfEvents"
              @click:row="showDialog"> 


    <template #item="{ item }">
      <tr>
        <td @click="showSelectedDialog(item)">{{ item.eventType }} </td>
        <td @click="showSelectedDialog(item)">{{ item.date }} </td>
        <!-- <td @click="showSelectedDialog(item)">{{ item.startTime }} </td>
        <td @click="showSelectedDialog(item)">{{ item.endTime }} </td> -->
      </tr>
    </template>
  </v-data-table>

  <v-dialog v-if="selectedEventType === 'Recital'" v-model="recitalDialogVisible">
    <v-card>
        <v-card-title>
    <div style="float: center; margin:auto;">
    <div style="display: inline-block; text-align: center;">

        <!-- ===============Timeslot ==================== -->
        Recital Sign Up 
      <v-select 
        :items= "availableAccompanists"
        v-model = "selectedAccompanist"
        item-text= "fName"
        label="Select Accompanist"
        return-object
        single-line
        filled
    ></v-select>

    <div style="text-align: center;">
    <div style="display: inline-flex; padding-top: 20px;  width: 780px;" >
    <v-select style="padding-right: 30px; width: 100px;"
        :items="start"
        v-model="selectedStartTime"
        item-title="Time Slot"
        item-value=""
        label="Select Start Time"
        return-object
        single-line
        filled
    ></v-select>
    <v-select style="width: 100px;"
        :items="end"
        v-model="selectedEndTime"
        item-title="Time Slot"
        item-value=""
        label="Select End Time"
        return-object
        single-line
        filled
    ></v-select>
    </div>
    </div>

      <v-card-text>
        <v-checkbox v-model = "showTextField" label = "Duet?"/>
        <v-text-field v-if="showTextField" label = "Partner's Name"/>
      </v-card-text>
                    <!--  Instrument Select Below -->
    <v-select
        item-title="Instrument"
        item-value=""
        label="Select Voice or Instrument"
        return-object
        single-line
        filled
    ></v-select>

  <v-select style="padding-top: 8px;"
        item-title="date"
        label="Select Piece"
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
  <v-dialog v-if="selectedEventType === 'Senior'" v-model="seniorDialogVisible" style ="width: 80%;">
    <v-card>
    <v-card-title>
    <div style="float: center; margin:auto;">
    <div style="display: inline-block; text-align: center;">
        <!-- ===============Timeslot ==================== -->
          Senior Sign Up
      <v-select 
        :items=availableAccompanists
        v-model = "accompanist"
        item-text= "fName"
        label="Select Accompanist"
        return-object
        single-line
        filled
    ></v-select>
    <div style="text-align: center;">
    <div style="display: inline-flex; padding-top: 20px;  width: 780px;" >
    <v-select style="padding-right: 30px; width: 100px;"
        :items="start"
        v-model="selectedStartTime"
        @change = filteredEndTimes
        item-title="Time Slot"
        item-value=""
        label="Select Start Time"
        return-object
        single-line
        filled
    ></v-select>
    <v-select style="width: 100px;"
        :items="filteredEnd"
        v-model="selectedEndTime"
        item-title="Time Slot"
        item-value=""
        label="Select End Time"
        return-object
        single-line
        filled
    ></v-select>
    </div>
    </div>
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
  <v-select style="padding-top: 8px;"
        item-title="date"
        label="Select Piece"
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

  <v-dialog v-if="selectedEventType === 'Junior'" v-model="juniorDialogVisible">
    <v-card>
    <v-card-title>
    <div style="float: center; margin:auto;">
    <div style="display: inline-block; text-align: center;">
        <!-- ===============Timeslot ==================== -->
          Junior Sign Up
      <v-select 
        :items=availableAccompanists
        v-model = "accompanist"
        item-text= "fName"
        label="Select Accompanist"
        return-object
        single-line
        filled
    ></v-select>
    <div style="text-align: center;">
    <div style="display: inline-flex; padding-top: 20px;  width: 780px;" >
    <v-select style="padding-right: 30px; width: 100px;"
        :items="start"
        v-model="selectedStartTime"
        item-title="Time Slot"
        item-value=""
        label="Select Start Time"
        return-object
        single-line
        filled
    ></v-select>
    <v-select style="width: 100px;"
        :items="end"
        v-model="selectedEndTime"
        item-title="Time Slot"
        item-value=""
        label="Select End Time"
        return-object
        single-line
        filled
    ></v-select>
    </div>
    </div>
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
  <v-select style="padding-top: 8px;"
        item-title="date"
        label="Select Piece"
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


  <v-dialog v-if="selectedEventType === 'Jury'" v-model="juryDialogVisible">
    <v-card>
    <v-card-title>
    <div style="float: center; margin:auto;">
    <div style="display: inline-block; text-align: center;">
        <!-- ===============Timeslot ==================== -->
          Jury Sign Up
      <v-select 
        :items=availableAccompanists
        v-model = "accompanist"
        item-text= "fName"
        label="Select Accompanist"
        return-object
        single-line
        filled
    ></v-select>
    <div style="text-align: center;">
    <div style="display: inline-flex; padding-top: 20px;  width: 780px;" >
    <v-select style="padding-right: 30px; width: 100px;"
        :items="start"
        v-model="selectedStartTime"
        item-title="Time Slot"
        item-value=""
        label="Select Start Time"
        return-object
        single-line
        filled
    ></v-select>
    <v-select style="width: 100px;"
        :items="end"
        v-model="selectedEndTime"
        item-title="Time Slot"
        item-value=""
        label="Select End Time"
        return-object
        single-line
        filled
    ></v-select>
    </div>
    </div>
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
  <v-select style="padding-top: 8px;"
        item-title="date"
        label="Select Piece"
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




  <!-- This is supposed to be just 10 minutes duration. Automatically set this -->
  <v-dialog v-if="selectedEventType === 'Scholarship'" v-model="scholarshipDialogVisible"> 
    <v-card>
    <v-card-title>
    <div style="float: center; margin:auto;">
    <div style="display: inline-block; text-align: center;">
        <!-- ===============Timeslot ==================== -->
          Scholarship Sign Up
      <v-select 
        :items=availableAccompanists
        v-model = "accompanist"
        item-text= "fName"
        label="Select Accompanist"
        return-object
        single-line
        filled
    ></v-select>
    <div style="text-align: center;">
    <div style="display: inline-flex; padding-top: 20px;  width: 780px;" >
    <v-select style="padding-right: 30px; width: 100px;"
        :items="start"
        v-model="selectedStartTime"
        item-title="Time Slot"
        item-value=""
        label="Select Start Time"
        return-object
        single-line
        filled
    ></v-select>
    <v-select style="width: 100px;"
        :items="end"
        v-model="selectedEndTime"
        item-title="Time Slot"
        item-value=""
        label="Select End Time"
        return-object
        single-line
        filled
    ></v-select>
    </div>
    </div>
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
  <v-select style="padding-top: 8px;"
        item-title="date"
        label="Select Piece"
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
  import availabilityServices from "../services/availability";
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
        availableAccompanists: [],
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
        ],
      start: [],
      end: [],
      filteredEnd: [],
      dialogVisible: false,
      recitalDialogVisible: true,
      seniorDialogVisible: true,
      juniorDialogVisible: true,
      juryDialogVisible: true,
      scholarshipDialogVisible: true,

      selectedEvent: null,
      selectedAccompanist:null,
      selectedEventType: null,
      selectedStartTime: null,
      selectedEndTime: null,
      showTextField: false,
      };
    },
    async created() {
      this.user = Utils.getStore("user"); // This util grabs the specific users' role information
      await this.retrieveRoles();
      await this.retrieveEvents();
      await this.retrieveEventSessions();
      await this.retrieveUsers();
      await this.retrieveAvailabilities();
      await this.getAccompanist();
    },
    watch:{
      selectedStartTime: function(){
        this.filderedEnd = this.end.filter(endTime => endTime >= this.selectedStartTime);
      }

    },
    methods: {
      async retrieveEvents() {
        console.log(this.user.userId)
        const temp = await roleServices.get(this.user.userId)
        console.log(temp)
        await eventServices.getAll()
          .then((response) => {
          if (temp.incomingStudentPassword !== ""){
            this.listOfEvents = response.data.filter(event =>  event.isReady !== false && event.eventType === "Scholarship")
          console.log("Test")
          }
          else{
            this.listOfEvents = response.data.filter(event => event.isReady !== false && event.eventType !== "Scholarship");
        }} 
          )
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
      showDialog(item){
        
        const event = this.listOfEvents.find((e) => e.id === item.eventID);
        this.selectedEvent = event;
      },
      async getAccompanist(){
        for (let i = 0; i < this.listOfRoles.length; i++){
          if (this.listOfRoles[i].roleType === 'Accompanist'){
            await userServices.get(this.listOfRoles[i].id)
              .then((response) => {
                    this.accompanists.push(response.data);
                  })
            }
          }
        },
        getAvailablitiesForEvent(item){
          return this.availabilities.filter((availability)=> availability.eventId === item.id)
        },
        getAvailableAccompanists(availabilities){
          const accompanistsIds = availabilities.map((availability) => availability.accompanistId);
          const uniqueIds = [...new Set(accompanistsIds)]
          return this.accompanists.filter((accompanist) => uniqueIds.includes(accompanist.id));
        },

    async showSelectedDialog(item) {
      // Function call for getting the available accompanists depending on the specific events
      const availabilities = this.getAvailablitiesForEvent(item)
      this.availableAccompanists = this.getAvailableAccompanists(availabilities)

      // Function call for getting the start time and end time for each specific events 
      this.start = await this.availableStartTime(item) 
      this.end = await this.availableEndTime(item)

      // These makes sure that the dialog boxes that pops up show the right dialog boxes. f
      this.selectedEventType = item.eventType;
      if (this.selectedEventType === 'Recital') {
        this.recitalDialogVisible = true;
      } else if (this.selectedEventType === 'Senior') {
        this.seniorDialogVisible = true;
      }
      else if (this.selectedEventType === 'Jury') {
        this.juryDialogVisible = true;
      }
      else if (this.selectedEventType === 'Junior') {
        this.juniorDialogVisible = true;
      }
      else if (this.selectedEventType === 'Scholarship') {
        this.scholarshipDialogVisible = true;
      }
      this.dialogVisible = false;
    },

    async availableStartTime(item){
      const startTimes=[];
      const startTimeStr = item.startTime
      const endTimeStr = item.endTime

      const [startHour, startMinute] = startTimeStr.split (':')
      const [endHour, endMinute] = endTimeStr.split(':')
      const startDate = new Date();
      startDate.setHours(parseInt(startHour), parseInt(startMinute), 0, 0);
      const endDate = new Date();


      endDate.setHours(parseInt(endHour), parseInt(endMinute), 0, 0);
      const startTime = new Date(startDate);
      console.log(startTime)
      const endTime= new Date(endDate);

      console.log(item.duration)
      
      while (startTime <= endTime){
        startTimes.push(startTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}));
        startTime.setMinutes(startTime.getMinutes() + 5);
      }
      console.log(startTimes)
      return startTimes;
  },
  async availableEndTime(item){
      const startTimes=[];
      const startTimeStr = item.startTime
      const endTimeStr = item.endTime

      const [startHour, startMinute] = startTimeStr.split (':')
      const [endHour, endMinute] = endTimeStr.split(':')
      const startDate = new Date();
      startDate.setHours(parseInt(startHour), parseInt(startMinute), 0, 0);
      const endDate = new Date();
      endDate.setHours(parseInt(endHour), parseInt(endMinute), 0, 0);
      const startTime = new Date(startDate);
      console.log(startTime)
      const endTime= new Date(endDate);
      while (startTime <= endTime){
        startTimes.push(startTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}));
        startTime.setMinutes(startTime.getMinutes() + 5);
      }
      console.log("This should show an array of startTimes")
      console.log(startTimes)
      return startTimes;
  },

    async filteredEndTimes(){
      this.selectedEndTime = null;
      let startFound = false;
      for (let i = 0; i < this.start.length; i++){
        if (this.start[i] === this.selectedStartTime){
          startFound = true;
        }
        if (startFound){
          this.filteredEnd.push(this.end[i])
        }
      }
    },
  },};
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