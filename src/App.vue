<template>
  <v-app>
    <v-main>
      <div id="app">
        <div class="nav-bar justify-center d-none d-lg-flex d-xl-flex d-md-flex">
          <div class="nav-wid mt-auto">
            <router-link to="/"
              ><img src="./assets/logo/EduValor_New.png"
            /></router-link>
            <div class="on-right mt-6">
              <v-btn
                class="login-button"
                @click="setLogin"
                v-if="!this.login"
              >
                Log In
              </v-btn>
              <router-link to="/CreateContent">
                <img
                  class="mx-2"
                  v-if="this.login"
                  src="@/assets/icon/edit_brown.png"
              /></router-link>
              <router-link to="/Profile" class="mx-2 my-auto"
                ><img
                  class="mx-2 my-auto"
                  v-if="this.login"
                  src="@/assets/icon/user.png"
                  width="48"
                  height="48"
              /></router-link>
              <v-btn
                class="login-button"
                @click="setLogout"
                v-if="this.login"
              >
                Log Out
              </v-btn>
            </div>
          </div>
        </div>

        <div
          class="nav-bar justify-center d-flex d-sm-flex d-md-none d-lg-none d-xl-none"
        >
          <v-app-bar-nav-icon
            @click="drawer = true"
            class="my-auto"
          ></v-app-bar-nav-icon>
          <div class="nav-wid ma-auto d-flex justify-center">
            <router-link to="/"
              ><img src="./assets/logo/EduValor_Mobile.png"
            /></router-link>
          </div>
        </div>
        <v-navigation-drawer v-model="drawer" absolute temporary>
          <v-list nav dense>
            <div class="d-flex justify-end">
              <v-app-bar-nav-icon @click="drawer = false"></v-app-bar-nav-icon>
            </div>
            <v-list-item-group>
              <v-list-item
                v-if="!this.login"
                class="d-flex justify-center"
              >
                <v-btn class="login-button" @click="setLogin"> Log In </v-btn>
              </v-list-item>
              <v-list-item
                v-if="this.login"
                class="d-flex justify-center"
              >
                <router-link to="/CreateContent">
                  <img class="mx-2" src="@/assets/icon/edit_brown.png"
                /></router-link>
              </v-list-item>
              <v-list-item
                v-if="this.login"
                class="d-flex justify-center"
              >
                <router-link to="/Profile" class="mx-2 my-auto"
                  ><img
                    class="mx-2 my-auto"
                    src="@/assets/icon/user.png"
                    width="48"
                    height="48"
                /></router-link>
              </v-list-item>
              <v-list-item
                v-if="this.login"
                class="d-flex justify-center"
              >
                <v-btn class="login-button" @click="setLogout"> Log Out </v-btn>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      login: false,
      drawer: false,
    };
  },
  methods: {
    setCookies(){
      if (
      this.$cookies.get("USER_DATA") != null &&
      this.$cookies.get("JWT_TOKEN") != null
    ) {
      this.login = true;
    }
    },
    setLogin() {
      localStorage.setItem("login", true);
      this.goToLogin();
      // setTimeout(location.reload(), 6000);
    },
    setLogout() {
      localStorage.removeItem("login");
      this.$store.commit("setUser", null);
      this.$store.commit("setToken", null);
      console.log(this.$store.state);
      this.$cookies.remove("JWT_TOKEN");
      this.$cookies.remove("USER_DATA");
      window.alert("Logout successful");
      this.backHome();
      location.reload();
    },
    backHome() {
      this.$router.push({
        path: "/",
      });
    },
    goToLogin() {
      this.$router.push({
        path: "/Login",
      });
    },
  },

  created() {
    this.setCookies();
    
  },
  computed: {
    ...mapGetters(["getUserData"]),
  },
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 2000px) {
  .nav-wid {
    width: 70%;
  }
}

@media screen and (max-width: 1023px) {
  .nav-wid {
    /* width: 40%; */
    width: 60%;
  }
}

@media screen and (max-width: 767px) {
  .nav-wid {
    width: 90%;
  }
}
.nav-bar {
  background: #ffffff;
  height: 102px !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
}

.height-100 {
  height: 100%;
}
.login-button {
  width: 90px !important;
  height: 55px !important;
  background: #ad9f86 !important;
  border-radius: 16px !important;
  font-family: "Lusitana" !important;
  font-style: normal !important;
  font-weight: 400 !important;
  font-size: 24px;
  line-height: 31px !important;
  color: #ffffff !important;
}

.login {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-weight: bold;
  color: white;
  text-decoration-line: none;
  text-align: center;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

.on-right {
  float: right;
  display: flex;
  vertical-align: middle;
  height: 100%;
}

nav {
  // padding: 30px;
  text-align: center;

  a {
    font-weight: bold;
    color: white;
    text-decoration-line: none;
    text-align: center;

    &.router-link-exact-active {
      color: #e6c164;
    }
  }
}

@import url("https://fonts.googleapis.com/css2?family=Lusitana&display=swap");

.logo-banner {
  background-color: #202120;
  color: whitesmoke;
}
</style>
