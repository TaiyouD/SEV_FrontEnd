
<template>
    <div v-if="this.currentRole.roleType = 'Admin'">
      <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
      <v-container>
        <v-toolbar>
          <v-toolbar-title>Add User</v-toolbar-title>
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

        <div>
        <v-select
        v-model="role.roleType"
            id="roleType"
            label="Role Type"
            required
            :items="[{ text: 'Accompanist', value: 'Accompanist' }, 
                    { text: 'Admin', value: 'Admin' },
                    { text: 'Faculty', value: 'Faculty' },
                    { text: 'Prospective Student', value: 'Prospective Student' },
                    { text: 'Student', value: 'Student' }
                    ]"
        ></v-select>
        </div>

             <!-- Show fields for adding faculty -->
    <div v-if="addFaculty">
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

    <!-- Show fields for adding student -->
    <div v-if="addStudent">
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

    <!-- Show fields for adding Accompanist -->
    <div v-if="addAccompanist">
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
                @click="saveUserAndRole"
              >
                Save
              </v-btn>

                <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
              </div>
            </div>
            <br>
        </v-form>
      </v-container>
    </div>
  </template>

  <script>
  import RoleServices from "../services/roleServices";
  import Utils from "@/config/utils.js";
  import UserServices from "../services/userServices";
  
  export default {
    name: "addRole",
    data() {
      return {
        valid: false,
        user: {
          id: null,
          fName: '',
          lName: '',
          email: '',
        },
        role: {
          id: null,
          roleType: '',
          facultyType: null,
          facultyBio: '',
          studentId: null,
          studentClassification: null,
          studentSemester: null,
          studentMajor: '',
          studentPrivateHours: null,
          isApproved: null,
          studentLevel: null
        },
        currentUser:{},
        currentRole:{},
        message: "Enter Data and Click Save.",
      }
    },
    mounted() {
    this.currentUser = Utils.getStore("user");
    },
    async created(){
      await this.retrieveRole();
    },
    computed: {
      addFaculty() {
        return this.role.roleType === "Faculty";
      },
      addStudent() {
        return this.role.roleType === "Student";
      },
      addAccompanist() {
        return this.role.roleType === "Accompanist";
      },
    },
    methods: {
      async retrieveRole() {
        await RoleServices.getRoleForUser(this.user.currentUser)
          .then((response) => {
            this.currentRole = response.data[0];
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
    async saveUserAndRole() {
      await this.saveUser();
      await this.saveRole();
    },
    async saveUser() {
        var userData = {
            fName: this.user.fName,
            lName: this.user.lName,
            email: this.user.email,
        };
        await UserServices.create(userData)
            .then((response) => {
            this.user.id = response.data.id;
            })
            .catch((e) => {
            this.message = e.response.data.message;
         });
    },
    async saveRole() {
        var roleData = {
            roleType: this.role.roleType,
            facultyType: this.role.facultyType,
            facultyBio: this.role.facultyBio,
            studentId: this.role.studentId,
            studentClassification: this.role.studentClassification,
            studentSemester: this.role.studentSemester,
            studentMajor: this.role.studentMajor,
            studentPrivateHours: this.role.studentPrivateHours,
            isApproved: this.role.isApproved,
            studentLevel: this.role.studentLevel,
            userId: this.user.id
        }; 
        await RoleServices.create(roleData)
        .then((response) => {
            this.role.id = response.data.id;
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