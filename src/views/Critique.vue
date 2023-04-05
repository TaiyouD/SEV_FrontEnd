<template>
  <div v-if="this.role.roleType != null">
    <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
    <v-container>
      <v-toolbar>
        <v-btn  v-if="role.roleType=='Faculty' || role.facultyType=='Instructor' || role.roleType=='Admin' || (role.roleType == 'Accompanist' && role.facultyType != null)" icon to="/maintaineventsession">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn v-if="role.roleType=='Student' || role.roleType=='Incoming Student' || (role.roleType == 'Accompanist' && role.facultyType == null)" icon to="/maintaineventstudent">
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
        <v-spacer><h4>Event Type: {{event.eventType}} </h4> </v-spacer>
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
          :items-per-page="50"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <div>
              <v-icon small class="mx-4" @click="viewCritique(item)">
                mdi-archive-eye-outline
              </v-icon>
              <v-icon small class="mx-4" @click="deleteCritique(item)">
                mdi-trash-can
              </v-icon>
            </div>
          </template>
          <!-- <template v-slot:[`item.repertoire`]="{ item }">

            <v-icon small class="mx-4" @click="viewRepertoire(item)">
              mdi-book-open-variant
            </v-icon>

          </template> -->
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
      // editedStudent: {
      //   user:{
      //     fName:"",
      //     lName:"",
      //     email:""
      //   },
      //   level:{
      //     levelNumber:""
      //   }
      // }, 
      instrumentRole:[],
      selected: [],
      search: "",
      role:{},
      event:{},
      eventSession:{},
      student:{},
      // instructorRole:[],
      studentRole:[],
      facultyInfo:[],
      facultyUser:[],
      critiques:[],
      critiqueSort:[],
      currentCritique: null,
      currentIndex: -1,
      user: {},
      message: "Search, Delete, or View Critique Information",
      headers: [
        { text: "Faculty Id", value: "facultyInfo.id" },
        { text: "Faculty", value: "facultyUser.fname" + "facultyUser.lname" },
        { text: "Passed", value: "critiques.hasPassed" },
        { text: "Actions", value: "actions", sortable: false }
      ]
    };
  },
  async created() {
    this.user = Utils.getStore("user");
    await this.retrieveRole();
    await this.retrieveThisEventSession();
    // await this.retrieveInstructorInstrumentRoles();
    await this.retrieveCritiquesForEventSession();
    // await this.makeHoursZero();
  },
  methods: {
    async retrieveRole() {
      await RoleServices.getRoleForUser(this.user.userId)
        .then((response) => {
          this.role = response.data[0];
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
        })
        .catch((e) => {
            this.message = e.response.data.message;
        });
    },
    async retrieveThisEvent() {
        await EventServices.get(this.eventSession.eventId)
        .then((response) => {
            this.event = response.data;
        })
        .catch((e) => {
            this.message = e.response.data.message;
        });
    },
    // async retrieveInstructorInstrumentRoles() {
    //   await instrumentRoleServices.getAll()
    //     .then((response) => {
    //       this.instrumentRole = response.data;
    //       console.log('instrumentRole');
    //       console.log(this.instrumentRole[0]);
    //       for(let i = 0; i < this.instrumentRole.length; i++)
    //       {
    //         if (this.instrumentRole[i].privateInstructorId == this.role.id)
    //         {
    //           this.instructorRole.push(this.instrumentRole[i]);
    //         }
    //       }
    //       console.log('instructorRole');
    //       console.log(this.instructorRole);
    //     })
    //     .catch((e) => {
    //       this.message = e.response.data.message;
    //     });
    // },
    async retrieveCritiquesForEventSession() {
      await critiqueServices.getAll()
        .then((response) => {
          this.critiqueSort = response.data;
          console.log('critiqueSort');
          console.log(this.critiqueSort[0]);
          for(let i = 0; i < this.critiqueSort.length; i++)
          {
            if (this.critiqueSort[i].eventSessionId == this.eventSessionId)
            {
              //this.studentRole.push(this.critiqueSort1[i].id);
              this.critiques.push(this.critiqueSort[i].id);
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
          const role = await RoleServices.get(this.critiques.facultyId[i]);
          this.facultyInfo.push(role.data);
        }
        console.log('facultyInfo');
        // var parsedobj = JSON.parse(JSON.stringify(this.studentInfo))
        console.log(this.facultyInfo);
        // console.log(parsedobj);
        await this.retrieveFacultyUser();
    },
    async retrieveFacultyUser() {
      for (let i = 0; i < this.critiques.length; i++) {
          const role = await userServices.get(this.facultyInfo.userId[i]);
          this.facultyUser.push(role.data);
        }
        console.log('facultyUser');
        // var parsedobj = JSON.parse(JSON.stringify(this.studentInfo))
        console.log(this.facultyUser);
    },
    async retrieveStudent() {
        const role = await RoleServices.get(this.critiques.studentId);
        this.student.push(role.data);
        console.log('student');
        // var parsedobj = JSON.parse(JSON.stringify(this.studentInfo))
        console.log(this.student);
        // console.log(parsedobj);
    },
    // async makeHoursZero(){
    //   for (let i = 0; i < this.studentInfo.length; i++) {
    //       const role = await RoleServices.get(this.studentInfo[i].id);
    //       if(role.data.studentPrivateHours == null){
    //         this.studentInfo[i].studentPrivateHours = 0;
    //       }          
    //     }
    // },
    viewCritique(critique) {
      // Set the edited student data to the clicked student
      console.log("critique")
      console.log(critique)
      // this.editedStudent = { ...student };
      // if (student.studentPrivateHours == null)
      // {
      //   this.editedStudent.studentPrivateHours = 0;
      // }
      // Show the edit dialog
      // this.viewDialog = true;
      this.$router.push({ name: "critiqueview", params: { id: critique.id } });
    },
    // editCritique(critique) {
    //   // Set the edited student data to the clicked student
    //   console.log("critique")
    //   console.log(critique)
    //   this.editedStudent = { ...student };
    //   if (student.studentPrivateHours == null)
    //   {
    //     this.editedStudent.studentPrivateHours = 0;
    //   }
    //   Show the edit dialog
    //   this.editDialog = true;
    // },
    // saveStudent() {
    //   RoleServices.update(this.editedStudent.id, this.editedStudent)
    //       .then(() => {
    //         this.message = 'The Student was updated successfully!';
    //       })
    //       .catch(e => {
    //         this.message = e.response.data.message;
    //       });
    //   // Hide the edit dialog
    //   this.editDialog = false;
    //   window.location.reload(); //change
    //   //this.updateStudent(this.editedStudent);
    // },
    // updateStudent(student) {
    // const index = this.studentInfo.findIndex((s) => s.studentId === student.studentId);
    // this.studentInfo.splice(index, 1, student);
    // },
    deleteCritique(critique) {
      critiqueServices.delete(critique.id) //change to delete only instructorId?
        .then(() => {
          this.retrieveCritiquesForEventSession();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    // viewRepertoire(item) {
    //   console.log("here")
    //   console.log(item.id)
    //    this.$router.push({ name: "repertoire", params: { roleId: item.id } });
    //   },
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
</style>