<template>
  <div id="app" class="overflow-auto">
    <v-form v-model="valid" @submit.prevent="submit" ref="form">
      <div class="d-flex justify-center big-box">
        <div class="d-inline box-padding" style="background-color: white">
          <p class="backHome d-flex align-center" @click="backHome">
            <img
              class="pr-3"
              id="back-arrow"
              src="../assets/icon/left-arrow.png"
            />กลับหน้าแรก
          </p>
          <p class="inside-width head-topic ma-auto">แบ่งปันเรื่องราวความรู้</p>
          <div class="inside-width ma-auto">
            <v-text-field
              class="input-style blog_title"
              v-model="article_name"
              :rules="titleRules"
              :counter="50"
              required
              label="ชื่อบทความ"
            >
              <template #label>
                <div class="label-input">
                  ชื่อบทความ<span class="red--text">*</span>
                </div>
              </template>
            </v-text-field>

            <v-text-field
              class="input-style"
              v-model="author_name"
              :rules="nameRules"
              :counter="90"
              required
            >
              <template #label>
                <div class="label-input">
                  ชื่อผู้เขียน<span class="red--text">*</span>
                </div>
              </template>
            </v-text-field>

            <v-row id="img-input-box">
              <v-col cols="10" sm="11" md="4" lg="4" id="col-img">
                <p class="pic-cover">
                  รูปหน้าปกบทความ<span style="color: red">*</span>
                </p>
                <p class="sub-detail">ขนาดขั้นต่ำควรเป็น 400 x 188px</p>
              </v-col>
              <v-col cols="1" sm="1" md="1" lg="1">
                <v-file-input
                  v-model="image"
                  @change="Preview_image"
                  hide-input
                  :rules="imageRules"
                  truncate-length="15"
                ></v-file-input>
              </v-col>
              <v-col
                cols="12"
                sm="12"
                md="7"
                lg="7"
                class="pt-0 d-flex justify-center preview-img-box"
              >
                <v-img :src="url" id="preview-img" />
              </v-col>
            </v-row>

            <div id="body-block">
              <p class="pic-cover">
                เนื้อหาบทความ<span style="color: red">*</span>
              </p>
              <quill-editor
                class="quill"
                ref="myQuillEditor"
                v-model="textEditorContent"
                :options="editorOption"
                required
                :rules="quillRules"
              />
              <p v-if="params != undefined" class="text-red">
                กรุณาใส่รูปทั้งหมดใหม่ทุกครั้งที่มีการแก้ไข
              </p>
            </div>

            <div id="tag-relate" class="pb-5">
              <p class="pic-cover d-flex align-center">
                <img
                  class="pr-3 img-icon"
                  src="../assets/icon/tag.png"
                />แท็กที่เกี่ยวข้อง<span style="color: red">*</span>
              </p>
              <p class="sub-detail">
                ติดขั้นต่ำ 1 แท็ก แต่มากสุดได้ไม่เกิน 3 แท็ก
              </p>
              <div class="">
                <v-btn
                  elevation="2"
                  @click="activeButton(0)"
                  rounded
                  outlined
                  :class="{ 'button-active': b1 }"
                  >รีวิว
                </v-btn>
                <v-btn
                  elevation="2"
                  @click="activeButton(1)"
                  rounded
                  outlined
                  :class="{ 'button-active': b2 }"
                  class="mx-2"
                  >ศิลป์และดนตรี</v-btn
                >
                <v-btn
                  elevation="2"
                  @click="activeButton(2)"
                  rounded
                  outlined
                  class="mx-2"
                  :class="{ 'button-active': b3 }"
                  >วิทยาศาสตร์</v-btn
                >
                <v-btn
                  elevation="2"
                  @click="activeButton(3)"
                  rounded
                  outlined
                  class="mx-2"
                  :class="{ 'button-active': b4 }"
                  >สังคมและการเมือง</v-btn
                >
                <v-btn
                  elevation="2"
                  @click="activeButton(4)"
                  rounded
                  outlined
                  class="mx-2"
                  :class="{ 'button-active': b5 }"
                  >สิ่งแวดล้อม</v-btn
                >
              </div>
              <p v-if="categoryValidate" class="text-red">
                กรุณาเลือกแท็กที่เกี่ยวข้อง
              </p>
            </div>
            <p class="pic-cover d-flex align-center" id="mainGPS-heading">
              <img
                class="pr-3 img-icon"
                src="../assets/icon/gps.png"
              />แหล่งเรียนรู้ที่เกี่ยวข้อง<span style="color: red">*</span>
            </p>
            <div class="ggMapPin">
              <p class="sub-detail">
                <b>กรุณากรอกสถานที่ 1 ตำแหน่ง</b> โดยส่วนนี้จะแสดงผลเป็น Street
                View <br />(จะเป็นสถานที่แรกที่พูดถึงในบทความ,
                สถานที่ที่อยากแนะนำเป็นพิเศษ ฯลฯ ก็ได้)
              </p>
              <g-g-map-pinning @addMarkers="addCoordinate($event)" />
            </div>

            <div class="pt-7">
              <p class="pic-cover">แหล่งเรียนรู้ที่เกี่ยวข้องอื่น ๆ</p>
              <p class="sub-detail">
                กรอกตำแหน่งสถานที่อื่น ๆ เพิ่มเติม
                แต่ส่วนนี้จะแสดงผลเป็นลิงก์ไปยัง Google Map แทน (ไม่บังคับ)
              </p>
              <more-autocomplete @addMoreGPS="addMoreCoords($event)" />
            </div>
            <div class="d-flex justify-center pb-10 save-btn">
              <v-btn
                elevation="3"
                x-large
                color="#AD9F86"
                class="text-white"
                @click="submit"
                ><img
                  class="py-3 pr-3 img-icon"
                  src="../assets/icon/save.png"
                />บันทึกและเผยแพร่</v-btn
              >
            </div>
          </div>
        </div>
      </div>
    </v-form>
  </div>
