<template>
    <div>
      <v-container>
        <v-toolbar>
          <v-toolbar-title>New Critique</v-toolbar-title>
          <!-- <v-spacer></v-spacer>
          <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
        </v-toolbar>
  
        <br />
        <h4>{{ message }}</h4>
        <br />
        <br>
        <h4>Date: {{critique.date}}</h4>
        <h4>Performer:</h4>
        <h4>Piece:</h4>
        <br>
        <!--<h3>Performer: {{role.name}}</h3>-->
       <!-- <h3>Piece: {{eventsession.songId}}</h3>-->
        <v-form ref="form" v-model="valid" lazy validation>
          <h5>Deportment (Poise, entrance/exit bow)</h5>
          <v-textarea
            v-model="critique.deportment"
            id="deportment"
            label=""
            style="width:50%;"
            required
          ></v-textarea>
          <v-checkbox
            v-model="critique.deportmentGrade"
            label="Poor"
            color="red"
            value="critique.deportmentGrade"
          ></v-checkbox>
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
    props: ["eventsessionId"],
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
        message: "Use the form below to critique the performance. Make sure this is the right date, performer, and piece. Once your critique is completed, click 'Save' button.",
      };
    },
    mounted() {
      this.user = Utils.getStore("user");
    },
    methods: {
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
          facultyId: this.user.userId,
          eventsessionId: this.eventsessionId
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
  <style></style>