<template>

<div>
    <v-img  height = "1300" cover src="../assets/church-window-1.jpg" >
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Welcome to the World of Music!</v-toolbar-title>
      </v-toolbar>
    </v-container>
    <br /><br /><br />
    <SocialLogin />
    </v-img>
   
  </div>

</template>

<script>
import SocialLogin from "@/components/SocialLogin";
export default {
  name: "login",
  components: {
    SocialLogin,
  },
};
</script>

<style>
/* .v-image__image{
 background-size:100% 100%;
} */
</style>