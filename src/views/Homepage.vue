<template>
  
  <div>
    <v-parallax src="../assets/music-notes-bg1.jpg" height="100" />
    <v-container>
    <v-toolbar>
        <v-toolbar-title>Hello!</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title>{{this.message}}</v-toolbar-title>
    </v-toolbar>
      <!-- <br /><br /> -->
    </v-container>

    <!-- <div>
      <v-container fluid="xl">
        <v-col
          class="d-flex"
          cols="12"
          md="4"
        >
          <v-row class="ma-n4">
            <v-col cols="6">
              <v-sheet
                class="d-flex"
                color="green"
                height="300"
              >
                <sheet-footer>
                  #2: (1r x 1c)
                </sheet-footer>
              </v-sheet>
            </v-col>

            <v-col cols="6">
              <v-sheet
                class="d-flex"
                color="yellow"
                height="300"
              >
                <sheet-footer>
                  #3: (1r x 1c)
                </sheet-footer>
              </v-sheet>
            </v-col>

            <v-col cols="12">
              <v-sheet
                class="d-flex"
                color="red"
                height="400"
              >
                <sheet-footer>
                  #5: (2r x 2c)
                </sheet-footer>
              </v-sheet>
            </v-col>
          </v-row>
        </v-col>
      </v-container>
    </div> -->
<!-- <v-col>
        <v-carousel v-model="model" height="400" >
          <v-carousel-item
            v-for="slide in slides"
          :key="slide.title"
          >
            <v-img
              :src="slide.src"
              height="400px"
         
            >
              <v-row
                class="fill-height"
                align="center"
                justify="center"
              >
                <div class="display-3"> {{ slide.title }}</div>
              </v-row>
            </v-img>
          </v-carousel-item>
        </v-carousel>
        </v-col> -->





    <v-sheet
    class="mx-auto"
    max-width="1200"
  >
  <v-container fluid>
      <v-row dense>
        <!-- <v-col
          v-for="card in cards"
          :key="card.title"
          :cols="card.flex"
        >
          <v-card>
            <v-img
            src="../assets/music-notes-bg2.jpg"
              class="align-end text-white"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="50"
              cover
            >
            <v-card-title class="white--text">{{card.title}}</v-card-title>
            </v-img>

            <v-card-text>

            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn size="small" color="surface-variant" variant="text" icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>

              <v-btn size="small" color="surface-variant" variant="text" icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>

              <v-btn size="small" color="surface-variant" variant="text">
                Email
              </v-btn>
            </v-card-actions>
          </v-card>
          
        </v-col> -->
        <v-col cols="5">
          <v-card>
            <v-img
              src="../assets/music-notes-bg2.jpg"
              class="align-end text-white"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="60"
              cover
            >
            <v-card-title class="white--text">Audition For Scholarships</v-card-title>
            </v-img>

            <v-card-text>

            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn size="small" color="surface-variant" variant="text" icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>

              <v-btn size="small" color="surface-variant" variant="text" icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>

              <v-btn size="small" color="surface-variant" variant="text">
                Email
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="7">
          <v-card>
            <v-img
              src="../assets/music-notes-bg2.jpg"
              class="align-end text-white"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="60"
              cover
            >
            <v-card-title class="white--text">Notification</v-card-title>
            </v-img>

            <v-card-text>

            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn size="small" color="surface-variant" variant="text" icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>

              <v-btn size="small" color="surface-variant" variant="text" icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>

              <v-btn size="small" color="surface-variant" variant="text">
                Email
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <!-- gradient="to bottom, rgba(129,20,41), rgba(129,20,41)" -->
        <v-col cols="12">
          <v-card>
            <v-img
              src="../assets/music-notes-bg2.jpg"
              class="align-end text-white"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="60"
              cover
            >
            <v-card-title class="white--text">Music Degrees</v-card-title>
            </v-img>

            <v-card-text>

            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn size="small" color="surface-variant" variant="text" icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>

              <v-btn size="small" color="surface-variant" variant="text" icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>

              <v-btn size="small" color="surface-variant" variant="text">
                Email
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

  export default {
    name: "home-page",
    data() {
      return {
        // search: "",
        // tutorials: [],
        // currentTutorial: null,
        // currentIndex: -1,
        // title: "",
        user: {},
        message: "Music Department",
        slides: [
          {title: "picture 1", src: "../assets/music-notes-bg1.jpg"},
          {title: "picture 2", src: "../assets/music-notes-bg2.jpg"},
          {title: "picture 3", src: "../assets/church-window-1.jpg"},
          {title: "picture 4", src: "../assets/piano-1.jpg"},
          {title: "picture 5", src: "../assets/piano-2.jpg"},
        ],
        cards: [
        { title: 'Audition For Scholarships',text: 'Music gives life to the campus of Oklahoma Christian! Our entire campus, no matter what your major, is invited to join choir, band, orchestra and musical performances.', src: 'piano-2', flex: 5 },
        { title: 'Notification',text: 'Music life to the campus of Oklahoma Christian! Our entire campus, no matter what your major, is invited to join choir, band, orchestra and musical performances.', src: 'piano-2', flex: 7},
        { title: 'The Music Degrees',text: 'Develop your voice, advance your craft and invest your talent in musical pursuits alongside professors who value individuality and take the time to pour into students one-on-one.', src: 'piano-2', flex: 12 },
        ],
        model: 0,
      };
    },
    mounted() {
      this.user = Utils.getStore("user");
      // this.retrieveTutorials();
    },
    methods: {
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
      // retrieveTutorials() {
      //   TutorialServices.getAllForUser(this.user.userId)
      //     .then((response) => {
      //       this.tutorials = response.data;
      //     })
      //     .catch((e) => {
      //       this.message = e.response.data.message;
      //     });
      // },
      // refreshList() {
      //   this.retrieveTutorials();
      //   this.currentTutorial = null;
      //   this.currentIndex = -1;
      // },
      // setActiveTutorial(tutorial, index) {
      //   this.currentTutorial = tutorial;
      //   this.currentIndex = tutorial ? index : -1;
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
  