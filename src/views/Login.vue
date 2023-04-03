
<template>
<div>
  <v-img height=667 width="100%" cover src="../assets/music-background.jpg">
    <br><br><br><br><br><br><br><br><br>
    <SocialLogin/>
    <br>
    <div style="display: flex; justify-content: center;">
      <v-card class="custom-card">
        <div style="text-align: center;">
          You can <a href="http://www.oc.edu/password" target="_blank">reset your password</a> if you have forgotten it.<br><br>
          This is an Oklahoma Christian University system. Unauthorized access is prohibited. Usage is subject to security testing and monitoring. Misuse is subject to criminal prosecution. Users have no expectation of privacy except as otherwise provided by applicable privacy laws.
        </div>
      </v-card>
    </div>
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
  height: 190px; 
}
</style>