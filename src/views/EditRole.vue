
<template>
    <div v-if="this.currentRole.roleType == 'Admin'">
      <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
      <v-container>
        <v-toolbar>
          <v-toolbar-title>Edit User</v-toolbar-title>
        </v-toolbar>
        <br />
        <h4>{{ message }}</h4>
        <br />
    <v-form ref="form" v-model="valid" lazy validation>

        <v-text-field
            v-model="user.fName"
            id="fName"
            label="First Name"
            required
        ></v-text-field>
        <v-text-field
            v-model="user.lName"
            id="lName"
            label="Last Name"
            required
        ></v-text-field>
        <v-text-field
            v-model="user.email"
            id="email"
            label="Email"
            required
        ></v-text-field>

             <!-- Show fields for editing faculty -->
    <div v-if="isEditingFaculty">
        <v-select
        v-model="role.facultyType"
            id="facultyType"
            label="Faculty Type"
            required
            :items="[{ text: 'Professor', value: 'Professor' }, { text: 'Instructor', value: 'Instructor' }]"
        ></v-select>
        <v-textarea
            v-model="role.facultyBio"
            id="facultyBio"
            label="FacultyBio"
            rows="2"
            cols="5"
            required
          ></v-textarea>
    </div>

    <!-- Show fields for editing student -->
    <div v-if="isEditingStudent">
      <v-text-field
        v-model="role.studentId"
        id="studentId"
        label="Student ID"
        required
      ></v-text-field>
      <v-select
        v-model="role.studentClassification"
            id="studentClassification"
            label="Student Classification"
            required
            :items="[{ text: 'Freshman', value: 'Freshman' }, 
                    { text: 'Sophomore', value: 'Sophomore' } , 
                    { text: 'Junior', value: 'Junior' },
                    { text: 'Senior', value: 'Senior' },
                    { text: 'Graduate', value: 'Graduate' }
                    ]"
        ></v-select>
      <v-text-field
        v-model="role.studentSemester"
        id="studentSemester"
        label="Student Semester"
        required
      ></v-text-field>
      <v-text-field
        v-model="role.studentMajor"
        id="studentMajor"
        label="Student Major"
        required
      ></v-text-field>
      <v-select
        v-model="role.studentPrivateHours"
            id="studentPrivateHours"
            label="Student Private Hours"
            required
            :items="[{ text: 'None', value: 0 }, 
                    { text: 'One Hour', value: 1 } , 
                    { text: 'Two Hours', value: 2 }
                    ]"
        ></v-select>
      <v-select
        v-model="role.studentLevel"
            id="studentLevel"
            label="Student Level"
            required
            :items="[{ text: 'Level I', value: 1 }, 
                    { text: 'Level II', value: 2 },
                    { text: 'Level III', value: 3 },
                    { text: 'Level IV', value: 4 },
                    { text: 'Level V', value: 5 },
                    { text: 'Level VI', value: 6 },
                    { text: 'Level VII', value: 7 },
                    { text: 'Level VIII', value: 8 }
                    ]"
        ></v-select>
    </div>

    <!-- Show fields for editing Accompanist -->
    <div v-if="isEditingAccompanist">
        <v-select
            v-model="role.isApproved"
            id="isApproved"
            :items="[{ text: 'True', value: true }, { text: 'False', value: false }]"
            label="Approved"
            required
        ></v-select>
    </div>
  
    <div class="d-flex align-center">
            <div class="ml-auto">
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="updateRole()"
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
  
  import RoleServices from "../services/roleServices";
  import UserServices from "../services/userServices";
  import Utils from "@/config/utils.js";

  export default {
    name: "editRole",
    props: ['id'],
    data() {
      return {
        user: {
          fName: '',
          lName: '',
          email: '',
        },
        role: {
          roleType: '',
          facultyType: '',
          facultyBio: '',
          studentId: '',
          studentClassification: '',
          studentSemester: '',
          studentMajor: '',
          studentPrivateHours: null,
          isApproved: '',
          studentLevel: null,
        },
        currentUser:{},
        currentRole:{},
        message: '',
        valid: false
      }
    },
    async created(){
      this.currentUser = Utils.getStore("user");
      await this.retrieveRole();
    },
    computed: {
      isEditingFaculty() {
        return this.role.roleType === "Faculty";
      },
      isEditingStudent() {
        return this.role.roleType === "Student";
      },
      isEditingAccompanist() {
        return this.role.roleType === "Accompanist";
      },
    },
    mounted() {
      this.getRole(this.id);
    },
    methods: {
      async retrieveRole() {
        await RoleServices.getRoleForUser(this.currentUser.userId)
          .then((response) => {
            this.currentRole = response.data[0];
            console.log('current role', this.currentRole)
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
        getRole(id) {
          RoleServices.get(id)
              .then(response => {
                  this.role = response.data;
                  this.role.isApproved = response.data.isApproved;
                  UserServices.get(this.role.userId)
                      .then(response => {
                          this.user = response.data;
                      })
                      .catch(e => {
                          this.message = e.response.data.message;
                      });
              })
              .catch(e => {
                  this.message = e.response.data.message;
              });
      },
      updateRole() {
        RoleServices.update(this.id, this.role)
          .then(() => {
            this.message = 'The Role was updated successfully!';
            UserServices.update(this.role.userId, this.user)
              .catch(e => {
                this.message = e.response.data.message;
              });
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