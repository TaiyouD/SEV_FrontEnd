<template>
    <div v-if = "this.role.roleType  == 'Student' || this.role.roleType == 'Incoming Student'">
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
          </v-card-title>
          <v-card-text>
            <b>{{ message }}</b>
          </v-card-text>
          <v-data-table 
              :headers="headers" 
              :items="listOfEvents"
              v-model="selectedEvent"> 
    <template #item="{ item }">
      <tr>
        <td @click="showSelectedDialog(item)">{{ computedTitle(item) }} </td>
        <td @click="showSelectedDialog(item)">{{ item.date }} </td>
        <td @click="showSelectedDialog(item)">{{ item.startTime }} </td>
        <td @click="showSelectedDialog(item)">{{ item.endTime }} </td>
      </tr>
    </template>
  </v-data-table>
  <v-dialog v-if="selectedEventType === 'Hearing'" v-model="hearingDialogVisible" max-width = "800">
    <v-card>
        <v-card-title>
          <v-toolbar id="navbar-maroon">
            <span class="text-h5">Hearing Sign Up </span>
          </v-toolbar>
        </v-card-title>
        <v-container>
        <v-card-text>

          <div style="text-align: center;">
          <div class="d-flex flex-row bg-surface-variant" max-width = "780" >
<!-- ===========Testing a date picker of sorts =============== -->  

<template>
  <div class = calendar-container>
    <v-flex>
  <v-sheet height = "400">
        <v-calendar
         ref = "calendar"
          :key = "calendarKey"
          :events="filteredEvents"
          @click:event="onEventClick"
          v-model="selectedDate"
          color="primary"
          :type="'day'"
          :first-time = "initialTime"
          interval-count = "110" 
          :interval-minutes=5
          :short-interval="true"
        >
        <!-- :event-color="getEventColor"  -->
        </v-calendar>
      </v-sheet>
      </v-flex>
    </div>
      </template>

   
        <!-- ===============Timeslot ==================== -->
      <v-flex>
        <div>
Sign Up Process: <br>
1. Select an instrument <br>
2. Select an accompanist <br>
3. Select open timeslots on the left <br>
</div>


    <v-select  class=" mr-4"  style= "max-width : 308px"
        :items = "instrumentRole"
        v-model = "selectedInstrument"
        @change = "selectedInstructorAvailability"
        item-title="Instrument"
        item-value = "instrument"
        item-text="instrument.type"
        label="Select Voice or Instrument"
        return-object
        single-line
        filled
    ></v-select>

    <v-text-field class ="mr-4" style= "max-width : 306px"
        :value= "selectedInstructors  == null ? 'No Instructor' : selectedInstructors.fName + ' ' + selectedInstructors.lName "
        label="Instructor's Name"
        return-object
        single-line
        filled
        :disabled="true"
    >
    </v-text-field>

    <v-select class ="mr-4" style= "max-width : 306px"
        :items=availableAccompanists
        v-model = "selectedAccompanist"
        @change = "selectedAccompanistAvailability"
        :item-text = "item => `${item.fName} ${item.lName}`"
        label="Select Accompanist"
        return-object
        single-line
        filled
    >
  </v-select>

    <v-select  class=" mr-4" style= "max-width : 308px" 
        :items = repertoireSongs
        v-model="selectedSongs"
        item-text = "song.title"
        item-value = "song" 
        label="Select Piece"
        multiple
        chips
        return-object
        single-line
        filled
     ></v-select>
    </v-flex>
</div>
    </div>
    <div style="text-align: center;">
<div style="display:inline-block; margin:auto;">
  <v-btn @click="submitForm" :disabled="!selectedInstrument || !selectedSongs" color="success" variant="tonal" style="text-align: center;">
    Submit
</v-btn>
<router-link to="/addaccompanist" tag="v-btn">
<v-btn color="success" variant="tonal" style="text-align: center; margin-left: 20px;">
    Missing an Accompanist?
</v-btn>
</router-link>
<router-link to="/addsong" tag="v-btn">
  <v-btn color="success" variant="tonal" style="text-align: center; margin-left: 20px;">
      Missing a Piece?
  </v-btn>
  </router-link>
</div>
</div>
    <!-- ============End of button============== -->
    </v-card-text>
    </v-container>
      </v-card>


      
  </v-dialog>
  <v-dialog v-if="selectedEventType === 'Senior'" v-model="seniorDialogVisible" max-width="800">
    <v-card>
      <v-card-title>
          <v-toolbar id="navbar-maroon">
            <span class="text-h5">Senior Sign Up </span>
          </v-toolbar>
        </v-card-title>

        <v-card-text>
        <v-container> 
      <div style="text-align: center;">
      <div class="d-flex flex-row bg-surface-variant" style="max-width : 780; max-height : 780"  >
<!-- ===========Testing a date picker of sorts =============== -->  

<template>
  <div class = calendar-container>
    <v-flex>
  <v-sheet height = "400">
        <v-calendar
         ref = "calendar"
          :key = "calendarKey"
          :events="filteredEvents"
          @click:event="onEventClick"
          @click:event2="slotSelection"
          v-model="selectedDate"
          color="primary"
          :type="'day'"
          :first-time = "initialTime"
          interval-count = "110" 
          :interval-minutes=5
          :short-interval="true"
        >
        </v-calendar>
      </v-sheet>
      </v-flex>
    </div>
      </template>

   
        <!-- ===============Timeslot ==================== -->
      <v-flex>

