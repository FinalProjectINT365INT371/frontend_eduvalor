<template>
  <div>
    <div class="d-flex align-center" style="padding-bottom:3%;">
      <img src="../assets/icon/fa-regular_comment-dots.png" class="comment-pic" style="padding-right:1%">
      <p class="p-comment "
        style="font-family:`Kanit`; font-weight: 600; font-size: 24px; line-height: 54px; color: #333333;margin-bottom: 0px;">
        ความคิดเห็นทั้งหมด
      </p>
    </div>

    <section class="row d-flex justify-center">

      <div class="allComment d-flex flex-column">
        <div v-for="comment in getComment" :key="comment.ContentId" class="row d-flex justify-center align-center">
          <div class="col-1">
            <img src="../assets/icon/user.png" class="rounded-circle img-fluid" width="56" height="56">
          </div>
          <div class="col-9">
            <div class="d-flex justify-space-between">
              <p id="cmText"> {{ comment.Comment }}</p>
              <div class="d-flex justify-end">
                <div class="d-flex justify-center">
                  <button elevation="0" class="btn-container" color="#AD9F86" @click="editCall(comment)">
                    <img class="img-middle unhovered"
                      src="../assets/icon//commentManage/fluent_document-edit-20-filled.png" width="28px" />
                    <img class="hovered img-middle"
                      src="../assets/icon//commentManage/fluent_document-edit-20-filled-bl.png" width="28px">
                  </button>
                </div>
                <div class="d-flex justify-center">
                  <button elevation="0" class="btn-container" @click="deleteCm(comment)">
                    <img class=" img-middle cmDelete unhovered"
                      src="../assets/icon/commentManage/fluent_delete-dismiss-20-filled.png" width="28px" />
                    <img class="hovered img-middle"
                      src="../assets/icon/commentManage/fluent_delete-dismiss-20-filled-bl.png" width="28px">
                  </button>
                </div>

              </div>

            </div>
            <div style="font-family: 'Kanit';" class="d-flex justify-space-between">
              <h4 style=" font-weight:600; " v-if="comment.Displayname"> ความคิดเห็นจาก {{ comment.Displayname}} </h4>
              <h4 style=" font-weight:600;" v-if="!comment.Displayname"> ความคิดเห็นจาก User ID: {{ comment.UserId}} </h4>

              <!-- <p> เมื่อ {{ comment.UpdateDate }}</p> -->
              <p v-if="comment.UpdateDate"> เมื่อ {{ comment.UpdateDate }}</p>
              <p v-if="!comment.UpdateDate"> เมื่อสักครู่</p>

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
            <v-form v-model="valid" @submit.prevent="submit" ref="Commentform">
              <v-textarea v-model="commentText" :rules="commentTextRules" solo auto-grow clearable counter
                :maxlength="240" rows="4" id="inputStatus" ref="commentRef"
                placeholder="แสดงความคิดเห็นของคุณต่อคอนเทนต์นี้ที่นี่!">
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
    userID: "U_2",
    params: undefined,
    contentID: "",

    getComment: [],
    commentID: undefined,
  }),

  methods: {
    submit() {
      const objComment = {
        UserId: this.userID,
        ContentId: this.contentID,
        Comment: this.commentText,
        CommentId: this.commentID,
      }
      if (this.commentID == undefined) {
        axios.post(
          process.env.VUE_APP_BACKEND_API + "/content/comment/addcomment",
          objComment

        )
        this.getComment.push(objComment)
      } else {
        axios
          .put(
            process.env.VUE_APP_BACKEND_API +
            "/content/comment/updatecomment",
            objComment
          )
          .then(
            location.reload()
          )
      }
      this.commentText = '';
    },

    editCall: function (e) {
      const originalValue = e
      this.userID = originalValue.UserId;
      this.contentID = this.params;
      this.commentID = originalValue._id;
      this.commentText = originalValue.Comment;

      console.log(originalValue)
    },

    deleteCm: function (d) {
      const deleteItem = d
      this.userID = deleteItem.UserId;
      this.contentID = this.params;
      this.commentID = deleteItem._id;

      axios
        .delete(
          process.env.VUE_APP_BACKEND_API + "/content/comment/deletecomment", {
          data: {
            UserId: this.userID,
            ContentId: this.contentID,
            CommentId: this.commentID,
          }
        }
        )
        .then(
          setTimeout(location.reload(), 6000)
          // this.$router.go(),
          // console.log("Have been delete fine and refreshed")
        )
    },
  },
  async mounted() {
    let head = this.$route.params;
    if (head != undefined) {
      this.params = head.id;
      const res = await axios.get(
        process.env.VUE_APP_BACKEND_API + "/content/getContentByID?id=" +
        head.id
      );
      this.contentID = res.data._id
      this.getComment = res.data.Comment
    }
  }
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
}

v-divider {
  padding-bottom: 1%;
}

.p-comment {
  font-family: "Kanit";
  font-style: bold;
  font-weight: 700;
  font-size: 36px;
  line-height: 54px;
  color: #333333;
  margin-bottom: 0px;

}

.btn-container {
  display: inline-block;
}

.btn-container .hovered {
  display: none;
}

.btn-container:hover .unhovered {
  display: none;
}

.btn-container:hover .hovered {
  display: inline-block;
}

#cmText {
  width: 75%;
}
</style>