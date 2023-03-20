<template>
  <div>
    <v-app-bar app absolute id="navbar-maroon">
      <router-link :to="{ name: 'home' }">
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

      <v-toolbar-items v-if="user == null" >
      <v-menu offset-y :close-on-click="true" >
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on" >
            Sign Up
          </v-btn>
        </template>
        <v-list>
          <!-- <v-list-item v-for="index in 4" :key="index">
            <v-list-item-title>Item {{ index }}</v-list-item-title>
          </v-list-item> -->
          <v-list-item exact :to="{ name: 'signupevents' }" text>Event Sign Up</v-list-item>
          <v-divider></v-divider>
          <v-list-item exact :to="{ name: 'missinginfo' }" text>Missing Info</v-list-item>
        </v-list>
      </v-menu>
      <v-menu offset-y :close-on-click="true" >
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on" >
            My Events
          </v-btn>
        </template>
        <v-list>
            <v-list-item exact :to="{ name: 'eventupcoming' }" text>My Upcoming Events</v-list-item>
            <v-divider></v-divider>
            <v-list-item exact :to="{ name: 'eventpast' }" text>My Past Events</v-list-item>
        </v-list>
      </v-menu>
      <v-menu offset-y :close-on-click="true" >
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on" >
            Student Events
          </v-btn>
        </template>
        <v-list>
            <v-list-item exact :to="{ name: 'eventevaluation' }" text>Event Evalution</v-list-item>
            <v-divider></v-divider>
        </v-list>
      </v-menu>
      <v-menu offset-y :close-on-click="true" >
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on" >
            Maintain Roles
          </v-btn>
        </template>
        <v-list>
            <v-list-item exact :to="{ name: 'eventevaluation' }" text>Place Holder</v-list-item>
            <v-divider></v-divider>
            <v-list-item exact :to="{ name: 'eventevaluation' }" text>Place Holder</v-list-item>
        </v-list>
      </v-menu>
      <v-menu offset-y :close-on-click="true" >
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on" >
            Events
          </v-btn>
        </template>
        <v-list>
            <v-list-item exact :to="{ name: 'eventevaluation' }" text> Create Event</v-list-item>
            <v-divider></v-divider>
            <v-list-item exact :to="{ name: 'eventevaluation' }" text>View Events</v-list-item>
            <v-divider></v-divider>
            <v-list-item exact :to="{ name: 'eventevaluation' }" text>Place Holder</v-list-item>
            <v-divider></v-divider>
            <v-list-item exact :to="{ name: 'eventevaluation' }" text>Place Holder</v-list-item>
        </v-list>
      </v-menu>
      </v-toolbar-items>

      <v-menu bottom min-width="200px" rounded offset-y v-if="user != null">
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
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text @click="logout()"> Logout </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
        
      </v-menu>
     
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" id="navbar-maroon"></v-app-bar-nav-icon>

    </v-app-bar>
    
    <v-navigation-drawer app v-model="drawer" temporary right>
      <v-list-item>
        <v-list-item-content>
          <!-- <v-list-item-title class="text-h6"></v-list-item-title> -->
          <v-list-item-subtitle>My Info</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list dense nav>
        <v-list-item v-for="item in navitems1" :key="item.title" link @click="$router.push({ path: item.route})">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle>Resources</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      
      <v-list dense nav>
        <v-list-item v-for="item in navitems2" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
  
</template>

<script>
import Utils from "@/config/utils.js";
import AuthServices from "@/services/authServices";

export default {
  name: "App",
  data: () => ({
    drawer: false,
    navitems1: [
      { title: 'Profile stud', icon: 'mdi-account-box', route:'/profilestudent'},
      { title: 'Profile fac', icon: 'mdi-account-box', route:'/profilefaculty'},
      { title: 'My Repertoire', icon: 'mdi-view-dashboard', route:'/repertoire'},
      { title: 'Maintain Roles', icon: 'mdi-view-dashboard', route:'/maintainrole'},
    ],
    navitems2: [
      { title: 'Settings', icon: 'mdi-cog' },
    ],
    user: {},
    title: "Music Department",
    initials: "",
    name: "",
  }),
  async created() {
    this.resetMenu();
  },
  async mounted() {
    this.resetMenu();
  },
  computed: {
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
  },
};
</script>
