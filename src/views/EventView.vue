<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title><h4>Event View</h4></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title>{{this.message}}</v-toolbar-title>
      </v-toolbar>     
      <!-- <v-banner
        v-model="banner"
        transition="slide-y-transition"
      >
      By editing the eventsession and
      clicking the submit button you will notifiy an 
      Admin of your eventsession change and it will be either approved or disapproved.
        <template v-slot:actions="{ dismiss }">
          <v-btn
            text
            color="primary"
            @click="dismiss"
          >
            Dismiss
          </v-btn>
        </template>
      </v-banner> -->

        <v-form ref="form" v-model="valid" lazy validation>
        <!-- <v-text-field
          v-model="tutorial.title"
          id="title"
          :counter="50"
          label="Title"
          required
        ></v-text-field>
        <v-text-field
          v-model="tutorial.description"
          id="description"
          :counter="50"
          label="Description"
          required
        ></v-text-field> -->

                          
     <!-- Select Hearing Date Below -->
     <v-text-field style="padding-top: 50px;"
      :items="selected"
      label="Select Available Event Dates"
      @change="selectButton"
      v-model="selected"
      item-title="date"
      return-object
      single-line
      filled
      disabled
   ></v-text-field>


                   <!-- Accompanist Select Below -->
  <v-text-field
      :items="selected2"
      item-title="Accompanist"
      item-value=""
      label="Select Accompanist"
      @change="selectButton"
      v-model="selected2"
      return-object
      single-line
      filled
      disabled
  ></v-text-field>

  <v-text-field 

      item-title="Time Slot"
      item-value=""
      label="Select Time Slot"
      return-object
      single-line
      filled
      disabled
  ></v-text-field>

      <!-- Instructor Select Below -->
  <div style="text-align: center;">
  <div style="display: inline-flex; padding-top: 20px;  width: 780px;" >
  <v-text-field style="padding-right: 30px; width: 260px;"
      :items="items2"
      item-title="state2"
      label="Select Instructor"
      return-object
      single-line
      filled
      disabled
   ></v-text-field>

   <v-text-field style="padding-right: 30px; width: 260px;"
      :items="items2"
      label="Select Duration"
      return-object
      single-line
      filled
      disabled
   ></v-text-field>
              

                  <!--  Instrument Select Below -->
  <v-text-field  style="width: 260px;"
      v-model="select"
      :items="items4"
      item-title="Instrument"
      item-value=""
      label="Select Voice or Instrument"
      return-object
      single-line
      filled
      disabled
  ></v-text-field>
  </div>
</div>
                 
<v-container fluid>
  <v-text-field
    name="input-7-1"
    label="Select Piece"
    filled
    auto-grow
    disabled
  ></v-text-field>
</v-container>

<v-text-field style="padding-top: 8px;"
      item-title="date"
      label="Select Composer"
      return-object
      single-line
      filled
      disabled
   ></v-text-field>


  <div style="text-align: center;">
    <div style="display:inline-block; margin:auto;">
      <!-- <router-link to="/addaccompanist" tag="v-btn">
      <v-btn color="success" variant="tonal" style="text-align: center; margin-left: 20px;">
      Add Accompanist
      </v-btn>
      </router-link> -->
      <router-link to="/critique" tag="v-btn">
      <v-btn color="success" variant="tonal" style="text-align: center; margin-left: 20px;">
      View Critiques
      </v-btn>
      </router-link>
      <v-btn color="error" class="mr-4" style="text-align: center; margin-left: 20px;" 
      @click="cancel()"> 
      Return 
      </v-btn>
    </div>
  </div>


    </v-form>
  </v-container>
</div>
</template>

<script>
import TutorialServices from "../services/tutorialServices";

export default {
  name: "view-event",
  props: ["id"],
  data() {
    return {
      valid: false,
      banner: true,
      tutorial: {},
      message: "Enter data and click submit",
      sheet:null,
      selected: ['2023-4-15'],
      selected2: ['John Doe'],
      extended: false,
      mode: 'light',
      search: "",
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      title: "",
      user: {},
      updateHeaders: [
       { text: "Title", value: "title" },
       { text: "Description", value: "description" },
       { text: "Actions", value: "actions", sortable: false },
      ],
      // headers: [
      //   { text: "Title", value: "title" },
      //   { text: "Description", value: "description" },
      //   { text: "Actions", value: "actions", sortable: false },
      // ],
      // dates: [
      // '2023-4-15', '2023-4-16', '2023-4-17', '2023-4-18',
      // ],
      // events: [
      //   {
      //     name: 'Event 2',
      //     start: '2023-04-15T10:00:00',
      //     end: '2023-04-15T10:10:00',
      //     timed: true,
      //   },
      //   {
      //     name: 'Event 1',
      //     start: '2023-04-15T08:00:00',
      //     end: '2023-04-15T08:10:00',
      //     timed: true,
      //   },
      //   {
      //     name: 'Event 3',
      //     start: '2023-04-15T11:20:00',
      //     end: '2023-04-15T11:30:00',
      //     timed: true,
      //   },   
      // ],
      // events2: [
      //   {
      //     name: 'Event 2',
      //     start: '2023-04-15T10:00:00',
      //     end: '2023-04-15T10:10:00',
      //     timed: true,
      //   },
      //   {
      //     name: 'Event 1',
      //     start: '2023-04-15T08:00:00',
      //     end: '2023-04-15T08:10:00',
      //     timed: true,
      //   },
      //   {
      //     name: 'Event 3',
      //     start: '2023-04-15T11:20:00',
      //     end: '2023-04-15T11:30:00',
      //     timed: true,
      //   },   
      //   {
      //     name: 'Event 4',
      //     start: '2023-04-15T15:20:00',
      //     end: '2023-04-15T15:30:00',
      //     timed: true,
      //   },
      //   {
      //     name: 'Event 5',
      //     start: '2023-04-15T15:40:00',
      //     end: '2023-04-15T15:50:00',
      //     timed: true,
      //   },   
      // ]
    };
  },
  methods: {
    retrieveTutorial() {
      TutorialServices.get(this.id)
        .then((response) => {
          this.tutorial = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },

    updateTutorial() {
      var data = {
        title: this.tutorial.title,
        description: this.tutorial.description,
      };
      TutorialServices.update(this.id, data)
        .then((response) => {
          this.tutorial.id = response.data.id;
          this.$router.push({ name: "eventupcoming" });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: "eventpast" });
    },
  },
  mounted() {
    this.retrieveTutorial();
  },
};
</script>
<style></style>
