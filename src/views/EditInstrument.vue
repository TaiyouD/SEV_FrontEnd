
<template>
    <div v-if="this.role.roleType == 'Admin'">
      <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
      <v-container>
        <v-toolbar>
          <v-toolbar-title>Edit Instrument</v-toolbar-title>
        </v-toolbar>
        <br />
        <h4>{{ message }}</h4>
        <br />
        <v-form ref="form" v-model="valid" lazy validation>
          <v-text-field
            v-model="instrument.type"
            id="type"
            label="Instrument"
            required
          ></v-text-field>
          <v-select
            v-model="instrument.isVoice"
            id="isVoice"
            :items="[{ text: 'True', value: true }, { text: 'False', value: false }]"
            label="Voice"
            required
          ></v-select>
  
          <div class="d-flex align-center">
            <div class="ml-auto">
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="updateLevel()"
              >
                Save
              </v-btn>

                <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
              </div>
            </div>
        </v-form>
      </v-container>
    </div>
  </template>
  
  <script>
  
  import InstrumentServices from "../services/instrumentServices";
  import RoleServices from "../services/roleServices";
  import Utils from "@/config/utils.js";
  
  export default {
    name: "editinstrument",
    props: ['id'],
  data() {
    return {
      user:{},
      role:{},
      instrument: {
        type: '',
        isVoice: ''
      },
      message: '',
      valid: false
    }
  },
  mounted() {
    this.getInstrument(this.id);
    this.user = Utils.getStore("user");
  },
  async created(){
    await this.retrieveRole();
  },
  methods: {
    async retrieveRole() {
        await RoleServices.getRoleForUser(this.user.userId)
          .then((response) => {
            this.role = response.data[0];
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      getInstrument(id) {
        InstrumentServices.get(id)
          .then(response => {
            this.instrument = response.data;
          })
          .catch(e => {
            this.message = e.response.data.message;
          });
      },
      updateInstrument() {
        InstrumentServices.update(this.id, this.instrument)
          .then(() => {
            this.message = 'The Instrument was updated successfully!';
          })
          .catch(e => {
            this.message = e.response.data.message;
          });
          this.$router.go(-1);
      },
      cancel() {
        this.$router.go(-1);
      }
    }
  };
  </script>