
<template>
  <div>
    <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Instrument View</v-toolbar-title>
        <v-spacer></v-spacer>
          <v-text-field v-model="search" prepend-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
      </v-toolbar>
      <br />
      <v-card>
        <v-card-title>
          {{ "All Instruments" }}
          <v-spacer></v-spacer>
          <v-btn class="mx-2" color="success" @click="addInstrument(id)">Add Instrument</v-btn>
        </v-card-title>
        <v-card-text>
          <b>{{ message }}</b>
        </v-card-text>
        <v-data-table :headers="headers" :items="instruments" :search="search" :items-per-page="5" :sort-by="['type']" :sort-desc="[false]">
          <template #item="{ item }">
            <tr>
              <td>{{ item.type }}</td>
              <td>{{ item.isVoice ? '&#10003;' : '' }}</td>
              <td>
                <div class="d-flex justify-end">
                  <v-icon color="primary" @click="editInstrument(item)">mdi-pencil</v-icon>
                  <v-icon color="error" @click="deleteInstrument(item)">mdi-delete</v-icon>
                </div>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>

import InstrumentServices from "../services/instrumentServices";

export default {
  name: "maintaininstrument",
  props: ["id"],
  data() {
    return {
      search: "",
      instruments: [],
      message: "Add, Edit or Delete Instruments",
      headers: [
        { text: "Instrument", value: "type", sortable: false },
        { text: "Voice", value: "isVoice", sortable: false },
      ],
    };
  },
  mounted() {
    this.retrieveInstruments();
  },
  methods: {
    retrieveInstruments() {
      InstrumentServices.getAll()
        .then((response) => {
          this.instruments = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    addInstrument() {
      this.$router.push({ name: "addinstrument", params: { InstrumentId: this.id } });
    },
    editInstrument(instrument) {
      this.$router.push({ name: "editinstrument", params: { id: instrument.id } });
    },
    deleteInstrument(instrument) {
      if (confirm(`Are you sure you want to delete ${instrument.type}?`)) {
        InstrumentServices.delete(instrument.id)
          .then(() => {
            const index = this.instruments.indexOf(instrument);
            this.instruments.splice(index, 1);
            this.message = `${instrument.type} deleted successfully.`;
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      }
    },
  },
};
</script>

<style></style>