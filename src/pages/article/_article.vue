<template>
  <div class="all-content wid-80 ma-auto">
    <v-row class="my-2">
      <v-col cols="8">
        <p class="sub-detail backHome" @click="backHome">
          <img
            class="pr-3 img-middle"
            src="../../assets/icon/left-arrow.png"
          />กลับหน้าแรก
        </p>
      </v-col>
      <v-col cols="12" sm="12" md="4" lg="4">
        <v-row>
          <v-col v-if="login">
            <div class="d-flex justify-center">
              <v-btn
                elevation="0"
                color="#AD9F86"
                class="text-white"
                @click="navTo()"
                ><img
                  class="py-3 pr-3 img-middle"
                  src="../../assets/icon/edit_white.png"
                />แก้ไขเนื้อหา</v-btn
              >
            </div>
          </v-col>
          <v-col v-if="login">
            <div class="d-flex justify-center">
              <v-btn elevation="0" class="text-brown" @click="deleteArticle"
                ><img
                  class="py-3 pr-3 img-middle"
                  src="../../assets/icon/trash.png"
                />ลบบทความ</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="9">
        <p class="user-name">
          <img class="pr-3 img-middle" src="../../assets/icon/user.png"/>{{
            author
          }}
        </p>
      </v-col>
      <v-col cols="12" sm="12" md="3" lg="3">
        <img
          class="pr-3 img-middle"
          src="../../assets/icon/brown_clock.png"
        />{{ date }}
      </v-col>
    </v-row>

    <h1 class="header-content">{{ title }}</h1>
    <v-img :src="imgSrc"></v-img>
    <div class="body-content width: 100%;"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      author: "",
      date: "",
      title: "",
      bodyContent: "",
      id: "",
      login: false,
      imgSrc: ''
    };
  },
  methods: {
    navTo() {
      console.log(this.id);
      this.$router.push({
        path: "/CreateContent/" + this.id,
      });
    },
    backHome() {
      this.$router.push({
        path: "/",
      });
    },
    deleteArticle() {
      axios
        .delete(
          process.env.VUE_APP_BACKEND_API_PROD+"/content/deletecontent?id=" +
            this.id
        )
        .then(
          this.backHome(),
          location.reload());
    },
  },
  async mounted() {
    let head = this.$route.params;
    this.id = head.id;
    // slug = slug.split('/article/')
    // console.log(slug[1])
    const res = await axios.get(
      process.env.VUE_APP_BACKEND_API_PROD +"/content/getContentByID?id=" + head.id
    );
    this.title = res.data.Header;
    this.date = res.data.CreateDate;
    this.author = res.data.CreateBy;
    this.bodyContent = res.data.TextData;
    console.log(res.data)
    let Url = res.data.ImageUrl[res.data.ImageUrl.length - 1] 
    const resImg = axios.get(
          process.env.VUE_APP_BACKEND_API_PROD +
            "/content/getImageContentByName?imageName=" +
            Url
        );
            resImg.then((result) => {
          this.getImg = result.data;
          const srcUrl = this.getImg.split("imageUrl : ");
          //console.log(srcUrl[1]);

          this.imgSrc = srcUrl[1];
          //console.log(this.contents.imgSrc);
        });
    document.getElementsByClassName("body-content")[0].innerHTML =res.data.TextData;
    if (localStorage.getItem('login') == 'true') {
      this.login = true
    }
  },
};
</script>

<style>
.wid-80 {
  width: 80%;
  font-family: "Bai Jamjuree";
}
.sub-wid {
  width: 90%;
}
.header-content {
  font-family: "Kanit";
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 54px;
}
.sub-detail {
  font-family: "Bai Jamjuree";
  font-style: normal;
  font-weight: 400;
  color: #ad9f86;
  font-size: 24px;
}
.user-name {
  font-family: "Bai Jamjuree";
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 35px;
  color: #ad9f86;
}
.img-middle {
  vertical-align: middle;
}
.text-white {
  color: white !important;
  font-family: "Kanit";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
}
.text-brown {
  color: #ad9f86 !important;
  border: 1px solid #ad9f86 !important;
  background-color: white;
  border-radius: 10px;
  font-family: "Kanit";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
}
.backHome {
  cursor: pointer;
}
</style>