</template>
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

import { quillEditor } from "vue-quill-editor";
import axios from "axios";
import GGMapPinning from "../components/GGMapPinning.vue";
import MoreAutocomplete from "../components/MoreAutocomplete.vue";

export default {
  components: {
    quillEditor,
    GGMapPinning,
    MoreAutocomplete,
  },

  data: () => ({
    valid: false,
    author_name: "",
    article_name: "",
    counter: 0,
    image: null,
    url: null,
    nameRules: [
      (v) => !!v || "กรุณาใส่ชื่อนักเขียน",
      (v) => v.length <= 30 || "Name must be less than 30 characters",
    ],
    title: "",
    imageRules: [(v) => !!v || "กรุณาเพิ่มไฟล์"],
    titleRules: [
      (v) => !!v || "กรุณาใส่ชื่อบทความ",
      (v) => v.length <= 60 || "Blog Title must be less than 60 characters",
    ],
    quill: "",
    quillRules: [
      (v) => !!v || "Content is required",
      (v) => v != null || "Must contain some Content",
    ],

    editorOption: {
      // debug: "info",
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          ["link", "image"],
          [{ color: [] }],
          [{ align: [] }],
        ],
      },
      placeholder: "เขียนเล่าเรื่องราวสถานที่ที่น่าสนใจตรงนี้เลย!",
      readOnly: true,
      theme: "snow",
    },
    delta: undefined,
    textEditorContent: "",
    params: undefined,
    b1: false,
    b2: false,
    b3: false,
    b4: false,
    b5: false,
    categoryValidate: true,
    quillValidate: true,
    button: {
      b1: false,
      b2: "non-active",
      b3: "non-active",
      b4: "non-active",
      b5: "non-active",
    },
    coordinates: [],
    moreCoordinates: [],
  }),
  methods: {
    Preview_image() {
      this.url = URL.createObjectURL(this.image);
    },
    getClassButton(index) {
      return this.button[index];
    },
    checkCounter() {
      let rawArray = [this.b1, this.b2, this.b3, this.b4, this.b5];
      let counter = 0;
      rawArray.forEach((e) => {
        if (e == true) {
          counter = counter + 1;
        }
      });
      if (counter > 2) {
        return false;
      } else {
        return true;
      }
    },
    activeButton(index) {
      let rawArray = [this.b1, this.b2, this.b3, this.b4, this.b5];
      if (rawArray[index] == true) {
        switch (index) {
          case 0:
            this.b1 = false;
            break;
          case 1:
            this.b2 = false;
            break;
          case 2:
            this.b3 = false;
            break;
          case 3:
            this.b4 = false;
            break;
          case 4:
            this.b5 = false;
            break;
          default:
            break;
        }
      } else {
        if (this.checkCounter()) {
          this.categoryValidate = false;
          switch (index) {
            case 0:
              this.b1 = true;
              break;
            case 1:
              this.b2 = true;
              break;
            case 2:
              this.b3 = true;
              break;
            case 3:
              this.b4 = true;
              break;
            case 4:
              this.b5 = true;
              break;
            default:
              break;
          }
        }
      }
    },
    backHome() {
      this.$router.push({
        path: "/",
      });
    },
    addCategory(arrayCate) {
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

    checkTag() {
      let rawArray = [this.b1, this.b2, this.b3, this.b4, this.b5];
      rawArray.forEach((e) => {
        if (e === true) {
          this.categoryValidate = false;
        }
      });
    },

    addCoordinate(marker) {
      let coordinate_obj = {
        name: marker.name,
        formatted_address: marker.formatted_address,
        url: marker.url,
        geometry: marker.geometry.location,
      };
      let coordinate_string = JSON.stringify(coordinate_obj);
      this.coordinates[0] = coordinate_string;
    },

    addMoreCoords(places) {
      if (places) {
        this.moreCoordinates = [];
        for (let i = 0; i < places.length; i++) {
          let morePlaces_obj = {
            name: places[i].name,
            formatted_address: places[i].formatted_address,
            url: places[i].url,
            geometry: places[i].geometry.location,
          };
          console.log(morePlaces_obj);
          let morePlaces_string = morePlaces_obj;
          this.moreCoordinates.push(JSON.stringify(morePlaces_string));
          console.log(this.moreCoordinates);
        }
      }
    },

    quillValidation() {
      if (this.textEditorContent !== "") {
        this.quillRules = false;
      } else {
        this.quillRules = true;
      }
    },

    submit() {
      this.checkTag();
      this.quillValidation();
      function DataURIToBlob(dataURI) {
        const splitDataURI = dataURI.split(",");
        const byteString =
          splitDataURI[0].indexOf("base64") >= 0
            ? atob(splitDataURI[1])
            : decodeURI(splitDataURI[1]);
        const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

        const ia = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++)
          ia[i] = byteString.charCodeAt(i);

        return new Blob([ia], { type: mimeString });
      }
      if (
        this.$refs.form.validate() &&
        this.categoryValidate == false &&
        this.quillRules == false
      ) {
        this.delta = this.$refs.myQuillEditor.quill.getContents();
        const childNodes =
          document.getElementsByClassName("ql-editor")[0].childNodes;
        const unknow = [];
        childNodes.forEach((data) => {
          data.childNodes.forEach((data) => {
            if (String(data.nodeName) === "IMG") {
              unknow.push(data);
            }
          });
        });
        const srcArray = [];
        unknow.forEach((data) => {
          let convertImage = DataURIToBlob(data.src);
          data.src = "";
          srcArray.push(convertImage);
        });

        let rawArray = [this.b1, this.b2, this.b3, this.b4, this.b5];
        let bufferArray = [];
        for (let index = 0; index < rawArray.length; index++) {
          if (rawArray[index] == true) {
            switch (index) {
              case 0:
                bufferArray.push("รีวิว");
                break;
              case 1:
                bufferArray.push("ศิลป์และดนตรี");
                break;
              case 2:
                bufferArray.push("วิทยาศาสตร์");
                break;
              case 3:
                bufferArray.push("สังคมและการเมือง");
                break;
              case 4:
                bufferArray.push("สิ่งแวดล้อม");
                break;
              default:
                break;
            }
          }
        }

        this.delta = document.getElementsByClassName("ql-editor")[0].innerHTML;
        const formData = new FormData();
        formData.append("Header", this.article_name);
        formData.append("TextData[]", this.delta);
        formData.append("ContentCategory[]", bufferArray);

        console.log(bufferArray);
        formData.append("CreateBy", this.author_name);
        formData.append("Coordinate[0]", this.coordinates);

        for (let index = 0; index < this.moreCoordinates.length; index++) {
          formData.append(
            `Coordinate[${index + 1}]`,
            this.moreCoordinates[index]
          );
        }
        formData.append("ImageCover", this.image);
        srcArray.forEach((data) => {
          formData.append("ImageFiles", data);
        });
        if (this.params == undefined) {
          axios
            .post(
              process.env.VUE_APP_BACKEND_API + "/content/addcontent",
              formData
            )
            // .then(this.backHome());
            .then(
              console.log("textContent: " + this.textEditorContent),
              console.log("Delta: " + this.delta)
            );
        } else {
          axios
            .put(
              process.env.VUE_APP_BACKEND_API +
                "/content/editcontent?id=" +
                this.params,
              formData
            )
            .then(this.backHome());
        }
      }
    },
  },
  async mounted() {
    let head = this.$route.params;
    if (head != undefined) {
      this.params = head.id;
      const res = await axios.get(
        process.env.VUE_APP_BACKEND_API +
          "/content/getContentByID?id=" +
          head.id
      );
      this.categoryValidate = false;
      this.article_name = res.data.Header;
      this.author_name = res.data.CreateBy;
      this.addCategory(res.data.ContentCategory[0].split(","));
      document.getElementsByClassName("ql-editor")[0].innerHTML =
        res.data.TextData[0];
    }
  },
};
</script>

