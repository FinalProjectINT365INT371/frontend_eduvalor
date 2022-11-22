<template>
  <div>
    <div class="allComment">
      <!-- <div v-for="approve in approveData" :key="approve" class="d-flex flex-column justfy-space-between col-9"> -->
      <div v-for="(approve, index) in approveData" :key="index">
        <div v-if="index == approveData.length - 1">
          <div v-if="index == approveData.length - 1" class="">
            <h3
              style="font-weight: 600; font-family: 'Kanit'"
              id="editor-heading"
            >
              EduValor ว่าคอนเทนต์นี้ดี!
            </h3>

            <div class="cover-text-stamp">
              <!-- <div id="approve-stamp" class="d-flex justify-end flex-column" style="background-color:blue"> -->
              <div id="approve-stamp">
                <img
                  id="approved"
                  src="../assets/icon/commentManage/approved.png"
                />
              </div>

              <div class="editor-text-comment">
                <div>
                  <p id="apText">{{ approve.Comment }}</p>
                </div>
              </div>
            </div>
            <div style="font-family: 'Kanit'" class="editor-text-bottom">
              <h4 style="font-weight: 500">ความคิดเห็นจาก บ.ก. EduValor</h4>
              <p class="approved-date">
                Approved ล่าสุดเมื่อ <br />
                {{ approve.UpdateDate }}
              </p>
            </div>

            <div v-if="checkCreatorOfApprove(approve)" class="crud-editor">
              <button
                elevation="0"
                class="btn-container"
                color="#AD9F86"
                @click="editCall(approve)"
              >
                <img
                  class="img-middle unhovered"
                  src="../assets/icon//commentManage/fluent_document-edit-20-filled.png"
                  width="28px"
                />
                <img
                  class="hovered img-middle"
                  src="../assets/icon//commentManage/fluent_document-edit-20-filled-bl.png"
                  width="28px"
                />
              </button>
              <button
                elevation="0"
                class="btn-container"
                @click="deleteCm(approve)"
              >
                <img
                  class="img-middle cmDelete unhovered"
                  src="../assets/icon/commentManage/fluent_delete-dismiss-20-filled.png"
                  width="28px"
                />
                <img
                  class="hovered img-middle"
                  src="../assets/icon/commentManage/fluent_delete-dismiss-20-filled-bl.png"
                  width="28px"
                />
              </button>
            </div>
            <v-divider></v-divider>
          </div>
        </div>
      </div>

      <!--  -->

      <div class="d-flex comment-heading-box">
        <img
          src="../assets/icon/fa-regular_comment-dots.png"
          class="comment-pic"
        />
        <p class="p-comment">ความคิดเห็นทั้งหมด</p>
      </div>

      <section class="">
        <div class="allComment">
          <div v-for="comment in getComment" :key="comment.ContentId" class="">
            <!-- <div class="col-1"> -->
            <div class="top-of-comment d-flex justify-space-between">
              <img id="avatar" src="../assets/icon/user.png" />

              <div class="comment-bottom-text">
                <h4 style="font-weight: 500" v-if="comment.Displayname">
                  ความคิดเห็นจาก <br />
                  {{ comment.Displayname }}
                </h4>
                <p class="comment-date">เมื่อ {{ comment.UpdateDate }}</p>
              </div>
            </div>
            <!-- <div class="col-9"> -->
            <div>
              <div class="d-flex justify-space-between">
                <p id="cmText">{{ comment.Comment }}</p>
              </div>
              <div
                v-if="checkCreatorOfComment(comment)"
                class="d-flex justify-end"
              >
                <div class="d-flex justify-center">
                  <button
                    elevation="0"
                    class="btn-container"
                    color="#AD9F86"
                    @click="editCall(comment)"
                  >
                    <img
                      class="img-middle unhovered"
                      src="../assets/icon//commentManage/fluent_document-edit-20-filled.png"
                      width="28px"
                    />
                    <img
                      class="hovered img-middle"
                      src="../assets/icon//commentManage/fluent_document-edit-20-filled-bl.png"
                      width="28px"
                    />
                  </button>
                </div>
                <div class="d-flex justify-center">
                  <button
                    elevation="0"
                    class="btn-container"
                    @click="deleteCm(comment)"
                  >
                    <img
                      class="img-middle cmDelete unhovered"
                      src="../assets/icon/commentManage/fluent_delete-dismiss-20-filled.png"
                      width="28px"
                    />
                    <img
                      class="hovered img-middle"
                      src="../assets/icon/commentManage/fluent_delete-dismiss-20-filled-bl.png"
                      width="28px"
                    />
                  </button>
                </div>
              </div>
              <v-divider id="divided-comment"></v-divider>
            </div>
          </div>
        </div>

        <aside v-if="login" id="comment-card-box" class="card">
          <div class="d-flex align-center top-comment-box">
            <img src="../assets/icon/user.png" id="avatar-comment-box" />
            <h4 class="pl-5">{{ userData.Displayname }}</h4>
          </div>

          <div class="">
            <v-form v-model="valid" @submit.prevent="submit" ref="Commentform">
              <v-textarea
                v-model="commentText"
                :rules="commentTextRules"
                solo
                auto-grow
                clearable
                counter
                :maxlength="240"
                rows="4"
                id="inputStatus"
                ref="commentRef"
                placeholder="แสดงความคิดเห็นของคุณต่อคอนเทนต์นี้ที่นี่!"
              >
              </v-textarea>
              <div class="comment-bottom">
                <v-checkbox
                  v-if="isAdmin"
                  v-model="checkbox"
                  :label="`บ.ก. EduValor ขอแนะนำคอนเทนต์นี้`"
                  color="#333333"
                ></v-checkbox>

                <span class="d-flex justify-center">
                  <button
                    class="d-inline-flex align-center publish-btn"
                    type="button"
                    @click="submit"
                  >
                    <v-img src="../assets/icon/carbon_send-alt-filled.png">
                    </v-img
                    >เผยแพร่
                  </button></span
                >
              </div>
            </v-form>
          </div>
        </aside>

        <div v-if="!login" class="for-guest">
          <p>คุณยังไม่ได้ทำการเข้าสู่ระบบ</p>
          <p>
            <a @click="goToLogin"> <b>Log In </b></a> เพื่อคอมเมนต์เลย!
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    valid: false,
    checkbox: false,
    approvementEnum: "",
    commentText: "",
    commentTextRules: [
      (v) => !!v || "กรุณาใส่ตัวอักษรเพื่อแสดงความคิดเห็น",
      (v) => v.length <= 240 || "ตัวอักษรต้องไม่เกิน 240 ตัว",
    ],
    userID: "Anonymous User",
    params: undefined,
    contentID: "",

    getComment: [],
    commentID: undefined,
    approveData: [],
    approveID: undefined,
    login: false,
    userData: null,
    isAdmin: false,
  }),

  methods: {
    async fetchData() {
      let head = this.$route.params;
      if (head != undefined) {
        this.params = head.id;
        const res = await axios.get(
          process.env.VUE_APP_BACKEND_API +
            "/content/getContentByID?id=" +
            head.id
        );
        this.contentID = res.data._id;
        this.getComment = res.data.Comment;
        this.approveData = res.data.ApproveData;
      }
      console.log(this.approveData);
    },
    setUserData() {
      this.userData = this.$cookies.get("USER_DATA");
    },
    goToLogin() {
      this.$router.push({
        path: "/Login",
      });
    },
    checkCreatorOfComment(comment) {
      if (this.$cookies.get("USER_DATA") != null) {
        if (this.userData.id == comment.UserId) {
          return true;
        } else return false;
      } else return false;
    },
    checkCreatorOfApprove(approve) {
      if (this.$cookies.get("USER_DATA") != null) {
        if (this.userData.id == approve.UserId) {
          return true;
        } else return false;
      } else return false;
    },
    async submit() {
      const objComment = {
        UserId: this.userID,
        ContentId: this.contentID,
        Comment: this.commentText,
        ApproveStatus: this.approvementEnum,
        CommentId: this.commentID,
        ApproveId: this.approveID,
      };
      let token = this.$cookies.get("JWT_TOKEN");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log(this.approvementEnum);
      if (!this.checkbox) {
        if (this.commentID == undefined) {
          const res = await axios.post(
            process.env.VUE_APP_BACKEND_API + "/content/comment/addcomment",
            objComment,
            config
          );
          console.log(objComment);
          if (res) {
            this.getComment.push(objComment);
          }
          this.fetchData();
        } else {
          const res = await axios.put(
            process.env.VUE_APP_BACKEND_API + "/content/comment/updatecomment",
            objComment,
            config
          );
          if (res) {
            const objIndex = this.getComment.findIndex(
              (item) => item._id == objComment.CommentId
            );
            this.getComment[objIndex].Comment = this.commentText;
          }
          this.commentID = undefined;
          this.approveID = undefined;
          this.fetchData();
        }
        this.commentText = "";
      } else {
        if (this.approveID == undefined) {
          this.approvementEnum = "PASS";
          console.log(this.approvementEnum);
          objComment.ApproveStatus = this.approvementEnum;

          const res = await axios.post(
            process.env.VUE_APP_BACKEND_API + "/content/approve/addapprove",
            objComment,
            config
          );
          if (res) {
            this.getComment.push(objComment);
          }
          this.fetchData();
          this.commentText = "";
          this.commentID = undefined;
          this.approveID = undefined;
        } else {
          const res = await axios.put(
            process.env.VUE_APP_BACKEND_API + "/content/approve/updateapprove",
            objComment,
            config
          );
          if (res) {
            const objIndex = this.getComment.findIndex(
              (item) => item._id == objComment.ApproveId
            );
            this.getComment[objIndex].Comment = this.commentText;
          }
          this.fetchData();
          this.commentID = undefined;
          this.approveID = undefined;
        }
      }
    },

    editCall: function (e) {
      const originalValue = e;
      if (typeof originalValue.ApproveStatus == "undefined") {
        this.userID = originalValue.UserId;
        this.contentID = this.params;
        this.commentID = originalValue._id;
        this.commentText = originalValue.Comment;
      } else {
        this.userID = originalValue.UserId;
        this.contentID = this.params;
        this.approveID = originalValue._id;
        this.commentText = originalValue.Comment;
        this.approvementEnum = "PASS";
        console.log(this.approveID);
      }

      console.log(originalValue);
    },

    deleteCm: async function (d) {
      let token = this.$cookies.get("JWT_TOKEN");

      const deleteItem = d;
      this.userID = deleteItem.UserId;
      this.contentID = this.params;
      this.commentID = deleteItem._id;
      this.approveID = deleteItem._id;
      console.log(this.commentID);
      this.approvementEnum = deleteItem.ApproveStatus;

      if (this.approvementEnum !== "PASS") {
        const res = await axios.delete(
          process.env.VUE_APP_BACKEND_API + "/content/comment/deletecomment",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: {
              UserId: this.userID,
              ContentId: this.contentID,
              CommentId: this.commentID,
            },
          }
        );
        if (res) {
          this.fetchData();
          this.getComment = this.getComment.filter(
            (item) => item.CommentId !== deleteItem._id
          );
        }
      } else {
        let token = this.$cookies.get("JWT_TOKEN");
        const res = await axios.delete(
          process.env.VUE_APP_BACKEND_API + "/content/approve/deleteapprove",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: {
              UserId: this.userID,
              ContentId: this.contentID,
              ApproveId: this.approveID,
            },
          }
        );
        if (res) {
          this.fetchData();
          this.getComment = this.getComment.filter(
            (item) => item.CommentId !== deleteItem._id
          );
        }
      }
      this.commentID = undefined;
      this.approveID = undefined;
    },
  },
  mounted() {
    this.setUserData();
    if (this.$cookies.get("USER_DATA") != null) {
      this.login = true;
      this.userID = this.userData.id;
      if (this.userData.Role == "Admin" || this.userData.Role == "Developer") {
        this.isAdmin = true;
      }
    }
    this.fetchData();
  },
};
</script>

