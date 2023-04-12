
<template>
    <div>
      <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
      <v-container>
        <v-toolbar>
          <v-toolbar-title>Edit Availability</v-toolbar-title>
        </v-toolbar>
        <br />
        <h4>{{ message }}</h4>
        <br />
        <v-form ref="form" v-model="valid" lazy validation>
          <v-row>
          <v-col cols="6">
            <v-menu
              v-model="startTimePicker"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="availability.startTime"
                  id="startTime"
                  label="Start Time"
                  required
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-model="availability.startTime"
                format="ampm"
                class="custom-picker-avail"
                :minutes-step="5"
                :allowed-minutes="[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]"
              ></v-time-picker>
            </v-menu>
          </v-col>
          <v-col cols="6">
            <v-menu
              v-model="endTimePicker"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="availability.endTime"
                  id="endTime"
                  label="End Time"
                  required
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-model="availability.endTime"
                format="ampm"
                class="custom-picker-avail"
                :minutes-step="5"
                :allowed-minutes="[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]"
              ></v-time-picker>
            </v-menu>
          </v-col>
        </v-row>
  
          <div class="d-flex align-center">
            <div class="ml-auto">
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="updateAvailability()"
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
  
  import AvailabilityServices from "../services/availabilityServices";
  
  export default {
    name: "editavailability",
    props: ['id'],
  data() {
    return {
      availability: {
        startTime: '',
        endTime: ''
      },
      message: '',
      valid: false
    }
  },
  mounted() {
    this.getAvailability(this.id);
  },
  methods: {
      getAvailability(id) {
        AvailabilityServices.get(id)
          .then(response => {
            this.availability = response.data;
          })
          .catch(e => {
            this.message = e.response.data.message;
          });
      },
      updateAvailability() {
        AvailabilityServices.update(this.id, this.availability)
          .then(() => {
            this.message = 'The Availability was updated successfully!';
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

<style>

.custom-picker-avail {
height: 425px;
width: 567.2px;
}

</style>