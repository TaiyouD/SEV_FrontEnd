<template>
  
  <div>
    <v-parallax src="../assets/music-notes-bg1.jpg" height="100" />
    <v-container>
      
    <v-toolbar>
        <v-toolbar-title>Hello! {{this.name}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title>{{this.message}}</v-toolbar-title>
    </v-toolbar>
  </v-container>

    <v-sheet
    class="mx-auto"
    max-width="1200"
  >
  <v-container fluid>
      <v-row dense>
        <v-col cols="5">
          <v-card>
            <v-img
              src="../assets/piano-1.jpg"
              class="align-end text-white"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="60"
              cover
            >
            <v-card-title class="white--text">Audition For Scholarships</v-card-title>
            </v-img>

            <v-card-text>
            <p>
              We are eager to visit with vocalists, pianists, guitarists, and string, 
              woodwind, brass and percussion players about music scholarship opportunities at Oklahoma Christian. 
              Regardless of your intended academic major, we welcome you to audition with us. 
              To learn more about information about music scholarships 
              <a target="_blank"
                 rel="noreferrer" 
                 v-bind:href="'https://www.oc.edu/student-life/clubs-organizations/scholarships'">click here</a>.
            </p>
            <p>
              Please contact Cheryl Snyder 
              <a  target="_blank"
              rel="noreferrer" 
              v-bind:href="'mailto:' + 'cheryl.snyder@oc.ed'">
              cheryl.snyder@oc.ed</a> for audition information!
            </p>

            </v-card-text>

            <v-card-actions>
              <!-- <v-spacer></v-spacer>
              <v-btn 
              href="https://docs.google.com/forms/d/e/1FAIpQLScUqUM1udM6oIOnTop36YW896Sev0EdKw_zgVk3ELkhJp3n2Q/viewform"
              target="_blank"
              rel="noreferrer"
              color="surface-variant" variant="text" text>
                AUDITION FOR A SCHOLARSHIP
                <v-icon>mdi-arrow-right</v-icon>
              </v-btn> -->
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="7">
          <v-card>
            <v-img
              src="../assets/piano-1.jpg"
              class="align-end text-white"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="60"
              cover
            >
            <v-card-title class="white--text">Notification</v-card-title>
            </v-img>
            <v-card-title>
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
              <v-data-table
                :headers="headers"
                :search="search"
                :items="notifications"
                :items-per-page="50"
              >
                <template v-slot:[`item.actions`]="{ item }">
                  <div>
                    <v-icon small class="mx-4" @click="viewNotification(item)">
                      mdi-format-list-bulleted-type
                    </v-icon>
                    <v-icon small class="mx-4" @click="deleteNotification(item)">
                      mdi-trash-can
                    </v-icon>
                  </div>
                </template>
              </v-data-table>
            </v-card-text>

            <!-- <v-card-actions>
              <v-spacer></v-spacer> 
              <v-btn size="small" color="surface-variant" variant="text" icon>
                <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </v-card-actions> -->
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card>
            <v-img
              src="../assets/piano-1.jpg"
              class="align-end text-white"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="60"
              cover
            >
            <v-card-title class="white--text">Music Degrees</v-card-title>
            </v-img>

            <v-card-text>
              <v-carousel
                height="400"
                hide-delimiter-background
                show-arrows-on-hover
              >
                <template v-slot:prev="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    icon
                  > <v-icon>mdi-arrow-left</v-icon></v-btn>
                </template>
                <template v-slot:next="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    icon
                  > <v-icon>mdi-arrow-right</v-icon></v-btn>
                </template>
                <v-carousel-item>
                  <h3>
                    B.A. DEGREE IN MUSIC 51 HOURS
                  </h3>
                  <p>
                    The B.A. degree in Music is for students desiring to study music in a liberal arts curriculum. In the tradition of a liberal arts education, this degree offers preparation for careers and graduate study not only in music, but in many other disciplines.
                    <br>
                    An OC graduate with a Bachelor of Arts degree in Music will demonstrate:
                    <br><br>
                    1. Ability to hear and analyze rhythm, melody, harmony, and form.
                    <br>2. Ability to sight-read music and perform with other musicians.
                    <br>3. Understanding of compositional and aesthetic properties of style and how the art of music is shaped by cultural forces.
                    <br>4. Acquaintance with a wide selection of music literature beyond the student’s specialization through lectures, assignments, and concert attendance.
                    <br>5. Ability to perform a cross-section of that repertory according to the student’s interest and departmental standards.
                    <br>6. Ability to communicate clearly, critically, and creatively about music.
                    <br><br>Student must complete a minimum of 126 hours including the major, core, and minor if required. Elective hours may be needed to reach 126 hours.
                  </p>
                </v-carousel-item>
                <v-carousel-item>
                  <h3>
                    B.M.E. DEGREE IN MUSIC/INSTRUMENTAL EMPHASIS 83 HOURS
                  </h3>
                  <p>
                    The B.M.E. degree is for students pursuing a teaching career in music. The degree provides the student with the necessary coursework required for the standard teaching certificate as outlined by the Oklahoma State Department of Education.
                    <br>
                    An OC graduate with a Bachelor of Music Education with a music/instrumental emphasis will demonstrate:
                    <br>
                    <br>1. Ability to hear and analyze rhythm, melody, harmony, and form.
                    <br>2. Ability to sight-read music and perform with other musicians.
                    <br>3. Understanding of compositional and aesthetic properties of style and how the art of music is shaped by cultural forces.
                    <br>4. Acquaintance with a wide selection of music literature beyond the student’s interest and departmental standards.
                    <br>5. Ability to perform a cross-section of that repertory according to the student’s interest and departmental standards.
                    <br>6. Ability to communicate clearly, critically, and creatively about music.
                    <br>7. Ability to plan and teach elementary and secondary general music effectively.
                    <br>8. Ability to conduct ensembles and rehearse instrumental music effectively.
                    <br>9. Organizational leadership skills for management of instrumental ensembles in the public schools.
                    <br><br>Student must complete a minimum of 126 hours including the major, core, and minor if required. Elective hours may be needed to reach 126 hours.
                  </p>
                </v-carousel-item>
                <v-carousel-item>
                  <h3>
                    B.M.E. DEGREE IN MUSIC/VOCAL EMPHASIS 84 HOURS
                  </h3>
                  <p>
                    The B.M.E. degree is for students pursuing a teaching career in music. The degree provides the student with the necessary coursework required for the standard teaching certificate as outlined by the Oklahoma State Department of Education.
                    <br>
                    An OC graduate with a Bachelor of Music Education with a music/instrumental emphasis will demonstrate:
                    <br>
                    <br>1. Ability to hear and analyze rhythm, melody, harmony, and form.
                    <br>2. Ability to sight-read music and perform with other musicians.
                    <br>3. Understanding of compositional and aesthetic properties of style and how the art of music is shaped by cultural forces.
                    <br>4. Acquaintance with a wide selection of music literature beyond the student’s interest and departmental standards.
                    <br>5. Ability to perform a cross-section of that repertory according to the student’s interest and departmental standards.
                    <br>6. Ability to communicate clearly, critically, and creatively about music.
                    <br>7. Ability to plan and teach elementary and secondary general music effectively.
                    <br>8. Ability to conduct ensembles and rehearse instrumental music effectively.
                    <br>9. Organizational leadership skills for management of instrumental ensembles in the public schools.
                    <br><br>Student must complete a minimum of 126 hours including the major, core, and minor if required. Elective hours may be needed to reach 126 hours.
                  </p>
                </v-carousel-item>
              </v-carousel>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn size="small" 
              href="https://www.oc.edu/academics/undergraduate-programs/music"
              target="_blank"
              rel="noreferrer"
              color="surface-variant" variant="text" text>
              CLICK TO LEARN MORE
              <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
          
        </v-col>
      </v-row>
    </v-container>
    </v-sheet>
  </div>
</template>
  
<script>
  // import TutorialServices from "../services/tutorialServices";
  import Utils from "@/config/utils.js";
  import roleServices from "@/services/roleServices";

  export default {
    name: "home-page",
    data() {
      return {
        search: "",
        notifications: [],
        currentNotification: null,
        currentIndex: -1,
        title: "",
        user: {},
        role:{},
        message: "Welcome to the Music Department",
        model: 0,
        alert: true,
        name: "",
        initials: "",
        headers: [
        { text: "Title", value: "title" },
        { text: "Description", value: "description" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      };
    },
    async created() {
    this.resetMenu();

    },
    async mounted() {
      this.resetMenu();
      this.retrieveRole();
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
    async routeToPages(role){
      console.log(role);
      if(this.role.roleType == "Admin"){
      this.$router.push({ path: "/maintain", name: "maintain" });
      }
      else if(this.role.roleType == 'Incoming Student'){
      this.$router.push({ name: "home" });
      }
      else if(this.role.roleType == 'Student' || (this.role.roleType == 'Accompanist' && this.role.facultyType == null)){
      this.$router.push({ name: "home" });
      }
      else if(this.role.roleType == 'Faculty' || (this.role.roleType == 'Accompanist' && this.role.facultyType != null)){
      this.$router.push({ name: "maintainevent" });
      }

    },
      // editTutorial(tutorial) {
      //   this.$router.push({ name: "edit", params: { id: tutorial.id } });
      // },
      // viewNotification(notification) {
      //   this.$router.push({ name: "view", params: { id: notification.id } });
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
      // retrieveNotifications() {
      //   NotificationServices.getAllForUser(this.user.userId)
      //     .then((response) => {
      //       this.notifications = response.data;
      //     })
      //     .catch((e) => {
      //       this.message = e.response.data.message;
      //     });
      // },
      // refreshList() {
      //   this.retrieveNotifications();
      //   this.currentNotification = null;
      //   this.currentIndex = -1;
      // },
      // setActiveNotification(notification, index) {
      //   this.currentNotification = notification;
      //   this.currentIndex = notification ? index : -1;
      // },
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
  