<style scoped lang="scss">
$purple: #ad9f86;
$background: #535f82;
$muted: #737373;
$white: #ffffff;
$button-font-size: 0.8rem;

.for-guest {
  text-align: center;
  p a {
    color: black;
  }
}
* {
  padding: 0px;
  margin: 0px;
}

.top-of-comment {
  vertical-align: middle;
}
.allComment {
  width: 100%;
}

.card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 2px 1px #ad9f86;
  display: block;
  margin: 16px 0px;
  padding: 12px 8px;
  width: 100%;

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
  .v-textarea {
    padding: 16px 0px;
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

.v-divider {
  padding-bottom: 1%;
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
  // width: 75%;
  overflow-wrap: break-word;
  width: 100%;
  font-size: 15px;
}
#divided-comment {
  margin: 12px 0px;
}

/* #apText {
  width: 540px;
} */
@at-root #approve-stamp {
  width: 100%;
  text-align: center;
}

@media screen and (min-width: 320px) {
  ::v-deep .v-input .v-label {
    font-size: 14px;
  }

  #approved {
    width: 108px;
    padding: 12px 0px;
  }
  .editor-text-comment {
    overflow-wrap: break-word;
    line-height: 28px;
    font-size: 15px;
  }
  .approved-date {
    font-size: 13px;
  }
  .cover-text-stamp {
    width: 100%;
  }
  .editor-text-bottom {
    text-align: end;
  }
  #editor-heading {
    font-size: 20px;
    margin-top: 16px;
    color: #333333;
  }
  .crud-editor {
    text-align: end;
    margin-bottom: 16px;
  }
  .comment-heading-box {
    margin: 24px 0px;
  }
  .p-comment {
    font-family: "Kanit";
    font-style: bold;
    font-weight: 600;
    font-size: 20px;
    line-height: normal;
    color: #333333;
    margin-bottom: 0px;
  }
  .comment-bottom-text {
    font-family: "Kanit";
    text-align: end;
    h4 {
      font-size: 14px;
    }
  }
  .comment-date {
    font-size: 13px;
  }
  .comment-pic {
    height: 32px;
    margin-right: 8px;
  }
  #avatar {
    height: 48px;
  }
  #avatar-comment-box {
    width: 48px;
  }
  .comment-bottom {
    flex-direction: column;
    justify-content: center;
  }

  #apText {
    font-size: 16px;
  }
}

@media screen and (min-width: 768px) {
  .comment-date {
    font-size: 14px;
  }
  .comment-bottom-text {
    h4 {
      font-size: 15px;
    }
  }
  #approved {
    width: 100px;
  }
  ::v-deep .v-input .v-label {
    font-size: 16px;
  }
  .cover-text-stamp {
    margin-top: 5%;
    display: flex;
  }
  #approve-stamp {
    text-align: center;
    width: 50%;
  }
  .editor-text-comment {
    padding-left: 5%;
    width: 75%;
  }
  .editor-text-bottom {
    display: flex;
    justify-content: space-between;
  }
  .approved-date {
    font-size: 14px;
  }
}

@media screen and (min-width: 1024px) {
  .wid-80 {
    width: 50%;
  }
  .social-container {
    width: 25%;
  }
  .cover-text-stamp {
    display: flex;
  }
  .editor-text-bottom {
    font-size: 18px;
  }
  .approved-date {
    font-size: 14px;
  }
  .comment-bottom-tex,
  #cmText {
    font-size: 16px;
  }
  .comment-bottom {
    align-content: center;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
  }
  .card{
    padding: 24px;
  }
  .publish-btn{
    font-size: 16px;
  }
  #approved{
    width: 124px;
  }
}
</style>
