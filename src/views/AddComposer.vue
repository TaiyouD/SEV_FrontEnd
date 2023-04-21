<template>
  <div v-if="this.role.roleType != null">
    <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
    <v-container>
      <v-toolbar>
        <v-toolbar-title>New Composer</v-toolbar-title>
        <!-- <v-spacer></v-spacer>
        <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
      </v-toolbar>

      <br />
      <h4>{{ message }}</h4>
      <!--<div class="alertMessage">
      <h5>{{ messageSimilarity }}</h5>
      </div>-->
      <br />
      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field
          v-model="composer.firstName"
          id="firstName"
          label="First Name"
        ></v-text-field>
        <v-text-field
          v-model="composer.lastName"
          id="lastName"
          label="Last Name"
          required
          ></v-text-field>
          <v-text-field
          v-model="composer.nationality"
          id="nationality"
          label="Nationality"
          ></v-text-field>
          <v-text-field
          v-model="composer.birthday"
          id="birthday"
          label="Birth Year"
          ></v-text-field>
          <v-text-field
          v-model="composer.deathDate"
          id="deathDate"
          label="Death Year"
          ></v-text-field>

          <div class="d-flex align-center">
            <div class="ml-auto">
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="saveComposer()"
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
import Utils from "@/config/utils.js";
import RoleServices from "../services/roleServices";

export default {
name: "addcomposer",
data() {
  return {
    valid: false,
    composer: {
      id: null,
      firstName:"",
      lastName:"",
      nationality: "",
      birthday:"",
      deathDate:""
    },
    user:{},
    role:{},
    message: "Leave it blank if you do not know the information about the composer (Last Name is Required).",
    // messageSimilarity: "Do you mean by any of these composers"
  };
},
async mounted() {
      this.user = Utils.getStore("user");
      await this.retrieveRole();
      const result = await this.getComposers()
      this.composers=result.data
      console.log(this.composers)
      
    },
methods: {
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
  saveComposer() {
    var data = {
      firstName: this.composer.firstName,
      lastName: this.composer.lastName,
      nationality: this.composer.nationality,
      birthday: this.composer.birthday,
      deathDate: this.composer.deathDate
    };
    ComposerServices.create(data)
      .then((response) => {
        this.composer.id = response.data.id;
        console.log("add " + response.data);
        if (this.role.roleType == "Student" || this.role.faculty == "Instructor"){
              this.$router.push({name: "addsong"});
            }
        else{
              this.$router.push({name: "maintaincomposer"});
            }
      })
      .catch((e) => {
        this.message = e.response.data.message;
      });
    },
    cancel() {
      if (this.role.roleType == "Student" || this.role.faculty == "Instructor"){
              this.$router.push({name: "addsong"});
            }
        else{
              this.$router.push({name: "maintaincomposer"});
            }
    },
    /* trying to make algorithm work
  saveComposer() {
      //check if composer last name exists
    var data = {
      firstName: this.composer.firstName,
      lastName: this.composer.lastName,
      nationality: this.composer.nationality,
      birthday: this.composer.birthday,
      deathDate: this.composer.deathDate
    };
    let lastName = this.composer.lastName;
    let similarNames = this.check_similarities(lastName);
    if (similarNames != "")
    {
      console.log(similarNames);
      alert("Are the following names ");
      //button to make it "yes" or "no"
      for (let x = 0; x < similarNames.length; x++) {
        similarNames[x]; //print this
      }
    }
    else {
    ComposerServices.create(data)
      .then((response) => {
        this.composer.id = response.data.id;
        console.log("add " + response.data);
        this.$router.push({ name: "addsong" });
      })
      .catch((e) => {
        alert("Last Name field is required")
        this.message = e.response.data.message;
      });
    }
  },
  cancel() {
    this.$router.push({ name: "addsong" });
  },
  check_similarities(lastName){
    let arrayComp = ComposerServices.getAll();
    let size_array = arrayComp.lenght;
    let str1 = "";
    let similars = [];
    for (let x = 0; x < size_array; x++) {
        str1=arrayComp[x].lastName;
        let answer = this.similar_name(str1, lastName);
        if (answer != "no")
        {
          similars.push(answer);
        }
    }
    return similars;
  }, 
  similar_name(str1, str2) {
   
    let size_a = str1.length + 1;
    let size_b = str2.length + 1;
    
    let matrix = Array.from(Array(size_a), () => new Array(size_b).fill(0));
    
    // Step 2
    for (let i = 0; i < size_a; i++) {
        matrix[i][0] = i;
    }
    
    for (let j = 0; j < size_b; j++) {
        matrix[0][j] = j;
    }
    
    // Step 3
    for (let i = 1; i < size_a; i++) {
        for (let j = 1; j < size_b; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1], matrix[i - 1][j] + 1, matrix[i][j - 1] + 1);
            } else {
                matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1);
            }
        }
    }
    if (matrix[size_a - 1][size_b - 1] < 5) {
        return str2;
    } else {
        return 'no';
    }
  }*/
},
};
</script>
<style>
.alertMessage {
color: red;
}
</style>