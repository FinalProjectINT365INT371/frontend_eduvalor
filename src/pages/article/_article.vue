<template>
  <div class="all-content">
    <div class="wid-80 ma-auto">
      <v-row class="my-auto row-top-article">
        <v-col>
          <p class="backHome d-flex align-center" @click="backHome">
            <img
              class="pr-3"
              id="back-arrow"
              src="../../assets/icon/left-arrow.png"
            />กลับหน้าแรก
          </p>
        </v-col>
        <!-- -->
        <v-col  v-if="creatorOfContent"  cols="12" sm="12" md="4" lg="4" class="col-crud-btn">
          <v-row class="row-crud-btn">
            <div class="d-flex justify-center">
              <v-btn
                elevation="0"
                color="#AD9F86"
                class="text-white"
                @click="navTo()"
                ><img
                  class="py-3 pr-3 img-icon-crud"
                  src="../../assets/icon/edit_white.png"
                />แก้ไขเนื้อหา</v-btn
              >
            </div>
            <div class="d-flex justify-center">
              <v-btn elevation="0" class="text-brown" @click="deleteArticle"
                ><img
                  class="py-3 pr-3 img-icon-crud"
                  src="../../assets/icon/trash.png"
                />ลบบทความ</v-btn
              >
            </div>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="d-flex align-center row-date">
        <v-col cols="9">
          <p class="user-name">
            <img
              class="pr-3 img-icon"
              id="avatar-pic"
              src="../../assets/icon/user.png"
            />{{ author }}
          </p>
        </v-col>
        <v-col cols="12" sm="12" md="3" lg="3" class="col-date">
          <!-- <img
          class="pr-2 img-icon" id="img-date"
          src="../../assets/icon/brown_clock.png"
        /> -->
          {{ date }}
        </v-col>
      </v-row>
      <v-divider></v-divider>

      <h1 class="header-content">{{ title }}</h1>
      <v-img :src="imgSrc" id="coverPic"></v-img>
      <div class="body-content"></div>

      <v-divider style="padding-bottom: 2%"></v-divider>
      <div style="padding-bottom: 2%">
        <p class="pic-cover-arti d-flex align-center">
          <img
            class="pr-3 img-icon"
            id="pegman-img"
            src="../../assets/icon/bx_street-view.png"
          />เห็นตัวอย่างสถานที่จริงด้วย Street View!
        </p>
        <div class="d-flex justify-center pb-5">
          <gmap-street-view-panorama
            ref="pano"
            :position="mainLatLng"
            :zoom="1"
            style="width: 920px; height: 300px"
          >
          </gmap-street-view-panorama>
        </div>
        <div id="opt-places">
          <p class="pic-cover-arti d-flex align-center">
            <img
              class="pr-3 img-icon"
              src="../../assets/icon/gps.png"
            />ตามรอยสถานที่อื่น ๆ ที่เกี่ยวข้อง
          </p>

          <div
            class="d-flex justify-center"
            v-for="(optGPS, index) in optGPSobj"
            :key="index"
          >
            <v-card class="d-flex justify-space-between gps-card" outlined>
              <gmap-map
                class="d-flex gmap-pin"
                :center="optGPS.geometry"
                :zoom="15"
                map-type-id="terrain"
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
                  :position="optGPS.geometry"
                  :clickable="true"
                  :draggable="false"
                  @click="center = optGPS.geometry"
                />
              </gmap-map>

              <div style="width: 500px">
                <v-card-title> {{ optGPS.name }}</v-card-title>
                <v-card-text> {{ optGPS.formatted_address }}</v-card-text>

                <v-btn
                  :href="optGPS.url"
                  elevation="1"
                  x-large
                  color="#AD9F86"
                  class="text-white more-info-btn"
                  ><img
                    class="img-icon-btn"
                    src="../../assets/icon/eva_pin-fill.png"
                  />
                  ข้อมูลเพิ่มเติม
                </v-btn>
              </div>
            </v-card>
          </div>
        </div>
      </div>
      <v-divider style="padding-bottom: 2%"></v-divider>
      <div>
        <!-- <div class="d-flex row align-center justify-space-between bottom-content"> -->
          <p class="pic-cover-arti d-flex align-center">
            <img
              class="pr-3 img-icon"
              src="../../assets/icon/tag.png"
            />แท็กที่เกี่ยวข้อง
          </p>
        <div class="d-flex bottom-content">
          <div id="tag-relate" class="pb-6">
            
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

          <div class="d-flex justify-space-around social-container">
            <ShareNetwork
              network="facebook"
              :url="shareURL"
              :title="title"
              :quote="title"
              hashtags="EduValor"
            >
              <img
                class="social-icons"
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
                class="social-icons"
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
              <img
                src="../../assets/icon/LINE_Brand_icon 1.png"
                class="social-icons"
                height="48px"
              />
            </ShareNetwork>
            <button @click="copyClipboard">
              <img
                src="../../assets/icon/el_paper-clip-alt.png"
                class="social-icons"
                height="48px"
              />
            </button>
          </div>
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
      <v-divider></v-divider>

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

      mainLatLng: {},
      mainGPSobj: [],

      optGPSobj: [],
      optLatLng: {},

      allGPSStrings: "",

      userData: null,
      creatorOfContent: false,
    };
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
      let token = this.$cookies.get("JWT_TOKEN");
      const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
      axios
        .delete(
          process.env.VUE_APP_BACKEND_API +
            "/content/deletecontent?id=" +
            this.id,
            config
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

    async changeStringToObj() {
      for (let i = 0; i <= this.allGPSStrings.length; i++) {
        if (i == 0) {
          this.mainGPSobj = JSON.parse(this.allGPSStrings[i]);
          this.mainLatLng = this.mainGPSobj.geometry;
        } else {
          let tempArrayString = this.allGPSStrings;
          this.optGPSobj.push(JSON.parse(tempArrayString[i]));
        }
      }
    },
    setUserData() {
      this.userData = this.$cookies.get("USER_DATA");
    },
  },
  async mounted() {
    this.setUserData();
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

    this.allGPSStrings = res.data.Coordinate;
    console.log(this.allGPSStrings);

    this.changeStringToObj();

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
    if (this.$cookies.get("USER_DATA") != null) {
      // console.log(this.id);
      // console.log(this.userData.ContentCreated.includes(this.id));
      if (this.userData.ContentCreated.includes(this.id)) {
        this.creatorOfContent = true;
      }
      //this.login = true;
    }

    console.log(this.userData);
  },
};
</script>

