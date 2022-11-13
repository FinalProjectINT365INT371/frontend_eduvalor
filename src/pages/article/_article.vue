<template>
  <div class="all-content wid-80 ma-auto">
    <v-row class="my-2 pt-5">
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
        <img
          class="pr-3 img-middle"
          src="../../assets/icon/brown_clock.png"
        />{{ date }}
      </v-col>
      <v-divider inset></v-divider>
    </v-row>

    <h1 class="header-content">{{ title }}</h1>
    <v-img :src="imgSrc" id="coverPic"></v-img>
    <div class="body-content width: 100%;"></div>

    <v-divider inset style="padding-bottom: 2%"></v-divider>
    <div style="padding-bottom: 2%">
      <p class="pic-cover-arti d-flex align-center">
        <img
          class="pr-3 img-relate"
          src="../../assets/icon/bx_street-view.png"
        />เห็นตัวอย่างสถานที่จริงด้วย Street View!
      </p>
      <gmap-street-view-panorama
        ref="pano"
        :position="latLng"
        :pov="pov"
        :zoom="1"
        style="width: 1100px; height: 300px"
      >
      </gmap-street-view-panorama>
      <div id="opt-places">
        <p class="pic-cover-arti d-flex align-center">
          <img
            class="pr-3 img-relate"
            src="../../assets/icon/gps.png"
          />ตามรอยสถานที่อื่น ๆ ที่เกี่ยวข้อง
        </p>
        <v-card class="d-flex justify-space-around">
          <gmap-map
            :center="latLng"
            :zoom="15"
            map-type-id="terrain"
            style="width: 225px; height: 225px"
            :options="{
              zoomControl: false,
              mapTypeControl: false,
              scaleControl: false,
              streetViewControl: false,
              rotateControl: false,
              fullscreenControl: false,
              disableDefaultUi: false,
              draggable: false,
            }"
          >
            <gmap-marker
              :position="latLng"
              :clickable="true"
              :draggable="false"
              @click="center = latLng"
            />
          </gmap-map>

          <div style="width:500px;">
            <v-card-title> {{ mainLatLng.name }}</v-card-title>
            <v-card-text> {{  mainLatLng.formatted_address }}</v-card-text>
            <v-card-action>
              <a :href="mainLatLng.url">See more MAP </a></v-card-action
            >
          </div>
        </v-card>
      </div>
    </div>
    <v-divider inset style="padding-bottom: 2%"></v-divider>
    <div>
      <div class="d-flex row align-center justify-space-between">
        <div id="tag-relate" class="pb-10">
          <p class="pic-cover-arti d-flex align-center">
            <img
              class="pr-3 img-relate"
              src="../../assets/icon/tag.png"
            />แท็กที่เกี่ยวข้อง
          </p>
          <div>
            <v-btn
              v-if="b1"
              elevation="2"
              rounded
              outlined
              class="button-active"
              >รีวิว</v-btn
            >
            <v-btn
              v-if="b2"
              elevation="2"
              rounded
              outlined
              class="mx-2 button-active"
            >
              ศิลป์และดนตรี</v-btn
            >
            <v-btn
              v-if="b3"
              elevation="2"
              rounded
              outlined
              class="mx-2 button-active"
            >
              วิทยาศาสตร์</v-btn
            >
            <v-btn
              v-if="b4"
              elevation="2"
              rounded
              outlined
              class="mx-2 button-active"
            >
              สังคมและการเมือง</v-btn
            >
            <v-btn
              v-if="b5"
              elevation="2"
              rounded
              outlined
              class="mx-2 button-active"
            >
              สิ่งแวดล้อม</v-btn
            >
          </div>
        </div>

        <div class="d-flex justify-space-around">
          <ShareNetwork
            network="facebook"
            :url="shareURL"
            :title="title"
            :quote="title"
            hashtags="EduValor"
          >
            <img
              src="../../assets/icon/f_logo_RGB-Blue_58 1.png"
              height="48px"
            />
          </ShareNetwork>
          <ShareNetwork
            network="twitter"
            :url="shareURL"
            :title="title"
            hashtags="EduValor"
          >
            <img
              src="../../assets/icon/Twitter social icons - circle - blue 1.png"
              height="48px"
            />
          </ShareNetwork>
          <ShareNetwork
            network="line"
            :url="shareURL"
            :title="title"
            hashtags="EduValor"
          >
            <img src="../../assets/icon/LINE_Brand_icon 1.png" height="48px" />
          </ShareNetwork>
          <button @click="copyClipboard">
            <img src="../../assets/icon/el_paper-clip-alt.png" height="48px" />
          </button>

          <v-snackbar v-model="snackbar" color="#333333">
            {{ snackbarText }}

            <template v-slot:action="{ attrs }">
              <v-btn
                color="#AD9F86"
                text
                v-bind="attrs"
                @click="snackbar = false"
              >
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </div>
      </div>
      <v-divider inset></v-divider>

      <div class="commentZone">
        <approve-comment />
        <!-- <comment-section /> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import CommentSection from '../../components/CommentSection.vue';
