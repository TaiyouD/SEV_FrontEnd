<template>
    <div>
      <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
      <v-container>
        <v-toolbar>
        <v-btn icon to="/critique">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
          <!-- <v-icon class="mr-8">align_vertical_top</v-icon> -->
          <v-toolbar-title>View Critique</v-toolbar-title>
        </v-toolbar>
        <!-- <br/>
        <div style="text-align: center;">
            <h4>{{ message }}</h4>
        </div> -->
        <br/>
        <v-card>
        <br>
        <div style="display: flex; justify-content: space-between; text-align: center;">
            <h4 class="ml-5">Date: {{critique.date}}</h4>
            <h4>Performer: {{studentUser.fName}} {{studentUser.lName}}</h4>
            <h4>Critiquer: {{facultyUser.fName}} {{facultyUser.lName}}</h4>
            <h4 class="mr-5">Piece: </h4>
        </div>
        <div class="line"></div>
        <br>
        <v-form ref="form" v-model="valid" lazy validation>
        <h5 class="ml-5">Deportment (Poise, Entrance/Exit Bow)</h5>
        <v-row align="center" class="ml-2 mr-2">
        <v-col cols="8">
            <v-textarea
            critique.deportment
            id="deportment"
            label=""
            rows="1"
            cols="5"
            disabled
            >{{critique.deportment}}</v-textarea>
        </v-col>
        <v-col class="d-flex justify-center" cols="4">
            <div v-if="critique.deportmentGrade == 'Poor'">
                <v-btn
                elevation="10"
                rounded
                large
                color="red darken-3"
                class="white--text"
                >Poor</v-btn>
            </div>
            <div v-else-if="critique.deportmentGrade == 'Fair'">
                <v-btn
                elevation="10"
                rounded
                large
                color="orange darken-3"
                class="white--text"
                >Fair</v-btn>
            </div>
            <div v-else-if="critique.deportmentGrade == 'Good'">
                <v-btn
                elevation="10"
                rounded
                large
                color="amber accent-4"
                class="white--text"
                >good</v-btn>
            </div>
            <div v-else-if="critique.deportmentGrade == 'Excellent'">
                <v-btn
                elevation="10"
                rounded
                large
                color="green darken-1"
                class="white--text"
                >Excellent</v-btn>
            </div>
            <!-- <v-radio-group v-model="critique.deportmentGrade" name="deportmentGrade" row>
            <v-radio label="Poor" value="Poor" color="red"></v-radio>
            <v-radio label="Fair" value="Fair" color="orange"></v-radio>
            <v-radio label="Good" setActive value="Good" color="yellow"></v-radio>
            <v-radio label="Excellent" value="Excellent" color="green"></v-radio>
            </v-radio-group> -->
        </v-col>
        </v-row>
       <div class="line"></div>
       <br>
       <h5 class="ml-5">Tone (Beauty, Control/Capacity, Vibrato, Warmth)</h5>
       <v-row align="center" class="ml-2 mr-2">
        <v-col cols="8">
            <v-textarea
            v-model="critique.tone"
            id="tone"
            label=""
            rows="1"
            cols="5"
            disabled
            >{{ critique.tone }}</v-textarea>
        </v-col>
        <v-col class="d-flex justify-center" cols="4">
            <div v-if="critique.toneGrade == 'Poor'">
                <v-btn
                elevation="10"
                rounded
                large
                color="red darken-3"
                class="white--text"
                >Poor</v-btn>
            </div>
            <div v-else-if="critique.toneGrade == 'Fair'">
                <v-btn
                elevation="10"
                rounded
                large
                color="orange darken-3"
                class="white--text"
                >Fair</v-btn>
            </div>
            <div v-else-if="critique.toneGrade == 'Good'">
                <v-btn
                elevation="10"
                rounded
                large
                color="amber accent-4"
                class="white--text"
                >good</v-btn>
            </div>
            <div v-else-if="critique.toneGrade == 'Excellent'">
                <v-btn
                elevation="10"
                rounded
                large
                color="green darken-1"
                class="white--text"
                >Excellent</v-btn>
            </div>
            <!-- <v-radio-group v-model="critique.toneGrade" name="toneGrade" row>
            <v-radio label="Poor" value="Poor" color="red"></v-radio>
            <v-radio label="Fair" value="Fair" color="orange"></v-radio>
            <v-radio label="Good" value="Good" color="yellow"></v-radio>
            <v-radio label="Excellent" value="Excellent" color="green"></v-radio>
            </v-radio-group> -->
        </v-col>
        </v-row>
        <div class="line"></div>
        <br>
        <h5 class="ml-5">Accuracy/Intonation (Correct Notes With Correct Rhythm, Tuning With Keyboard And/Or Ensemble)</h5>
        <v-row align="center" class="ml-2 mr-2">
        <v-col cols="8">
            <v-textarea
            v-model="critique.accuracy"
            id="accuracy"
            label=""
            rows="1"
            cols="5"
            disabled
            >{{ critique.accuracy }}</v-textarea>
        </v-col>
        <v-col class="d-flex justify-center" cols="4">
            <div v-if="critique.accuracyGrade == 'Poor'">
                <v-btn
                elevation="10"
                rounded
                large
                color="red darken-3"
                class="white--text"
                >Poor</v-btn>
            </div>
            <div v-else-if="critique.accuracyGrade == 'Fair'">
                <v-btn
                elevation="10"
                rounded
                large
                color="orange darken-3"
                class="white--text"
                >Fair</v-btn>
            </div>
            <div v-else-if="critique.accuracyGrade == 'Good'">
                <v-btn
                elevation="10"
                rounded
                large
                color="amber accent-4"
                class="white--text"
                >good</v-btn>
            </div>
            <div v-else-if="critique.accuracyGrade == 'Excellent'">
                <v-btn
                elevation="10"
                rounded
                large
                color="green darken-1"
                class="white--text"
                >Excellent</v-btn>
            </div>
            <!-- <v-radio-group v-model="critique.accuracyGrade" name="accuracyGrade" row>
            <v-radio label="Poor" value="Poor" color="red"></v-radio>
            <v-radio label="Fair" value="Fair" color="orange"></v-radio>
            <v-radio label="Good" value="Good" color="yellow"></v-radio>
            <v-radio label="Excellent" value="Excellent" color="green"></v-radio>
            </v-radio-group> -->
        </v-col>
        </v-row>
        <div class="line"></div>
        <br>
        <h5 class="ml-5">Technique (Attacks, Releases, Flexibility, Range, Resonance, Placement, Support, Agility)</h5>
        <v-row align="center" class="ml-2 mr-2">
        <v-col cols="8">
            <v-textarea
            v-model="critique.technique"
            id="technique"
            label=""
            rows="1"
            cols="5"
            disabled
            >{{ critique.technique }}</v-textarea>
        </v-col>
        <v-col class="d-flex justify-center" cols="4">
            <div v-if="critique.techniqueGrade == 'Poor'">
                <v-btn
                elevation="10"
                rounded
                large
                color="red darken-3"
                class="white--text"
                >Poor</v-btn>
            </div>
            <div v-else-if="critique.techniqueGrade == 'Fair'">
                <v-btn
                elevation="10"
                rounded
                large
                color="orange darken-3"
                class="white--text"
                >Fair</v-btn>
            </div>
            <div v-else-if="critique.techniqueGrade == 'Good'">
                <v-btn
                elevation="10"
                rounded
                large
                color="amber accent-4"
                class="white--text"
                >good</v-btn>
            </div>
            <div v-else-if="critique.techniqueGrade == 'Excellent'">
                <v-btn
                elevation="10"
                rounded
                large
                color="green darken-1"
                class="white--text"
                >Excellent</v-btn>
            </div>
            <!-- <v-radio-group v-model="critique.techniqueGrade" name="techniqueGrade" row>
            <v-radio label="Poor" value="Poor" color="red"></v-radio>
            <v-radio label="Fair" value="Fair" color="orange"></v-radio>
            <v-radio label="Good" value="Good" color="yellow"></v-radio>
            <v-radio label="Excellent" value="Excellent" color="green"></v-radio>
            </v-radio-group> -->
        </v-col>
        </v-row>
        <div class="line"></div>
        <br>
        <h5 class="ml-5">Interpretation, Musicianship (Phrasing, Tempo, Dynamics Communication, Rapport)</h5>
        <v-row align="center" class="ml-2 mr-2">
        <v-col cols="8">
            <v-textarea
            v-model="critique.interpretation"
            id="interpretation"
            label=""
            rows="1"
            cols="5"
            disabled
            >{{ critique.interpretation }}</v-textarea>
        </v-col>
        <v-col class="d-flex justify-center" cols="4">
            <div v-if="critique.interpretationGrade == 'Poor'">
                <v-btn
                elevation="10"
                rounded
                large
                color="red darken-3"
                class="white--text"
                >Poor</v-btn>
            </div>
            <div v-else-if="critique.interpretationGrade == 'Fair'">
                <v-btn
                elevation="10"
                rounded
                large
                color="orange darken-3"
                class="white--text"
                >Fair</v-btn>
            </div>
            <div v-else-if="critique.interpretationGrade == 'Good'">
                <v-btn
                elevation="10"
                rounded
                large
                color="amber accent-4"
                class="white--text"
                >good</v-btn>
            </div>
            <div v-else-if="critique.interpretationGrade == 'Excellent'">
                <v-btn
                elevation="10"
                rounded
                large
                color="green darken-1"
                class="white--text"
                >Excellent</v-btn>
            </div>
            <!-- <v-radio-group v-model="critique.interpretationGrade" name="interpretationGrade" row>
            <v-radio label="Poor" value="Poor" color="red"></v-radio>
            <v-radio label="Fair" value="Fair" color="orange"></v-radio>
            <v-radio label="Good" value="Good" color="yellow"></v-radio>
            <v-radio label="Excellent" value="Excellent" color="green"></v-radio>
            </v-radio-group> -->
        </v-col>
        </v-row>
        <div class="line"></div>
        <br>
        <h5 class="ml-5">Balance Blend (With Accompanist Or Within Ensemble)</h5>
        <v-row align="center" class="ml-2 mr-2">
        <v-col cols="8">
            <v-textarea
            v-model="critique.balance"
            id="balance"
            label=""
            rows="1"
            cols="5"
            disabled
            >{{ critique.balance }}</v-textarea>
        </v-col>
        <v-col class="d-flex justify-center" cols="4">
            <div v-if="critique.balanceGrade == 'Poor'">
                <v-btn
                elevation="10"
                rounded
                large
                color="red darken-3"
                class="white--text"
                >Poor</v-btn>
            </div>
            <div v-else-if="critique.balanceGrade == 'Fair'">
                <v-btn
                elevation="10"
                rounded
                large
                color="orange darken-3"
                class="white--text"
                >Fair</v-btn>
            </div>
            <div v-else-if="critique.balanceGrade == 'Good'">
                <v-btn
                elevation="10"
                rounded
                large
                color="amber accent-4"
                class="white--text"
                >good</v-btn>
            </div>
            <div v-else-if="critique.balanceGrade == 'Excellent'">
                <v-btn
                elevation="10"
                rounded
                large
                color="green darken-1"
                class="white--text"
                >Excellent</v-btn>
            </div>
            <!-- <v-radio-group v-model="critique.balanceGrade" name="balanceGrade" row>
            <v-radio label="Poor" value="Poor" color="red"></v-radio>
            <v-radio label="Fair" value="Fair" color="orange"></v-radio>
            <v-radio label="Good" value="Good" color="yellow"></v-radio>
            <v-radio label="Excellent" value="Excellent" color="green"></v-radio>
            </v-radio-group> -->
        </v-col>
        </v-row>
        <div class="line"></div>
        <br>
        <h5 class="ml-5">Diction (Vocal)/ Articulation (Instrumental) (Vowels; Consonants - Legato, Double/Triple Tongue)</h5>
        <v-row align="center" class="ml-2 mr-2">
        <v-col cols="8">
            <v-textarea
            v-model="critique.diction"
            id="diction"
            label=""
            rows="1"
            cols="5"
            disabled
            >{{ critique.diction }}</v-textarea>
        </v-col>
        <v-col class="d-flex justify-center" cols="4">
            <div v-if="critique.dictionGrade == 'Poor'">
                <v-btn
                elevation="10"
                rounded
                large
                color="red darken-3"
                class="white--text"
                >Poor</v-btn>
            </div>
            <div v-else-if="critique.dictionGrade == 'Fair'">
                <v-btn
                elevation="10"
                rounded
                large
                color="orange darken-3"
                class="white--text"
                >Fair</v-btn>
            </div>
            <div v-else-if="critique.dictionGrade == 'Good'">
                <v-btn
                elevation="10"
                rounded
                large
                color="amber accent-4"
                class="white--text"
                >good</v-btn>
            </div>
            <div v-else-if="critique.dictionGrade == 'Excellent'">
                <v-btn
                elevation="10"
                rounded
                large
                color="green darken-1"
                class="white--text"
                >Excellent</v-btn>
            </div>
            <!-- <v-radio-group v-model="critique.dictionGrade" name="dictionGrade" row>
            <v-radio label="Poor" value="Poor" color="red"></v-radio>
            <v-radio label="Fair" value="Fair" color="orange"></v-radio>
            <v-radio label="Good" value="Good" color="yellow"></v-radio>
            <v-radio label="Excellent" value="Excellent" color="green"></v-radio>
            </v-radio-group> -->
        </v-col>
        </v-row>
        <div class="line"></div>
        <br>
        <h5 class="ml-5">Performance And Suggestion (Overall Readiness To Perform)</h5>
        <v-textarea class="ml-5 mr-5"
            v-model="critique.performSuggest"
            id="performSuggest"
            label=""
            rows="1"
            cols="5"
            disabled
            >{{ critique.performSuggest }}</v-textarea>
        <div class="line"></div>
        <br>
  
        <!-- <div class="d-flex align-center">
            <div class="ml-auto">
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="saveCritique()"
              >
                Save
              </v-btn>

                <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
            </div>
        </div> -->
        </v-form>
        <br>
    </v-card>
      </v-container>
      <br>
    </div>
        
   
