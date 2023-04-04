
<template>
<div>
  <v-img height=1100 cover src="../assets/music-background.jpg">
    <br><br><br><br><br><br><br><br><br><br>
    <SocialLogin/>
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
.custom-card {
  width: 400px;
  height: 155px; 
}
</style>