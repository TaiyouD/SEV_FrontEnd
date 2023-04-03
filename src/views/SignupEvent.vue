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
              v-model="selectedEvent"
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
  <v-dialog v-if="selectedEventType === 'Recital'" v-model="recitalDialogVisible" max-width = "800">
    <v-card>
        <v-card-title>
    <div style="float: center; margin:auto;">
    <div style="display: inline-block; text-align: center;">

        <!-- ===============Timeslot ==================== -->
        Recital Sign Up 
      <v-select 
        :items= "availableAccompanists"
        v-model = "selectedAccompanist"
        :item-text = "item => `${item.fName} ${item.lName}`"
        label="Select Accompanist"
        return-object
        single-line
        filled
    ></v-select>

    <div style="text-align: center;">
    <div style="display: inline-flex; padding-top: 20px;  width: 780px;" >
    <v-select style="padding-right: 30px; width: 100px;"
        :items="availableTimeslots"
        v-model="selectedStartTime"
        label="Select Start Time"
        return-object
        single-line
        filled
    ></v-select>
    <p> Based on your major <br>  and private lesson hours, <br> your appoint ends <br> at {{ EndTime }} </p>
    </div>
    </div>

      <v-card-text>
        <v-checkbox v-model = "showTextField" label = "Duet?"/>
        <v-text-field v-if="showTextField" label = "Partner's Name"/>
      </v-card-text>
                    <!--  Instrument Select Below -->
    <v-select
        item-title="Instrument"
        v-model="selectedInstrument"
        item-value=""
        label="Select Voice or Instrument"
        return-object
        single-line
        filled
    ></v-select>

    <v-select style="padding-top: 8px;"
        :items = userSongs
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

    <!-- ===========Button for missing song, composer, and submit =================-->
    <div style="text-align: center;">
<div style="display:inline-block; margin:auto;">
<v-btn @click="submitForm" color="success" variant="tonal" style="text-align: center;">
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
        v-model = "selectedAccompanist"
        :item-text = "item => `${item.fName} ${item.lName}`"
        label="Select Accompanist"
        return-object
        single-line
        filled
    >
  </v-select>
    <div style="text-align: center;">
    <div style="display: inline-flex; padding-top: 20px;  width: 780px;" >
    <v-select style="padding-right: 30px; width: 100px;"
        :items="availableTimeslots"
        v-model="selectedStartTime"
        label="Select Start Time"
        return-object
        single-line
        filled
        @change ="updateText"
    ></v-select>
    <p> Based on your major <br>  and private lesson hours, <br> your appoint ends <br> at {{ EndTime }} </p>
    </div>
    </div>
    <div style="text-align: center;">
    <div style="display: inline-flex; padding-top: 20px;  width: 780px;" >

                    <!--  Instrument Select Below -->
    <v-select   style="width: 100px;"
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
    </div>
</div>

    <!-- Song for 'Senior' -->
  <v-select style="padding-top: 8px;"
        :items = userSongs
        v-model = "selectedSongs"
        item-text = "song.title"
        item-value = "song" 
        label="Select Piece"
        multiple
        chips
        return-object
        single-line
        filled
     ></v-select>

    <!-- ===========Button for missing song, composer, and submit =================-->
    <div style="text-align: center;">
<div style="display:inline-block; margin:auto;">
<v-btn @click="submitForm" color="success" variant="tonal" style="text-align: center;">
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
        v-model = "selectedAccompanist"
        :item-text = "item => `${item.fName} ${item.lName}`"
        label="Select Accompanist"
        return-object
        single-line
        filled
    ></v-select>
    <div style="text-align: center;">
    <div style="display: inline-flex; padding-top: 20px;  width: 780px;" >
    <v-select style="padding-right: 30px; width: 100px;"
    :items="availableTimeslots"
        v-model="selectedStartTime"
        label="Select Start Time"
        return-object
        single-line
        filled
        @change ="updateText"
    ></v-select>
    <p> Based on your major <br>  and private lesson hours, <br> your appoint ends <br> at {{ EndTime }} </p>
    </div>
    </div>
    <div style="text-align: center;">
    <div style="display: inline-flex; padding-top: 20px;  width: 780px;" >

                    <!--  Instrument Select Below -->
                    <v-select   style="width: 100px;"
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
    </div>
</div>
  <v-select style="padding-top: 8px;"
        :items = userSongs
        v-model = "selectedSongs"
        item-text = "song.title"
        item-value = "song" 
        label="Select Piece"
        multiple
        chips
        return-object
        single-line
        filled
     ></v-select>
    <!-- ===========Button for missing song, composer, and submit =================-->
    <div style="text-align: center;">
