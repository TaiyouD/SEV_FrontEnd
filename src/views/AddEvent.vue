
<template>
    <div>
      <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
      <v-container>
        <v-toolbar>
          <v-toolbar-title>Create Event</v-toolbar-title>
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
          <v-row>
          <v-col cols="4">
            <v-menu
              v-model="datePicker"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="event.date"
                  id="date"
                  label="Date"
                  required
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="event.date" @input="datePicker = false" class="custom-picker-add"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="4">
            <v-menu
              v-model="startTimePicker"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="event.startTime"
                  id="startTime"
                  label="Start Time"
                  required
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-model="event.startTime"
                format="ampm"
                @input="startTimePicker = false"
                class="custom-picker-add"
              ></v-time-picker>
            </v-menu>
          </v-col>
          <v-col cols="4">
            <v-menu
              v-model="endTimePicker"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="event.endTime"
                  id="endTime"
                  label="End Time"
                  required
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-model="event.endTime"
                format="ampm"
                @input="endTimePicker = false"
                class="custom-picker-add"
              ></v-time-picker>
            </v-menu>
          </v-col>
        </v-row>
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
                @click="saveEvent()"
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
    name: "addevent",
    data() {
      return {
        valid: false,
        event: {
          eventType: '',
          date: '',
          startTime: '',
          endTime: '',
          duration: '',
          isReady: false
        },
        message: "Enter Data and Click Save.",
      };
    },
    methods: {
      saveEvent() {
        var data = {
          eventType: this.event.eventType,
          date: this.event.date,
          startTime: this.event.startTime,
          endTime: this.event.endTime,
          duration: this.event.duration,
          isReady: this.event.isReady
        };
        EventServices.create(data)
          .then((response) => {
            this.event.id = response.data.id;
            console.log("add " + response.data);
            this.$router.go(-1);
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      cancel() {
        this.$router.go(-1);
      },
    },
  };
</script>
  
<style>
.alertMessage {
  color: red;
}

.custom-picker-add {
height: 405px;
width: 369.8px;
}
</style>