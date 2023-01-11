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
</script>
