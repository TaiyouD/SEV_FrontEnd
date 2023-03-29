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
            <tabs :mode="mode" style="padding-left: 130px; padding-right: 130px;"> 
                <tab title="Recital">     
  <v-row>
    <v-col>
      <v-sheet height="400"  style="text-align: center;">
        Select Accompanist and Signup Date to See Available Times 
        <v-calendar 
        v-if="selected === '2023-4-15' && selected2 === 'John Doe'"
        start = 2023-4-15
        color="primary"
        type="day"
        :events = events
        >
        <template v-slot:day-header="{ present }">
            <template
              v-if="present"
         
            >
              Today
            </template>
          </template>

          <template >
            <div
              class="text-center"
            >
            </div>
          </template>
        </v-calendar>

        <v-calendar 
        v-else-if="selected === '2023-4-15'"
        start = 2023-4-15
        color="primary"
        type="day"
        :events = events2
        >
        <template v-slot:day-header="{ present }">
            <template
              v-if="present"
       
            >
              Today
            </template>
          </template>

          <template >
            <div
              class="text-center"
            >
            </div>
          </template>
        </v-calendar>


        <v-calendar 
        v-else
        now
        color="primary"
        type="day"
        :events = events
        >
        <template v-slot:day-header="{ present }">
            <template
              v-if="present"
 
            >
              Today
            </template>
          </template>

          <template >
            <div
              class="text-center"
            >
            </div>
          </template>
        </v-calendar>

      </v-sheet>
    </v-col>
  </v-row>

                    <!-- Time Select Above -->
       <!-- Select Hearing Date Below -->
       <v-select style="padding-top: 80px;"
        :items="selected"
        label="Select Available Hearing Dates"
        @change="selectButton"
        v-model="selected"
        item-title="date"
        return-object
        single-line
        filled
     ></v-select>


                     <!-- Accompanist Select Below -->
    <v-select 
        :items="selected2"
        item-title="Accompanist"
        item-value=""
        label="Select Accompanist"
        @change="selectButton"
        v-model="selected2"
        return-object
        single-line
        filled
    ></v-select>

    <v-select 

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
    <v-select style="padding-right: 30px; width: 260px;"
        :items="items2"
        item-title="state2"
        label="Select Instructor"
        return-object
        single-line
        filled
     ></v-select>

     <v-select style="padding-right: 30px; width: 260px;"
        :items="items2"

        label="Select Duration"
        return-object
        single-line
        filled
     ></v-select>
                

                    <!--  Instrument Select Below -->
    <v-select   style="width: 260px;"
        v-model="select"
        :items="items4"
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


     <div style="text-align: center;">
<div style="display:inline-block; margin:auto;">
<v-btn color="success" variant="tonal" style="text-align: center;">
    Submit
</v-btn>
<router-link to="/addaccompanist" tag="v-btn">
<v-btn color="success" variant="tonal" style="text-align: center; margin-left: 20px;">
    Add Accompanist
</v-btn>
</router-link>
<router-link to="/addsong" tag="v-btn">
  <v-btn color="success" variant="tonal" style="text-align: center; margin-left: 20px;">
      Add Song
  </v-btn>
  </router-link>
</div>
</div>
    </tab>



<!-- ================START of JURY TAB================= -->
<tab title="Jury">
        <!-- Select Hearing Date Below -->
        <v-row>
    <v-col>
      <v-sheet height="400"  style="text-align: center;">
        Select Accompanist and Signup Date to See Available Times 
        <v-calendar 
        v-if="selected === '2023-4-15' && selected2 === 'John Doe'"
        start = 2023-4-15
        color="primary"
        type="day"
        :events = events
        >
        <template v-slot:day-header="{ present }">
            <template
              v-if="present"
              
            >
              Today
            </template>
          </template>

          <template >
            <div
              class="text-center"
            >
            </div>
          </template>
        </v-calendar>

        <v-calendar 
        v-else-if="selected === '2023-4-15'"
        start = 2023-4-15
        color="primary"
        type="day"
        :events = events2
        >
        <template v-slot:day-header="{ present }">
            <template
              v-if="present"
        
            >
              Today
            </template>
          </template>

          <template >
            <div
              class="text-center"
            >
            </div>
          </template>
        </v-calendar>


        <v-calendar 
        v-else
        now
        color="primary"
        type="day"
        :events = events
        >
        <template v-slot:day-header="{ present }">
            <template
              v-if="present"
              
            >
              Today
            </template>
          </template>

          <template >
            <div
              class="text-center"
            >
            </div>
          </template>
        </v-calendar>

      </v-sheet>
    </v-col>
  </v-row>

                    <!-- Time Select Above -->
       <!-- Select Hearing Date Below -->
       <v-select style="padding-top: 80px;"
        :items="selected"
        label="Select Available Hearing Dates"
        @change="selectButton"
        v-model="selected"
        item-title="date"
        return-object
        single-line
        filled
     ></v-select>


                     <!-- Accompanist Select Below -->
    <v-select 
        :items="selected2"
        item-title="Accompanist"
        item-value=""
        label="Select Accompanist"
        @change="selectButton"
        v-model="selected2"
        return-object
        single-line
        filled
    ></v-select>

    <v-select 

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
    <v-select style="padding-right: 30px; width: 260px;"
        :items="items2"
        item-title="state2"
        label="Select Instructor"
        return-object
        single-line
        filled
     ></v-select>
                

                    <!--  Instrument Select Below -->
    <v-select   style="width: 260px;"
        v-model="select"
        :items="items4"
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


     <div style="text-align: center;">
