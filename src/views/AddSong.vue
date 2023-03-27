<template>
  <div>
    <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Add Piece</v-toolbar-title>
      </v-toolbar>
      <br />
      <h4>{{ message }}</h4>
      <br />
      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field
          v-model="song.title"
          id="title"
          :counter="50"
          label="Title"
          required
        ></v-text-field>
        <div>
          <v-checkbox
            v-model="enabled"
            label="Vocal Piece"
            class="pe-2"
          ></v-checkbox>
        </div>
        <div>
        <!--<v-text-field
        v-model="song.language"
        id="language"
        :counter="30"
        label="Language - Field required for voice pieces"
        ></v-text-field>-->
        <v-select 
          v-model="song.language"
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
        label="Enter piece translation"
        ></v-textarea>
        <vue-google-translator />
        </div>
        <br><br>
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
            required
        ></v-autocomplete>
          <br>
      
        <!-- <v-select 
          :items="selected"
          item-title="Composer"
          item-value=""
          label="Select Composer"
          v-model="selected"
          return-object
          single-line
          filled
      ></v-select>-->
      <router-link to="/addcomposer" tag="v-btn">
        <v-btn color="primary" class="mr-4">
            Missing Composer?
        </v-btn>
        </router-link>
        <br><br><br>


          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="saveSong()"
          >
            Save
          </v-btn>

          <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
        </v-form>
    </v-container>
  </div>
</template>

<script>
import ComposerServices from "../services/composerServices";
import SongServices from "../services/songServices";
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
      message: "Enter data and click save",
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
      ]  };
  },
  async mounted() {
    const result = await this.getComposers()
    this.composers=result.data
    console.log(this.composers)
    
  },
  /*
  async mounted () {
    const response = await fetch(ComposerServices.getAll());
    const { data: composers } = await response.json()
    this.composers = composers;
    console.log(this.composers);
  },*/
  
  watch: {
      search(val) {
        val && val !== this.select && this.querySelections(val)
      }
    },
    /*
  computed: {
    isForeig() {
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

          this.$router.push({ name: "addpiecerepertoire"}); //fazer v-if aqui pq depende do user pra qual pag vai direcionar
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: "addpiecerepertoire"});
    },
  },
};
</script>
<style></style>