<div>
Sign Up Process: <br>
1. Select an instrument <br>
2. Select an accompanist <br>
3. Select open timeslots on the left <br>
</div>

    <v-select  class=" mr-4"  style= "max-width : 308px"
        :items = "instrumentRole"
        v-model = "selectedInstrument"
        @change = "selectedInstructorAvailability"
        item-title="Instrument"
        item-value = "instrument"
        item-text="instrument.type"
        label="Select Voice or Instrument"
        return-object
        single-line
        filled
    ></v-select>

    <v-text-field class ="mr-4" style= "max-width : 306px"
        :value= "selectedInstructors  == null ? 'No Instructor' : selectedInstructors.fName + ' ' + selectedInstructors.lName "
        label="Instructor's Name"
        return-object
        single-line
        filled
        :disabled="true"
    >
    </v-text-field>

    <v-select class ="mr-4" style= "max-width : 306px"
        :items=availableAccompanists
        v-model = "selectedAccompanist"
        @change = "selectedAccompanistAvailability"
        :item-text = "item => `${item.fName} ${item.lName}`"
        label="Select Accompanist"
        return-object
        single-line
        filled
    >
  </v-select>

    <v-select  class=" mr-4" style= "max-width : 308px" 
        :items = repertoireSongs
        v-model="selectedSongs"
        item-text = "song.title"
        item-value = "song" 
        label="Select Piece"
        multiple
        chips
        return-object
        single-line
        filled
     ></v-select>
    </v-flex>


    </div>
  </div>
    <!-- ===========Button for missing song, composer, and submit =================-->
    <div style="text-align: center;">
<div style="display:inline-block; margin:auto;">
  <v-btn @click="submitForm" :disabled="!selectedInstrument || !selectedSongs" color="success" variant="tonal" style="text-align: center;">
    Submit
</v-btn>
<router-link to="/addaccompanist" tag="v-btn">
<v-btn color="success" variant="tonal" style="text-align: center; margin-left: 20px;">
    Missing an Accompanist?
</v-btn>
</router-link>
<router-link to="/addsong" tag="v-btn">
  <v-btn color="success" variant="tonal" style="text-align: center; margin-left: 20px;">
      Missing a Piece?
  </v-btn>
  </router-link>
</div>
</div>

    <!-- ============End of button============== -->
 </v-container>
  </v-card-text>
    </v-card>
      </v-dialog>

  <v-dialog v-if="selectedEventType === 'Junior'" v-model="juniorDialogVisible" max-width = "800">
    <v-card>
        <v-card-title>
          <v-toolbar id="navbar-maroon">
            <span class="text-h5">Junior Sign Up </span>
          </v-toolbar>
        </v-card-title>
        <v-container>
        <v-card-text>

          <div style="text-align: center;">
          <div class="d-flex flex-row bg-surface-variant" max-width = "780" >

        <!-- ===========Testing a date picker of sorts =============== -->  

<template>
  <div class = calendar-container>
    <v-flex>
  <v-sheet height = "400">
        <v-calendar
         ref = "calendar"
          :key = "calendarKey"
          :events="filteredEvents"
          @click:event="onEventClick"
          v-model="selectedDate"
          color="primary"
          :type="'day'"
          :first-time = "initialTime"
          interval-count = "110" 
          :interval-minutes=5
          :short-interval="true"
        >
        <!-- :event-color="getEventColor"  -->
        </v-calendar>
      </v-sheet>
      </v-flex>
    </div>
      </template>

   
        <!-- ===============Timeslot ==================== -->
      <v-flex>
        <div>
Sign Up Process: <br>
1. Select an instrument <br>
2. Select an accompanist <br>
3. Select open timeslots on the left <br>
</div>

    <v-select  class=" mr-4"  style= "max-width : 308px"
        :items = "instrumentRole"
        v-model = "selectedInstrument"
        @change = "selectedInstructorAvailability"
        item-title="Instrument"
        item-value = "instrument"
        item-text="instrument.type"
        label="Select Voice or Instrument"
        return-object
        single-line
        filled
    ></v-select>

    <v-text-field class ="mr-4" style= "max-width : 306px"
    :value= "selectedInstructors  == null ? 'No Instructor' : selectedInstructors.fName + ' ' + selectedInstructors.lName "
        label="Instructor's Name"
        return-object
        single-line
        filled
        :disabled="true"
    >
    </v-text-field>

    <v-select class ="mr-4" style= "max-width : 306px"
        :items=availableAccompanists
        v-model = "selectedAccompanist"
        @change = "selectedAccompanistAvailability"
        :item-text = "item => `${item.fName} ${item.lName}`"
        label="Select Accompanist"
        return-object
        single-line
        filled
    >
  </v-select>

    <!-- <v-select class ="mr-4" style= "max-width : 308px"
        :items="availableTimeslots"
        v-model="selectedStartTime"
        label="Select Start Time"
        return-object
        single-line
        filled
        @change ="updateText"
    ></v-select> -->
    
    <v-select  class=" mr-4" style= "max-width : 308px" 
        :items = repertoireSongs
        v-model="selectedSongs"
        item-text = "song.title"
        item-value = "song" 
        label="Select Piece"
        multiple
        chips
        return-object
        single-line
        filled
     ></v-select>
    </v-flex>
