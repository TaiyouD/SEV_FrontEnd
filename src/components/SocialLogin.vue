<template>
  <div class="signup-buttons">
    <v-row justify="center">
      <div  display="flex" id="parent_id"></div>
    </v-row>
  </div>
</template>

<script>
import AuthServices from "@/services/authServices";
import Utils from "@/config/utils.js";

export default {
  name: "login_signup_social",
  data() {
    return {
      fName: "",
      lName: "",
      roleCounter: 0,
      user: {},
      role: {},
      access:{}
    };
  },
  created() {},
  mounted() {
    this.loginWithGoogle();

  },
  methods: {
    async loginWithGoogle() {
      global.handleCredentialResponse = this.handleCredentialResponse;
      const client = process.env.VUE_APP_CLIENT_ID;
      console.log(client);
      global.google.accounts.id.initialize({
        client_id: client,
        cancel_on_tap_outside: false,
        auto_select: true,
        callback: global.handleCredentialResponse,
      });
      global.google.accounts.id.renderButton(
        document.getElementById("parent_id"),
        {
          type: "standard",
          theme: "outline",
          size: "large",
          text: "signup_with",
          width: 400,
          logo_alignment: "center",
        }
      );
    },
    async handleCredentialResponse(response) {
      let token = {
        credential: response.credential,
      };
      await AuthServices.loginUser(token)
        .then((response) => {
          console.log(response.data)
          this.user = response.data;
          Utils.setStore("user", this.user);
          this.fName = this.user.fName;
          this.lName = this.user.lName;
          this.access = this.user.access[0];
          console.log('access: ', this.access);
          console.log('access specific: ', this.access[0]);

          // check what role they are based on role, go to different home pages
          if(this.access[0] === 'Admin'){
            this.$router.push({ name: "homeadmin" });
          }
          else if(this.access[0] === 'Faculty'){
            this.$router.push({ name: "homefaculty" });
          }
          else if(this.access[0] === 'Accompanist'){
            this.$router.push({ name: "homeaccomp" });
          }
          else if(this.access[0] === 'Incoming Student'){
            this.$router.push({ name: "home" });
          }
          else{
            this.$router.push({ name: "homestudent" });
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
};
</script>