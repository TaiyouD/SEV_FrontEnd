<template>
  <div>
    <v-app-bar app absolute elevate-on-scroll id="navbar-maroon">
      
      <router-link v-if="user == null" :to="{ name: 'login' }">
        <v-img 
          class="mx-2"
          src="../assets/oc-logo.png"
          max-height="50"
          max-width="50"
          contain
        ></v-img>
      </router-link>
      <router-link v-else-if="user != null && (role.roleType == 'Incoming Student')" :to="{ name: 'home' }">
        <v-img 
          class="mx-2"
          src="../assets/oc-logo.png"
          max-height="50"
          max-width="50"
          contain
        ></v-img>
      </router-link>
      <router-link v-else-if="user != null && (role.roleType == 'Student' || (role.roleType == 'Faculty' || (role.roleType == 'Accompanist' && role.facultyType == null)))" :to="{ name: 'homestudent' }">
        <v-img 
          class="mx-2"
          src="../assets/oc-logo.png"
          max-height="50"
          max-width="50"
          contain
        ></v-img>
      </router-link>
      <router-link v-else-if="user != null && (role.roleType == 'Faculty' || (role.roleType == 'Accompanist' && role.facultyType != null))" :to="{ name: 'homefaculty' }">
        <v-img 
          class="mx-2"
          src="../assets/oc-logo.png"
          max-height="50"
          max-width="50"
          contain
        ></v-img>
      </router-link>
      <router-link v-else-if="user != null && (role.roleType == 'Admin')" :to="{ name: 'homeadmin' }">
        <v-img 
          class="mx-2"
          src="../assets/oc-logo.png"
          max-height="50"
          max-width="50"
          contain
        ></v-img>
      </router-link>
      <router-link v-else-if="user != null && (role == null)">
        <v-img 
          class="mx-2"
          src="../assets/oc-logo.png"
          max-height="50"
          max-width="50"
          contain
        ></v-img>
      </router-link>
      <v-toolbar-title class="title">
        <div>{{ this.title }}</div>
      </v-toolbar-title>
      <v-spacer></v-spacer>

    <v-toolbar-items v-if="user != null && (role.roleType == 'Student' || role.roleType == 'Incoming Student')">
      <v-menu offset-y :close-on-click="true">
        <template v-slot:activator="{ on, attrs }">
          <v-btn plain id="navbar-maroon" dark v-bind="attrs" v-on="on" exact :to="{ name: 'signupevents' }">
            Sign Up
          </v-btn>
        </template>
      </v-menu>
      <v-menu offset-y :close-on-click="true" >
        <template v-slot:activator="{ on, attrs }">
          <v-btn plain id="navbar-maroon" dark v-bind="attrs" v-on="on" exact :to="{ name: 'maintaineventstudent' }">
            Events
          </v-btn>
        </template>
        <!-- <v-list>
            <v-list-item exact :to="{ name: 'eventupcoming' }" text>My Upcoming Events</v-list-item>
            <v-divider></v-divider>
            <v-list-item exact :to="{ name: 'eventpast' }" text>My Past Events</v-list-item>
        </v-list> -->
      </v-menu>
    </v-toolbar-items>   
      <!-- <v-menu offset-y :close-on-click="true" >
        <template v-slot:activator="{ on, attrs }">
          <v-btn plain id="navbar-maroon" dark v-bind="attrs" v-on="on" exact :to="{ name: 'eventupcoming' }" >
            Upcoming Events
          </v-btn>
        </template>
      </v-menu> 
      <v-menu offset-y :close-on-click="true" >
        <template v-slot:activator="{ on, attrs }">
          <v-btn plain id="navbar-maroon" dark v-bind="attrs" v-on="on" exact :to="{ name: 'eventevaluation' }" >
            Current Events
          </v-btn>
        </template>
      </v-menu>
      <v-menu offset-y :close-on-click="true" >
        <template v-slot:activator="{ on, attrs }">
          <v-btn plain id="navbar-maroon" dark v-bind="attrs" v-on="on" exact :to="{ name: 'eventpast' }" >
            Past Events
          </v-btn>
        </template>
      </v-menu> -->
      <v-toolbar-items v-if="user != null && (role.facultyType == 'Instructor')">
        <v-menu offset-y :close-on-click="true" >
          <template v-slot:activator="{ on, attrs }">
            <v-btn plain id="navbar-maroon" dark v-bind="attrs" v-on="on" exact :to="{ name: 'maintainevent' }">
              Events
            </v-btn>
          </template>
        </v-menu>
      <v-menu offset-y :close-on-click="true">
        <template v-slot:activator="{ on, attrs }">
          <v-btn plain id="navbar-maroon" dark v-bind="attrs" v-on="on" exact :to="{ name: 'viewstudents' }" >
            View Students
          </v-btn>
        </template>
      </v-menu>
    </v-toolbar-items>
    <v-toolbar-items v-if="user != null && (role.roleType == 'Admin')" >
