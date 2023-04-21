
<template>
<div>
  <v-img height=1100 cover src="../assets/login-background.jpg">
    <br><br><br><br>
    <v-card width="600" class="mx-auto" style="border: 3px solid black;">
    <br>
    <h3 class="text-center mb-5 ml-6 mr-6" style="font-size: 3rem;">Welcome To The Music Department</h3>
    <br><br>
    <SocialLogin/>
    <br><br><br>
    <div style="display: flex; justify-content: center;">
      <v-img height="135" width="50" src="../assets/oc-login-logo.png"></v-img>
    </div>
    <br>
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