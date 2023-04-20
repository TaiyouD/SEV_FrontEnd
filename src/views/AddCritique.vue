
<template>
    <div v-if="this.facultyRole.roleType == 'Faculty' || (this.facultyRole.roleType == 'Admin')">
      <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
      <v-container>
        <v-toolbar>
          <v-btn icon to="/">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-toolbar-title>Create Critique</v-toolbar-title>
        </v-toolbar>
        <br/>
        <div style="text-align: center;">
            <h4>{{ message }}</h4>
        </div>
        <br />
        <v-card>
        <br>
        <div style="display: flex; justify-content: space-between; text-align: center;">
            <h4 class="ml-5">Date: {{critique.date}}</h4>
            <h4>Performer: {{studentRole.user.fName}} {{studentRole.user.lName}}</h4>
            <h4 class="mr-5">Piece: </h4>
        </div>
        <div class="line"></div>
        <v-form ref="form" v-model="valid" lazy validation>
          <v-col cols="12">
            <h5 class="text-center">Deportment (Poise, Entrance/Exit Bow)</h5>
          </v-col>
        <v-row align="center" class="ml-2 mr-2">
          <v-col cols="12" class="ml-16">
            <v-radio-group v-model="critique.deportmentGrade" name="deportmentGrade" row>
              <v-col cols="3">
                <v-radio label="Poor" value="Poor" color="red"></v-radio>
              </v-col>
              <v-col cols="3">
                <v-radio label="Fair" value="Fair" color="orange"></v-radio>
              </v-col>
              <v-col cols="3">
                <v-radio label="Good" value="Good" color="yellow"></v-radio>
              </v-col>
              <v-col cols="3">
                <v-radio label="Excellent" value="Excellent" color="green"></v-radio>
              </v-col>
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <v-btn block outlined icon @click="showDeportmentTextArea = !showDeportmentTextArea" style="border-radius: 0; height: 22px; margin-top: -22px">
              <v-icon>{{ showDeportmentTextArea ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-if="showDeportmentTextArea"
              v-model="critique.deportment"
              id="deportment"
              label="Comments"
              rows="1"
              cols="5"
              required
            ></v-textarea>
          </v-col>
        </v-row>
        <div class="line"></div>
        <br>
        <v-col cols="12">
            <h5 class="text-center">Tone (Beauty, Control/Capacity, Vibrato, Warmth)</h5>
        </v-col>
        <v-row align="center" class="ml-2 mr-2">
          <v-col cols="12" class="ml-16">
            <v-radio-group v-model="critique.toneGrade" name="toneGrade" row>
              <v-col cols="3">
                <v-radio label="Poor" value="Poor" color="red"></v-radio>
              </v-col>
              <v-col cols="3">
                <v-radio label="Fair" value="Fair" color="orange"></v-radio>
              </v-col>
              <v-col cols="3">
                <v-radio label="Good" value="Good" color="yellow"></v-radio>
              </v-col>
              <v-col cols="3">
                <v-radio label="Excellent" value="Excellent" color="green"></v-radio>
              </v-col>
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <v-btn block outlined icon @click="showToneTextArea = !showToneTextArea" style="border-radius: 0; height: 22px; margin-top: -22px">
              <v-icon>{{ showToneTextArea ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-if="showToneTextArea"
              v-model="critique.tone"
              id="tone"
              label="Comments"
              rows="1"
              cols="5"
              required
            ></v-textarea>
          </v-col>
        </v-row>
        <div class="line"></div>
        <br>
        <v-col cols="12">
            <h5 class="text-center">Accuracy/Intonation (Correct Notes With Correct Rhythm, Tuning With Keyboard And/Or Ensemble)</h5>
        </v-col>
        <v-row align="center" class="ml-2 mr-2">
          <v-col cols="12" class="ml-16">
            <v-radio-group v-model="critique.accuracyGrade" name="accuracyGrade" row>
              <v-col cols="3">
                <v-radio label="Poor" value="Poor" color="red"></v-radio>
              </v-col>
              <v-col cols="3">
                <v-radio label="Fair" value="Fair" color="orange"></v-radio>
              </v-col>
              <v-col cols="3">
                <v-radio label="Good" value="Good" color="yellow"></v-radio>
              </v-col>
              <v-col cols="3">
                <v-radio label="Excellent" value="Excellent" color="green"></v-radio>
              </v-col>
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <v-btn block outlined icon @click="showAccuracyTextArea = !showAccuracyTextArea" style="border-radius: 0; height: 22px; margin-top: -22px">
              <v-icon>{{ showAccuracyTextArea ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-if="showAccuracyTextArea"
              v-model="critique.accuracy"
              id="accuracy"
              label="Comments"
              rows="1"
              cols="5"
              required
            ></v-textarea>
          </v-col>
        </v-row>
        <div class="line"></div>
        <br>
        <v-col cols="12">
            <h5 class="text-center">Technique (Attacks, Releases, Flexibility, Range, Resonance, Placement, Support, Agility)</h5>
        </v-col>
        <v-row align="center" class="ml-2 mr-2">
          <v-col cols="12" class="ml-16">
            <v-radio-group v-model="critique.techniqueGrade" name="techniqueGrade" row>
              <v-col cols="3">
                <v-radio label="Poor" value="Poor" color="red"></v-radio>
              </v-col>
              <v-col cols="3">
                <v-radio label="Fair" value="Fair" color="orange"></v-radio>
              </v-col>
              <v-col cols="3">
                <v-radio label="Good" value="Good" color="yellow"></v-radio>
              </v-col>
              <v-col cols="3">
                <v-radio label="Excellent" value="Excellent" color="green"></v-radio>
              </v-col>
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <v-btn block outlined icon @click="showTechniqueTextArea = !showTechniqueTextArea" style="border-radius: 0; height: 22px; margin-top: -22px">
              <v-icon>{{ showTechniqueTextArea ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-if="showTechniqueTextArea"
              v-model="critique.technique"
              id="technique"
              label="Comments"
              rows="1"
              cols="5"
              required
            ></v-textarea>
          </v-col>
        </v-row>
        <div class="line"></div>
        <br>
        <v-col cols="12">
            <h5 class="text-center">Interpretation, Musicianship (Phrasing, Tempo, Dynamics Communication, Rapport)</h5>
        </v-col>
        <v-row align="center" class="ml-2 mr-2">
          <v-col cols="12" class="ml-16">
            <v-radio-group v-model="critique.interpretationGrade" name="interpretationGrade" row>
              <v-col cols="3">
                <v-radio label="Poor" value="Poor" color="red"></v-radio>
              </v-col>
              <v-col cols="3">
                <v-radio label="Fair" value="Fair" color="orange"></v-radio>
              </v-col>
              <v-col cols="3">
                <v-radio label="Good" value="Good" color="yellow"></v-radio>
              </v-col>
              <v-col cols="3">
                <v-radio label="Excellent" value="Excellent" color="green"></v-radio>
              </v-col>
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <v-btn block outlined icon @click="showInterpretationTextArea = !showInterpretationTextArea" style="border-radius: 0; height: 22px; margin-top: -22px">
              <v-icon>{{ showInterpretationTextArea ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-if="showInterpretationTextArea"
              v-model="critique.interpretation"
              id="interpretation"
              label="Comments"
              rows="1"
              cols="5"
              required
            ></v-textarea>
          </v-col>
        </v-row>
        <div class="line"></div>
        <br>
        <v-col cols="12">
            <h5 class="text-center">Balance Blend (With Accompanist Or Within Ensemble)</h5>
        </v-col>
        <v-row align="center" class="ml-2 mr-2">
          <v-col cols="12" class="ml-16">
            <v-radio-group v-model="critique.balanceGrade" name="balanceGrade" row>
              <v-col cols="3">
                <v-radio label="Poor" value="Poor" color="red"></v-radio>
              </v-col>
              <v-col cols="3">
                <v-radio label="Fair" value="Fair" color="orange"></v-radio>
              </v-col>
              <v-col cols="3">
                <v-radio label="Good" value="Good" color="yellow"></v-radio>
              </v-col>
              <v-col cols="3">
                <v-radio label="Excellent" value="Excellent" color="green"></v-radio>
              </v-col>
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <v-btn block outlined icon @click="showBalanceTextArea = !showBalanceTextArea" style="border-radius: 0; height: 22px; margin-top: -22px">
              <v-icon>{{ showBalanceTextArea ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-if="showBalanceTextArea"
              v-model="critique.balance"
              id="balance"
              label="Comments"
              rows="1"
              cols="5"
              required
            ></v-textarea>
          </v-col>
        </v-row>
        <div class="line"></div>
        <br>
        <v-col cols="12">
            <h5 class="text-center">Diction (Vocal)/ Articulation (Instrumental) (Vowels; Consonants - Legato, Double/Triple Tongue)</h5>
        </v-col>
        <v-row align="center" class="ml-2 mr-2">
          <v-col cols="12" class="ml-16">
            <v-radio-group v-model="critique.dictionGrade" name="dictionGrade" row>
              <v-col cols="3">
                <v-radio label="Poor" value="Poor" color="red"></v-radio>
              </v-col>
              <v-col cols="3">
                <v-radio label="Fair" value="Fair" color="orange"></v-radio>
              </v-col>
              <v-col cols="3">
                <v-radio label="Good" value="Good" color="yellow"></v-radio>
              </v-col>
              <v-col cols="3">
                <v-radio label="Excellent" value="Excellent" color="green"></v-radio>
              </v-col>
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <v-btn block outlined icon @click="showDictionTextArea = !showDictionTextArea" style="border-radius: 0; height: 22px; margin-top: -22px">
              <v-icon>{{ showDictionTextArea ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-if="showDictionTextArea"
              v-model="critique.diction"
              id="diction"
              label="Comments"
              rows="1"
              cols="5"
              required
            ></v-textarea>
          </v-col>
        </v-row>
        <div class="line"></div>
        <br>
        <v-col cols="12">
            <h5 class="text-center">Performance And Suggestion (Overall Readiness To Perform)</h5>
        </v-col>
        <v-textarea class="ml-5 mr-5"
        v-model="critique.performSuggest"
            id="performSuggest"
            label="Comments"
            rows="1"
            cols="5"
            required
        ></v-textarea>
        <div class="line"></div>
        <br>
  
        <div class="d-flex align-center">
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
            </div>
        </v-form>
        <br>
    </v-card>
      </v-container>
      <br>
    </div>
</template>
  
<script>

  import CritiqueServices from "../services/critiqueServices";
  import RoleServices from "../services/roleServices";
  import EventSessionServices from "../services/eventSessionServices";
  import Utils from "@/config/utils.js";
  
  export default {
    name: "addcritique",
    props: ["eventsessionId"],
    data() {
      return {
        critique: {
            id: null,
            date: new Date().toISOString().substr(0, 10),
            deportment: "",
            deportmentGrade: "",
            tone: "",
            toneGrade: "",
            accuracy: "",
            accuracyGrade: "",
            technique: "",
            techniqueGrade: "",
            interpretation: "",
            interpretationGrade: "",
            balance: "",
            balanceGrade: "",
            diction: "",
            dictionGrade: "",
            performSuggest: "",
            hasPassed: false
        },
        valid: false,
        showDeportmentTextArea: false,
        showToneTextArea: false,
        showAccuracyTextArea: false,
        showTechniqueTextArea: false,
        showInterpretationTextArea: false,
        showBalanceTextArea: false,
        showDictionTextArea: false,
        user: {},
        facultyRole:{},
        studentRole:{
            user:{
                fName:"",
                lName:""
            }
        },
        eventSession:{},
        message: "Fill out the form below to critique the performance. Once completed, click the 'Save' button.",
      };
    },
    async created(){
      this.user = Utils.getStore("user");
      await this.retrieveFacultyRole();
      await this.retrieveEventSession();
      await this.retrieveStudentRole();
    },
    methods: {
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
    },
    async retrieveEventSession() {
        //await EventSessionServices.get(this.eventsessionId)
      await EventSessionServices.get(1)
        .then((response) => {
          this.eventSession = response.data[0];
          console.log('event session');
          console.log(this.eventSession);
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    async retrieveStudentRole() {
    //   await RoleServices.get(this.eventSession.studentId)
      await RoleServices.get(10)
        .then((response) => {
          this.studentRole = response.data;
          console.log('student role');
          console.log(this.studentRole);
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
      saveCritique() { 
        var data = {
          date: this.critique.date,
          deportment: this.critique.deportment,
          deportmentGrade: this.critique.deportmentGrade,
          tone: this.critique.tone,
          toneGrade: this.critique.toneGrade,
          accuracy: this.critique.accuracy,
          accuracyGrade: this.critique.accuracyGrade,
          technique: this.critique.technique,
          techniqueGrade: this.critique.techniqueGrade,
          interpretation: this.critique.interpretation,
          interpretationGrade: this.critique.interpretationGrade,
          balance: this.critique.balance,
          balanceGrade: this.critique.balanceGrade,
          diction: this.critique.diction,
          dictionGrade: this.critique.dictionGrade,
          performSuggest: this.critique.performSuggest,
          hasPassed:this.critique.hasPassed,
          facultyId: this.facultyRole.id,
          eventsessionId: this.eventsessionId,
          studentId: this.eventsessionStudentId
        };
        CritiqueServices.create(this.eventsessionId, data)
        .then((response) => {
          this.critique.id = response.data.id;
          this.$router.push({ name: "maintaineventsession", params: { eventId: this.eventsessionId.eventId } });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: "maintaineventsession", params: { eventId: this.eventsessionId.eventId } });
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