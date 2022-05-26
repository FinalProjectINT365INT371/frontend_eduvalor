<template>
  <v-app>
    <v-main>
      <div id="app">
        <div class="logo-banner d-flex justify-center">
          <router-link to="/"><img src="./assets/eduvalor-white-200-new.png"></router-link>
        </div>

        <nav>
          <v-tabs fixed-tabs color="#e6c164" background-color="#202120">
            <v-tab class="white--text">
              <router-link to="/"> Home </router-link>
            </v-tab>
            <v-tab class="white--text">
              <router-link to="/CreateContent"> Create Content </router-link>
            </v-tab>
          </v-tabs>
        </nav>

        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
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

@import url('https://fonts.googleapis.com/css2?family=Lusitana&display=swap');

.logo-banner {
  background-color: #202120;
  color: whitesmoke;
}
</style>
