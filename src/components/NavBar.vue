<template class="black--text">
  <v-app-bar class="flex-lg-row"  outlined>
    <h3 class=".text-lg-h1">Eduvalor</h3>
    <v-tabs fixed-tabs dark >
      <v-tab class="black--text"> Contents </v-tab>
      <v-tab class="black--text"> Create Content </v-tab>

        <v-tab-item >
          <HomePage/>
        </v-tab-item>

        <v-tab-item>
          <CreateContentPage />
        </v-tab-item>

    </v-tabs>
  </v-app-bar>
</template> 

<script>
// import HelloWorld from './components/HelloWorld';
import HomePage from "../pages/HomePage";
import CreateContentPage from "../pages/CreateContentPage";

export default {
  components: {
    // HelloWorld,
    HomePage,
    CreateContentPage,
  },
};
</script>