<style scoped>
.head-topic {
  font-family: "Kanit";
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 54px;
  color: #333333;
}

.label-input {
  font-family: "Bai Jamjuree" !important;
  font-style: normal !important;
  font-weight: 500 !important;
  line-height: 24px;
  color: #4c4c4c !important;
}

.v-text-field >>> label {
  overflow: visible;
  top: 0;
}

.pic-cover {
  font-family: "Bai Jamjuree";
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  margin-bottom: 0;
  color: #4c4c4c;
}

.text-red {
  padding-top: 2%;
  display: block;
  position: relative;
  color: red;
}

.v-btn {
  font-family: "Bai Jamjuree";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
}
.sub-detail {
  font-family: "Bai Jamjuree";
  font-style: normal;
  font-weight: 400;
  color: #ad9f86;
  font-size: 16px;
}

@media screen and (min-width: 320px) {
  .save-btn {
    padding-top: 8%;
  }
  .backHome {
    color: #ad9f86;
    font-size: 18px;
    padding-top: 5%;
    cursor: pointer;
  }

  .inside-width {
    width: 90%;
  }
  .head-topic {
    font-size: 28px;
  }
  .input-style {
    font-size: 16px;
  }
  .label-input {
    font-size: 1.2em;
    line-height: 28px;
  }
  #back-arrow {
    width: 36px;
  }
  .v-text-field {
    padding-top: 5%;
  }
  .pic-cover {
    font-size: 20px;
    padding-bottom: 4%;
  }
  #img-input-box {
    padding-top: 7%;
  }
  #preview-img {
    max-width: 280px;
    height: auto;
    margin-top: 0;
  }
  .preview-img-box {
    padding-bottom: 8%;
  }
  #body-block {
    padding-bottom: 8%;
  }
  .img-icon {
    width: 36px;
  }
  .v-btn {
    margin-top: 8px;
  }
  .v-btn:not(.v-btn--round).v-size--default {
    padding: 0 10px;
  }
  .text-red {
    padding-top: 5%;
  }
  #mainGPS-heading {
    padding-top: 5%;
  }
}

