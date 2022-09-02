<template>
  <div id="app" class="overflow-auto">
    <v-form v-model="valid" @submit.prevent="submit">
      <div class="d-flex justify-center">
        <div class="d-inline test">
          <p class="sub-detail">
            <img
              class="pr-3 img-middle"
              src="../assets/icon/left-arrow.png"
            />กลับหน้าแรก
          </p>
          <p class="head-topic">แบ่งปันเรื่องราวความรู้</p>
          <div class="inside-width ma-auto">
            <v-text-field
              class="input-style blog_title"
              v-model="title"
              error-messages="กรุณาใส่ชื่อบทความ"
              :rules="titleRules"
              :counter="90"
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
              error-messages="กรุณาใส่ชื่อนักเขียน"
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

            <p class="pic-cover">
              รูปหน้าปกบทความ<span style="color: red">*</span>
            </p>
            <v-file-input hide-input truncate-length="15"></v-file-input>
            <p class="sub-detail">ขนาดขั้นต่ำควรเป็น 400 x 188 px</p>

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
                  @click="b1 = !b1"
                  rounded
                  outlined
                  :class="{ 'button-active': b1 }"
                  >รีวิว</v-btn
                >
                <v-btn
                  elevation="2"
                  @click="b2 = !b2"
                  rounded
                  outlined
                  :class="{ 'button-active': b2 }"
                  class="mx-2"
                  >ศิลป์และดนตรี</v-btn
                >
                <v-btn
                  elevation="2"
                  @click="b3 = !b3"
                  rounded
                  outlined
                  class="mx-2"
                  :class="{ 'button-active': b3 }"
                  >วิทยาศาสตร์</v-btn
                >
                <v-btn
                  elevation="2"
                  @click="b4 = !b4"
                  rounded
                  outlined
                  class="mx-2"
                  :class="{ 'button-active': b4 }"
                  >สังคมและการเมือง</v-btn
                >
                <v-btn
                  elevation="2"
                  @click="b5 = !b5"
                  rounded
                  outlined
                  class="mx-2"
                  :class="{ 'button-active': b5 }"
                  >สิ่งแวดล้อม</v-btn
                >
              </div>
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
              <v-btn elevation="1" x-large color="#AD9F86"
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
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => v.length <= 10 || "Name must be less than 10 characters",
    ],
    title: "",
    titleRules: [
      (v) => !!v || "Blog Title is required",
      (v) => v.length <= 60 || "Blog Title must be less than 50 characters",
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
    b1: false,
    b2: false,
    b3: false,
    b4: false,
    b5: false,
    button: {
      b1: false,
      b2: "non-active",
      b3: "non-active",
      b4: "non-active",
      b5: "non-active",
    },
  }),
  computed: {},
  methods: {
    getClassButton(index) {
      return this.button[index];
    },
    activeButton(index) {
      let text = this.button[index];
      text == "non-active"
        ? (this.button[index] = "button-active")
        : (this.button[index] = "non-active");
      console.log(this.button[index]);
    },
    submit() {
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
      this.delta = document.getElementsByClassName("ql-editor")[0].innerHTML;
      const formData = new FormData();
      formData.append("Header", this.title);
      formData.append("TextData", this.delta);
      formData.append("ContentCategory", "01");
      formData.append("CreateBy", this.author_name);
      formData.append("DeleteFlag", false);
      srcArray.forEach((data) => {
        formData.append("ImageFiles", data);
      });
      // for (var value of formData.values()) {
      //     console.log(value);
      // }
      axios.post(
        process.env.VUE_APP_BACKEND_API + "/content/addcontent",
        formData
      );
      // this.delta.forEach((array) => console.log(array));
    },
    // editorTypeCheck() {
    //     this.delta.forEach(array => console.log(array))
    // },
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
</style>