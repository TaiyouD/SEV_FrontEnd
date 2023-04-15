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


        <!-- ===============Timeslot ==================== -->
        <v-row>
          <v-col>
      <v-select  class=" mr-4"  width = "380" 
        :items= "availableAccompanists"
        v-model = "selectedAccompanist"
        :item-text = "item => `${item.fName} ${item.lName}`"
        label="Select Accompanist"
        return-object
        single-line
        filled
    ></v-select>
    <v-select class ="mr-4" width = "390"
        :items="availableTimeslots"
        v-model="selectedStartTime"
        label="Select Start Time"
        return-object
        single-line
        filled
        @change ="updateText"
    ></v-select>
    </v-col>
  </v-row>
    <p2> <br><br> Based on your major <br>  and private lesson hours, <br> your appoint ends <br> at {{ EndTime }} </p2>
    </div>
    </div>
                    <!--  Instrument Select Below -->
                    <div style="text-align: center;">
          <div class="d-flex flex-row bg-surface-variant" max-width = "780" >
      <v-row>
          <v-col>
    <v-select  class=" mr-4"  width = "380" 
        :items = "instrumentRole"
        v-model = "selectedInstrument"
        item-title="Instrument"
        item-value = "instrument"
        item-text="instrument.type"
        label="Select Voice or Instrument"
        return-object
        single-line
        filled
    ></v-select>

    <v-select  class=" mr-4"  width = "380" 
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
    </v-col>
  </v-row>
</div>
    </div>
    <v-card-text>
        <v-checkbox v-model = "showTextField" label = "Duet Or Ensemble?"/>
        <v-text-field v-if="showTextField" label = "Other Member's Name"/>
      </v-card-text>
    <!-- ===========Button for missing song, composer, and submit =================-->
    <div style="text-align: center;">
<div style="display:inline-block; margin:auto;">
<v-btn @click="submitForm" :disabled="!selectedStartTime || !selectedInstrument || !selectedSongs" color="success" variant="tonal" style="text-align: center;">
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
      <div class="d-flex flex-row bg-surface-variant" max-width = "780" >
<!-- ===========Testing a date picker of sorts =============== -->  
<template>
  <div class = calendar-container>
  <v-sheet height = "400">
        <v-calendar
          :events="events"
          @click:event ="selectEvent"
          @event-mouseover="handleEventMouseover"
          :event-color="getEventColor" 
          ref = "calendar"
          v-model="selectedDate"
          color="primary"
          :type="'day'"
          first-time = "08:55"
          interval-count = "110" 
          :interval-minutes=5
          :short-interval="true"
        >
        </v-calendar>
      </v-sheet>
    </div>
      </template>
      
      <div style="max-width: 380;">
        <!-- ===============Timeslot ==================== -->
        <v-row>
          <v-col>
      <v-select class ="mr-4" width = "380"
        :items=availableAccompanists
        v-model = "selectedAccompanist"
        :item-text = "item => `${item.fName} ${item.lName}`"
        label="Select Accompanist"
        return-object
        single-line
        filled
    >
    
  </v-select>
    <v-select class ="mr-4" width = "380"
        :items="availableTimeslots"
        v-model="selectedStartTime"
        label="Select Start Time"
        return-object
        single-line
        filled
        @change ="updateText"
    ></v-select>
    <v-select  class=" mr-4"  width = "380" 
        :items = "instrumentRole"
        v-model = "selectedInstrument"
        item-title="Instrument"
        item-value = "instrument"
        item-text="instrument.type"
        label="Select Voice or Instrument"
        return-object
        single-line
        filled
    ></v-select>
    <v-select  class=" mr-4"  width = "380" 
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
  </v-col>
  </v-row>

  </div>
    </div>
  </div>
    <!-- ===========Button for missing song, composer, and submit =================-->
    <div style="text-align: center;">
<div style="display:inline-block; margin:auto;">
<v-btn @click="submitForm" :disabled="!selectedStartTime || !selectedInstrument || !selectedSongs" color="success" variant="tonal" style="text-align: center;">
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

        <!-- ===============Timeslot ==================== -->
        <v-row>
          <v-col>
      <v-select  class=" mr-4"  width = "380" 
        :items= "availableAccompanists"
        v-model = "selectedAccompanist"
        :item-text = "item => `${item.fName} ${item.lName}`"
        label="Select Accompanist"
        return-object
        single-line
        filled
    ></v-select>
    <v-select class ="mr-4" width = "390"
        :items="availableTimeslots"
        v-model="selectedStartTime"
        label="Select Start Time"
        return-object
        single-line
        filled
        @change ="updateText"
    ></v-select>
    </v-col>
  </v-row>
  <p2> <br><br> Based on your major <br>  and private lesson hours, <br> your appoint ends <br> at {{ EndTime }} </p2>
    </div>
    </div>
                    <!--  Instrument Select Below -->
                    <div style="text-align: center;">
          <div class="d-flex flex-row bg-surface-variant" max-width = "780" >
      <v-row>
          <v-col>
    <v-select  class=" mr-4"  width = "380" 
        :items = "instrumentRole"
        v-model = "selectedInstrument"
        item-title="Instrument"
        item-value = "instrument"
        item-text="instrument.type"
        label="Select Voice or Instrument"
        return-object
        single-line
        filled
    ></v-select>

    <v-select  class=" mr-4"  width = "380" 
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
    </v-col>
  </v-row>
