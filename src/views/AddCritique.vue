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
        <br><br>
        <v-form ref="form" v-model="valid" lazy validation>
          <h5>Deportment (Poise, entrance/exit bow)</h5>
          <v-layout row align-center>
          <v-textarea
            v-model="critique.deportment"
            id="deportment"
            label=""
            rows="2"
            cols="5"
            required
          ></v-textarea>
          <v-checkbox
              v-model="enabled"
              label="Vocal Piece"
              class="mr-6 ml-3"
            ></v-checkbox>
        </v-layout>
        <v-row>
          <v-col>
          <v-checkbox
            v-model="critique.deportmentGrade"
            label="Poor"
            color="red"
            value="critique.deportmentGrade"
          ></v-checkbox>
        </v-col>
        <v-col>
          <v-checkbox
          v-model="critique.deportmentGrade"
          label="Fair"
          color="orange"
          value="critique.deportmentGrade"
        ></v-checkbox>
      </v-col>
      <v-col>
        <v-checkbox
        v-model="critique.deportmentGrade"
        label="Good"
        color="yellow"
        value="critique.deportmentGrade"
      ></v-checkbox>
    </v-col>
    <v-col>
      <v-checkbox
      v-model="critique.deportmentGrade"
      label="Excellent"
      color="green"
      value="critique.deportmentGrade"
    ></v-checkbox>
  </v-col>
        </v-row>
          <h5>Tone (beauty, control/capacity, vibrato, warmth)</h5>
          <v-textarea
            v-model="critique.tone"
            id="tone"
            label=""
            required
          ></v-textarea>
          <h5>Accuracy/Intonation (correct notes with correct rhythm, tuning with keyboard and/or ensemble)</h5>
          <v-textarea
            v-model="critique.accuracy"
            id="accuracy"
            label=""
            required
          ></v-textarea>
          <h5>Interpretation, Musicianship (phrasing, tempo, dynamics communication, rapport)</h5>
          <v-textarea
            v-model="critique.interpretation"
            id="interpretation"
            label=""
            required
          ></v-textarea>
          <h5>Balance Blend (with accompanist or within ensemble)</h5>
          <v-textarea
            v-model="critique.balance"
            id="balance"
            label=""
            required
          ></v-textarea>
          <h5>Diction (vocal)/ Articulation (instrumental) (vowels; consonants - legato, double/triple tongue)</h5>
          <v-textarea
            v-model="critique.diction"
            id="diction"
            label=""
            required
          ></v-textarea>
          <h5>Performance and Suggestion (overall readiness to perform)</h5>
          <v-textarea
            v-model="critique.performance"
            id="performance"
            label=""
            required
          ></v-textarea>
  
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="saveCritique()"
          >
            Save
          </v-btn>
  
          <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
        </v-form>
      </v-container>
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
        message: "Fill out the form below to critique the performance. Verify the date, performer, and piece are correct. Once completed, click the 'Save' button.",
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