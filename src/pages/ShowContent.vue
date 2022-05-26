<template>
  <div>
    <v-card-title>{{ content._id }} : {{ content.Header }}</v-card-title>
    <v-card-text class="content-box"> {{ content.TextData }} </v-card-text>


    <v-card-subtitle>
      โดย {{ content.CreateBy }}
    </v-card-subtitle>

    <v-card-subtitle>
      เมื่อ {{ content.CreateDate }}
    </v-card-subtitle>
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
    const res = axios.get(process.env.VUE_APP_BACKEND_API+"/content/getContentByID?id=" + id);
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
  .img-sizing {
    width: 40%;
  }
}

@media screen and (max-width: 767px) {
  .img-sizing {
    width: 75%;
  }
}










.content-box p~img {
  width: auto;
}
</style>

