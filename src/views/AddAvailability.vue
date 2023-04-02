<template>
    <div>
      <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
      <v-container>
        <v-toolbar class = "mb-12">
          <v-toolbar-title>Add Availability</v-toolbar-title>
        </v-toolbar>

        <!-- <v-card
          class="mx-auto center"
          max-width="800"
        >
          <v-card-text>
            <h3 class="mb-6 text--primary">{{ message }}</h3>
            <v-form ref="form" v-model="valid" lazy validation>

              <v-text-field class=" mt-4" 
                  
                  label="Name"
                  return-object
                  filled
                  disabled
                  append-icon="mdi-account-box-outline"
                >{{ name }}
              </v-text-field>
        


            <div style="text-align: center;">
              <div class=" mt-4 d-flex flex-row bg-surface-variant" max-width = "780" >

                 
                <v-text-field class=" mr-4" width = "260"
                  
                  label="Event Date"
                  return-object
  
                  filled
                  disabled
                  append-icon="mdi-calendar-today"
                ></v-text-field >

                
                <v-text-field class=" mr-4" width = "260"
                  label="Event Type"
                  return-object
                  single-line
                  filled
                  disabled
                  append-icon="mdi-instrument-triangle"
                ></v-text-field>

               
                 :item-text="item => `${events.startTime} ${events.endTime}`" 
                <v-text-field width = "260"
                  label="Event Duration"
                  return-object
                  single-line
                  filled
                  disabled
                  append-icon="mdi-timer-sand"
                ></v-text-field>     
                </div>
            </div>
            <div style="text-align: center;">
              <div class=" mt-4 d-flex flex-row bg-surface-variant" max-width = "780" >
                
                v-model="availability.startTime"
                  id="startTime" 
                <v-select class=" mr-4" width = "260"
                  
                  label="Available Start Time"
                  return-object
                  single-line
                  filled
                  append-icon="mdi-clock-in"
                ></v-select>

               
               :item-text="item => `${events.startTime} ${events.endTime}`"
                v-model="availability.endTime"
                  id="endTime" 
                <v-select width = "260"
                  
                  label="Available End Time"
                  return-object
                  single-line
                  filled
                  append-icon="mdi-clock-out"
                ></v-select>     
                </div>
            </div>
          </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
            :disabled="!valid"
            color="success"
            class="ma-2"
            @click="saveAvailability()"
            >
              Save
            </v-btn>
      
            <v-btn color="error" class="ma-2" @click="cancel()"> Cancel </v-btn>
          </v-card-actions>
        </v-card> -->
        <v-dialog
          v-model="delete_dialog"
          persistent
          max-width="800"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              color="grey"
              dark
              v-bind="attrs"
              v-on="on"
              small 
              class="mx-4"
            >
            mdi-calendar-plus-outline
            </v-icon>
          </template>
          <v-card>
            <v-card-title>
              <v-toolbar id="navbar-maroon">
              <span class="text-h5">Add Availability</span>
              </v-toolbar>
            </v-card-title>
            <v-card-text>
                <h3 class="mt-2 ">{{ message }}</h3>
                <v-form ref="form" v-model="valid" lazy validation>

                  <v-text-field class=" mt-2" 
                      
                      label="Name"
                      return-object
                      filled
                      disabled
                      append-icon="mdi-account-box-outline"
                    >{{ name }}
                  </v-text-field>
            


                <div style="text-align: center;">
                  <div class=" mt-2 d-flex flex-row bg-surface-variant" max-width = "780" >

                      <!-- Date Below -->
                    <v-text-field class=" mr-4" width = "260"
                      
                      label="Event Date"
                      return-object
      
                      filled
                      disabled
                      append-icon="mdi-calendar-today"
                    ></v-text-field >

                    <!--  Event Type Below -->
                    <v-text-field class=" mr-4" width = "260"
                      label="Event Type"
                      return-object
                      single-line
                      filled
                      disabled
                      append-icon="mdi-instrument-triangle"
                    ></v-text-field>

                    <!--Event Time Slot-->
                    <!-- :item-text="item => `${events.startTime} ${events.endTime}`" -->
                    <v-text-field width = "260"
                      label="Event Duration"
                      return-object
                      single-line
                      filled
                      disabled
                      append-icon="mdi-timer-sand"
                    ></v-text-field>     
                    </div>
                </div>
                <div style="text-align: center;">
                  <div class=" mt-2 d-flex flex-row bg-surface-variant" max-width = "780" >
                    <!--  Event Type Below -->
                    <!-- v-model="availability.startTime"
                      id="startTime" -->
                    <v-select class=" mr-4" width = "260"
                      
                      label="Available Start Time"
                      return-object
                      single-line
                      filled
                      append-icon="mdi-clock-in"
                    ></v-select>

                    <!--Event Time Slot-->
                    <!-- :item-text="item => `${events.startTime} ${events.endTime}`" -->
                    <!-- v-model="availability.endTime"
                      id="endTime" -->
                    <v-select width = "260"
                      
                      label="Available End Time"
                      return-object
                      single-line
                      filled
                      append-icon="mdi-clock-out"
                    ></v-select>     
                    </div>
                </div>
              </v-form>
              </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                @click="addAvailability()"
              >
                Save
              </v-btn>
              <v-btn
                color="primary"
                @click=" delete_dialog = false"
              >
                Cancel
              </v-btn>
            
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </div>
    </template>
    
    <script>
    import EventServices from "../services/eventServices";
    import AvailabilityServices from "../services/availabilityServices";
    import Utils from "@/config/utils.js";
    import roleServices from "../services/roleServices";

    export default {
    name: "add-availability",
    // props: ["eventId"],
    data() {
      return {
        valid: true,
        loading: false,
        search: null,
        select: null,
     
        message: "Enter data and click save",
        events: [],
        user:{},
        role:{},
        name: "",
        initials: "",
        test_startTime: [],
        test_EndTime: [],
        event_duration: "",
        times: [],
        delete_dialog: false,
      };
    },
    mounted() {
      this.user = Utils.getStore("user");
    },
    // async created(){
    //   //const result = await EventServices.get("eventId");
    //   const result = await EventServices.get(this.event.id);
    //   this.event = result.data;
    //   await this.retrieveRole();
    // },
    methods: {
      resetMenu() {
        this.user = null;
        // ensures that their name gets set properly from store
        this.user = Utils.getStore("user");
        if (this.user != null) {
          this.initials = this.user.fName[0] + this.user.lName[0];
          this.name = this.user.fName + " " + this.user.lName;
        }
      }, 
      async retrieveEvents() {
        await EventServices.getAll()
          .then((response) => {
            this.events = response.data;
            this.event_durations = this.events.startTime + " - " + this.events.endTime;
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      async retrieveRole() {
        await roleServices.getRoleForUser(this.user.userId)
        .then((response) => {
          this.role = response.data[0];
          console.log(this.role);
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
      },
      saveAvailability() {
        var data = {
          facultyId: this.role.id,
          accompanistId: this.role.id,
          eventId: this.event.id,
          startTime: this.availability.startTime,
          endTime: this.availability.endTime
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