</template>
  
<script>
  import critiqueServices from "../services/critiqueServices";
  import RoleServices from "../services/roleServices";
  import EventSessionServices from "../services/eventSessionServices";
  import EventServices from "../services/eventServices";
  import Utils from "@/config/utils.js";
import userServices from '../services/userServices';
  
  export default {
    name: "view-critique",
    props: ["critiqueId"],
    data() {
      return {
        critique: {},
        valid: false,
        user: {},
        facultyRole:{},
        facultyUser:{},
        studentRole:{},
        studentUser:{},
        eventSession:{},
        event:{},
        message: "Fill out the form below to critique the performance. Once completed, click the 'Save' button.",
      };
    },
    mounted() {
      this.user = Utils.getStore("user");
    },
    async created(){
        await this.retrieveFacultyRole();
        await this.retrieveEventSession();
        await this.retrieveStudentRole();
        await this.retrieveFacultyRole();
    },
    methods: {
    async retrieveThisEventSession() {
        await EventSessionServices.get(this.eventSessionId)
        .then((response) => {
            this.eventSession = response.data;
        })
        .catch((e) => {
            this.message = e.response.data.message;
        });
    },
    async retrieveThisEvent() {
        await EventServices.get(this.eventSession.eventId)
        .then((response) => {
            this.event = response.data;
        })
        .catch((e) => {
            this.message = e.response.data.message;
        });
    },
    async retrieveCritique() {
      await critiqueServices.get(this.critiqueId)
        .then((response) => {
          this.critique = response.data;
          console.log('critique');
          console.log(this.critique);
        //   for(let i = 0; i < this.critiqueSort.length; i++)
        //   {
        //     if (this.critiqueSort[i].eventSessionId == this.eventSessionId)
        //     {
        //       //this.studentRole.push(this.critiqueSort1[i].id);
        //       this.critiques.push(this.critiqueSort[i].id);
        //     }
        //   }
        //   console.log('critiques');
        //   console.log(this.critiques);
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    async retrieveFacultyRole() {
      await RoleServices.getRoleForUser(this.user.userId)
        .then((response) => {
          this.facultyRole = response.data[0];
          console.log('faculty role');
          console.log(this.facultyRole);
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
        await this.retrieveFacultyUser();
    },
    async retrieveFacultyUser() {
      await userServices.get(this.facultyRole.userId)
    //   await RoleServices.get(10)
        .then((response) => {
          this.facultyUser = response.data;
          console.log('faculty user');
          console.log(this.facultyUser);
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    async retrieveStudentRole() {
      await RoleServices.get(this.critique.studentId)
    //   await RoleServices.get(10)
        .then((response) => {
          this.studentRole = response.data;
          console.log('student role');
          console.log(this.studentRole);
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
        await this.retrieveStudentUser();
    },
    async retrieveStudentUser() {
      await userServices.get(this.studentRole.userId)
    //   await RoleServices.get(10)
        .then((response) => {
          this.studentUser = response.data;
          console.log('student user');
          console.log(this.studentUser);
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    },
  };
</script>

<style>
.line {
  border-top: 1.5px solid black;
  margin: 10px auto;
  width: 96.5%;
}
</style>