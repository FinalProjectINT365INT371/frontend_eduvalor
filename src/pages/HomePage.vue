<template>
  <div>
    <router-link to="/ShowContent">
      <v-card class="mx-auto" @click="selectContent(_id._id)" max-width="344" v-for="_id in contents" :key="_id">

        <!-- <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img> -->
        <img :src="getImage(_id.ImageUrl)">
        <v-card-title>{{ _id._id }} : {{ _id.Header }}</v-card-title>
        <v-card-text> {{ _id.TextData }} </v-card-text>


        <v-card-subtitle>
          โดย {{ _id.CreateBy }}
        </v-card-subtitle>

        <v-card-subtitle>
          เมื่อ {{ _id.CreateDate }}
        </v-card-subtitle>


      </v-card>
    </router-link>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    contents: [],
    getImg: null,

  }),
  methods: {
    logData() {
      console.log(this.contents);
    },
    selectContent(selected) {
      const selectData = this.contents.find(c => c._id = selected)._id;
      window.localStorage.setItem('content', selectData);
      console.log(selectData);
    },

    getImage(Url) {
      console.log(Url[0]);
      const resImg = axios.get("https://www.eduvalor.ml/backendDev/content/getImageContentByName?imageName=" + Url[0]);
      resImg.then(result => {
      this.getImg = result.data;
      });
      // const srcUrl = this.getImg.split("imageUrl : ");
      // console.log(srcUrl[1]);
      // return srcUrl[1];
    },
  },
  mounted() {
    let buffer;
    const res = axios.get("https://www.eduvalor.ml/backendDev/content/");
    res.then(result => {
      buffer = result.data;
      this.contents = result.data;
      console.log(result.data);
    });
    this.contents = buffer;
    console.log(this.contents);

  },
}
</script>
