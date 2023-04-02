<template>
    <div v-if="user != null">
      <div class=" align-center flex-column">
        <v-img src="../assets/piano-2.jpg" max-height="150" />
        <div class="my-8"></div>
        <v-card class="pa-md-4 mx-auto" max-width="800">
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar id = "dark_grey" size = 150 class="mt-2 mb-2">
                <span class="accent--text font-weight-bold text-h3">{{ initials }}</span>
              </v-avatar>
              <div class="my-8"></div>
    
              <h3 class="text-h4">{{ name}}</h3>
              <p class="text-subtitle-1 mt-1">
                {{user.email}}
              </p>
              <div v-if="user != null && role != null">
              <p class="text-subtitle-1 mt-1">
                Student ID: {{ role.studentId }}
              </p>
              <!-- <p class="text-subtitle-1 mt-1">
                Classification: {{ role.studentClassification }}
              </p>
              <p class="text-subtitle-1 mt-1">
                Semester: {{ role.studentSemseter }}
              </p>
              <p class="text-subtitle-1 mt-1" >
                Major:{{ role.studentMajor }} 
              </p>
              <div v-if="user.studentInstrument != null">
              <p class="text-subtitle-1 mt-1">
                Instrument: {{ user.studentInstrument }}
              </p>
              </div>
              <div v-if="user.studentVocalType != null">
              <p class="text-subtitle-1 mt-1">
                Vocalist Type: {{ user.studentVocalType }}
              </p>
              </div>
              <p class="text-subtitle-1 mt-1">
                Level: {{ role.studentLevel }}
              </p> -->
              </div>
              <!-- <div v-else>
              <p class="text-subtitle-1 mt-1">
                Classification: temp info
              </p>
              <p class="text-subtitle-1 mt-1">
                Semester: temp info
              </p>
              <p class="text-subtitle-1 mt-1" >
                Major: temp info
              </p>
              <p class="text-subtitle-1 mt-1">
                Instrument: temp info
              </p>
              <p class="text-subtitle-1 mt-1">
                Vocalist Type: temp info
              </p>
              <p class="text-subtitle-1 mt-1">
                Level: temp info
              </p>
              </div> -->
              <v-divider class="my-3"></v-divider>
              <v-btn color="primary"  text @click="logout()"> Logout </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </div>
      
    </div>
    
      <div v-else>
        <div class=" align-center flex-column">
        <div class="my-16"></div>
          
        <v-card class="pa-md-4 mx-auto" max-width="400">
          
        <v-btn large color="primary" class="justify-center" :style="{left: '50%', transform:'translateX(-50%)'}" dark exact :to="{ name: 'login' }" text >
          Login
        </v-btn>
    
        </v-card>
      </div>
    
        <!-- <v-table density="compact">
        <tbody>
          <tr>
            <td>jadj</td>
            <td>adasd</td>
          </tr>
        </tbody>
        </v-table> -->
      </div>
    </template>
      <!-- <v-toolbar>
        <v-toolbar-title>Hello!</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title>{{this.message}}</v-toolbar-title>
    </v-toolbar> -->
     <!-- <br /><br /> -->
    
     <script>
    import Utils from "@/config/utils.js";
    import AuthServices from "@/services/authServices";
    import roleServices from "@/services/roleServices";
    
    export default {
      name: "profile-student",
      data: () => ({
        user: {},
        role: {},
        title: "Music Department",
        initials: "",
        name: "",
        firstName: "",
        lastName: "",
        // studentClassification: "",
        // studentSemester: "",
        // studentMajor: "",
        // studentInstrument: "",
        // studentVocalType: "",
        // studentLevel: "",
      }),
      async created() {
        this.resetMenu();
      },
      async mounted() {
        this.resetMenu();
        this.retrieveRole();
      },
      computed: {
        // _link() {
        //     return "/" + this.selectedRoles.toLowerCase() + "Home/" + this.currentPersonRoleID;
        // }
      },
      methods: {
        retrieveRole() {
          roleServices.getRoleForUser(this.user.userId)
          .then((response) => {
            this.role = response.data[0];
            console.log(this.role.id);
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
        },
        resetMenu() {
          this.user = null;
          // ensures that their name gets set properly from store
          this.user = Utils.getStore("user");
          if (this.user != null) {
            this.initials = this.user.fName[0] + this.user.lName[0];
            this.name = this.user.fName + " " + this.user.lName;
          }
        },
        logout() {
          AuthServices.logoutUser(this.user)
            .then((response) => {
              console.log(response);
              Utils.removeItem("user");
              this.$router.push({ name: "login" });
              this.$router.go();
            })
            .catch((error) => {
              console.log("error", error);
            });
        },
      },
    };
    </script>
    
    <style> 
    table { border-collapse:collapse } 
    table td, table th {
      height: 40px; 
    }
    </style>