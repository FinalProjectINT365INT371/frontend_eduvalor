<template>
  <div class="div-content">
    <div class="d-flex justify-center">
      <v-container class="content-container">
        <v-card-title>
          <h2>{{ content.Header }}</h2>
        </v-card-title>
        <img src="https://www.traveldb.me/wp-content/uploads/2021/01/bangkok-sea-life-ocean-world.jpg" class="sealife">
        <v-card-text class="content-box"> {{ textDataObj.TextData }} </v-card-text>


        <v-card-subtitle>
          โดย <b>{{ content.CreateBy }}</b> เมื่อ <b>{{ content.CreateDate }}</b>
        </v-card-subtitle>
        <button>
          <router-link to="/"> <img src="../assets/left-arrow.png" /> Back </router-link>
        </button>
      </v-container>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      content: [],
      textDataObj: [],
      selected: null,
    }
  },

  mounted() {
    // let buffer;
    let id = window.localStorage.getItem("content")
    let textBuffer;
    let buffer;
    const res = axios.get(process.env.VUE_APP_BACKEND_API + "/content/getContentByID?id=" + id);
    res.then(result => {
      buffer = result.data;
      this.content = result.data;
      console.log(buffer);

      textBuffer = result.data.TextData[0];
      this.textDataObj = result.data.TextData[0];
      document.getElementsByClassName('content-box')[0].innerHTML = textBuffer;

      const childNodes =
        document.getElementsByClassName("content-box")[0].childNodes;
      const unknow = [];
      childNodes.forEach((data) => {
        data.childNodes.forEach((data) => {
          if (String(data.nodeName) === "IMG") {
            data.classList.add("img-sizing");
            unknow.push(data);
          }
        });
      });
      console.log(unknow);
      console.log(textBuffer);
    });
    // this.content = buffer
    this.content = buffer;
    this.textDataObj = textBuffer;
    console.log(buffer);
    // this.changeImgSize();

    // console.log(this.contents);
  },
}
</script>

<style>
@media screen and (max-width: 2000px) {
  .img-sizing {
    width: 30%;
  }
}

@media screen and (max-width: 1023px) {

  .sealife,
  .img-sizing {
    /* width: 40%; */
    width: 100%;

  }
}

@media screen and (max-width: 767px) {

  .sealife,
  .img-sizing {
    width: 75%;
  }
}

.sealife {
  display: flex;
  justify-self: center;
  max-width: auto;
}

.content-container {
  padding: 1.5%;
  margin: 1.5%;
}

.div-content {
  display: flex;
  justify-content: center;
}
</style>

