
<template>
<div>
  <v-img height=1100 cover src="../assets/music-background.jpg">
    <br><br><br><br>
    <v-card width="700" class="mx-auto">
    <br>
    <h3 class="text-center mb-5" style="font-size: 3rem;">Welcome to the Music Department</h3>
    <br><br><br><br><br>
    <SocialLogin/>
    <br><br><br><br><br><br>
    </v-card>
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