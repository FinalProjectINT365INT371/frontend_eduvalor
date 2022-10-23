<template>
  <div class="all-content wid-80 ma-auto">
    <v-row class="my-2 pt-5">
      <v-col cols="8">
        <p class="sub-detail backHome" @click="backHome">
          <img class="pr-3 img-middle" src="../../assets/icon/left-arrow.png" />กลับหน้าแรก
        </p>
      </v-col>
      <v-col cols="12" sm="12" md="4" lg="4">
        <v-row>
          <v-col v-if="login">
            <div class="d-flex justify-center">
              <v-btn elevation="0" color="#AD9F86" class="text-white" @click="navTo()"><img class="py-3 pr-3 img-middle"
                  src="../../assets/icon/edit_white.png" />แก้ไขเนื้อหา</v-btn>
            </div>
          </v-col>
          <v-col v-if="login">
            <div class="d-flex justify-center">
              <v-btn elevation="0" class="text-brown" @click="deleteArticle"><img class="py-3 pr-3 img-middle"
                  src="../../assets/icon/trash.png" />ลบบทความ</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-divider inset></v-divider>
    </v-row>
    <v-row class="align-center">
      <v-col cols="9">
        <p class="user-name">
          <img class="pr-3 img-middle" src="../../assets/icon/user.png" />{{
              author
          }}
        </p>
      </v-col>
      <v-col cols="12" sm="12" md="3" lg="3">
        <img class="pr-3 img-middle" src="../../assets/icon/brown_clock.png" />{{ date }}
      </v-col>
      <v-divider inset></v-divider>
    </v-row>

    <h1 class="header-content">{{ title }}</h1>
    <v-img :src="imgSrc"></v-img>
    <div class="body-content width: 100%;"></div>

    <v-divider inset style="padding-bottom: 2%;"></v-divider>
    <div>
      <div class="d-flex row align-center justify-space-between">
        <div id="tag-relate" class="pb-10">
          <p class="pic-cover-arti d-flex align-center">
            <img class="pr-3 img-relate" src="../../assets/icon/tag.png" />แท็กที่เกี่ยวข้อง
          </p>
          <div>
            <v-btn elevation="2" rounded outlined :class="{ 'button-active': b1 }">รีวิว</v-btn>
            <v-btn elevation="2" rounded outlined :class="{ 'button-active': b2 }" class="mx-2">
              ศิลป์และดนตรี</v-btn>
            <v-btn elevation="2" rounded outlined class="mx-2" :class="{ 'button-active': b3 }">
              วิทยาศาสตร์</v-btn>
            <v-btn elevation="2" rounded outlined class="mx-2" :class="{ 'button-active': b4 }">
              สังคมและการเมือง</v-btn>
            <v-btn elevation="2" rounded outlined class="mx-2" :class="{ 'button-active': b5 }">
              สิ่งแวดล้อม</v-btn>
          </div>
        </div>

        <div>
          <ShareNetwork network="facebook" :url=(shareURL) :title=(title) :quote=title hashtags="EduValor" > 
            <img src="../../assets/icon/f_logo_RGB-Blue_58 1.png">
          </ShareNetwork>
          <ShareNetwork network="twitter" :url=(shareURL) :title=title hashtags="EduValor">
            <img src="../../assets/icon/Twitter social icons - circle - blue 1.png">
          </ShareNetwork>
          <ShareNetwork network="line" :url=(shareURL) :title=title hashtags="EduValor" >
            <img src="../../assets/icon/LINE_Brand_icon 1.png">
          </ShareNetwork>
        </div>
      </div>
      <v-divider inset></v-divider>

    </div>

    <div class="commentZone">
      <comment-section />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CommentSection from '../../components/CommentSection.vue';
export default {
  components: { CommentSection },
  data() {
    return {
      author: "",
      date: "",
      title: "",
      bodyContent: "",
      id: "",
      login: false,
      imgSrc: '',

      shareURL: ''

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
          process.env.VUE_APP_BACKEND_API + "/content/deletecontent?id=" +
          this.id
        )
        .then(
          this.backHome(),
          location.reload());
    },
    addedCategory(arrayCate) {
      arrayCate.forEach((e) => {
        switch (e) {
          case "รีวิว":
            this.b1 = true;
            break;
          case "ศิลป์และดนตรี":
            this.b2 = true;
            break;
          case "วิทยาศาสตร์":
            this.b3 = true;
            break;
          case "สังคมและการเมือง":
            this.b4 = true;
            break;
          case "สิ่งแวดล้อม":
            this.b5 = true;
            break;
          default:
            break;
        }
      });
    },
  },
  async mounted() {
    let head = this.$route.params;
    this.id = head.id;
    this.shareURL = 'https://eduvalor-official-dev.firebaseapp.com/' + 'article/' + this.id
    console.log(this.shareURL)

    // slug = slug.split('/article/')
    // console.log(slug[1])
    const res = await axios.get(
      process.env.VUE_APP_BACKEND_API + "/content/getContentByID?id=" + head.id
    );
    this.title = res.data.Header;
    this.date = res.data.CreateDate;
    this.author = res.data.CreateBy;

    //
    this.bodyContent = res.data.TextData;
    // console.log(res.data.ContentCategory)

    // this.button = res.data.ContentCategory;
    // console.log(res.data.ContentCategory)
    this.addedCategory(res.data.ContentCategory[0].split(","));

    //

    // console.log(res.data)
    let Url = res.data.ImageUrl[res.data.ImageUrl.length - 1]
    const resImg = axios.get(
      process.env.VUE_APP_BACKEND_API +
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
    document.getElementsByClassName("body-content")[0].innerHTML = res.data.TextData;
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
  padding-top: 2%;
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
  border-radius: 10px;

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

.commentZone {
  padding-top: 3%;
}

.pic-cover-arti {
  font-family: "Kanit";
  font-weight: 600;
  font-size: 24px;
  color: #333333;
  margin-bottom: 0px;
}
</style>