</div>
    </div>
    <!-- ===========Button for missing song, composer, and submit =================-->
    <div style="text-align: center;">
<div style="display:inline-block; margin:auto;">
<v-btn @click="submitForm" :disabled="!selectedStartTime || !selectedInstrument || !selectedSongs" color="success" variant="tonal" style="text-align: center;">
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

        <!-- ===============Timeslot ==================== -->
        <v-row>
          <v-col>
      <v-select  class=" mr-4"  width = "380" 
        :items= "availableAccompanists"
        v-model = "selectedAccompanist"
        :item-text = "item => `${item.fName} ${item.lName}`"
        label="Select Accompanist"
        return-object
        single-line
        filled
    ></v-select>
    <v-select class ="mr-4" width = "390"
        :items="availableTimeslots"
        v-model="selectedStartTime"
        label="Select Start Time"
        return-object
        single-line
        filled
        @change ="updateText"
    ></v-select>
    </v-col>
  </v-row>
  <p2> <br><br> Based on your major <br>  and private lesson hours, <br> your appoint ends <br> at {{ EndTime }} </p2>
    </div>
    </div>
                    <!--  Instrument Select Below -->
                    <div style="text-align: center;">
          <div class="d-flex flex-row bg-surface-variant" max-width = "780" >
      <v-row>
          <v-col>
    <v-select  class=" mr-4"  width = "380" 
        :items = "instrumentRole"
        v-model = "selectedInstrument"
        item-title="Instrument"
        item-value = "instrument"
        item-text="instrument.type"
        label="Select Voice or Instrument"
        return-object
        single-line
        filled
    ></v-select>

    <v-select  class=" mr-4"  width = "380" 
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
    </v-col>
  </v-row>
</div>
    </div>
    <v-card-text>
        <v-checkbox v-model = "showTextField" label = "Duet Or Ensemble?"/>
        <v-text-field v-if="showTextField" label = "Other Member's Name"/>
      </v-card-text>

    <!-- ===========Button for missing song, composer, and submit =================-->
    <div style="text-align: center;">
<div style="display:inline-block; margin:auto;">
<v-btn @click="submitForm" :disabled="!selectedStartTime || !selectedInstrument || !selectedSongs" color="success" variant="tonal" style="text-align: center;">
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
        <!-- ===============Timeslot ==================== -->
        <v-row>
          <v-col>
      <v-select class ="mr-4" width = "380"
        :items=availableAccompanists
        v-model = "selectedAccompanist"
        :item-text = "item => `${item.fName} ${item.lName}`"
        label="Select Accompanist"
        return-object
        single-line
        filled
    >
    
  </v-select>
    <v-select class ="mr-4" width = "390"
        :items="availableTimeslots"
        v-model="selectedStartTime"
        label="Select Start Time"
        return-object
        single-line
        filled
        @change ="updateText"
    ></v-select>
  </v-col>
  </v-row>
    <p2> <br><br> Based on your major <br>  and private lesson hours, <br> your appoint ends <br> at {{ EndTime }} </p2>

  </div>
    </div>
    <div style="text-align: center;">
      <div class="d-flex flex-row bg-surface-variant" max-width = "780" >
                    <!--  Instrument Select Below -->
        <v-row>
          <v-col>
    <v-select  class=" mr-4"  width = "380" 
        :items = "instrumentRole"
        v-model = "selectedInstrument"
        item-title="Instrument"
        item-value = "instrument"
        item-text="instrument.type"
        label="Select Voice or Instrument"
        return-object
        single-line
        filled
    ></v-select>

    <v-select  class=" mr-4"  width = "380" 
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
    </v-col>
  </v-row>
    </div>
</div>

    <!-- ===========Button for missing song, composer, and submit =================-->
    <div style="text-align: center;">