<div style="display:inline-block; margin:auto;">
<v-btn @click="submitForm" color="success" variant="tonal" style="text-align: center;">
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
        :item-text = "item => `${item.fName} ${item.lName}`"
        label="Select Accompanist"
        return-object
        single-line
        filled
    ></v-select>
    <div style="text-align: center;">
    <div style="display: inline-flex; padding-top: 20px;  width: 780px;" >
    <v-select style="padding-right: 30px; width: 100px;"
    :items="availableTimeslots"
        v-model="selectedStartTime"
        label="Select Start Time"
        return-object
        single-line
        filled
        @change ="updateText"
    ></v-select>
    <p> Based on your major <br>  and private lesson hours, <br> your appoint ends <br> at {{ EndTime }} </p>
    </div>
    </div>
    <div style="text-align: center;">
    <div style="display: inline-flex; padding-top: 20px;  width: 780px;" >
                    <!--  Instrument Select Below -->
                    <v-select   style="width: 100px;"
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
    </div>
</div>
  <v-select style="padding-top: 8px;"
        :items = userSongs
        v-model = "selectedSongs"
        item-text = "song.title"
        item-value = "song" 
        label="Select Piece"
        multiple
        chips
        return-object
        single-line
        filled
     ></v-select>
    <!-- ===========Button for missing song, composer, and submit =================-->
    <div style="text-align: center;">
<div style="display:inline-block; margin:auto;">
<v-btn @click="submitForm" color="success" variant="tonal" style="text-align: center;">
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
        :item-text = "item => `${item.fName} ${item.lName}`"
        label="Select Accompanist"
        return-object
        single-line
        filled
    ></v-select>
    <div style="text-align: center;">
    <div style="display: inline-flex; padding-top: 20px;  width: 780px;" >
    <v-select style="padding-right: 30px; width: 50px;"
    :items="availableTimeslots"
        v-model="selectedStartTime"
        label="Select Start Time"
        return-object
        single-line
        filled
        @change ="updateText"
    ></v-select>
    <p> Based on your major <br>  and private lesson hours, <br> your appoint ends <br> at {{ EndTime }} </p>
    </div>
    </div>
    <div style="text-align: center;">
    <div style="display: inline-flex; padding-top: 20px;  width: 780px;" >
                    <!--  Instrument Select Below -->
                    <v-select   style="width: 100px;"
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
    </div>
</div>
  <v-select style="padding-top: 8px;"
        :items = userSongs
        v-model = "selectedSongs"
        item-text = "song.title"
        item-value = "song" 
        label="Select Piece"
        multiple
        chips
        return-object
        single-line
        filled
     ></v-select>

    <!-- ===========Button for missing song, composer, and submit =================-->
    <div style="text-align: center;">
