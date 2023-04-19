<template>
    <div v-if="this.role != {} && this.role.roleType != null">
      <v-container>
        <v-toolbar>
          <v-toolbar-title>Hello!</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-title>{{this.message}}</v-toolbar-title>
        </v-toolbar>
        <br /><br />
        <v-card>
          <v-card-title>
            Notifications
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
            :items="notifications"
            :items-per-page="50"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <div>
                <v-icon small class="mx-4" @click="editTutorial(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small class="mx-4" @click="viewTutorial(item)">
                  mdi-format-list-bulleted-type
                </v-icon>
                <v-icon small class="mx-4" @click="deleteTutorial(item)">
                  mdi-trash-can
                </v-icon>
              </div>
            </template>
          </v-data-table>
        </v-card>
      </v-container>
    </div>
  </template>
  
  <script>
  import Utils from "@/config/utils.js";
  import NotificationServices from "../services/notificationServices";
  import RoleServices from "../services/roleServices";
  
  export default {
    name: "notification-list",
    data() {
      return {
        search: "",
        notifications: [],
        currentNotification: null,
        currentIndex: -1,
        title: "",
        user: {},
        role:{},
        message: "Search, View or Delete Notifications",
        headers: [
          { text: "Title", value: "title" },
          { text: "Description", value: "description" },
          { text: "Actions", value: "actions", sortable: false },
        ],
      };
    },

    async created() {
      this.user = Utils.getStore("user");
      await this.retrieveRole();
      await this.retrieveNotifications(); 
    },
    methods: {
      async retrieveRole() {
        // console.log(this.user.userId);
        await RoleServices.getRoleForUser(this.user.userId)
          .then((response) => {
            this.role = response.data[0];
            console.log('Role Id');
            console.log(this.role.id);
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      // editTutorial(tutorial) {
      //   this.$router.push({ name: "edit", params: { id: tutorial.id } });
      // },
      // viewTutorial(tutorial) {
      //   this.$router.push({ name: "view", params: { id: tutorial.id } });
      // },
      // deleteTutorial(tutorial) {
      //   TutorialServices.delete(tutorial.id)
      //     .then(() => {
      //       this.retrieveTutorials();
      //     })
      //     .catch((e) => {
      //       this.message = e.response.data.message;
      //     });
      // },
      async retrieveNotifications() {
        await NotificationServices.getNotificationsForRole(this.role.id)
          .then((response) => {
            this.notifications = response.data;
            console.log(this.notifications)
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      refreshList() {
        this.retrieveNotifications();
        this.currentNotification = null;
        this.currentIndex = -1;
      },
      setActiveNotification(notification, index) {
        this.currentNotification = notification;
        this.currentIndex = notification ? index : -1;
      },
      // removeAllTutorials() {
      //   TutorialServices.deleteAll()
      //     .then((response) => {
      //       console.log(response.data);
      //       this.refreshList();
      //     })
      //     .catch((e) => {
      //       this.message = e.response.data.message;
      //     });
      // },
    },
  };
  </script>
  