<template>
  <div v-if="this.role.roleType != null">
    <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
    <v-container>
      <v-toolbar>
        <router-link class="routerLink" :to="{ name: 'maintaineventsession', params: { eventId: event.id } }">
        <v-btn  v-if="role.roleType=='Faculty' || role.facultyType=='Instructor' || role.roleType=='Admin'" icon>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        </router-link>
        <v-btn v-if="role.roleType=='Student' || role.roleType=='Incoming Student'" icon to="/maintaineventstudent">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>View Critiques</v-toolbar-title>
        <!-- <v-spacer></v-spacer>
        <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
      </v-toolbar>
      <br />
      <div class="line"></div>
      
        <br>
      <div style="display: flex; justify-content: space-between; text-align: center;">
        <v-spacer><h4>Event Title: {{event.eventTitle}} </h4> </v-spacer>
        <v-spacer><h4>Student: {{studentRole[0].user.fName}} {{studentRole[0].user.lName}} </h4> </v-spacer>
        <v-spacer><h4>Date: {{event.date}} </h4> </v-spacer>
        <v-spacer><h4>Time: {{ eventSession.startTime }} - {{eventSession.endTime}}</h4> </v-spacer>
      </div>
      <br>
      <div class="line"></div>
      <br>

      <v-card>
        <v-card-title>
          Critiques
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <!-- <v-card-text>
          <b>{{ message }}</b>
        </v-card-text> -->
        <v-data-table 
          :headers="headers"
          :search="search"
          :items="critiques"
          :items-per-page="10"
        >
        <template v-slot:[`item.facultyInfo.fName`]="{ item }">
          {{ item.facultyInfo.user.fName }} {{ item.facultyInfo.user.lName }}
        </template>
          <template v-slot:[`item.view`]="{ item }">
              <v-icon color="primary" class="mx-1" @click="viewCritique(item)">
                mdi-archive-eye-outline
              </v-icon>
          </template>
          <template v-if="role.roleType == isAdmin" v-slot:[`item.delete`]="{ item }">

            <v-icon color="primary" class="mx-4" @click="deleteCritique(item)">
                mdi-trash-can-outline
            </v-icon>

          </template>
        </v-data-table>
      </v-card>
      <!-- <br>
      <router-link to="/addcritique"> 
        <v-btn color="primary" class="mr-4">
            Add Critique
        </v-btn>
        </router-link> -->

  
    </v-container>
  </div>
</template>

<script>
import Utils from "@/config/utils.js";
import RoleServices from "../services/roleServices";
import userServices from "../services/userServices";
import critiqueServices from "../services/critiqueServices";
import EventSessionServices from "../services/eventSessionServices";
import EventServices from "../services/eventServices";
export default {
  name: "critique-list",
  props: ["eventSessionId"],
  data() {
    return {
      viewDialog: false, 
      view_critique_jury_dialog: false,
      view_critique_recital_dialog: false,
      isAdmin: false,
      testeventSessionId: 1,
      instrumentRole:[],
      selected: [],
      search: "",
      role:{},
      event:{},
      eventSession:{},
      student:{},
      studentRole:[],
      studentName: '',
      facultyInfo:[],
      facultyUser:[],
      critiques:[],
      critiqueSort:[],
      currentCritique: null,
      currentIndex: -1,
      user: {},
      message: "Search, Delete, or View Critique Information",
      headers: [
        { text: "Faculty First Name", value: "facultyInfo.user.fName"},
        { text: "Faculty Last Name", value: "facultyInfo.user.lName"},
        { text: "View", value: "view", sortable: false },
       // { text: "Delete", value: "delete", sortable: false }
      ]
    };
  },
  async created() {
    this.user = Utils.getStore("user");
    await this.retrieveRole();
    console.log('eventSessionId');
    console.log(this.eventSessionId);
    await this.retrieveThisEventSession();
    await this.retrieveCritiquesForEventSession();
  },
  methods: {
    async retrieveRole() {
      await RoleServices.getRoleForUser(this.user.userId)
        .then((response) => {
          for (let i = 0; i < response.data.length; i++){
              if (response.data[i].roleType == this.user.selectedRole) {
                this.role = response.data[i];
              }
            }
          console.log('role');
          console.log(this.role);
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    async retrieveThisEventSession() {
        await EventSessionServices.get(this.eventSessionId)
        .then((response) => {
            this.eventSession = response.data;
            console.log('eventSession');
            console.log(this.eventSession);
        })
        .catch((e) => {
            this.message = e.response.data.message;
        });           
        await this.retrieveThisEvent();
    },
    async retrieveThisEvent() {
        await EventServices.get(this.eventSession.eventId)
        .then((response) => {
            this.event = response.data;
            console.log('event');
            console.log(this.event);
        })
        .catch((e) => {
            this.message = e.response.data.message;
        });
    },
    async retrieveCritiquesForEventSession() {
      await critiqueServices.getAll()
        .then((response) => {
          this.critiqueSort = response.data;
          console.log('critiqueSort');
          console.log(this.critiqueSort);
          for(let i = 0; i < this.critiqueSort.length; i++)
          {
            console.log(this.eventSessionId)
            console.log(this.critiqueSort[i].eventsessionId)
            if (this.critiqueSort[i].eventsessionId == this.eventSessionId)
            {
              this.critiques.push(this.critiqueSort[i]);
            }
          }
          console.log('critiques');
          console.log(this.critiques);
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
      await this.retrieveFacultyInfo();
    },
    async retrieveFacultyInfo() {
      for (let i = 0; i < this.critiques.length; i++) {
          const role = await RoleServices.get(this.critiques[i].facultyId);
          this.facultyInfo.push(role.data);
          this.critiques[i].facultyInfo = role.data; // add facultyInfo property to the critique object
      }
      console.log('facultyInfo');
      console.log(this.facultyInfo);
      await this.retrieveFacultyUser();
      await this.retrieveStudent();
    },
    async retrieveFacultyUser() {
      for (let i = 0; i < this.critiques.length; i++) {
          const role = await userServices.get(this.facultyInfo[i].userId);
          this.facultyUser.push(role.data);
        }
        console.log('facultyUser');
        console.log(this.facultyUser);
    },
    async retrieveStudent() {

          const role = await RoleServices.get(this.eventSession.studentId);
          this.studentRole.push(role.data);
        console.log('student');
        console.log(this.studentRole);
        this.studentName = this.studentRole.user.fname + this.studentRole.user.lname;
    },
    viewCritique(critique) {
      console.log("critique1")
      console.log(critique.id)
      this.$router.push({ name: "critiqueview", params: { critiqueId: critique.id } });
    },

    deleteCritique(critique) {
      critiqueServices.delete(critique.id) //change to delete only instructorId?
        .then(() => {
          this.retrieveCritiquesForEventSession();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    refreshList() {
      this.retrieveCritiquesForEventSession();
      this.currentCritique = null;
      this.currentIndex = -1;
    },
    setActiveCritique(critique, index) {
      this.currentCritique = critique;
      this.currentIndex = critique ? index : -1;
    },
   
  }
};
</script>

<style>
.routerLink{
     text-decoration: none;
 }
</style>