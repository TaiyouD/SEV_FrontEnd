
<template>
    <div>
      <v-img src="../assets/music-notes-bg1.jpg" max-height="100"/>
      <v-container>
        <v-toolbar>
          <v-btn icon to="/maintainevent">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-toolbar-title>Availability View</v-toolbar-title>
          <v-spacer></v-spacer>
            <v-text-field v-model="search" prepend-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        </v-toolbar>
        <br />
        <div class="line"></div>
        <br>
        <div style="display: flex; justify-content: space-between; text-align: center;">
          <v-spacer><h4>Event Title: {{event.eventTitle}} </h4> </v-spacer>
          <v-spacer><h4>Event Type: {{event.eventType}} </h4> </v-spacer>
          <v-spacer><h4>Date: {{event.date}} </h4> </v-spacer>
          <v-spacer><h4>Time: {{convertTime(event.startTime)}} - {{convertTime(event.endTime)}}</h4> </v-spacer>
        </div>
        <br>
        <div class="line"></div>
        <br>
        <v-card>
          <v-card-title>
            {{ "All Availability" }}
            <v-icon class="ml-1">mdi-clock-outline</v-icon>
            <v-spacer></v-spacer>
            <v-btn class="mx-2" color="success" @click="addAvailability(id)">Add Availability</v-btn>
          </v-card-title>
          <v-card-text>
            <b>{{ message }}</b>
          </v-card-text>
          <v-data-table :headers="headers" :items="availability" :search="search" :items-per-page="5" :sort-by="['roleType', 'fName', 'startTime', 'endTime']" :sort-desc="[false, false, false, false]">
            <template #item="{ item }">
              <tr>
                <td>{{ item.roleType }}</td>
                <td>{{ item.fName }}</td>
                <td>{{ item.lName }}</td>
                <td>{{ item.email }}</td>
                <td>{{ convertTime(item.startTime) }}</td>
                <td>{{ convertTime(item.endTime) }}</td>
                <td>
                  <div class="d-flex justify-end">
                    <v-dialog v-model="editDialog" persistent max-width="800" :retain-focus="false">
  
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon color="primary" v-bind="attrs" v-on="on" @click="editAvailability(item)"> mdi-pencil</v-icon>
                      </template>

                      <v-card>
                        <v-card-title>
                          <v-toolbar id="navbar-maroon">
                            <span class="text-h5">Edit Student</span>
                          </v-toolbar>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                          <div style="text-align: center;">
                            <div class="d-flex flex-row bg-surface-variant" max-width = "780">
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
                                      v-model="editedavailability.startTime"
                                      id="startTime"
                                      label="Start Time"
                                      required
                                      readonly
                                      v-bind="attrs"
                                      v-on="on"
                                    ></v-text-field>
                                  </template>
                                  <v-time-picker
                                    v-model="editedavailability.startTime"
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
                                    v-model="editedavailability.endTime"
                                    id="endTime"
                                    label="End Time"
                                    required
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                <v-time-picker
                                  v-model="editedavailability.endTime"
                                  format="ampm"
                                  class="custom-picker-avail"
                                  :minutes-step="5"
                                  :allowed-minutes="[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]"
                                ></v-time-picker>
                              </v-menu>
                            </v-col>
                          </v-row>
                          </div>
                        </div>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                          <v-btn color="primary" class="mx-2" @click="updateAvailability(item)">Save</v-btn>
                          <v-btn color="error" class="mx-2" @click="editDialog = false">Cancel</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-icon color="error" @click="deleteAvailability(item)">mdi-delete</v-icon>
                  </div>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-container>
    </div>
</template>

<script>
  
  import AvailabilityServices from "../services/availabilityServices.js";
  import EventServices from "../services/eventServices.js";
  import RoleServices from "../services/roleServices.js";
  import UserServices from "../services/userServices.js";
  
  export default {
    name: "maintainavailability",
    props: ["eventId"],
    data() {
      return {
        search: "",
        availability: [],
        event: [],
        editDialog: false,
        editedavailability: {
          availability:{
            startTime:"",
            endTime:""
          },
        },
        message: "Add, Edit or Delete Availability",
        headers: [
          { text: "Role", value: "roleType", sortable: false },
          { text: "First Name", value: "fName", sortable: false },
          { text: "Last Name", value: "lName", sortable: false },
          { text: "Email", value: "email", sortable: false },
          { text: "Start Time", value: "startTime", sortable: false },
          { text: "End Time", value: "endTime", sortable: false },
        ],
      };
    },
    mounted() {
      this.retrieveThisEvent();
      this.retrieveAvailability();
    },
    methods: {
      retrieveThisEvent() {
        EventServices.get(this.eventId)
        .then((response) => {
            this.event = response.data;
        })
        .catch((e) => {
            this.message = e.response.data.message;
        });
    },
    retrieveAvailability() {
        AvailabilityServices.getAll()
          .then((response) => {
            const availability = response.data;
            const promises = availability.map(avail => {
              const roleId = avail.facultyId ? avail.facultyId : avail.accompanistId;
              return RoleServices.get(roleId)
                .then((roleResponse) => {
                  const role = roleResponse.data;
                  return UserServices.get(role.userId)
                    .then((userResponse) => {
                      avail.roleType = role.roleType;
                      avail.fName = userResponse.data.fName;
                      avail.lName = userResponse.data.lName;
                      avail.email = userResponse.data.email;
                      return avail;
                    });
                });
            });
            Promise.all(promises).then((availability) => {
              // Filter the availabilities that have the same eventID as the one passed
              this.availability = availability.filter(avail => avail.eventId === this.eventId);
            }).catch((e) => {
              this.message = e.response.data.message;
            });
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      convertTime(time) {
        const date = new Date(`1/1/2000 ${time}`);
        const formattedTime = date.toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'});
        return formattedTime;
      },
      addAvailability() {
        this.$router.push({ name: "addavailability", params: { AvailabilityId: this.id } });
      },
      editAvailability(availability) {
        this.editedavailability = { ...availability };
        this.editDialog = true;
      },
      updateAvailability() {
        AvailabilityServices.update(this.editedavailability.id, this.editedavailability)
          .then(() => {
            this.message = 'The Availability was updated successfully!';
          })
          .catch(e => {
            this.message = e.response.data.message;
          });
          this.editDialog = false;
      },
      deleteAvailability(availability) {
        if (confirm(`Are you sure you want to delete this availability?`)) {
          AvailabilityServices.delete(availability.id)
            .then(() => {
              const index = this.availability.indexOf(availability);
              this.availability.splice(index, 1);
              this.message = `Availability deleted successfully.`;
            })
            .catch((e) => {
              this.message = e.response.data.message;
            });
        }
      },
    },
  };
</script>

<style>

.custom-picker-avail {
height: 465px;
width: 352px;
}

</style>