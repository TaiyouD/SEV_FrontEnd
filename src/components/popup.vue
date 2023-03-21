<template>
    <div class = "text-center">
    <v-dialog  v-model = "dialog" max-width="1000px">
    <template v-slot:activator="{ on, attrs}">
      <v-btn  class="success"
        v-bind="attrs"
        v-on="on"
        >Test for dialog button (Not working)</v-btn>
    </template>

      <v-card>
        <v-card-title>
          <h2>Test for dialog popup for each event</h2>
        <!-- Select Hearing Date Below -->

                    <!-- Time Select Above -->
       <!-- Select Hearing Date Below -->
       <v-select style="padding-top: 80px;"
        label="Select Available Hearing Dates"
        @change="selectButton"
        item-title="date"
        return-object
        single-line
        filled
     ></v-select>


                     <!-- Accompanist Select Below -->
    <v-select 
        item-title="Accompanist"
        item-value=""
        label="Select Accompanist"
        @change="selectButton"
        return-object
        single-line
        filled
    ></v-select>

    <v-select 

        item-title="Time Slot"
        item-value=""
        label="Select Time Slot"
        return-object
        single-line
        filled
    ></v-select>

        <!-- Instructor Select Below -->
    <div style="text-align: center;">
    <div style="display: inline-flex; padding-top: 20px;  width: 780px;" >
    <v-select style="padding-right: 30px; width: 100px;"
        item-title="state2"
        label="Select Instructor"
        return-object
        single-line
        filled
     ></v-select>
                

                    <!--  Instrument Select Below -->
    <v-select   style="width: 100px;"
    
        item-title="Instrument"
        item-value=""
        label="Select Voice or Instrument"
        return-object
        single-line
        filled
    ></v-select>
    </div>
</div>
                   
<v-container fluid>
    <v-text-field
      name="input-7-1"
      label="Selection Title"
      filled
      auto-grow
    ></v-text-field>
  </v-container>

  <v-select style="padding-top: 8px;"
        item-title="date"
        label="Select Composer"
        return-object
        single-line
        filled
     ></v-select>





        </v-card-title>
      </v-card>
    </v-dialog>
</div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dialog: false,
      }
    },


    methods:{
    selectButton(){
        this.$nextTick(() => {
        this.select = 0;
    });}
    }
  }

  </script>