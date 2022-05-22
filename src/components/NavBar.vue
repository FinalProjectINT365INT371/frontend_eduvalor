<template>
  <div>
    <!-- <v-app-bar class="flex-lg-row"  outlined> -->
    <div  class="logo-banner d-flex justify-center">
      <a href="../pages/HomePage.vue"><img src="../assets/eduvalor-white-200-new.png"></a>
    </div>

    <v-tabs fixed-tabs color="white" dark background-color="#202120" >
      <v-tab class="font-tab white--text"> Contents </v-tab>
      <v-tab class="font-tab white--text"> Create Content </v-tab>
      <v-tab-item >
        <HomePage style="background-color: red;" />
      </v-tab-item>

      <v-tab-item>
        <CreateContentPage />
      </v-tab-item>

    </v-tabs>
    <!-- </v-app-bar> -->
  </div>
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
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lusitana&display=swap');

/* .font-tab{
  font-family: 'Lusitana', serif;;
} */
.logo-banner{
  background-color: #202120; 
  color:whitesmoke; 
}

</style>
