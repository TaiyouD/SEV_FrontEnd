<template>
    <div v-if="this.role.roleType == 'Admin'">
      <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
      <v-container>
        <v-toolbar>
          <v-toolbar-title>Create Event</v-toolbar-title>
        </v-toolbar>
        <br />
        <h4>{{ message }}</h4>
        <br />
        <v-form ref="form" v-model="valid" lazy validation>
            <v-text-field
            v-model="event.eventTitle"
            id="eventTitle"
            label="Event Title"
          ></v-text-field>
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
              <v-date-picker v-model="event.date" class="custom-picker-add"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="4">
            <v-menu
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
                class="custom-picker-add"
                :minutes-step="5"
                :allowed-minutes="[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]"
              ></v-time-picker>
            </v-menu>
          </v-col>
          <v-col cols="4">
            <v-menu
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
                class="custom-picker-add"
                :minutes-step="5"
                :allowed-minutes="[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]"
              ></v-time-picker>
            </v-menu>
          </v-col>
        </v-row>
          <v-select
            v-model="event.duration"
            id="duration"
            :items="[{ text: ' Unknown', value: '0' },
                     { text: '5 Minutes', value: '5' },
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
  import RoleServices from "../services/roleServices";
  import Utils from "@/config/utils.js";

  export default {
    name: "addevent",
    data() {
      return {
        valid: false,
        event: {
          eventTitle: '',
          eventType: '',
          date: '',
          startTime: '',
          endTime: '',
          duration: '',
          isReady: false
        },
        user:{},
        role:{},
        message: "Enter Data and Click Save.",
      };
    },
    watch: {
      'event.eventType'(newEventType) {
        if (newEventType === 'Recital') {
          this.event.duration = '5';
        }
        else if (newEventType === 'Jury') {
          this.event.duration = '0';
        }
      }
    },
    async created(){
      this.user = Utils.getStore("user");
      await this.retrieveRole();
    },
    methods: {
      async retrieveRole() {
      await RoleServices.getRoleForUser(this.user.userId)
        .then((response) => {
          this.role = response.data[0];
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
      saveEvent() {
        var data = {
          eventTitle: this.event.eventTitle,
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
height: 415px;
width: 369.8px;
}
</style>