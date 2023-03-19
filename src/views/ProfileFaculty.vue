<template>
    <div v-if="user != null">
      <div class=" align-center flex-column">
        <v-img src="../assets/piano-2.jpg" max-height="150" />
        <div class="my-8"></div>
        <v-card class="pa-md-4 mx-auto" max-width="800">
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar id = "dark_grey"  size = 150 class="mt-2 mb-2">
                <span class="accent--text font-weight-bold text-h3"> {{ initials }}</span>
              </v-avatar>
              <div class="my-8"></div>
    
              <h3 class="text-h4">{{ name}}</h3>
            <p class="text-subtitle-1 mt-1">
                {{user.email}}
              </p> 
              <div v-if="user != null && user.facultyType != null">
              <p class="text-subtitle-1 mt-1">
                Faculty Type: {{ user.facultyType }}
              </p>
              <div v-if="isActive != false">
                <!-- placeholder={{ user.facultyBio }} -->
                    <v-container fluid>
                    <v-textarea
                    clearable
                    
                    clear-icon="mdi-close-circle"
                    label="Bio"
                    v-model="message"
                    
                    ></v-textarea>
                </v-container>
                </div>
                <div v-else>
                <p class="text-subtitle-1 mt-1">
                Bio: 
                <!-- {{ user.facultyBio }} -->
                </p>
                </div>
              </div>
              <div v-else>
                <p class="text-subtitle-1 mt-1">
                Faculty Type: temp info
              </p>
              <div v-if="isActive != false">
                <!-- placeholder={{ user.facultyBio }} -->
                    <v-container fluid>
                    <v-textarea
                    clearable
                    
                    clear-icon="mdi-close-circle"
                    label="Bio"
                    v-model="message"
                    
                    ></v-textarea>
                </v-container>
                </div>
                <div v-else>
              <p class="text-subtitle-1 mt-1">
                Bio: A paragraph is defined as “a group of sentences or a single sentence that forms a unit” 
                (Lunsford and Connors 116). Length and appearance do not determine whether a section in a paper is a paragraph. For instance, 
                in some styles of writing, particularly journalistic styles, a paragraph can be just one sentence long.
              </p>
                </div>
                
                <v-card-actions>
                    <v-col class="text-right">
                 
                    <v-btn v-if="isActive != false" id="navbar-maroon" class="mr-2" append-icon="mdi-pencil"
                     @click="changeButtonState">
                    Save
                    </v-btn>
                
                    <v-btn class="white--text" append-icon="mdi-pencil"
                    :class="buttonClass" @click="changeButtonState">
                    Edit Bio
                    </v-btn>
                    </v-col>
                </v-card-actions>
                 
              </div>
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
    
    export default {
      name: "profile-faculty",
      data: () => ({
        user: {},
        title: "Music Department",
        initials: "",
        name: "",
        firstName: "",
        lastName: "",
        facultyType: "",
        facultyBio: "",
        accompanistType: "",
        message: "",
        isActive: false,
        buttonState: 1,
      }),
      async created() {
        this.resetMenu();
      },
      async mounted() {
        this.resetMenu();
      },
      computed: {
        buttonClass() {
        let returnClass = ''
        switch(this.buttonState) {
          case 2:
            returnClass = 'green';
            break;
          default:  // 1
            returnClass = 'primary';
        }
        return returnClass;
      }
        // _link() {
        //     return "/" + this.selectedRoles.toLowerCase() + "Home/" + this.currentPersonRoleID;
        // }
      },
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
        changeButtonState() {
            if (this.buttonState === 2) {
            this.buttonState = 1;
            this.isActive = false;
            }
            else {
            this.buttonState = 2;
            this.isActive = true;
            }
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