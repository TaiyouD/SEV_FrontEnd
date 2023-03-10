<template>
  <v-app>
    <MenuBar :key="$route.fullPath"></MenuBar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import MenuBar from "@/components/MenuBar.vue";
export default {
  name: "App",
  components: {
    MenuBar,
  },
  data() {
    return {};
  },
  methods: {},
};

// import {
//     MDBNavbar,
//     MDBNavbarToggler,
//     MDBNavbarBrand,
//     MDBNavbarNav,
//     MDBNavbarItem,
//     MDBCollapse,
//     MDBDropdown,
//     MDBDropdownToggle,
//     MDBDropdownMenu,
//     MDBDropdownItem
//   } from 'mdb-vue-ui-kit';
//   import { ref } from 'vue';

//   const collapse6 = ref(false);
//   const dropdown9 = ref(false);
</script>

<style>

:root {
    --maroon: #811429;
    --dark_maroon: #550D1B; 
    --light_grey: #CCCCCC; 
    --dark_grey: #808080; 
    --light_tan: #EDE371; 
    --dark_white: #F2EFE4;  
}

#navbar-maroon{
  background :#811429;
  color : #F2EFE4;
}

#dark_grey{
  background: #808080;
  color : #F2EFE4;
}


</style>