</div>
    </div>
    <!-- ===========Button for missing song, composer, and submit =================-->
    <div style="text-align: center;">
<div style="display:inline-block; margin:auto;">
  <v-btn @click="submitForm" :disabled="!selectedInstrument || !selectedSongs" color="success" variant="tonal" style="text-align: center;">
    Submit
</v-btn>
<router-link to="/addaccompanist" tag="v-btn">
<v-btn color="success" variant="tonal" style="text-align: center; margin-left: 20px;">
    Missing an Accompanist?
</v-btn>
</router-link>
<router-link to="/addsong" tag="v-btn">
  <v-btn color="success" variant="tonal" style="text-align: center; margin-left: 20px;">
      Missing a Piece?
  </v-btn>
  </router-link>
</div>
</div>
    <!-- ============End of button============== -->
    </v-card-text>
    </v-container>
      </v-card>
  </v-dialog>


  <v-dialog v-if="selectedEventType === 'Jury'" v-model="juryDialogVisible" max-width = "800">
    <v-card>
        <v-card-title>
          <v-toolbar id="navbar-maroon">
            <span class="text-h5">Jury Sign Up </span>
          </v-toolbar>
        </v-card-title>
        <v-container>
        <v-card-text>

          <div style="text-align: center;">
          <div class="d-flex flex-row bg-surface-variant" max-width = "780" >

<!-- ===========Testing a date picker of sorts =============== -->  

<template>
  <div class = calendar-container>
    <v-flex>
  <v-sheet height = "400">
        <v-calendar
         ref = "calendar"
          :key = "calendarKey"
          :events="filteredEvents"
          @click:event="onEventClick"
          v-model="selectedDate"
          color="primary"
          :type="'day'"
          :first-time = "initialTime"
          interval-count = "110" 
          :interval-minutes=5
          :short-interval="true"
        >
        <!-- :event-color="getEventColor"  -->
        </v-calendar>
      </v-sheet>
      </v-flex>
    </div>
      </template>

   
        <!-- ===============Timeslot ==================== -->
 <v-flex>
  <div>
Sign Up Process: <br>
1. Select an instrument <br>
2. Select an accompanist <br>
3. Select open timeslots on the left <br>
</div>
    <v-select  class=" mr-4"  style= "max-width : 308px"
        :items = "instrumentRole"
        v-model = "selectedInstrument"
        @change = "selectedInstructorAvailability"
        item-title="Instrument"
        item-value = "instrument"
        item-text="instrument.type"
        label="Select Voice or Instrument"
        return-object
        single-line
        filled
    ></v-select>

    <v-text-field class ="mr-4" style= "max-width : 306px"
    :value= "selectedInstructors  == null ? 'No Instructor' : selectedInstructors.fName + ' ' + selectedInstructors.lName "
        label="Instructor's Name"
        return-object
        single-line
        filled
        :disabled="true"
    >
    </v-text-field>

    <v-select class ="mr-4" style= "max-width : 306px"
        :items=availableAccompanists
        v-model = "selectedAccompanist"
        @change = "selectedAccompanistAvailability"
        :item-text = "item => `${item.fName} ${item.lName}`"
        label="Select Accompanist"
        return-object
        single-line
        filled
    >
  </v-select>

    <v-select  class=" mr-4" style= "max-width : 308px" 
        :items = repertoireSongs
        v-model="selectedSongs"
        item-text = "song.title"
        item-value = "song" 
        label="Select Piece"
        multiple
        chips
        return-object
        single-line
        filled
     ></v-select>
    </v-flex>
</div>
    </div>
    <!-- <v-card-text>
        <v-checkbox v-model = "showTextField" label = "Duet Or Ensemble?"/>
        <v-text-field v-if="showTextField" label = "Other Member's Name"/>
      </v-card-text> -->

    <!-- ===========Button for missing song, composer, and submit =================-->
    <div style="text-align: center;">
<div style="display:inline-block; margin:auto;">
  <v-btn @click="submitForm" :disabled="!selectedInstrument || !selectedSongs" color="success" variant="tonal" style="text-align: center;">
    Submit
</v-btn>
<router-link to="/addaccompanist" tag="v-btn">
<v-btn color="success" variant="tonal" style="text-align: center; margin-left: 20px;">
    Missing an Accompanist?
</v-btn>
</router-link>
<router-link to="/addsong" tag="v-btn">
  <v-btn color="success" variant="tonal" style="text-align: center; margin-left: 20px;">
      Missing a Piece?
  </v-btn>
  </router-link>