@media screen and (min-width: 768px) {
  .inside-width {
    width: 70%;
  }
  .v-btn {
    font-size: 16px;
  }
  .v-btn:not(.v-btn--round).v-size--default {
    padding: 0 10px;
  }
  .sub-detail {
    font-size: 18px;
  }
  .pic-cover {
    font-size: 22px;
  }
  #preview-img {
    max-width: 360px;
  }
}

@media screen and (min-width: 1024px) {
  #mainGPS-heading{
    padding-top: 2%;
  }
  #body-block {
    padding-top: 3%;
    padding-bottom: 5%;
  }
  .backHome {
    font-size: 22px;
    padding-top: 5%;
    padding-bottom: 3%;
    cursor: pointer;
  }
  .head-topic {
    font-size: 32px;
  }
  .inside-width {
    background-color: white;
    width: 100%;
  }
  .input-style {
    font-size: 18px;
  }
  .label-input {
    font-size: 1.2em;
    line-height: 28px;
  }

  .v-btn {
    font-size: 16px;
  }
  .v-btn:not(.v-btn--round).v-size--default {
    padding: 0 16px;
  }
  #img-input-box {
    padding-top: 7%;
  }
  .sub-detail {
    font-size: 18px;
  }
  .pic-cover {
    font-size: 22px;
    padding-bottom: 2%;
  }
  #preview-img {
    max-width: 360px;
    height: auto;
  }
  .preview-img-box {
    padding-bottom: 4%;
  }
  * >>> .v-messages {
    font-size: 16px;
    padding-top: 0.5em;
  }
  .col-md-4 {
    min-width: 40%;
  }
  .col-md-7 {
    max-width: 50%;
  }
  .big-box {
    background: rgb(102, 88, 88);
    background: linear-gradient(
      0deg,
      rgba(102, 88, 88, 1) 0%,
      rgba(173, 159, 134, 1) 35%,
      rgba(237, 230, 218, 1) 100%
    );
  }
  .save-btn {
    padding-top: 0%;
  }
  .box-padding {
    padding: 0 3%;
  }
}

button {
  padding-top: 3%;
  display: inline;
}

.div-submit {
  display: flex;
  justify-content: end;
}

.v-input .v-label::after {
  content: " *";
  color: red;
}

.v-counter {
  font-family: "Bai Jamjuree" !important;
  font-style: normal !important;
  font-size: 28px;
  font-weight: 500 !important;
  color: #ad9f86 !important;
}

.v-btn--outlined {
  border-color: #ede6da;
}

.button-active {
  background: #ad9f86;
  border-radius: 20px;
  color: #ffffff;
  border-color: #ad9f86;
}

.text-white {
  color: white;
  font-family: "Kanit";
  font-weight: 400;
  font-size: 16px;
}
</style>