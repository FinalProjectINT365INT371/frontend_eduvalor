<template>
  <div>
    <h1>Welcome</h1>
    <h2>{{getUserData}}</h2>
    <router-link v-if="!getUserData" to="/login"
      ><button>Login</button></router-link
    >
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    User: "",
    Token: "",
  }),
  computed: {
    ...mapGetters(["getUserData"]),
  },
};
</script>
