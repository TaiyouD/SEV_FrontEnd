<template>
    <div v-if="this.role.roleType != null">
      <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
      <v-container>
        <v-toolbar>
          <v-toolbar-title>Add Piece</v-toolbar-title>
        </v-toolbar>
        <br />
        <h4>{{ message }}</h4>
        <br />
        <v-form ref="form" v-model="valid" lazy validation>
          <v-layout row align-center>
            <v-checkbox
              v-model="enabled"
              label="Vocal Piece"
              class="mr-6 ml-3"
            ></v-checkbox>
            <v-text-field
              v-model="song.title"
              id="title"
              label="Title"
              class="pe-2 mr-1"
              required
            ></v-text-field>
          </v-layout>
          <div>
          <v-select 
            v-model="song.language"
            clearable
            :disabled="!enabled"
            :items="countries"
            item-title="title"
            item-text="title"
            item-value="code"
            label="Select Language"
            return-object
            single-line
          ></v-select>
          <!-- auto translate part
          <v-textarea
            id="paragraph"
            label="Enter piece lyrics"
            ></v-textarea>
          <v-btn @click="translate()" color="primary" class="mr-4">
            Translate
          </v-btn>-->
          <!--<div v-if="translated">
            <h3>Translated Piece:</h3>
            <p>{{ translation }}</p>
          </div>-->
          <v-textarea
            v-model="song.translation"
            :disabled="!enabled"
            id="translation"
            label="Enter Piece Translation"
            rows="2"
            cols="5"
          ></v-textarea>
          <!-- <vue-google-translator /> -->
          </div>
          <!--<v-textarea v-if="isForeign"
            v-model="song.translation"
            id="translation"
            label="Translation"
            visible
          ></v-textarea>-->
          
          <!--:item-text="item => `${item.firstName} ${item.lastName}`"-->
          <v-autocomplete
              v-model="song.composer"
              :search-input.sync="searchV"
              :loading="loading"
              :items="composers"
              item-text="lastName"
              class="mr-4"
              density="comfortable"
              hide-no-data
              hide-details
              label="Composer"
              single-line
              return-object
              style="width: 1200px;"
              required
          ></v-autocomplete>
          <br>

            <div class="d-flex align-center">
              <div class="ml-1">
                <router-link to="/addcomposer">
                  <v-btn color="primary">
                    Missing Composer?
                  </v-btn>
                </router-link>
              </div>

            <div class="ml-auto">
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="saveSong()"
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
  import ComposerServices from "../services/composerServices";
  import SongServices from "../services/songServices";
  import Utils from "@/config/utils.js";
  import RoleServices from "../services/roleServices";
  //import  Translator  from 'vue-google-translate';
  //import translate from 'google-translate-api';
  export default {
    name: "add-song",
    /*
    components: {
      Translator
    },*/
    props: [],
    data() {
      return {
        valid: true,
        // disable: 0,
        enabled: false,
        loading: false,
        searchV: null,
        select: null,
        composers: [],
        song: {
          id: null,
          title: "",
          language: "",
          translation: "",
          composer: [] 
        },
        message: "Enter Data and Click Save",
        lyrics: "",
        countries: [
        {
        code: 'en|af',
        title: 'Afrikaans',
        },
        {
          code: 'en|sq',
          title: 'Albanian',
        },
        {
          code: 'en|ar',
          title: 'Arabic',
        },
        {
          code: 'en|hy',
          title: 'Armenian',
        },
        {
          code: 'en|az',
          title: 'Azerbaijani',
        },
        {
          code: 'en|eu',
          title: 'Basque',
        },
        {
          code: 'en|be',
          title: 'Belarusian',
        },
        {
          code: 'en|bg',
          title: 'Bulgarian',
        },
        {
          code: 'en|ca',
          title: 'Catalan',
        },
        {
          code: 'en|zh-CN',
          title: 'Chinese (Simplified)',
        },
        {
          code: 'en|zh-TW',
          title: 'Chinese (Traditional)',
        },
        {
          code: 'en|hr',
          title: 'Croatian',
        },
        {
          code: 'en|cs',
          title: 'Czech',
        },
        {
          code: 'en|da',
          title: 'Danish',
        },
        {
          code: 'en|nl',
          title: 'Dutch',
        },
        {
          code: 'en|en',
          title: 'English',
        },
        {
          code: 'en|et',
          title: 'Estonian',
        },
        {
          code: 'en|tl',
          title: 'Filipino',
        },
        {
          code: 'en|fi',
          title: 'Finnish',
        },
        {
          code: 'en|fr',
          title: 'French',
        },
        {
          code: 'en|de',
          title: 'German',
        },
        {
          code: 'en|el',
          title: 'Greek',
        },
        {
          code: 'en|hu',
          title: 'Hungarian',
        },
        {
          code: 'en|id',
          title: 'Indonesian',
        },
        {
          code: 'en|ga',
          title: 'Irish',
        },
        {
          code: 'en|it',
          title: 'Italian',
        },
        {
          code: 'en|ja',
          title: 'Japanese',
        },
        {
          code: 'en|ko',
          title: 'Korean',
        },
        {
          code: 'en|lt',
          title: 'Lithuanian',
        },
        {
          code: 'en|ms',
          title: 'Malay',
        },
        {
          code: 'en|no',
          title: 'Norwegian',
        },
        {
          code: 'en|pl',
          title: 'Polish',
        },
        {
          code: 'en|pt',
          title: 'Portuguese',
        },
        {
          code: 'en|ro',
          title: 'Romanian',
        },
        {
          code: 'en|ru',
          title: 'Russian',
        },
        {
          code: 'en|es',
          title: 'Spanish',
        },
        {
          code: 'en|sv',
          title: 'Swedish',
        },
        {
          code: 'en|th',
          title: 'Thai',
        },
        {
          code: 'en|tr',
          title: 'Turkish',
        },
        {
          code: 'en|uk',
          title: 'Ukrainian',
        }
        ],
        user: {},
        role: {}  
      };
    },
    async mounted() {
      this.user = Utils.getStore("user");
      await this.retrieveRole();
      const result = await this.getComposers()
      this.composers=result.data
      console.log(this.composers)
      
    },
    watch: {
        search(val) {
          val && val !== this.select && this.querySelections(val)
        }
      },
      /*
    computed: {
      isForeign() {
        if(this.song.language != "")
        {
          return this.visible==true;
        }
        else{
          return this.visible==false;
        }
      }
    },*/
    methods: {
      getComposers(){
        return ComposerServices.getAll()
      },
      async retrieveRole() {
          await RoleServices.getRoleForUser(this.user.userId)
            .then((response) => {
              for (let i = 0; i < response.data.length; i++){
              if (response.data[i].roleType == this.user.selectedRole) {
                this.role = response.data[i];
              }
            }
              console.log('role');
              console.log(this.role);
            })
            .catch((e) => {
              this.message = e.response.data.message;
            });
        },
      querySelections(v) {
        ComposerServices.getAll()
          .then((response) => {
            this.composers = response.data;
            this.loading = true
            // Simulated ajax query
            setTimeout(() => {
              this.song.composer = this.composers.lastName.filter(e => {
                return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
              })
              this.loading = false
            }, 500)
        })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      /*
      async translate() {
        const result = await this.$translate(this.paragraph, {
          from: this.song.language,
          to: 'en'
        })
        this.song.translation = result.text
      },*/
      /*
      checkIfCountryIsAvailableInDefaults() {
        return this.defaultCountries.some(
          (country) =>
            country.code.toLowerCase() === countryObject.code.toLowerCase() &&
            country.title.toLowerCase() === countryObject.title.toLowerCase()
        );},*/
      saveSong() {
        var data = {
          title: this.song.title,
          language: this.song.language.title,
          translation: this.song.translation,
          composerId: this.song.composer.id 
        };
        SongServices.create(data)
          .then((response) => {
            this.song.id = response.data.id;
            console.log("add " + response.data);
            if (this.role.roleType == "Student" || this.role.faculty == "Instructor"){
              this.$router.push({name: "addpiecerepertoire"});
            }
            else{
              this.$router.push({name: "maintainsong"});
            }
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      cancel() {
        if (this.role.roleType == "Student" || this.role.faculty == "Instructor"){
              this.$router.push({name: "addpiecerepertoire"});
            }
        else{
              this.$router.push({name: "maintainsong"});
            }
      },
    },
  };
  </script>