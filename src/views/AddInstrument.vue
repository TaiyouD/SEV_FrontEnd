
<template>
    <div>
      <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
      <v-container>
        <v-toolbar>
          <v-toolbar-title>New Instrument</v-toolbar-title>
        </v-toolbar>
        <br />
        <h4>{{ message }}</h4>
        <br />
        <v-form ref="form" v-model="valid" lazy validation>
          <v-text-field
            v-model="instrument.type"
            id="type"
            label="Type"
          ></v-text-field>
          <v-select
            v-model="instrument.isVoice"
            id="isVoice"
            :items="[{ text: 'True', value: true }, { text: 'False', value: false }]"
            label="Voice"
            required
          ></v-select>
  
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="saveInstrument()"
          >
            Save
          </v-btn>
  
          <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
        </v-form>
      </v-container>
    </div>
  </template>
  
  <script>
  import InstrumentServices from "../services/instrumentServices";
  export default {
    name: "addinstrument",
    data() {
      return {
        valid: false,
        instrument: {
          id: null,
          type:"",
          isVoice: null
        },
        message: "Enter Data and Click Save.",
      };
    },
    methods: {
      saveInstrument() {
        var data = {
          type: this.instrument.type,
          isVoice: this.instrument.isVoice
        };
        InstrumentServices.create(data)
          .then((response) => {
            this.instrument.id = response.data.id;
            console.log("add " + response.data);
            this.$router.push({ name: "maintaininstrument" });
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      cancel() {
        this.$router.push({ name: "maintaininstrument" });
      },
    },
  };
  </script>
  
  <style>
  .alertMessage {
    color: red;
  }
  </style>