import ApproveComment from "../../components/ApproveComment.vue";
import { gmapApi } from "vue2-google-maps";
export default {
  name: "_article",
  components: {
    // CommentSection,
    ApproveComment,
  },
  data() {
    return {
      author: "",
      date: "",
      title: "",
      bodyContent: "",
      id: "",
      login: false,
      imgSrc: "",

      shareURL: "",

      snackbar: false,
      snackbarText: `คัดลอกลิงก์ไปยัง Clipboard สำเร็จแล้ว`,

      b1: false,
      b2: false,
      b3: false,
      b4: false,
      b5: false,

      pov: {
        heading: 0,
        pitch: 0,
      },
      latLng:[],
      mainLatLngString: "",
      mainLatLng: [],
      main_address_detail: "",
      main_placeID: "",

      placeAPIobj: {},
      placeAPIName: "",
      placeAPIDetail: "",
      placeAPIUrl: "",
    };
  },
  computed: {
    google: gmapApi,
  },
  methods: {
    navTo() {
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
          process.env.VUE_APP_BACKEND_API +
            "/content/deletecontent?id=" +
            this.id
        )
        .then(this.backHome(), location.reload());
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
    copyClipboard() {
      this.snackbar = true;
      this.$clipboard(this.shareURL); // this.$clipboard copy any String/Array/Object you want
    },

    changeStringToObj() {
      this.mainLatLng = JSON.parse(this.mainLatLngString);
      console.log(this.mainLatLng);

      this.latLng = this.mainLatLng.geometry.location
      console.log(this.latLng);
    },

    async reverseGeocoding() {
      const res = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
          this.mainLatLng.lat +
          "," +
          this.mainLatLng.lng +
          "&key=" +
          process.env.VUE_APP_MAP_ACCESS_TOKEN
      );

      this.main_address_detail = res.data.results[0].formatted_address;
      this.main_placeID = res.data.results[0].place_id;
      // console.log(res.data.results[0]);
      console.log(this.mainLatLng);

      this.placeAPIHero();
    },
    async placeAPIHero() {
      const res = await axios.get(
        "https://cors-anywhere.herokuapp.com/" +
          "https://maps.googleapis.com/maps/api/place/details/json?place_id=" +
          this.main_placeID +
          "&key=" +
          process.env.VUE_APP_MAP_ACCESS_TOKEN
      );
      console.log(res.data.result);
      if (res) {
        this.placeAPIobj = res.data.result;
        this.placeAPIName = res.data.result.name;
        this.placeAPIDetail = res.data.result.formatted_address;
        this.placeAPIUrl = res.data.result.url;
      }
    },
  },
  async mounted() {
    let head = this.$route.params;
    this.id = head.id;
    this.shareURL =
      "https://eduvalor-official-dev.firebaseapp.com/" + "article/" + this.id;

    const res = await axios.get(
      process.env.VUE_APP_BACKEND_API + "/content/getContentByID?id=" + head.id
    );
    this.title = res.data.Header;
    this.date = res.data.CreateDate;
    this.author = res.data.CreateBy;

    this.mainLatLngString = res.data.Coordinate;
    this.changeStringToObj();
    // this.reverseGeocoding();
    // this.placeIdApi();

    //
    this.bodyContent = res.data.TextData;
    this.addedCategory(res.data.ContentCategory[0].split(","));
    //

    let Url = res.data.ImageUrl[res.data.ImageUrl.length - 1];
    const resImg = axios.get(
      process.env.VUE_APP_BACKEND_API +
        "/content/getImageContentByName?imageName=" +
        Url
    );
    resImg.then((result) => {
      this.getImg = result.data;
      const srcUrl = this.getImg.split("imageUrl : ");
      this.imgSrc = srcUrl[1];
    });
    document.getElementsByClassName("body-content")[0].innerHTML =
      res.data.TextData;
    if (localStorage.getItem("login") == "true") {
      this.login = true;
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
.body-content img,
#coverPic {
  width: 50%;
}
</style>