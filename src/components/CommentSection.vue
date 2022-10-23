<template>
  <div>
    <div class="d-flex align-center" style="padding-bottom:3%;">
      <img src="../assets/icon/fa-regular_comment-dots.png" class="comment-pic" style="padding-right:1%">
      <p class="p-comment "
        style="font-family:'Kanit'; font-weight: 600; font-size: 24px; line-height: 54px; color: #333333;margin-bottom: 0px;">
        ความคิดเห็นทั้งหมด
      </p>
    </div>

    <section class="row d-flex justify-center">

      <div class="allComment d-flex flex-column">
        <div class="row d-flex justify-center align-center">
          <div class="col-1">
            <img src="../assets/icon/user.png" class="rounded-circle img-fluid" width="56" height="56">
          </div>
          <div class="col-9">
            <div>
              <p> " ทดสอบคอมเมนต์คุณภาพจากทางบ้าน "</p>
            </div>
            <div style="font-family: 'Kanit';" class="d-flex justify-space-between">
              <h4 style=" font-weight:600;"> ความคิดเห็นจาก {{ userID }} </h4>
              <p> เมื่อเวลา </p>
            </div>
            <v-divider></v-divider>
          </div>
        </div>

        <div class="row d-flex justify-center  align-center">
          <div class="col-1">
            <img src="../assets/icon/user.png" class="rounded-circle img-fluid" width="56" height="56">
          </div>
          <div class="col-9">
            <p> " ทดสอบคอมเมนต์คุณภาพจากทางบ้าน "</p>
            <div style="font-family: 'Kanit';" class="d-flex justify-space-between">
              <h4 style=" font-weight:600;"> ความคิดเห็นจาก {{ userID }} </h4>
              <p> เมื่อเวลา </p>
            </div>
            <v-divider></v-divider>
          </div>
        </div>
      </div>


      <aside class="card">
        <div class="row d-flex justify-center">
          <div class="col-1">
            <img src="../assets/icon/user.png" class="rounded-circle img-fluid" width="56" height="56">
          </div>
          <div class="col-9">
            <h4>{{ userID }}</h4>
            <v-form v-model="valid" @submit.prevent="submit" ref="form">
              <v-textarea v-model="commentText" :rules="commentTextRules" solo auto-grow clearable counter
                :maxlength="240" rows="4" id="inputStatus" placeholder="แสดงความคิดเห็นของคุณต่อคอนเทนต์นี้ที่นี่!">
              </v-textarea>
              <div class="d-flex ">
                <v-checkbox v-model="checkbox" :label="`บ.ก. EduValor ขอแนะนำคอนเทนต์นี้!: ${checkbox.toString()}`"
                  color="#333333"></v-checkbox>

                <button class="ml-auto d-inline-flex align-center publish-btn" type="button" @click="submit">
                  <v-img src="../assets/icon/carbon_send-alt-filled.png"> </v-img>เผยแพร่
                </button>
              </div>
            </v-form>
          </div>
        </div>
      </aside>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    valid: false,
    checkbox: false,
    commentText: "",
    commentTextRules: [
      (v) => !!v || "กรุณาใส่ตัวอักษรเพื่อแสดงความคิดเห็น",
      (v) => v.length <= 240 || "ตัวอักษรต้องไม่เกิน 240 ตัว",
    ],
    userID: 'U_2',
    params: undefined,
  }),

  methods: {
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
    
    submit() {
      if (this.$refs.form.validate() && this.categoryValidate == false) {
        const formData = new FormData();
        formData.append("UserId", this.userID);
        formData.append("ContentId", this.image);
        formData.append("Comment", this.commentText);

        if (this.params == undefined) {
          axios
            .post(
              process.env.VUE_APP_BACKEND_API + "/content/comment/addcomment",
              formData
            )
        } else {
          axios
            .put(
              process.env.VUE_APP_BACKEND_API +
              "/content/comment/updatecomment?id=" +
              this.params,
              formData
            )
        }
      }
    },
  },
}
</script>

<style lang="scss" >
$purple: #AD9F86;
$background: #535F82;
$muted: #737373;
$white: #ffffff;
$button-font-size: 0.8rem;

* {
  padding: 0px;
  margin: 0px;
}

body {
  padding-bottom: 2%;
}

.allComment {
  width: 100%;
}

.card {
  // background-color: #EDE6DA;
  background-color: white;
  border-radius: 0.5rem;
  // box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.39);
  box-shadow: 0px 0px 5px 3px #AD9F86;
  display: block;
  // position:relative;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  margin-top: 3%;
  padding: 1.25%;
  width: 75%;

  .img-fulid {
    padding: 1rem;
  }

  .commentFrom {
    font-family: "Kanit";
    font-weight: bold;
  }

  h4 {
    color: $muted;
    font-family: "Kanit";
    font-weight: bold;
    // letter-spacing: -0.1rem;
    padding-bottom: 0.5rem;
  }

  .commentFrom {
    font-family: "Kanit";
    font-weight: bold;
  }

  v-textarea {
    height: min-content;
    width: 100%;
    background: #eee;
    outline: none;
    border: none;
    padding: 0.5rem;
    resize: none;
    box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.19);
    border-radius: 2px;
    margin-bottom: 0.3rem;
    color: $muted;
  }

  .v-input--selection-controls {
    margin-top: 0px;
    padding-top: 0px;
  }

  .publish-btn {
    font-family: "Kanit";
    font-style: bold;
    background: $purple;
    color: white;
    padding: 0.3rem 0.5rem;
    border-radius: 0.4rem;
    font-size: $button-font-size;
    font-weight: light;
    letter-spacing: 2px;
    border: none;
    cursor: pointer;
    outline: none;

    &:hover {
      background: #333333;
      transition: all 1s;
    }
  }

  v-divider {
    padding-bottom: 1%;
  }

  // อันนี้ไม่ติด งองมาก
  .p-comment {
    font-family: "Kanit" !important;
    font-style: bold;
    font-weight: 700;
    font-size: 36px;
    line-height: 54px;
    color: #333333;
    margin-bottom: 0px;

  }

  .comment-pic {
    padding-right: 10%;
  }

  #comment-heading {
    padding-bottom: 3%;
  }
}
</style>