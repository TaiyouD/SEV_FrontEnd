<template>
  <div>
    <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Add Piece to Repertoire</v-toolbar-title>
      </v-toolbar>
      <br />
      <h4>{{ message }}</h4>
      <br />
      <v-form ref="form" v-model="valid" lazy validation>
        <v-autocomplete
        v-model="select"
        :search-input.sync="search"
        :loading="loading"
        :items="selected"
        class="mr-4"
        density="comfortable"
        hide-no-data
        hide-details
        label="Title"
        single-line
        return-object
        required
        ></v-autocomplete>
        <br>
      <router-link to="/addsong" tag="v-btn">
      <v-btn color="primary" class="mr-4">
          Missing Piece?
      </v-btn>
      </router-link>
      <br><br>

      <v-text-field
      v-model="repertoireSong.semester"
      id="semester"
      :counter="15"
      label="Current Semester. Example: Spring 2023"
      required
      ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="saveSongRepertoire()"
        >
          Save
        </v-btn>

        <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import SongServices from "../services/songServices";
import RepertoireSongServices from "../services/repertoireSongServices";
export default {
  name: "add-piece-repertoire",
  props: [],
  data() {
    return {
      valid: true,
      loading: false,
      search: null,
      select: "",
      selected: [],
      titles: [],
      repertoireSong: {
        id: null,
        semester: ""
      },
      message: "Enter data and click save",
    };
  },
  watch: {
      search (val) {
        val && val !== this.select && this.querySelections(val)
      }
    },
  methods: {
    querySelections (v) {
      SongServices.getAll()
        .then((response) => {
          this.titles = response.data;
          this.loading = true
          // Simulated ajax query
          setTimeout(() => {
            this.selected = this.titles.filter(e => {
              return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
            })
            this.loading = false
          }, 500)
      })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    saveSongRepertoire() {
      var data = {
        semester: this.repertoireSong.semester
      };
      RepertoireSongServices.create(data)
        .then((response) => {
          this.repertoireSong.id = response.data.id;
          console.log("add " + response.data);
          this.$router.push({ name: "repertoire" });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: "repertoire"});
    },
  },
};
</script>
<style></style>
