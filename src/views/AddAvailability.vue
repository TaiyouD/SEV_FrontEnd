<template>
    <div>
      <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
      <v-container>
        <v-toolbar>
          <v-toolbar-title>Add Availability</v-toolbar-title>
        </v-toolbar>
        <br />
        <h4>{{ message }}</h4>
        <br />
        <h4>Event: {{ event.eventType }}</h4> 
        <br />
        <h4>Date: {{ event.date }}</h4> 
        <br />
        <h4>Start Time: {{ event.startTime }}</h4> 
        <br />
        <h4>End Time: {{ event.endTime }}</h4>
        <br /> <br /> 
        <!-- <v-form ref="form" v-model="valid" lazy validation>
          <v-autocomplete
          v-model="select"
          :search-input.sync="search"
          :loading="loading"
          :items="song"
          item-text="title"
          class="mr-4"
          density="comfortable"
          hide-no-data
          hide-details
          label="Title"
          single-line
          return-object
          required
          ></v-autocomplete>
          <br>
        <router-link to="/addsong" >
        <v-btn color="primary" class="mr-4">
            Missing Piece?
        </v-btn>
        </router-link>
        <br><br>
    
        <v-text-field
        v-model="repertoireSong.semester"
        id="semester"
        :counter="15"
        label="Current Semester. Example: Spring 2023"
        required
        ></v-text-field> -->
    
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="saveAvailability()"
          >
            Save
          </v-btn>
    
          <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
        <!-- </v-form> -->
      </v-container>
    </div>
    </template>
    
    <script>
    import EventServices from "../services/eventServices";
    import AvailabilityServices from "../services/availabilityServices";
    import Utils from "@/config/utils.js";
    import RoleServices from "../services/roleServices";
    export default {
    name: "addavailability",
    props: ["eventId"],
    data() {
      return {
        valid: true,
        loading: false,
        search: null,
        select: null,
        repertoireSong: {
          id: null,
          semester: ""
        },
        message: "Enter data and click save",
        event: {
            id: 1,
        },
        user:{},
        role:{}
      };
    },
    mounted() {
      this.user = Utils.getStore("user");
    },
    async created(){
      //const result = await EventServices.get("eventId");
      const result = await EventServices.get(this.event.id);
      this.event = result.data;
      await this.retrieveRole();
    },
    methods: {
      async retrieveRole() {
          await RoleServices.getRoleForUser(this.user.userId)
            .then((response) => {
              this.role = response.data[0];
              console.log('role');
              console.log(this.role.id);
            })
            .catch((e) => {
              this.message = e.response.data.message;
            });
        },
      saveAvailability() {
        var data = {
          semester: this.repertoireSong.semester,
          songId: this.select.id,
          studentId: this.role.id
        };
        AvailabilityServices.create(data)
          .then((response) => {
            this.repertoireSong.id = response.data.id;
            console.log("add " + response.data);
            this.$router.push({ name: "eventupcoming"});
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      cancel() {
        this.$router.push({ name: "eventupcoming"});
      },
    },
    };
    </script>
    <style></style>