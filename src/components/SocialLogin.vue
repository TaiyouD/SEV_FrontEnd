<template>
  <div class="signup-buttons">
    <v-row justify="center">
      <div  display="flex" id="parent_id"></div>
    </v-row>
  </div>
</template>

<script>
import AuthServices from "@/services/authServices";
import roleServices from "@/services/roleServices";
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
    handleCredentialResponse(response) {
      let token = {
        credential: response.credential,
      };
      AuthServices.loginUser(token)
        .then((response) => {
          this.user = response.data;
          Utils.setStore("user", this.user);
          this.fName = this.user.fName;
          this.lName = this.user.lName;
          this.$router.push({ name: "home" });
          this.$router.go();
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    retrieveRole() {
      roleServices.getRoleForUser(this.user.userId)
      .then((response) => {
        this.role = response.data[0];
        console.log("role: " + this.role.roleType);
      })
      .catch((e) => {
        this.message = e.response.data.message;
      });
    },
  },
};
</script>