<!--       
      <v-menu offset-y :close-on-click="true" >
        <template v-slot:activator="{ on, attrs }">
          <v-btn plain id="navbar-maroon" v-bind="attrs" v-on="on" 
          exact :to="{ name: 'maintainevent' }" text>
            Events
          </v-btn>
        </template>
      </v-menu> -->
      <v-menu offset-y :close-on-click="true" >
        <template v-slot:activator="{ on, attrs }">
          <v-btn plain  dark v-bind="attrs" v-on="on" 
          exact :to="{ name: 'maintain' }" text>
            Maintain 
          </v-btn>
          <span>&nbsp;</span>
        </template>
      </v-menu>

    </v-toolbar-items>
        
    <div v-if="user != null">
      <v-menu bottom min-width="200" rounded offset-y v-if="user != null">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon x-large v-on="on" v-bind="attrs">
            <v-avatar v-if="user != null" color="secondary">
              <span class="accent--text font-weight-bold">{{ initials }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar color="secondary" class="mt-2 mb-2">
                <span class="accent--text font-weight-bold">{{
                  initials
                }}</span>
              </v-avatar>
              <h3>{{ name }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-list dense nav>
                <div v-if="(role.roleType == 'Student') || (role.roleType == 'Accompanist' && role.facultyType == null)">
                <v-list-item link @click="$router.push({ path:'/profilestudent' })">
                  <v-list-item-icon>
                    <v-icon>mdi-account-box</v-icon>
                  </v-list-item-icon>
                
                  <v-list-item-content>
                    <v-list-item-title>Profile</v-list-item-title>
                  </v-list-item-content>

                </v-list-item>
                </div>
                <div v-else-if="role.roleType == 'Incoming Student'">
                <v-list-item link @click="$router.push({ path:'/profileincomingstudent' })">
                  <v-list-item-icon>
                    <v-icon>mdi-account-box</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>Profile</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                </div>
                <div v-else-if="role.roleType == 'Faculty' || 'Admin' || (role.roleType == 'Accompanist' && role.facultyType != null)">
                <v-list-item link @click="$router.push({ path:'/profilefaculty' })">
                  <v-list-item-icon>
                    <v-icon>mdi-account-box</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>Profile</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                </div>
                <!-- <div v-else-if="role.roleType == 'Accompanist' && role.facultyType == null">
                <v-list-item link @click="$router.push({ path:'/profilestudent' })">
                  <v-list-item-icon>
                    <v-icon>mdi-account-box</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>Profile</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                </div> -->
                <!-- <div v-else-if="role.roleType == 'Accompanist' && role.facultyType != null">
                <v-list-item link @click="$router.push({ path:'/profilefaculty' })">
                  <v-list-item-icon>
                    <v-icon>mdi-account-box</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>Profile</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                </div> -->
              </v-list>
              <v-divider class="my-2"></v-divider>
              <v-btn depressed rounded text @click="logout()"> Logout </v-btn>
            </div>
          </v-list-item-content>
        </v-card> 
      </v-menu>
    </div>
    <div else>
      <v-menu bottom min-width="200" rounded offset-y v-if="user == null">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon x-large v-on="on" v-bind="attrs">
            <v-avatar v-if="user == null">
              <v-icon color ="secondary">
                {{ icons.mdiAccountCircle }}
              </v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <!-- <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-btn depressed rounded exact :to="{ name: 'login' }" text> Login </v-btn>
            </div>
          </v-list-item-content>
        </v-card>  -->
      </v-menu>
    </div>
    
      <v-icon v-if="user != null" large rge @click.stop="drawer = !drawer" id="navbar-maroon">{{ icons.mdiDotsVertical }}</v-icon>
    </v-app-bar>
    
    <v-navigation-drawer app v-if="user != null " v-model="drawer" temporary right>
      <v-list-item v-if="(role.roleType == 'Student') || (role.roleType == 'Accompanist' && role.facultyType == null)">
        <v-list-item-content>
          <v-list-item-subtitle>My Info</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list dense nav v-if="(role.roleType == 'Student') || (role.roleType == 'Accompanist' && role.facultyType == null)">
        <v-list-item link @click="$router.push({ path: '/repertoire' })">
          <v-list-item-icon>
            <v-icon>mdi-music-box-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>My Repertoire</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>


      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle>Resources</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      
      <v-list dense nav>
        <v-list-item v-if="role.roleType != 'Admin'" link @click="$router.push({ path: '/maintainlevel' })">
          <v-list-item-icon>
            <v-icon>mdi-receipt</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Vocal Level Info</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="role.roleType == 'Admin' || role.roleType == 'Faculty' " link @click="$router.push({ path: '/notificationlist' })">
          <v-list-item-icon>
            <v-icon>mdi-bell-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Notifications</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="$router.push({ path: '/repertoire' })">
          <v-list-item-icon>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Setting</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-list-item v-for="item in navitems2" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
      </v-list>
    </v-navigation-drawer>
  </div>
  
</template>
<!-- roletypes = Accompanist, Admin, Faculty, Incoming Student, Student -->
<script>
import Utils from "@/config/utils.js";
import AuthServices from "@/services/authServices";
import roleServices from "@/services/roleServices";

import {
    mdiAccountCircle,
    mdiPencil,
    mdiShareVariant,
    mdiDelete,
    mdiAccountCogOutline,
    mdiApps,
    mdiDotsVertical,
  } from '@mdi/js'

export default {
  name: "menu-bar",
  data: () => ({
    drawer: false,
    icons: {
        mdiAccountCircle,
        mdiPencil,
        mdiShareVariant,
        mdiDelete,
        mdiAccountCogOutline,
        mdiApps,
        mdiDotsVertical,
      },
    navitems1: [
      { title: 'My Repertoire', icon: 'mdi-music-box-outline', route:'/repertoire'},
    ],
    navitems2: [
      { title: 'Vocal Level Info', icon: 'mdi-receipt' },
      { title: 'Settings', icon: 'mdi-cog' },
    ],
    user: {},
    role: {},
    title: "Music Department",
    initials: "",
    name: "",
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
        console.log("role: " + this.role.roleType);
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
