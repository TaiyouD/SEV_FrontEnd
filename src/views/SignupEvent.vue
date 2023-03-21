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
            :items="events2"
            :items-per-page="50"
          >
          <template #item="{ item }">
            <tr>
              <!-- <td>Something</td> -->
              <td>{{ item.isVoice }}</td>
              <td>
                <div class="d-flex justify-end">
                  <v-icon color="primary" @click="editEvent(item)">mdi-pencil</v-icon>
                  <v-icon color="error" @click="deleteEvent(item)">mdi-delete</v-icon>
                </div>
              </td>
            </tr>
          </template>

          </v-data-table>
        </v-card>
      </v-container>

      <v-flex class = "mt-4">
        <popup>
        </popup>
      </v-flex>
      


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

    </div>
    </div>
    <!-- End of multiple tab container  -->
    </div>

</template>
  
  <script>
  import eventServices from "../services/signupServices";
  import Utils from "@/config/utils.js"
  import popup from '../components/popup'

  export default {
    name: "events-list",
    components: {
      popup
    },
    data() {
      return {
        data: () => ({}),
        events2: [],
        sheet:null,
        extended: false,
        mode: 'light',
        search: "",
        currentIndex: -1,
        title: "",
        user: {},
        message: "Music Department",
        headers: [
          { text: "Title", value: "title" },
          { text: "Description", value: "description" },
          { text: "Actions", value: "actions", sortable: false },
        ],

      };
    },
    mounted() {
      this.user = Utils.getStore("user");
      this.retrieveEvents();
    },
    methods: {

    changeStyle () {
      if (this.mode === 'dark') {
        this.mode = 'light'
      } else {
        this.mode = 'dark'
      }
    },
      editEvent(event) {
        this.$router.push({ name: "edit", params: { id: event.id } });
      },
      viewEvent(event) {
        this.$router.push({ name: "view", params: { id: event.id } });
      },
      deleteEvent(event) {
        eventServices.delete(event.id)
          .then(() => {
            this.retrieveevents();
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      retrieveEvents() {
        eventServices.getAll()
          .then((response) => {
            this.events2 = response.data;
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
      removeAllEvents() {
        eventServices.deleteAll()
          .then((response) => {
            console.log(response.data);
            this.refreshList();
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
    },

// =============================================================================
    computed: {
    timeSlots() {
      const slots = [];
      let hour, minute, time;

      // Loop through 24 hours
      for (hour = 8; hour < 17; hour++) {
        // Loop through 60 minutes
        for (minute = 0; minute < 60; minute += 5) {
          // Format the time as "hh:mm AM/PM"
          time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

          if (hour < 12) {
            time += ' AM';
          } else {
            time += ' PM';
          }

          // Add the time to the array
          slots.push(time);
        }
      }

      return slots;
    }
  }
// ===========================================================================  
    
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