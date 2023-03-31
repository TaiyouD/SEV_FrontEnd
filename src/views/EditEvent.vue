
<template>
    <div>
      <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
      <v-container>
        <v-toolbar>
          <v-toolbar-title>Edit Event</v-toolbar-title>
        </v-toolbar>
        <br />
        <h4>{{ message }}</h4>
        <br />
        <v-form ref="form" v-model="valid" lazy validation>
          <v-select
            v-model="event.eventType"
            id="eventType"
            :items="[{ text: 'Junior', value: 'Junior' },
                     { text: 'Jury', value: 'Jury' },
                     { text: 'Recital', value: 'Recital' },
                     { text: 'Scholarship', value: 'Scholarship' },
                     { text: 'Senior', value: 'Senior' }]"
            label="Event Type"
            required
          ></v-select>
          <v-text-field
            v-model="event.date"
            id="date"
            label="Date"
            required
          ></v-text-field>
          <v-text-field
            v-model="event.startTime"
            id="startTime"
            label="Start Time"
            required
          ></v-text-field>
          <v-text-field
            v-model="event.endTime"
            id="endTime"
            label="End Time"
            required
          ></v-text-field>
          <v-select
            v-model="event.duration"
            id="duration"
            :items="[{ text: '5 Minutes', value: '5' },
                     { text: '10 Minutes', value: '10' },
                     { text: '15 Minutes', value: '15' }]"
            label="Duration"
            required
          ></v-select>
  
          <div class="d-flex align-center">
            <div class="ml-auto">
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="updateEvent()"
              >
                Save
              </v-btn>

                <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
              </div>
            </div>
        </v-form>
      </v-container>
    </div>
  </template>
  
  <script>
  
  import EventServices from "../services/eventServices";
  
  export default {
    name: "editevent",
    props: ['id'],
  data() {
    return {
      event: {
        eventType: '',
        date: '',
        startTime: '',
        endTime: '',
        duration: ''
      },
      message: '',
      valid: false
    }
  },
  mounted() {
    this.getEvent(this.id);
  },
  methods: {
      getEvent(id) {
        EventServices.get(id)
          .then(response => {
            this.event = response.data;
          })
          .catch(e => {
            this.message = e.response.data.message;
          });
      },
      updateEvent() {
        EventServices.update(this.id, this.event)
          .then(() => {
            this.message = 'The Event was updated successfully!';
          })
          .catch(e => {
            this.message = e.response.data.message;
          });
          this.$router.go(-1);
      },
      cancel() {
        this.$router.go(-1);
      }
    }
  };
  </script>