<div style="display:inline-block; margin:auto;">
<v-btn @click="submitForm" color="success" variant="tonal" style="text-align: center;">
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
  import eventSessionServices from "../services/eventSessionServices";
  import roleServices from "../services/rolesServices";
  import availabilityServices from "../services/availability";
  import userServices from "../services/userServices";
  import Utils from "@/config/utils.js"
  import RepertoireSongServices from "../services/repertoireSongServices";
  import songService from "../services/songServices"
  import instrumentRoleServices from "../services/instrumentRoleServices";

  export default {
    name: "events-list",
    components: {
    },
    data() {
      return {
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
        roleForUser: {},
        userSongs: [],
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
      EndTime: '',

      start: [],
      dialogVisible: false,
      recitalDialogVisible: true,
      seniorDialogVisible: true,
      juniorDialogVisible: true,
      juryDialogVisible: true,
      scholarshipDialogVisible: true,

      selectedEvent: null,
      selectedAccompanist:null,
      selectedInstrument: null,
      selectedSongs: null,
      selectedEventType: null,
      selectedStartTime: null,
      selectedEndTime: null,
      showTextField: false,
      };
    },
    async created() {
      this.user = Utils.getStore("user"); // This util grabs the specific users' role information
      await this.retrieveRoles();
      await this.retrieveRoleForUser();
      await this.retrieveEvents();
      //await this.retrieveEventSessions();
      await this.retrieveUsers();
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
      async submitForm(){
          console.log(this.selectedEvent.id)
          console.log(this.selectedAccompanist.id)
          console.log(this.selectedInstrument.privateInstructorId)
          console.log(this.selectedStartTime)
          console.log(this.selectedEndTime)
          const data ={
            eventId: this.selectedEvent.id,
            accompanistId: this.selectedAccompanist.id,
            privateInstructorId: this.selectedInstrument.privateInstructorId,
            startTime: this.selectedStartTime,
            endTime: this.selectedEndTime,
            studentId: this.user.userId,
          }
          console.log(data)
        await eventSessionServices.create(data)
          .then((response) => {

            console.log('Success!', response.data);
          })
          .catch((error) => {
            console.log('Error:', error);
          });
          
      },
      async retrieveInstrumentRoles() {
        await instrumentRoleServices.getAllForUser(this.roleForUser.id)
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
        //console.log(this.roleForUser.studentMajor)
        //console.log("student private hours", this.roleForUser.studentPrivateHours)
        if(this.roleForUser.studentMajor === "Music" && this.roleForUser.studentPrivateHours === 2){
          
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
      else if (this.roleForUser.studentMajor === "Music" && this.roleForUser.studentPrivateHours === 1){
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
        else if (this.roleForUser.studentMajor !== "Music" && this.roleForUser.studentPrivateHours === 2){
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
        else if (this.roleForUser.studentMajor !== "Music" && this.roleForUser.studentPrivateHours === 1){
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
      async retrieveRoleForUser(){
        await roleServices.getRoleForUser(this.user.userId)
        .then((response) => {
          this.roleForUser = response.data[0];
        })
        .catch((e) => {
          this.message = e.response.data.message;
        })
      },
      async userRepertoire(){
        await RepertoireSongServices.getAllForUser(this.roleForUser.id)
        .then((response) => {
          this.userSongs = response.data;
          console.log('song')
          console.log(this.userSongs)
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
          if (this.roleForUser.studentClassification === "Incoming Student"){
            this.listOfEvents = response.data.filter(event =>  event.isReady !== false)
           
          }
          else{
            this.listOfEvents = response.data.filter(event => event.isReady !== false && event.eventType !== "Scholarship");
            console.log("stuff", this.listOfEvents)
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

            this.eventsSession.forEach(event =>{
              const startTimeStr = event.startTime
              const endTimeStr = event.endTime
              
              const [startHour, startMinute] = startTimeStr.split (':')
              const [endHour, endMinute] = endTimeStr.split(':')
              const startDate = new Date();
              startDate.setHours(parseInt(startHour), parseInt(startMinute), 0, 0);
              //startTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
              const endDate = new Date();
              endDate.setHours(parseInt(endHour), parseInt(endMinute), 0, 0);
              event.startTime = new Date(startDate);
              console.log(event.startTime)
              event.endTime= new Date(endDate);

            })
            //console.log("This should show the event session for a particular event")
            //console.log("eventsSession", this.eventsSession)
            
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
          console.log("List of Accompanists", this.accompanists)
          return this.accompanists.filter((accompanist) => uniqueIds.includes(accompanist.id));
        },

    async showSelectedDialog(item) {
        console.log("testing this", item)
        this.selectedEvent = item
      this.EndTime = null
      //Functioncall for retrieving event session
      await this.retrieveEventSessions(item)

      // Function call for getting the available accompanists depending on the specific events
      const availabilities = this.getAvailablitiesForEvent(item)
      this.availableAccompanists = this.getAvailableAccompanists(availabilities)
        console.log("filtered Accompanists", this.availableAccompanists)
      // Function call for getting the start time and end time for each specific events 
      this.start = await this.availableStartTime(item) 

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


      const takenSlots = [];
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
      

      let timeslots = [];
      while (startTime <= endTime){ // While the start time is less than or equal to the end time given to us
        let timeslot = {
        time: startTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
        available: false//!this.eventsSession.includes(timeString)
        }
        //startTimes.push(startTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}));
        timeslots.push(timeslot);
        startTime.setMinutes(startTime.getMinutes() + 5);
      }
      uniqueTimes.forEach(uniquetime =>{
        // console.log(uniquetime)
        timeslots.forEach(timeslot =>{
          if(timeslot.time === uniquetime){
            timeslot.available = true;
            //console.log("testing", timeslot)
            }
      })})
      console.log(startTimes)

      // Return the timeslots filtered by whats already taken up and whats not
      return timeslots.filter((slot) => slot.available === false).map((slot) => slot.time);
  },
  },


computed: {
  availableTimeslots(){
    this.start.filter((slot) => slot.available === false).map((slot) => slot.time)
    console.log(this.start)
    return this.start
}
}
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