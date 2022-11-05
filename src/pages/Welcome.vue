<template>
  <div>
    <h1>Welcome</h1>
    <h2>{{isLoggedIn}}</h2>
    <router-link v-if="!isLoggedIn" to="/login"
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
    ...mapGetters(["isLoggedIn"]),
  },
};
</script>
