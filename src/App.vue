<template>
  <v-app>

    <!-- <v-main style="padding: 0%;"> -->
      <NavBar />

    <!-- </v-main> -->
  </v-app>
</template>

<script>
import NavBar from './components/NavBar';
import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.use(VueQuillEditor, /* { default global options } */)
export default {
  name: 'App',

  components: {
    // HelloWorld, 
    NavBar
  },

  data: () => ({
    //
  }),
};
</script>