</div>
</div>
    <!-- ============End of button============== -->
    </v-card-text>
    </v-container>
      </v-card>
  </v-dialog>




  <!-- This is supposed to be just 10 minutes duration. Automatically set this -->
  <v-dialog v-if="selectedEventType === 'Scholarship'" v-model="scholarshipDialogVisible" max-width = "800"> 
    <v-card>
      <v-card-title>
          <v-toolbar id="navbar-maroon">
            <span class="text-h5">Scholarship Sign Up </span>
          </v-toolbar>
        </v-card-title>

        <v-card-text>
        <v-container> 
      <div style="text-align: center;">
      <div class="d-flex flex-row bg-surface-variant" max-width = "780" >
 <!-- ===========Testing a date picker of sorts =============== -->  

<template>
  <div class = calendar-container>
    <v-flex>
  <v-sheet height = "400">
        <v-calendar
         ref = "calendar"
          :key = "calendarKey"
          :events="filteredEvents"
          @click:event="onEventClick"
          v-model="selectedDate"
          color="primary"
          :type="'day'"
          :first-time = "initialTime"
          interval-count = "110" 
          :interval-minutes=5
          :short-interval="true"
        >
        </v-calendar>
      </v-sheet>
      </v-flex>
    </div>
      </template>

   
        <!-- ===============Timeslot ==================== -->
  <v-flex>
    <div>
Sign Up Process: <br>
1. Select an instrument <br>
2. Select an accompanist <br>
3. Select open timeslots on the left <br>
</div>
    <v-select  class=" mr-4"  style= "max-width : 308px"
        :items = "instrumentRole"
        v-model = "selectedInstrument"
        @change = "selectedInstructorAvailability"
        item-title="Instrument"
        item-value = "instrument"
        item-text="instrument.type"
        label="Select Voice or Instrument"
        return-object
        single-line
        filled
    ></v-select>

    <v-text-field class ="mr-4" style= "max-width : 306px"
    :value= "selectedInstructors  == null ? 'No Instructor' : selectedInstructors.fName + ' ' + selectedInstructors.lName "
        label="Instructor's Name"
        return-object
        single-line
        filled
        :disabled="true"
    >
    </v-text-field>

    <v-select class ="mr-4" style= "max-width : 306px"
        :items=availableAccompanists
        v-model = "selectedAccompanist"
        @change = "selectedAccompanistAvailability"
        :item-text = "item => `${item.fName} ${item.lName}`"
        label="Select Accompanist"
        return-object
        single-line
        filled
    >
  </v-select>

    <v-select  class=" mr-4" style= "max-width : 308px" 
        :items = repertoireSongs
        v-model="selectedSongs"
        item-text = "song.title"
        item-value = "song" 
        label="Select Piece"
        multiple
        chips
        return-object
        single-line
        filled
     ></v-select>
    </v-flex>
    </div>
</div>

    <!-- ===========Button for missing song, composer, and submit =================-->
    <div style="text-align: center;">
<div style="display:inline-block; margin:auto;">
  <v-btn @click="submitForm" :disabled="!selectedInstrument || !selectedSongs" color="success" variant="tonal" style="text-align: center;">
    Submit
</v-btn>
<router-link to="/addaccompanist" tag="v-btn">
<v-btn color="success" variant="tonal" style="text-align: center; margin-left: 20px;">
    Missing an Accompanist?
</v-btn>
</router-link>
<router-link to="/addsong" tag="v-btn">
  <v-btn color="success" variant="tonal" style="text-align: center; margin-left: 20px;">
      Missing a Piece?
  </v-btn>
  </router-link>
