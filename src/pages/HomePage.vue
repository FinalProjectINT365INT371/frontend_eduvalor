<template>
  <div>
    <router-link to="/ShowContent" >
      <v-card hover shaped class="mx-auto content-thumbnail" @click="selectContent(_id._id)" max-width="400"
        v-for="_id in contents" :key="_id._id">

        <v-img src="https://www.traveldb.me/wp-content/uploads/2021/01/bangkok-sea-life-ocean-world.jpg"></v-img>
        <v-img :src="`${_id.imgSrc}`" class="thumbnails"></v-img>
        <v-card-title class="test-underline">{{ _id._id }} : {{ _id.Header }}</v-card-title>

        <v-card-subtitle color="white">
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
    getImg: [],
  }),

  methods: {
    selectContent(selected) {
      const selectData = this.contents.find(c => c._id = selected)._id;
      window.localStorage.setItem('content', selectData);
      //console.log(selectData);
    },
  },

  mounted() {
    // let buffer;
    const res = axios.get(process.env.VUE_APP_BACKEND_API + "/content/");
    res.then(result => {
      // buffer = result.data;
      this.contents = result.data;
      //console.log(result.data);
      this.contents = this.contents.map(function (el) {
        const o = Object.assign({}, el);
        o.imgSrc = "";
        return o;
      });

      for (let index = 0; index < this.contents.length; index++) {
        let Url = this.contents[index].ImageUrl[0];
        //console.log(Url);
        const resImg = axios.get(process.env.VUE_APP_BACKEND_API + "/content/getImageContentByName?imageName=" + Url);
        //console.log(resImg);
        resImg.then(result => {
          this.getImg = result.data;
          const srcUrl = this.getImg.split("imageUrl : ");
          //console.log(srcUrl[1]);

          this.contents[index].imgSrc = srcUrl[1];
          //console.log(this.contents.imgSrc);
        });
      }
    });
  },
}
</script>

<style lang="scss">
.content-thumbnail {
  padding: 1.5%;
  margin: 1.5%;
}

// @media screen and (max-width: 767px) {
//   .thumbnails {
//   width: 30%;
// }
// }

// @media screen and (max-width: 1023px) {
//   .thumbnails {
//   width: 40%;
// }
// }

// @media screen and (max-width: 2000px) {
//   .thumbnails {
//   width: 70%;
// }
// }
.test-underline{
  text-decoration: none;
}

</style>>
