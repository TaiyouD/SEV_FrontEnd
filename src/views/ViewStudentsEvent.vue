
<template>
    <div>
      <v-img src="../assets/music-notes-bg1.jpg" max-height="100"/>
      <v-container>
        <v-toolbar>
          <v-btn icon to="/maintainevent">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-toolbar-title>Student View</v-toolbar-title>
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
            {{ "All Students" }}
            <v-icon class="ml-1">mdi-account-group</v-icon>
          </v-card-title>
          <v-card-text>
            <b>{{ message }}</b>
          </v-card-text>
          <v-data-table :headers="headers" :items="student" :search="search" :items-per-page="5" :sort-by="['fName']" :sort-desc="[false]">
            <template #item="{ item }">
              <tr>
                <td>{{ item.fName }}</td>
                <td>{{ item.lName }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.studentId }}</td>
                <td>{{ item.studentClassification }}</td>
                <td>{{ item.studentMajor }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-container>
    </div>
</template>

<script>
  
  import EventSessionServices from "../services/eventSessionServices.js";
  import EventServices from "../services/eventServices.js";
  import RoleServices from "../services/roleServices.js";
  import UserServices from "../services/userServices.js";
  
  export default {
    name: "viewstudentsevent",
    props: ["eventId"],
    data() {
      return {
        search: "",
        student: [],
        event: [],
        message: "Students Available For Event",
        headers: [
          { text: "First Name", value: "fName", sortable: false },
          { text: "Last Name", value: "lName", sortable: false },
          { text: "Email", value: "email", sortable: false },
          { text: "I.D. Number", value: "studentId", sortable: false },
          { text: "Classification", value: "studentClassification", sortable: false },
          { text: "Major", value: "studentMajor", sortable: false },
        ],
      };
    },
    mounted() {
      this.retrieveThisEvent();
      this.retrieveEventSession();
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
    retrieveEventSession() {
        EventSessionServices.getAll()
          .then((response) => {
            const student = response.data;
            const promises = student.map(stu => {
              const roleId = stu.studentId;
              return RoleServices.get(roleId)
                .then((roleResponse) => {
                  const role = roleResponse.data;
                  return UserServices.get(role.userId)
                    .then((userResponse) => {
                      stu.studentId = role.studentId;
                      stu.studentClassification = role.studentClassification;
                      stu.studentMajor = role.studentMajor;
                      stu.fName = userResponse.data.fName;
                      stu.lName = userResponse.data.lName;
                      stu.email = userResponse.data.email;
                      return stu;
                    });
                });
            });
            Promise.all(promises).then((student) => {
              this.student=[]
              // Filter the students that have the same eventID as the one passed
              this.student = student.filter(stu => stu.eventId === this.eventId);
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
    },
  };
</script>