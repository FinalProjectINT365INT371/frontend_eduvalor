<template>
  <div class="content-box">
    To ShowContent Individual
    <v-card class="mx-auto" max-width="344"  >

      <v-img :src="getImg"></v-img>
      <v-card-title>{{ content._id }} : {{ content.Header }}</v-card-title>
      <v-card-text> {{ content.TextData }} </v-card-text>


      <v-card-subtitle>
        โดย {{ content.CreateBy }}
      </v-card-subtitle>

      <v-card-subtitle>
        เมื่อ {{ content.CreateDate }}
      </v-card-subtitle>


    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      content: [],
      selected: null,
    }
  },
  mounted() {
    // let buffer;
    let id = window.localStorage.getItem("content")
     let buffer;
    const res = axios.get("https://www.eduvalor.ml/backendDev/content/getContentByID?id="+id);
    res.then(result => {
      buffer = result.data;
      this.content = result.data;
      console.log(result.data);
    });
    this.content = buffer;

    // document.getElementsByClassName('content-box')[0].innerHTML = res;
    // this.contents = buffer;
    // console.log(this.contents);
  },
}
</script>

<style>
</style>