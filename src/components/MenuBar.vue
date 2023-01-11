<template>
  <div>
    <v-app-bar app>
      <router-link :to="{ name: 'tutorials' }">
        <v-img
          class="mx-2"
          src="../assets/oc-logo-white.png"
          max-height="50"
          max-width="50"
          contain
        ></v-img>
      </router-link>
      <v-toolbar-title class="title">
        <div>{{ this.title }}</div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="user != null">
        <v-btn exact :to="{ name: 'tutorials' }" text> List </v-btn>
        <v-btn exact :to="{ name: 'add' }" text> Add Tutorial </v-btn>
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
    </v-app-bar>
  </div>
</template>

<script>
import Utils from "@/config/utils.js";
import AuthServices from "@/services/authServices";

export default {
  name: "App",
  data: () => ({
    user: {},
    title: "Tutorials",
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
