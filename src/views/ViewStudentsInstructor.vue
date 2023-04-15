<template>
    <div v-if="this.role.roleType = 'Faculty'">
      <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
      <v-container>
        <v-toolbar>
          <v-toolbar-title>View Students</v-toolbar-title>
          <!-- <v-spacer></v-spacer>
          <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
        </v-toolbar>
        <br />
  
        <v-card>
          <v-card-title>
            Students
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-card-text>
            <b>{{ message }}</b>
          </v-card-text>
          <v-data-table 
            :headers="headers"
            :search="search"
            :items="studentInfo"
            :items-per-page="50"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <div>
  
                <!-- Dialog for editing a student -->
              <v-dialog v-model="editDialog" persistent max-width="800" :retain-focus="false">
  
                <template v-slot:activator="{ on, attrs }">
                  <!-- <div class="d-flex justify-end"> -->
                  <v-icon color="primary" v-bind="attrs" v-on="on" small class="mx-4" @click="editStudent(item)" >
                  mdi-pencil
                  </v-icon>
                <!-- </div> -->
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
                    <div class="d-flex flex-row bg-surface-variant" max-width = "780" >
  
                      <!-- Name input field -->
                      <v-row>
                        <v-col>
                          <v-text-field class=" mr-4"  width = "380" 
                            v-model="editedStudent.user.fName"
                            label="First Name"
                            disabled
                            append-icon="mdi-account"
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field class=" mr-4"  width = "390" 
                            v-model="editedStudent.user.lName"
                            label="Last Name"
                            disabled
                            append-icon="mdi-account"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      </div></div>
  
                    <div style="text-align: center;">
                    <div class="d-flex flex-row bg-surface-variant" max-width = "780" >
                      <!-- Email input field -->
                      <v-row>
                        <v-col>
                          <v-text-field class=" mr-4"  width = "380" 
                            v-model="editedStudent.user.email"
                            label="Email"
                            disabled
                            append-icon="mdi-email"
                          ></v-text-field>
                        </v-col>
  
                      <!-- Student ID input field -->
                        <v-col>
                          <v-text-field class=" mr-4"  width = "390" 
                            v-model="editedStudent.studentId"
                            label="Student ID"
                            disabled
                            append-icon="mdi-badge-account-horizontal"
                          ></v-text-field>
                        </v-col>
                      </v-row>
  
                      </div></div>
  
  
                    <div style="text-align: center;">
                    <div class="d-flex flex-row bg-surface-variant" max-width = "780" >
  
  
                    <!-- Major input field -->
                      <v-row>
                      <v-col>
                        <v-text-field class=" mr-4" width = "380"
                          v-model="editedStudent.studentMajor"
                          label="Major"
                          disabled
                          append-icon="mdi-school"
                        ></v-text-field>
                      </v-col>
  
  
                      <!-- Classification input field -->
                        <v-col>
                          <v-text-field class=" mr-4" width = "390"
                            v-model="editedStudent.studentClassification"
                            label="Classification"
                            disabled
                            append-icon="mdi-bag-personal"
                          ></v-text-field>
                        </v-col>              
                      </v-row>
  
                      </div></div>
  
                      <div style="text-align: center;">
                      <div class="d-flex flex-row bg-surface-variant" max-width = "780" >
  
                      <!-- Semester input field -->
                      <v-row>
                      <v-col>
                        <v-text-field class=" mr-4" width = "260"
                        v-model="editedStudent.studentSemester"
                        label="Semester"
                        disabled
                        append-icon="mdi-book-open-page-variant"
                        ></v-text-field>
                      </v-col>                    
                      
                        <!-- Level input field -->
                        <v-col>
                          <v-text-field class=" mr-4"  width = "250"
                          v-model="editedStudent.level.levelNumber"
                          label="Level"
                          required
                          append-icon="mdi-signal"
                          ></v-text-field>
                        </v-col>
  
                      <!-- Private hours input field -->
                        <v-col>
                          <v-text-field class="mr-4"  width = "250"
                            v-model="editedStudent.studentPrivateHours"
                            label="Enter Private Lesson Hours"
                            required
                            append-icon="mdi-account-music"
                          ></v-text-field>
                        </v-col>
                      </v-row>
  
                      </div></div>
  
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                   <v-spacer></v-spacer>
                    <v-btn color="primary" class="mx-2" @click="saveStudent(item)">Save</v-btn>
                    <v-btn color="error" class="mx-2" @click="editDialog = false">Cancel</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
  
  
                <v-icon small class="mx-4" @click="deleteStudent(item)">
                  mdi-trash-can
                </v-icon>
              </div>
            </template>
            <template v-slot:[`item.repertoire`]="{ item }">
  
              <v-icon small class="mx-4" @click="viewRepertoire(item)">
                mdi-book-open-variant
              </v-icon>
  
            </template>
          </v-data-table>
        </v-card>
        <br>
        <router-link to="/addpiecerepertoire"> <!--add student page-->
          <v-btn color="primary" class="mr-4">
              Add Student
          </v-btn>
          </router-link>
      </v-container>
    </div>
  </template>
  
  <script>
  import Utils from "@/config/utils.js";
  import RoleServices from "../services/roleServices";
  import instrumentRoleServices from "../services/instrumentRoleServices";
  export default {
    name: "student-list",
    props: [],
    data() {
      return {
        editDialog: false, 
        editedStudent: {
          user:{
            fName:"",
            lName:"",
            email:""
          },
          level:{
            levelNumber:""
          }
        }, 
        instrumentRole:[],
        selected: [],
        search: "",
        role:{},
        // instructorRole:[],
        studentRole:[],
        studentInfo:[],
        currentStudent: null,
        currentIndex: -1,
        user: {},
        message: "Search, Delete, or View Students Information",
        headers: [
          { text: "First Name", value: "user.fName" },
          { text: "Last Name", value: "user.lName" },
          { text: "Email", value: "user.email"},
          { text: "Lessons Hours", value: "studentPrivateHours"},
          { text: "Repertoire", value: "repertoire", sortable: false},
          { text: "Actions", value: "actions", sortable: false }
        ]
      };
    },
    async created() {
      this.user = Utils.getStore("user");
      await this.retrieveRole();
      // await this.retrieveInstructorInstrumentRoles();
      await this.retrieveStudentsforInstructor();
      await this.makeHoursZero();
    },
    methods: {
      async retrieveRole() {
        await RoleServices.getRoleForUser(this.user.userId)
          .then((response) => {
            this.role = response.data[0];
            /*this.roleId2 = this.role.map(function(el) {
                return el.id;});*/
            console.log('role here');
            console.log(this.role);
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
      async retrieveStudentsforInstructor() {
        await instrumentRoleServices.getAll()
          .then((response) => {
            this.instrumentRole = response.data;
            console.log('instrumentRole');
            console.log(this.instrumentRole[0]);
            for(let i = 0; i < this.instrumentRole.length; i++)
            {
              if (this.instrumentRole[i].privateInstructorId == this.role.id)
              {
                this.studentRole.push(this.instrumentRole[i].studentId);
              }
            }
            console.log('studentRole');
            console.log(this.studentRole);
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
        await this.retrieveStudentsInfo();
      },
      async retrieveStudentsInfo() {
        for (let i = 0; i < this.studentRole.length; i++) {
            const role = await RoleServices.get(this.studentRole[i]);
            this.studentInfo.push(role.data);
          }
          console.log('studentInfo');
          // var parsedobj = JSON.parse(JSON.stringify(this.studentInfo))
          console.log(this.studentInfo);
          // console.log(parsedobj);
      },
      async makeHoursZero(){
        for (let i = 0; i < this.studentInfo.length; i++) {
            const role = await RoleServices.get(this.studentInfo[i].id);
            if(role.data.studentPrivateHours == null){
              this.studentInfo[i].studentPrivateHours = 0;
            }          
          }
      },
      editStudent(student) {
        // Set the edited student data to the clicked student
        console.log("student")
        console.log(student)
        this.editedStudent = { ...student };
        if (student.studentPrivateHours == null)
        {
          this.editedStudent.studentPrivateHours = 0;
        }
        // Show the edit dialog
        this.editDialog = true;
      },
      saveStudent() {
        RoleServices.update(this.editedStudent.id, this.editedStudent)
            .then(() => {
              this.message = 'The Student was updated successfully!';
            })
            .catch(e => {
              this.message = e.response.data.message;
            });
        // Hide the edit dialog
        this.editDialog = false;
        window.location.reload(); //change
        //this.updateStudent(this.editedStudent);
      },
      // updateStudent(student) {
      // const index = this.studentInfo.findIndex((s) => s.studentId === student.studentId);
      // this.studentInfo.splice(index, 1, student);
      // },
      deleteStudent(student) {
        instrumentRoleServices.delete(student.id) //change to delete only instructorId?
          .then(() => {
            this.retrieveStudentsInfo();
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      viewRepertoire(item) {
        console.log("here")
        console.log(item.id)
         this.$router.push({ name: "repertoire", params: { roleId: item.id } });
        },
      refreshList() {
        this.retrieveStudentsInfo();
        this.currentIndex = -1;
      },
      setActiveSong(song, index) {
        this.currentStudent = song;
        this.currentIndex = song ? index : -1;
      },
      removeAllStudents() {
        instrumentRoleServices.deleteAll()
          .then((response) => {
            console.log(response.data);
            this.refreshList();
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      }
    }
  };
  </script>
  
  <style>
  </style>