
<template>
    <div>
      <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
      <v-container>
        <v-toolbar>
          <v-toolbar-title>Create Critique</v-toolbar-title>
        </v-toolbar>
        <br />
        <h4>{{ message }}</h4>
        <br />
        <div style="display: flex; justify-content: space-between; text-align: center;">
            <h4>Date: {{critique.date}}</h4>
            <h4>Performer: </h4>
            <h4>Piece: </h4>
        </div>
        <div class="line"></div>
        <br>
        <v-form ref="form" v-model="valid" lazy validation>
        <h5>Deportment (Poise, Entrance/Exit Bow)</h5>
        <v-row align="center">
        <v-col cols="6">
            <v-textarea
            v-model="critique.deportment"
            id="deportment"
            label=""
            rows="1"
            cols="5"
            required
            ></v-textarea>
        </v-col>
        <v-col cols="6">
            <v-radio-group v-model="critique.deportmentGrade" name="deportmentGrade" row>
            <v-radio label="Poor" value="Poor" color="red"></v-radio>
            <v-radio label="Fair" value="Fair" color="orange"></v-radio>
            <v-radio label="Good" value="Good" color="yellow"></v-radio>
            <v-radio label="Excellent" value="Excellent" color="green"></v-radio>
            </v-radio-group>
        </v-col>
        </v-row>
       <div class="line"></div>
       <br>
       <h5>Tone (Beauty, Control/Capacity, Vibrato, Warmth)</h5>
       <v-row align="center">
        <v-col cols="6">
            <v-textarea
            v-model="critique.tone"
            id="tone"
            label=""
            rows="1"
            cols="5"
            required
            ></v-textarea>
        </v-col>
        <v-col cols="6">
            <v-radio-group v-model="critique.toneGrade" name="toneGrade" row>
            <v-radio label="Poor" value="Poor" color="red"></v-radio>
            <v-radio label="Fair" value="Fair" color="orange"></v-radio>
            <v-radio label="Good" value="Good" color="yellow"></v-radio>
            <v-radio label="Excellent" value="Excellent" color="green"></v-radio>
            </v-radio-group>
        </v-col>
        </v-row>
        <div class="line"></div>
        <br>
        <h5>Accuracy/Intonation (Correct Notes With Correct Rhythm, Tuning With Keyboard And/Or Ensemble)</h5>
        <v-row align="center">
        <v-col cols="6">
            <v-textarea
            v-model="critique.accuracy"
            id="accuracy"
            label=""
            rows="1"
            cols="5"
            required
            ></v-textarea>
        </v-col>
        <v-col cols="6">
            <v-radio-group v-model="critique.accuracyGrade" name="accuracyGrade" row>
            <v-radio label="Poor" value="Poor" color="red"></v-radio>
            <v-radio label="Fair" value="Fair" color="orange"></v-radio>
            <v-radio label="Good" value="Good" color="yellow"></v-radio>
            <v-radio label="Excellent" value="Excellent" color="green"></v-radio>
            </v-radio-group>
        </v-col>
        </v-row>
        <div class="line"></div>
        <br>
        <h5>Technique (Attacks, Releases, Flexibility, Range, Resonance, Placement, Support, Agility)</h5>
        <v-row align="center">
        <v-col cols="6">
            <v-textarea
            v-model="critique.technique"
            id="technique"
            label=""
            rows="1"
            cols="5"
            required
            ></v-textarea>
        </v-col>
        <v-col cols="6">
            <v-radio-group v-model="critique.techniqueGrade" name="techniqueGrade" row>
            <v-radio label="Poor" value="Poor" color="red"></v-radio>
            <v-radio label="Fair" value="Fair" color="orange"></v-radio>
            <v-radio label="Good" value="Good" color="yellow"></v-radio>
            <v-radio label="Excellent" value="Excellent" color="green"></v-radio>
            </v-radio-group>
        </v-col>
        </v-row>
        <div class="line"></div>
        <br>
        <h5>Interpretation, Musicianship (Phrasing, Tempo, Dynamics Communication, Rapport)</h5>
        <v-row align="center">
        <v-col cols="6">
            <v-textarea
            v-model="critique.interpretation"
            id="interpretation"
            label=""
            rows="1"
            cols="5"
            required
            ></v-textarea>
        </v-col>
        <v-col cols="6">
            <v-radio-group v-model="critique.interpretationGrade" name="interpretationGrade" row>
            <v-radio label="Poor" value="Poor" color="red"></v-radio>
            <v-radio label="Fair" value="Fair" color="orange"></v-radio>
            <v-radio label="Good" value="Good" color="yellow"></v-radio>
            <v-radio label="Excellent" value="Excellent" color="green"></v-radio>
            </v-radio-group>
        </v-col>
        </v-row>
        <div class="line"></div>
        <br>
        <h5>Balance Blend (With Accompanist Or Within Ensemble)</h5>
        <v-row align="center">
        <v-col cols="6">
            <v-textarea
            v-model="critique.balance"
            id="balance"
            label=""
            rows="1"
            cols="5"
            required
            ></v-textarea>
        </v-col>
        <v-col cols="6">
            <v-radio-group v-model="critique.balanceGrade" name="balanceGrade" row>
            <v-radio label="Poor" value="Poor" color="red"></v-radio>
            <v-radio label="Fair" value="Fair" color="orange"></v-radio>
            <v-radio label="Good" value="Good" color="yellow"></v-radio>
            <v-radio label="Excellent" value="Excellent" color="green"></v-radio>
            </v-radio-group>
        </v-col>
        </v-row>
        <div class="line"></div>
        <br>
        <h5>Diction (Vocal)/ Articulation (Instrumental) (Vowels; Consonants - Legato, Double/Triple Tongue)</h5>
        <v-row align="center">
        <v-col cols="6">
            <v-textarea
            v-model="critique.diction"
            id="diction"
            label=""
            rows="1"
            cols="5"
            required
            ></v-textarea>
        </v-col>
        <v-col cols="6">
            <v-radio-group v-model="critique.dictionGrade" name="dictionGrade" row>
            <v-radio label="Poor" value="Poor" color="red"></v-radio>
            <v-radio label="Fair" value="Fair" color="orange"></v-radio>
            <v-radio label="Good" value="Good" color="yellow"></v-radio>
            <v-radio label="Excellent" value="Excellent" color="green"></v-radio>
            </v-radio-group>
        </v-col>
        </v-row>
        <div class="line"></div>
        <br>
        <h5>Performance And Suggestion (Overall Readiness To Perform)</h5>
        <v-textarea
        v-model="critique.performSuggest"
            id="performSuggest"
            label=""
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
      </v-container>
      <br>
      <div class="line"></div>
      <br>
    </div>
</template>
  
<script>

  import CritiqueServices from "../services/critiqueServices";
  import Utils from "@/config/utils.js";
  
  export default {
    name: "add-critique",
    props: ["eventsessionId", "eventsessionStudentId"],
    data() {
      return {
        critique: {
            id: null,
            date: "",
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
            hasPassed:false
        },
        valid: false,
        user: {},
        tutorial: {
          id: null,
          title: "",
          description: "",
          published: false,
        },
        message: "Fill out the form below to critique the performance. Once completed, click the 'Save' button.",
      };
    },
    mounted() {
      this.user = Utils.getStore("user");
    },
    methods: {
      hasAdditional() {
      return this.critique.deportmentGrade.length > 0
      },
      saveCritique() { //how to get student id?
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
          facultyId: this.user.userId,
          eventsessionId: this.eventsessionId,
          studentId: this.eventsessionStudentId
        };
        CritiqueServices.createCritique(this.eventsessionId, data)
        .then((response) => {
          this.critique.id = response.data.id;
          this.$router.push({ name: "view", params: { id: this.eventsessionId } });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: "view", params: { id: this.eventsessionId } });
    },
    },
  };
</script>
  
<style>
.line {
  border-top: 1.5px solid black;
  margin-top: 10px;
}
</style>