<style scoped>
.v-divider {
  width: 100%;
}
.button-active {
  background: #ad9f86;
  border-radius: 20px;
  color: #ffffff;
  border-color: #ad9f86;
}
.wid-80 {
  background-color: #ffffff;
  font-family: "Bai Jamjuree";
}
.gmap-pin {
  width: 280px;
  height: auto;
}
.header-content {
  font-family: "Kanit";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: normal;
  padding-top: 36px;
}
.user-name {
  font-family: "Bai Jamjuree";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: #ad9f86;
}
#avatar-pic {
  width: 56px;
}
#img-date {
  width: 32px;
}
.col-date {
  margin-bottom: 8px;
  padding-top: 0%;
  font-size: 14px;
  text-align: end;
}

.img-icon {
  vertical-align: middle;
}
.text-white {
  color: white !important;
  font-family: "Kanit";
  font-style: normal;
  border-radius: 10px;
  font-weight: 400;
  font-size: 13px;
}

.text-brown {
  color: #ad9f86 !important;
  border: 1px solid #ad9f86 !important;
  background-color: white !important;
  border-radius: 10px;
  font-family: "Kanit";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
}
.commentZone {
  padding-top: 3%;
}

.pic-cover-arti {
  margin-top: 28px;
  margin-bottom: 20px;
  font-family: "Kanit";
  font-weight: 600;
  font-size: 20px;
  color: #333333;
}
.body-content {
  margin-bottom: 36px;
}
.body-content >>> img {
  max-width: 100%;
}

#coverPic {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

#pegman-img {
  width: auto;
  height: 40px;
}

@media screen and (min-width: 320px) {
  .img-icon {
    width: 36px;
  }
  .img-icon-btn {
    width: 28px;
  }
  #back-arrow {
    width: 36px;
  }
  .backHome {
    font-family: "Bai Jamjuree";
    font-style: normal;
    font-weight: 400;
    color: #ad9f86;
    font-size: 18px;
    cursor: pointer;
    padding-top: 5%;
  }
  .wid-80 {
    width: 90%;
  }
  .col-crud-btn {
    padding-bottom: 16px;
    flex-direction: row;
  }
  .row-crud-btn {
    justify-content: space-around;
  }

  .img-icon-crud {
    width: 32px;
  }
  .v-btn:not(.v-btn--round).v-size--default {
    padding: 0 6px;
  }
  .col-9 {
    min-width: 100%;
    padding-bottom: 0%;
  }
  .gps-card {
    margin-bottom: 16px;
    width: 920px;
  }
  .bottom-content {
    flex-direction: column;
    align-items: flex-start !important;
  }
  .social-container {
    align-self: flex-end;
    width: 55%;
    margin-bottom: 16px;
  }
  .social-icons {
    height: 40px;
  }
  .v-card__title {
    font-size: 1em;
    font-weight: 600;
  }
  .more-info-btn {
    height: fit-content !important;
    font-size: 12px;
    padding: 4px !important;
    margin: 0px 0px 16px 16px;
  }
}

@media screen and (min-width: 768px) {
  .wid-80 {
    padding: 0% 5%;
    width: 75%;
  }
  .all-content {
    background: rgb(255, 255, 255);
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(237, 230, 218, 1) 100%
    );
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
  .social-container {
    width: 35%;
  }
  .col-12,
  .col-sm-12,
  .col-md-4 {
    flex: 0%;
    align-self: center;
  }
  .row-crud-btn {
    flex-wrap: nowrap;
  }
  .row-date{
    flex-wrap: nowrap;
  }
  .col-9{
    flex: 0%;
    min-width: fit-content;
    width: 50%;
  }
  .col-date{
    margin-bottom: 0%;
    max-width: fit-content;
  }
}

@media screen and (min-width: 1024px) {
  .wid-80 {
    width: 60%;
  }
  .all-content{
    margin-bottom: 60px;
  }
  .row-top-article {
    display: flex;
  }
  .col-crud-btn {
    display: flex;
  }
  .row-crud-btn {
    flex-direction: row;
  }
  .social-container{
    width: 25%;
  }
  .bottom-content{
    flex-direction: row;
    justify-content: space-between;
  }  
}
</style>