<div style="display:inline-block; margin:auto;">
<v-btn @click="submitForm" :disabled="!selectedStartTime || !selectedInstrument || !selectedSongs" color="success" variant="tonal" style="text-align: center;">
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
    },
    // watch:{
    //   selectedStartTime: function(){
    //     this.EndText = null
    //   },
    //   showSelectedDialog: function(){
    //     this.EndText = null;
    //   }

    // },
    methods: {

      getEventColor(event) {
      return event.selected ? 'green' : 'blue';
    },
    selectEvent(event) {
      event.selected = !event.selected;
    },

      handleEventClick({ event }) {
      // Toggle the selected state of the clicked event
      event.selected = !event.selected;

      // Update the list of selected events
      this.selectedEvents = this.events.filter(e => e.selected);
    },
    handleEventMouseover({ event }) {
      // Highlight the event when the user hovers over it
      console.log("Does this work?")
      event.highlighted = true;
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
          const data ={
            eventId: this.selectedEvent.id,
            accompanistId: this.selectedAccompanist.id,
            privateInstructorId: this.selectedInstrument.privateInstructorId,
            startTime: this.selectedStartTime,
            endTime: this.selectedEndTime,
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
          //this.$router.go(0); //This is just a force refresh 
      },
      async retrieveInstrumentRoles() {
        await instrumentRoleServices.getAllForUser(this.role.id)
          .then((response) => {
            console.log(response.data);
            this.instrumentRole = response.data;
            console.log('instrumentRole');
            console.log(this.instrumentRole);
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
          this.role = response.data[0];
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
        await eventServices.getAll()
          .then((response) => {
          if (this.role.studentClassification === "Incoming Student"){
            this.listOfEvents = response.data.filter(event =>  event.isReady !== false && event.eventType !== "Scholarship")
           
          }
          else{
            this.listOfEvents = response.data.filter(event => event.isReady !== false);
            console.log("I dont know why this activates in RetrieveEvents", this.listOfEvents)
          }} 
          )
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
              const startTimeStr = event.startTime
              const endTimeStr = event.endTime
              
              const [startHour, startMinute] = startTimeStr.split (':')
              const [endHour, endMinute] = endTimeStr.split(':')
              const startDate = new Date();
              startDate.setHours(parseInt(startHour), parseInt(startMinute), 0, 0);
              const endDate = new Date();
              endDate.setHours(parseInt(endHour), parseInt(endMinute), 0, 0);
              event.startTime = new Date(startDate);
              console.log(event.startTime)
              event.endTime= new Date(endDate);
            })
            
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
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
        getAvailablitiesForEvent(item){
          return this.availabilities.filter((availability)=> availability.eventId === item.id)
        },
        getAvailableAccompanists(availabilities){
          const accompanistsIds = availabilities.map((availability) => availability.accompanistId);
          const uniqueIds = [...new Set(accompanistsIds)]
          console.log("List of Accompanists", this.accompanists)
          return this.accompanists.filter((accompanist) => uniqueIds.includes(accompanist.id));
        },

    async showSelectedDialog(item) {
      // v-models for each v-select within the event's dialog boxes are reset
        this.selectedAccompanist = null;
        this.selectedInstrument = null;
        this.selectedSongs = null;
        this.selectedStartTime = null;
        this.selectedEndTime = null;
        this.EndTime = null;

        this.selectedEvent = item
        this.selectedDate = new Date(item.date)     //  Date is put into selectedDate, which is the v-model for the calendar
        
      //Function call for retrieving event session
      await this.retrieveEventSessions(item)

      // Function call for getting the available accompanists depending on the specific events
      const availabilities = this.getAvailablitiesForEvent(item)
      this.availableAccompanists = this.getAvailableAccompanists(availabilities)
        console.log("Filtered Accompanists", this.availableAccompanists)

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
      
      const startTimeStr = item.startTime
      const endTimeStr = item.endTime

      console.log("Start Time: ", item, "   End Time: ", item.endTime)
      const takenSlots = [];
      // For each event sessions within our database, 
      this.eventsSession.forEach(event => {
        const startSession = new Date (event.startTime)
        const endSession = new Date(event.endTime)
        for (let time = startSession; time <= endSession; time.setMinutes(time.getMinutes() + 5)){
          //startTimes.push(startTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}));
          takenSlots.push(time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}))
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
        time: startTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
        available: false
        }
        timeslots.push(timeslot);
        startTime.setMinutes(startTime.getMinutes() + 5);
      }

        // For the calendar -- calendar requires the start, end, color, and name of events to populate 
        this.events = [];
      timeslots.forEach(event =>{
        const dateParts = item.date.split('/');
        const startTime = new Date(`${dateParts[2]}-${dateParts[0]}-${dateParts[1]} ${event.time}`);
        const endTime = new Date(startTime.getTime() + 5 * 60 * 1000);
        this.events.push({
          name: 'Available',
          start: startTime,
          end: endTime,
          color: 'green',
        })
      })
      console.log("This is the events for the calendar", this.events)


      // For each taken slots, if the takenslots matches the timeslots time, change the available to true. 
      uniqueTimes.forEach(uniquetime =>{
         //console.log(uniquetime)
        timeslots.forEach(timeslot =>{
          if(timeslot.time === uniquetime){
            timeslot.available = true;
            //console.log("testing", timeslot)
            }
      })})
      console.log("All the starttimes filtered", timeslots)
      this.timeslotTemp = timeslots
      // Return the timeslots filtered by whats already taken up and whats not
      return timeslots.filter((slot) => slot.available === false).map((slot) => slot.time);
  },
  },


computed: {
  availableTimeslots(){
    //console.log("This will be the this.start", this.start)
    this.start.filter((slot) => slot.available === false).map((slot) => slot.time)
    console.log(this.start)
    return this.start
}
},
mounted() {
    this.$refs.calendar.setDay(this.selectedDate);
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