</div>
</div>

    <!-- ============End of button============== -->
 </v-container>
  </v-card-text>
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
  import eventSessionServices from "../services/eventSessionServices";
  import roleServices from "../services/roleServices";
  import availabilityServices from "../services/availabilityServices";
  import userServices from "../services/userServices";
  import Utils from "@/config/utils.js"
  import RepertoireSongServices from "../services/repertoireSongServices";
  import songService from "../services/songServices"
  import instrumentRoleServices from "../services/instrumentRoleServices";
  import eventSongServices from "../services/eventSongservices"



  export default {
    name: "events-list",
    components: {
    },

    data() {
      return {
        events: [],
        clickedEvents: [],
        selectedDate: null,
      //`2023-04-10`,
 
      selectedEvents: [],
//=====================================================
        instrumentRole: {
          id: null,
          instrument:{
            type: ""
          },
          song: {},
          privateInstructorId: "",
          accompanistId: ""
        },
        listOfEvents: [], //Change this later --- this is the events
        eventsSession: [],
        listOfRoles: [],
        role: {},
        repertoireSongs: [],
        accompanists: [],
        availableAccompanists: [],
        availabilities: [],
        users: [],
        title: "",
        user: {},
        message: "Music Department",
        headers: [
          { text: "Title", value: "title" },
          { text: "Date", value: "date" },
          { text: "Start Time", value:"startTime"},
          { text: "End Time", value:"endTime"},
        ],
      EndTime: '',

      start: [],
      dialogVisible: false,
      hearingDialogVisible: true,
      seniorDialogVisible: true,
      juniorDialogVisible: true,
      juryDialogVisible: true,
      scholarshipDialogVisible: true,

      selectedEvent: null,  // Used to grab information on which event the user clicked on through the v-data-table
      selectedAccompanist:null,
      selectedInstrument: null,
      selectedSongs: null,
      selectedEventType: null,
      selectedStartTime: null,
      selectedEndTime: null,
      showTextField: false,
      timeslotTemp: null,

      timeslots: [],

      availabilitiesForEvent: null,
      availableInstructor: null,
      instructors: [],
      selectedInstructors: null,
      calendarKey : 0,

      selectedEvent2: {},
      showDialog: false
      };
    },
    async created() {
      this.user = Utils.getStore("user"); // This util grabs the specific users' role information

      await this.retrieveAllRoles();
      await this.retrieveRole();
      await this.retrieveEvents();
      await this.retrieveAvailabilities();
      await this.userRepertoire();
      await this.retrieveSongs();
      await this.getAccompanist();
      await this.retrieveInstrumentRoles();
      await this.getInstructors();
    },
    methods: {
      refreshCalendar(){
          this.calendarKey += 1
      },

    onEventClick( {event} ) {
      if (event.selected == true){
        event.selected = false
      }
      else{
        event.selected = true}
    if (event.disabled == false && event.instructorAvailable == true && event.accompAvailable == true){
    const index = this.clickedEvents.findIndex(e => e.id === event.id);
    if (index === -1) {
      // Event not found in clickedEvents, so add it and change its color to dark blue
      this.clickedEvents.push(event);
      event.color = '#001F33';
    } else {
      // Event found in clickedEvents, so remove it and change its color back to blue
      this.clickedEvents.splice(index, 1);
      event.color = '#4169E1'
    }
  }
    this.refreshCalendar();
  },

  slotSelection({event}){
    if (event.disabled != false){
      this.selectedEvent2 = event
      this.showDialog = true
    }
  },
  closeDialog() {
    this.showDialog = false;
    this.selectedEvent2 = {};
  },

    computedTitle(item){
        const temp = this.listOfEvents.filter(event =>  event.id == item.id)
        return temp[0].eventTitle
    },

      //====================================================
      async submitForm(){
          let eventSessionId
          const selectedSongs = this.selectedSongs
          // Make the data to put into eventSession table
          let startTime = null;
          let endTime = null;
          for (let i = 0; i < this.clickedEvents.length; i++){
            const event = this.clickedEvents[i]
            if (!startTime || event.start < startTime) {
              startTime = event.start;
            }
            if (!endTime || event.end > endTime){
              endTime = event.end;
            }
          }

          startTime = startTime.toLocaleString('en-US',{hour: 'numeric', minute: 'numeric', hour12: true})
          endTime = endTime.toLocaleString('en-US',{hour: 'numeric', minute: 'numeric', hour12: true})
          console.log(startTime, endTime)

          const data ={
            eventId: this.selectedEvent.id,
            accompanistId: this.selectedAccompanist.id,
            privateInstructorId: this.selectedInstrument.privateInstructorId,
            startTime,
            endTime,
            studentId: this.user.userId,
          }
          // Create a new entry into the eventSesssion table 
        await eventSessionServices.create(data)
          .then((response) => {

            console.log('Success!', response.data);
            eventSessionId = response.data.id // Retrieve the eventSessionId of the new session we just created 
          })
          .catch((error) => {
            console.log('Error:', error);
          });
          // Make a new data set for the eventSongs table. For every song they want added, make an array of objects that contains the 
          // event song and eventSessionId
          const eventSongs = selectedSongs.map((song) => {
            return{
              eventsessionId: eventSessionId,
              repertoireSongId: song.id,
            }
          })

          for (let i = 0; i < eventSongs.length; i++){
          console.log("eventsongs data", eventSongs[i])
          eventSongServices.create(eventSongs[i])
            .then((response) => {
              console.log('Success', response.data);
            })
            .catch ((error) => {
              console.log('Error for creating eventSongs:', error)
            })
          }
          this.$router.go(0); //This is just a force refresh 
      },
      async retrieveInstrumentRoles() {
        await instrumentRoleServices.getAllForUser(this.role.id)
          .then((response) => {
            // console.log("Testong the instrumentRoles", response.data);
            this.instrumentRole = response.data;
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      updateText(){
        const index = this.start.indexOf(this.selectedStartTime)
        if(this.role.studentMajor === "Music" && this.role.studentPrivateHours === 2){
          if(index !== -1 && index + 1 <= this.start.length) {
            const nextTime = this.start[index];
            const date = new Date (`1/1/2000 ${nextTime}`);
            date.setMinutes(date.getMinutes() + 15);
            const formattedTime = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit',});
            this.selectedEndTime = formattedTime;
            this.EndTime = `${formattedTime}`
          } else{
            this.EndTime = ""
          }
      }
      else if (this.role.studentMajor === "Music" && this.role.studentPrivateHours === 1){
        if(index !== -1 && index + 1 <= this.start.length) {
            const nextTime = this.start[index];
            const date = new Date (`1/1/2000 ${nextTime}`);
            date.setMinutes(date.getMinutes() + 10);
            const formattedTime = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit',});
            this.selectedEndTime = formattedTime;
            this.EndTime = `${formattedTime}`
          } else{
            this.EndTime = ""
          }}
        else if (this.role.studentMajor !== "Music" && this.role.studentPrivateHours === 2){
          if(index !== -1 && index + 1 <= this.start.length) {
            const nextTime = this.start[index];
            const date = new Date (`1/1/2000 ${nextTime}`);
            date.setMinutes(date.getMinutes() +10);
            const formattedTime = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit',});
            this.selectedEndTime = formattedTime;
            this.EndTime = `${formattedTime}`
          } else{
            this.EndTime = ""
          }
        }
        else if (this.role.studentMajor !== "Music" && this.role.studentPrivateHours === 1){
          if(index !== -1 && index + 1 <= this.start.length) {
            const nextTime = this.start[index];
            const date = new Date (`1/1/2000 ${nextTime}`);
            date.setMinutes(date.getMinutes() +5);
            const formattedTime = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit',});
            this.selectedEndTime = formattedTime;
            this.EndTime = `${formattedTime}`
          } else{
            this.EndTime = ""
          }
        }
      },


      async retrieveRole(){
        await roleServices.getRoleForUser(this.user.userId)
        .then((response) => {
          for (let i = 0; i < response.data.length; i++){
              if (response.data[i].roleType == this.user.selectedRole) {
                this.role = response.data[i];
              }
            }
        })
        .catch((e) => {
          this.message = e.response.data.message;
        })
      },
      async userRepertoire(){
        await RepertoireSongServices.getAllForUser(this.role.id)
        .then((response) => {
          this.repertoireSongs = response.data;
          console.log('song')
          console.log(this.repertoireSongs)
        })
        .catch((e) => {
          this.message = e.response.data.message;
        })
      },
      async retrieveSongs(){
        await songService.getAll()
        .then((response) => {
          this.songs = response.data;
          ///console.log("All songs", this.songs)
        })
      },
      async retrieveEvents() {
  const today = new Date(); // get the current date and time
  
  await eventServices.getAll()
    .then((response) => {
      if (this.role.studentClassification === "Incoming Student"){
        this.listOfEvents = response.data.filter(event =>  
          event.isReady !== false && 
          event.eventType !== "Scholarship" && 
          new Date(event.date) >= today
        );
      } else {
        this.listOfEvents = response.data.filter(event => 
          event.isReady !== false && 
          new Date(event.date) >= today
        );
      }
    })
    .catch((e) => {
      this.message = e.response.data.message;
    });
},

      async retrieveEventSessions(item) {
        await eventSessionServices.getAll()
          .then((response) => {
            // Filter out events that don't have the specified item Id
            this.eventsSession = response.data.filter(event => event.eventId === item.id);

            // eventsSession dates are in the wrong format, so this section changes it to the proper date format
            this.eventsSession.forEach(event =>{
              event.startTime = this.convertTimeToMilitary(event.startTime)
              event.endTime = this.convertTimeToMilitary(event.endTime)
              console.log(event.endTime)
              event.startTime =  this.convertMilitaryTimeToDate(event.startTime, new Date())
            })
            
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      convertTimeToMilitary(timeStr){
        const [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':');
        if (hours === '12'){
          hours = '00';
        }
        if (modifier === 'PM'){
          hours = parseInt(hours, 10) + 12;
        }
        return `${hours}:${minutes}`
      },
      convertMilitaryTimeToDate(militaryTimeStr, date){
        const[hours,minutes] = militaryTimeStr.split(':');
        const newDate = new Date(date);
        newDate.setHours(parseInt(hours,10));
        newDate.setMinutes(parseInt(minutes, 10))
        return newDate
      },

      async retrieveAllRoles(){
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
        async getInstructors(){
          for (let i = 0; i < this.listOfRoles.length; i++){
            if (this.listOfRoles[i].facultyType === 'Instructor'){
              await userServices.get(this.listOfRoles[i].userId)
              .then((response) => {
                this.instructors.push(response.data)
              })
            }
          }
        },
        getAvailablitiesForEvent(item){
          return this.availabilities.filter((availability)=> availability.eventId === item.id)
        },
        getAvailableAccompanists(availabilities){
          console.log("Testing the getAvailableAccompanists", availabilities)
          const accompanistsIds = availabilities.map((availability) => availability.accompanistId);
          const uniqueIds = [...new Set(accompanistsIds)]
          //console.log("List of Accompanists", this.accompanists)
          return this.accompanists.filter((accompanist) => uniqueIds.includes(accompanist.id));
        },
        getAvailableInstructors(availabilities){
          const facultyIds = availabilities.map((availability) => availability.facultyId);
          const uniqueIds = [...new Set(facultyIds)]
          console.log("Testing the this.instructors", this.instructors)
          return this.instructors.filter((instructor) => uniqueIds.includes(instructor.id));
        },

    async showSelectedDialog(item) {
      // v-models for each v-select within the event's dialog boxes are reset
        this.selectedAccompanist = null;
        this.selectedInstrument = null;
        this.selectedSongs = null;
        this.selectedStartTime = null;
        this.selectedEndTime = null;
        this.EndTime = null;
        this.selectedInstructors = null;

        this.selectedEvent = item
        const calendarDate = new Date(item.date)
        const CalendarDateString = calendarDate.toISOString().substring(0, 10)
        this.selectedDate = CalendarDateString     //  Date is put into selectedDate, which is the v-model for the calendar
        
      //Function call for retrieving event session
      await this.retrieveEventSessions(item)

      // Function call for getting the available accompanists depending on the specific events
      const availabilities = this.getAvailablitiesForEvent(item)
     // console.log("Filtered Accompanists", availabilities)
      this.availabilitiesForEvent = availabilities
      //console.log(this.availabilitiesForEvent, "TESTING THIS OUT")


      this.availableAccompanists = this.getAvailableAccompanists(availabilities)

      this.availableInstructor = this.getAvailableInstructors(availabilities)

      // Function call for getting the start time and end time for each specific events 
      this.start = await this.availableStartTime(item) 

      // These makes sure that the dialog boxes that pops up show the right dialog boxes. f
      this.selectedEventType = item.eventType;
      if (this.selectedEventType === 'Hearing') {
        this.hearingDialogVisible = true;
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


    // This function retrieves every event session available for the student to sign up for
    async availableStartTime(item){
      console.log("available start Time item",item)

      const startTimeStr = item.startTime
      const endTimeStr = item.endTime

      console.log("Start Time: ", item.startTime, "   End Time: ", item.endTime)
      const takenSlots = [];
      // For each event sessions within the event, make a 5 minute timeslot and push it into takenSlots from startTime to endTime
      this.eventsSession.forEach(event => {
        console.log(event)
        const startSession = new Date (event.startTime)
        const endSession = new Date(event.endTime)
        console.log("Start Time: ", startSession, "   End Time: ", endSession)

          for (let time = startSession; time <= endSession; time.setMinutes(time.getMinutes() + 5)){
            takenSlots.push(time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false}))
        }
      })
      const uniqueTimes = [...new Set(takenSlots)]
      console.log("TakenSlots" , uniqueTimes)

      const [startHour, startMinute] = startTimeStr.split (':')
      const [endHour, endMinute] = endTimeStr.split(':')
      const startDate = new Date();
      startDate.setHours(parseInt(startHour), parseInt(startMinute), 0, 0);
      const endDate = new Date();
      endDate.setHours(parseInt(endHour), parseInt(endMinute), 0, 0);
      const startTime = new Date(startDate);
      const endTime= new Date(endDate);
      

      // This loops makes a new array of objects called timeslots the objects contain the availablitiy and the time. 
      let timeslots = [];
      while (startTime <= endTime){ 
      let timeslot = {
        time: startTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false}),
        available: false
        }
        timeslots.push(timeslot);
        startTime.setMinutes(startTime.getMinutes() + 5);
    }

      //console.log("TESTING THE BUG WITH AM AND PM", timeslots)
      
        // For the calendar -- calendar requires the start, end, color, and name of events to populate 
        this.events = [];
        for (let i = 0; i < timeslots.length - 1; i++) {
          const event = timeslots[i];
          let startTime;
          // check if date is in format mm/dd/yyyy
          const datePartsMDY = item.date.split('/');
          if (datePartsMDY.length === 3) {
            startTime = new Date(`${datePartsMDY[2]}-${datePartsMDY[0]}-${datePartsMDY[1]} ${event.time}`);
          } else {
            // check if date is in format yyyy-mm-dd
            const datePartsYMD = item.date.split('-');
            if (datePartsYMD.length === 3) {
              startTime = new Date(`${datePartsYMD[0]}-${datePartsYMD[1]}-${datePartsYMD[2]} ${event.time}`);
            } else {
              console.error(`Invalid date format: ${item.date}`);
              continue; // skip to next iteration if date format is invalid
            }
          }

          const endTime = new Date(startTime.getTime() + 5 * 60 * 1000);

          //console.log(endTime, startTime)
          this.events.push({
            id: startTime.getTime(),
            name: 'Available',
            start: startTime,
            end: endTime,
            timed: true,
            color: '#4169E1',
            disabled: false,
            accompAvailable: false,
            instructorAvailable: false,
            selected: false,
          });
        }
      // For each taken slots, if the takenslots matches the timeslots time, change the available to true. 
      uniqueTimes.pop();
      for (let i = 0; i < uniqueTimes.length; i++) {
        const uniquetime = uniqueTimes[i];
        //console.log("uniqueTime", uniquetime)
        for (let j = 0; j < timeslots.length; j++) {
          const timeslot = timeslots[j];
          if (timeslot.time === uniquetime) {
            //console.log("true")
            timeslot.available = true;
    }
  }
}
for (let i = 0; i < uniqueTimes.length; i++) {
        const uniquetime = uniqueTimes[i];
        for (let j = 0; j < this.events.length; j++) {
          //console.log(this.events[j].start.toLocaleString('en-US',{hour: '2-digit', minute: '2-digit', hour12: false}))
          if (this.events[j].start.toLocaleString('en-US',{hour: '2-digit', minute: '2-digit', hour12: false}) == uniquetime) {
            console.log(this.events[j])
            this.events[j].disabled = true;
    }
  }
}
      this.timeslotTemp = timeslots
      // Return the timeslots filtered by whats already taken up and whats not
      return timeslots.filter((slot) => slot.available === false).map((slot) => slot.time);
  },


  selectedInstructorAvailability(){
    this.events.map((event) => {
      event.instructorAvailable = false
      event.accompAvailable = false
      })
        this.selectedAccompanist = null;

    console.log("This is the id for selectedInstrument.",this.selectedInstrument.privateInstructorId)
    for (let i = 0; i <= this.availableInstructor.length; i++) {
      if (this.availableInstructor[i].id == this.selectedInstrument.privateInstructorId) {
        console.log('Found matching instructor:', this.availableInstructor[i]);
        this.selectedInstructors = this.availableInstructor[i]
    }
    else{
      console.log('No matching instructor')
      this.selectedInstructors = null;
      }
    }

    const available = []; 
    const takenSlots = [];  
    // For each event sessions within the event, make a 5 minute timeslot and push it into takenSlots from startTime to endTime
      this.availabilitiesForEvent.forEach(a => {
        if(a.facultyId === this.selectedInstrument.privateInstructorId){
          available.push(a)
        }
      })
      console.log("Testing the Instructor Availability Function; the 'available' array", available)
      for (let i = 0; i < available.length; i++){
        const startSession = new Date("01/01/2022 " + available[i].startTime)
        const endSession = new Date("01/01/2022 " + available[i].endTime)
        for (let time = startSession; time <= endSession; time.setMinutes(time.getMinutes() + 5)){
          //takenSlots.push(new Date(time))
          takenSlots.push(time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}))
          //console.log("Instructor", time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}))
        }
      }

      for (let i = 0; i < takenSlots.length - 1; i++) {
        const takenSlot = takenSlots[i];
        for (let j = 0; j < this.events.length; j++) {
          if (this.events[j].start.toLocaleString('en-US',{hour: '2-digit', minute: '2-digit'}) === takenSlot) {
            this.events[i].instructorAvailable = true;
    }
  }
}

  },
  selectedAccompanistAvailability(){
    const available = []; // all the availability times for the selectedAccompanist
    const takenSlots = [];  
    // For each event sessions within the event, make a 5 minute timeslot and push it into takenSlots from startTime to endTime
      this.availabilitiesForEvent.forEach(a => {
        if(a.accompanistId === this.selectedAccompanist.id){
          available.push(a)
        }
      })
      console.log("Testing the Accompanist Availability Function, the avaiable array", available)
      for (let i = 0; i < available.length; i++){
        const startSession = new Date("01/01/2022 " + available[i].startTime)
        const endSession = new Date("01/01/2022 " + available[i].endTime)
        for (let time = startSession; time <= endSession; time.setMinutes(time.getMinutes() + 5)){
          //takenSlots.push(new Date(time))
          takenSlots.push(time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}))
          //console.log(time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}))
        }
      }

        
      console.log("Testing the Accompanist Availability Function")

    for (let i = 0; i < takenSlots.length - 1; i++) {
        const takenSlot = takenSlots[i];
        for (let j = 0; j < this.events.length; j++) {
          if (this.events[j].start.toLocaleString('en-US',{hour: '2-digit', minute: '2-digit'}) === takenSlot) {
            this.events[i].accompAvailable = true;
    }
  }
}
},},


computed: {
  initialTime(){
    if(this.events.length > 0){
      let startTime = this.events[0].start.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false})
      console.log(startTime, "Iniitial time")
      return startTime;
    }
    else{
      console.log("Testing the initialtime function")
      return new Date();
    }
  },



  filteredEvents(){
    return this.events.map((event) => {
      if (event.disabled == false) {
        if(event.instructorAvailable == true){
          if (event.accompAvailable == true){
            return event;
            }
          else{
              return { ...event, color: '#999999', name: 'Select Accompanist'};
          }
        }
        else{
          if (this.selectedInstrument !== null){
            return {...event, color: '#999999', name: 'Instructor Not Available'}
          }
          else{
            return { ...event, color: '#999999', name: 'Select Instrument'}
          }
        }
      } else {
        return { ...event, color: '#999999', name: 'Not Available'};
      }
    });
  },

  availableTimeslots(){
    //console.log("This will be the this.start", this.start)
    this.start.filter((slot) => slot.available === false).map((slot) => slot.time)
    console.log(this.start)
    return this.start
},
},
mounted() {
    //this.$refs.calendar.setDay(this.selectedDate);
  },
};
  </script>
  


  <style lang="css">
  * {
    margin: 0;
    padding: 0;
    font-family: 'Karla', sans-serif;
  }
/* Css for the calendar date picker */

.calendar-container {
  width: 350px;
  height: 420px;
  margin-right: 5%;
  margin-bottom: 2%;
  border: 1px solid #ccc;
  padding: 10px;
  position: relative;
}

.timeslots {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.timeslots > div {
  width: 60px;
  height: 60px;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 60px;
  cursor: pointer;
}

.timeslots > div.selected {
  background-color: #00cc99;
  color: #fff;
}

.calendar {
  max-width: 100%;
}
/* End of the css for calendar datepicker */













  .button-container{
    width: 200px;
  }
  .button{
    border: 2px solid #dc3545;
    border-radius: 5px;
    padding: 10px;
    background-color: white;
  }
  .button.selected{
    background-color: dc3545;
    color: white;
  }
  .button-label{
    font-weight: bold;
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
  .button-grid {
  margin-top: 20px;
}

</style>