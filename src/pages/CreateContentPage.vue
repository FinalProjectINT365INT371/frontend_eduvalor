<template>
  <div id="app" class="overflow-auto">
    <v-form v-model="valid" @submit.prevent="submit" ref="form">
      <div class="d-flex justify-center">
        <div class="d-inline test">
          <p class="sub-detail backHome" @click="backHome">
            <img
              class="pr-3 img-middle"
              src="../assets/icon/left-arrow.png"
            />กลับหน้าแรก
          </p>
          <p class="head-topic">แบ่งปันเรื่องราวความรู้</p>
          <div class="inside-width ma-auto">
            <v-text-field
              class="input-style blog_title"
              v-model="article_name"
              :rules="titleRules"
              :counter="50"
              required
            >
              <template #label>
                <div class="label-input">
                  ชื่อบทความ<span class="red--text"><strong> *</strong></span>
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
                  ชื่อผู้เขียน<span class="red--text"><strong> *</strong></span>
                </div>
              </template>
            </v-text-field>

            <v-row>
              <v-col cols="10" sm="11" md="4" lg="4">
                <p class="pic-cover">
                  รูปหน้าปกบทความ<span style="color: red">*</span>
                </p>
                <p class="sub-detail">ขนาดขั้นต่ำควรเป็น 400 x 188 px</p>
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
              <v-col cols="12" sm="12" md="7" lg="7">
                <v-img :src="url" />
              </v-col>
            </v-row>

            <div id="body-block">
              <p class="pic-cover pb-5">
                เนื้อหาบทความ<span style="color: red">*</span>
              </p>
              <quill-editor
                class="quill pb-10"
                ref="myQuillEditor"
                v-model="textEditorContent"
                :options="editorOption"
                required
              />
                            <p v-if="params != undefined" class="text-red">
                กรุณาใส่รูปใหม่ทุกครั้งที่มีการแก้ไข
              </p>
            </div>

            <div id="tag-relate" class="pb-10">
              <p class="pic-cover">
                <img
                  class="pr-3 img-relate"
                  src="../assets/icon/tag.png"
                />แท็กที่เกี่ยวข้อง<span style="color: red">*</span>
              </p>
              <p class="sub-detail">
                ติดขั้นต่ำ 1 แท็ก แต่มากสุดได้ไม่เกิน 3 แท็ก
              </p>
              <div>
                <v-btn
                  elevation="2"
                  @click="activeButton(0)"
                  rounded
                  outlined
                  :class="{ 'button-active': b1 }"
                  >รีวิว</v-btn
                >
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
            <p class="pic-cover">
              <img
                class="pr-3 img-middle"
                src="../assets/icon/gps.png"
              />แหล่งเรียนรู้ที่เกี่ยวข้อง<span style="color: red">*</span>
            </p>
            <p class="sub-detail">
              กรอกตำแหน่ง 1 สถานที่ และส่วนนี้จะแสดงผลเป็น Street View
              (จะเป็นสถานที่แรกที่พูดถึงในบทความ, สถานที่ที่อยากแนะนำเป็นพิเศษ
              ฯลฯ ก็ได้)
            </p>
            <p class="pic-cover">แหล่งเรียนรู้ที่เกี่ยวข้องอื่น ๆ</p>
            <p class="sub-detail">
              กรอกตำแหน่งสถานที่อื่น ๆ เพิ่มเติม
              แต่ส่วนนี้จะแสดงผลเป็นลิงก์ไปยัง Map แทน (ไม่บังคับ)
            </p>
            <div class="d-flex justify-center">
              <v-btn
                elevation="1"
                x-large
                color="#AD9F86"
                class="text-white"
                @click="submit"
                ><img
                  class="py-3 pr-3 img-middle"
                  src="../assets/icon/save.png"
                />บันทึกและเผยแพร่</v-btn
              >
            </div>

            <!-- <p class="div-submit">
            <router-link to="/">
              <button type="submit" :disabled="invalid">
                <img src="../assets/paper-plane.png" /></button
            ></router-link>
          </p> -->
          </div>
        </div>
      </div>
    </v-form>
  </div>
</template>
<script>
// import { from } from 'webpack-sources/lib/CompatSource';
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