<div style="display:inline-block; margin:auto;">
<v-btn color="success" variant="tonal" style="text-align: center;">
    Submit
</v-btn>
<router-link to="/addaccompanist" tag="v-btn">
<v-btn color="success" variant="tonal" style="text-align: center; margin-left: 20px;">
    Add Accompanist
</v-btn>
</router-link>
<router-link to="/addsong" tag="v-btn">
  <v-btn color="success" variant="tonal" style="text-align: center; margin-left: 20px;">
      Add Song
  </v-btn>
  </router-link>
</div>
</div>
                </tab>
            </tabs>

    </div>
    </div>
    <!-- End of multiple tab container  -->
    </div>

</template>
  
  <script>
  import TutorialServices from "../services/tutorialServices";
  import Utils from "@/config/utils.js";
  import Tab from '../components/Tab'
  import Tabs from '../components/Tabs'

  export default {
    name: "tutorials-list",
    components: {
      Tab,
      Tabs
    },
    data() {
      return {
        data: () => ({}),
        sheet:null,
        selected: [' ','2023-4-15', '2023-4-16', '2023-4-17', '2023-4-18'],
        selected2: [' ', 'John Doe', 'John Doe2', 'John Doe3'],
        extended: false,
        mode: 'light',
        search: "",
        tutorials: [],
        currentTutorial: null,
        currentIndex: -1,
        title: "",
        user: {},
        message: "Music Department",
        headers: [
          { text: "Title", value: "title" },
          { text: "Description", value: "description" },
          { text: "Actions", value: "actions", sortable: false },
        ],
        colors: [
          'primary',
          'secondary',
          'yellow darken-2',
          'red',
          'orange',
        ],
        model: 0,
        dates: [
        '2023-4-15', '2023-4-16', '2023-4-17', '2023-4-18',
        ],
        items2: ['John Doe', 'John Doe2', 'John Doe3'],
        items3: ['John Doe', 'John Doe2', 'John Doe3'],
        items4: ['Thing1', 'Thing2', 'Thing3', 'Thing4'],
        events: [
            {
          name: 'Event 2',
          start: '2023-04-15T10:00:00',
          end: '2023-04-15T10:10:00',
          timed: true,
        },
        {
          name: 'Event 1',
          start: '2023-04-15T08:00:00',
          end: '2023-04-15T08:10:00',
          timed: true,
        },
        {
          name: 'Event 3',
          start: '2023-04-15T11:20:00',
          end: '2023-04-15T11:30:00',
          timed: true,
        },   
    ],
    events2: [
            {
          name: 'Event 2',
          start: '2023-04-15T10:00:00',
          end: '2023-04-15T10:10:00',
          timed: true,
        },
        {
          name: 'Event 1',
          start: '2023-04-15T08:00:00',
          end: '2023-04-15T08:10:00',
          timed: true,
        },
        {
          name: 'Event 3',
          start: '2023-04-15T11:20:00',
          end: '2023-04-15T11:30:00',
          timed: true,
        },   
        {
          name: 'Event 4',
          start: '2023-04-15T15:20:00',
          end: '2023-04-15T15:30:00',
          timed: true,
        },
        {
          name: 'Event 5',
          start: '2023-04-15T15:40:00',
          end: '2023-04-15T15:50:00',
          timed: true,
        },   
    ]
      };
    },
    mounted() {
      this.user = Utils.getStore("user");
      this.retrieveTutorials();
    },
    methods: {
    selectButton(){
        this.$nextTick(() => {
        this.select = 0;
    });},
    changeStyle () {
      if (this.mode === 'dark') {
        this.mode = 'light'
      } else {
        this.mode = 'dark'
      }
    },
      editTutorial(tutorial) {
        this.$router.push({ name: "edit", params: { id: tutorial.id } });
      },
      viewTutorial(tutorial) {
        this.$router.push({ name: "view", params: { id: tutorial.id } });
      },
      deleteTutorial(tutorial) {
        TutorialServices.delete(tutorial.id)
          .then(() => {
            this.retrieveTutorials();
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      retrieveTutorials() {
        TutorialServices.getAllForUser(this.user.userId)
          .then((response) => {
            this.tutorials = response.data;
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      refreshList() {
        this.retrieveTutorials();
        this.currentTutorial = null;
        this.currentIndex = -1;
      },
      setActiveTutorial(tutorial, index) {
        this.currentTutorial = tutorial;
        this.currentIndex = tutorial ? index : -1;
      },
      removeAllTutorials() {
        TutorialServices.deleteAll()
          .then((response) => {
            console.log(response.data);
            this.refreshList();
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
    },
    
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