import { quillEditor } from "vue-quill-editor";
import axios from "axios";

export default {
  components: {
    quillEditor,
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
      debug: "info",
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          ["image"],
        ],
      },
      placeholder: "Compose an epic...",
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
    button: {
      b1: false,
      b2: "non-active",
      b3: "non-active",
      b4: "non-active",
      b5: "non-active",
    },
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
        console.log(e);
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
      // let text = this.button[index];
      // text == "non-active"
      //   ? (this.button[index] = "button-active")
      //   : (this.button[index] = "non-active");
      // console.log(this.button[index]);
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

    submit() {
      this.checkTag();
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
      if (this.$refs.form.validate() && this.categoryValidate == false) {
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
          // String(data.src).split("data:image/png;base64,");
          // let stringbuffer = String(data.src).split("data:image/png;base64,")[1];
          data.src = "";
          // console.log(stringbuffer);
          // stringbuffer = stringbuffer.split('">')[0];
          srcArray.push(convertImage);
        });

        // console.log(this.textEditorContent);
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
        formData.append("CreateBy", this.author_name);
        formData.append("ImageCover", this.image);
        formData.append("DeleteFlag", false);
        srcArray.forEach((data) => {
          formData.append("ImageFiles", data);
        });
        if (this.params == undefined) {
          axios
            .post(
              "https://www.eduvalor.ml/backendDev" + "/content/addcontent",
              formData
            )
            .then(this.backHome());
        } else {
          axios
            .put(
              "https://www.eduvalor.ml/backendDev" +
                "/content/editcontent?id=" +
                this.params,
              formData
            )
            .then(this.backHome());
        }
      }
      // this.delta.forEach((array) => console.log(array));
    },
    // editorTypeCheck() {
    //     this.delta.forEach(array => console.log(array))
    // },
  },
  async mounted() {
    let head = this.$route.params;
    if (head != undefined) {
      this.params = head.id;
      const res = await axios.get(
        process.env.VUE_APP_BACKEND_API +"/content/getContentByID?id=" +
          head.id
      );
      console.log(res.data);
      this.categoryValidate = false
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
.submit {
  background-color: brown;
  display: inline;
}

/* .input-style,
.quill {
    width: 50%;
} */

.test {
  margin: 1.5%;
  padding: 1.5%;
  /* background-color: aquamarine; */
}

@media screen and (max-width: 2000px) {
  .test {
    width: 70%;
  }
}

@media screen and (max-width: 1023px) {
  .test {
    /* width: 40%; */
    width: 60%;
  }
}

@media screen and (max-width: 767px) {
  .test {
    width: 90%;
  }
}
@media screen and (max-width: 2000px) {
  .inside-width {
    width: 80%;
  }
}

@media screen and (max-width: 1023px) {
  .inside-width {
    /* width: 40%; */
    width: 90%;
  }
}

@media screen and (max-width: 767px) {
  .inside-width {
    width: 100%;
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
  font-size: 28px;
  color: #4c4c4c !important;
}
.v-counter {
  font-family: "Bai Jamjuree" !important;
  font-style: normal !important;
  font-size: 28px;
  font-weight: 500 !important;
  color: #ad9f86 !important;
}
.pic-cover {
  font-family: "Bai Jamjuree";
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  margin-bottom: 0;
  color: #4c4c4c;
}
.sub-detail {
  font-family: "Bai Jamjuree";
  font-style: normal;
  font-weight: 400;
  color: #ad9f86;
  font-size: 18px;
}
.img-middle {
  vertical-align: middle;
}
.v-btn {
  font-family: "Bai Jamjuree";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
}
.v-btn--outlined .non-active {
  border: thin solid #ede6da;
}
.button-active {
  background: #ad9f86;
  border-radius: 20px;
  color: #ffffff;
  border-color: #ad9f86;
}
.v-text-field .v-label {
  max-width: 90%;
  overflow: visible !important;
  text-overflow: ellipsis;
  top: 6px;
  white-space: nowrap;
  pointer-events: none;
}
.text-white {
  color: white;
}
.backHome {
  cursor: pointer;
}
.text-red {
  color: red;
}
</style>