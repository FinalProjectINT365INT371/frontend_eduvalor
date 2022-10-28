<template>
  <div class="wid-page ma-auto mt-4">
    <v-container>
      <v-row>
        <v-col cols="12" sm="12" md="4" lg="4">
          <v-img :src="url" class="circle-image ma-auto" />
          <v-row justify="center" align="center" class="mt-2">
            <v-col cols="1">
              <v-file-input
                v-model="image"
                @change="Preview_image"
                hide-input
                :rules="imageRules"
                truncate-length="15"
                class="pt-0"
              ></v-file-input>
            </v-col>
            <v-col cols="8" sm="6" md="6" lg="6">
              <p class="my-auto change-img">เปลี่ยนรูปโปรไฟล์</p>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="12" md="8" lg="8">
          <div class="center-my">
            <v-row>
              <v-col cols="12" sm="12" md="3" lg="3" align-self="end">
                <p class="my-auto header-p">Username</p>
              </v-col>
              <v-spacer class="d-none d-sm-flex d-md-flex d-lg-flex" />
              <v-col cols="12" sm="12" md="8" lg="8" align-self="end" v-if="!edit">
                <span class="p-name">Pattranit Kongsaenkam</span
                ><img
                  src="../assets/icon/pen.png"
                  class="ml-2"
                  width="24"
                  height="24"
                  @click="edit = true"
                />
              </v-col>
              <v-col cols="12" sm="12" md="8" lg="8" align-self="end" v-if="edit">
                <v-row align="end">
                <v-col cols="12" sm="12" md="8" lg="8" class="pb-0">
                <v-text-field label="Username" color="#4C4C4C" counter
            maxlength="30" class="pt-0"></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="4" lg="4">
                <v-btn color="#AD9F86">
                  <img src="../assets/icon/white-pen.png" class="mr-2">
                  บันทึกการแก้ไข
                </v-btn>
                </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="3" lg="3" align-self="end">
                <p class="my-auto header-p">User ID</p>
              </v-col>
              <v-spacer class="d-none d-sm-flex d-md-flex d-lg-flex"  />
              <v-col cols="12" sm="12" md="8" lg="8" align-self="end">
                <p class="my-auto p-id">Pattranit Kongsaenkam</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="3" lg="3" align-self="end">
                <p class="my-auto header-p">Password</p>
              </v-col>
              <v-spacer class="d-none d-sm-flex d-md-flex d-lg-flex"  />
              <v-col cols="12" sm="12" md="8" lg="8" align-self="end">
                <a class="a-password" href="">Reset Password</a>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-col class="pa-0" cols="12" sm="10" md="8" lg="4">
      <p class="header d-flex justify-center">
        <v-icon large color="white" class="mr-2">mdi-table-of-contents</v-icon>
        บทความทั้งหมดของฉัน ({{ contents.length }})
      </p>
    </v-col>
    <v-divider class="divider-m"></v-divider>

    <v-row>
      <v-col
        v-for="(items, index) in article"
        :key="index"
        cols="12"
        sm="12"
        md="6"
        lg="6"
        @click="navTo(items._id)"
        class="cursor"
      >
        <v-row>
          <v-col cols="12" sm="12" md="7" lg="7">
            <v-img :src="items.imgSrc" alt="" width="100%" max-height="188" />
          </v-col>
          <v-col cols="12" sm="12" md="5" lg="5">
            <p class="p-title">{{ items.Header }}</p>
            <p class="p-author">โดย {{ items.CreateBy }}</p>
            <p class="p-date">เมื่อ {{ items.UpdateDate }}</p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-pagination
      class="float-right mt-5 mb-10"
      color="#AD9F86"
      v-model="page"
      :length="pageTotal"
      @input="changePage($event)"
    ></v-pagination>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      image: null,
      imageRules: [(v) => !!v || "กรุณาเพิ่มไฟล์"],
      url: "",
      article: [],
      contents: [],
      getImg: [],
      page: 1,
      pageTotal: 1,
      eduvalor: [],
      edit: false,
    };
  },
  methods: {
    Preview_image() {
      this.url = URL.createObjectURL(this.image);
    },
    navTo(articleId) {
      this.$router.push({
        path: "/article/" + articleId,
      });
    },
    changePage(event) {
      let startIndex = 10 * (event - 1);
      let endIndex = 10 * event;
      this.article = this.contents.slice(startIndex, endIndex);
      this.pageTotal = Math.floor(this.contents.length / 10) + 1;
    },
  },
  mounted() {
    const res = axios.get(process.env.VUE_APP_BACKEND_API + "/content/");
    res.then((result) => {
      this.contents = result.data;
      this.contents = this.contents.map(function (el) {
        const o = Object.assign({}, el);
        o.imgSrc = "";
        return o;
      });

      for (let index = 0; index < this.contents.length; index++) {
        let Url =
          this.contents[index].ImageUrl[
            this.contents[index].ImageUrl.length - 1
          ];
        if (this.contents[index].CreateBy == "EduValor") {
          this.eduvalor.push(this.contents[index]);
        }
        const resImg = axios.get(
          process.env.VUE_APP_BACKEND_API +
            "/content/getImageContentByName?imageName=" +
            Url
        );
        resImg.then((result) => {
          this.getImg = result.data;
          const srcUrl = this.getImg.split("imageUrl : ");
          this.contents[index].imgSrc = srcUrl[1];
        });
      }
      this.article = this.contents.slice(0, 10);
      this.pageTotal = Math.floor(this.contents.length / 10) + 1;
    });
  },
};
</script>


<style scoped>
@media screen and (max-width: 2000px) {
  .wid-page {
    width: 70%;
  }
}

@media screen and (max-width: 1023px) {
  .wid-page {
    /* width: 40%; */
    width: 60%;
  }
}

@media screen and (max-width: 767px) {
  .wid-page {
    width: 90%;
  }
  .center-my {
    margin-top: 1% !important;
  }
  .header {
  font-size: 20px !important;
} 
  .a-password {
    font-size: 16px !important;
  }
  .p-id {
    font-size: 16px !important;
  }
    .p-name {
    font-size: 16px !important;
  }
    .p-username {
    font-size: 16px !important;
  }
  .header-p {
    font-size: 24px !important;
  }
  .v-btn {
    font-size: 14px !important;
}
  .center-my .col-sm-12 {
    padding-top:  4px;
    padding-bottom:  4px;
  }

}
.circle-image {
  border-radius: 50%;
  width: 400px;
  height: 400px;
}
.center-my {
  margin-top: 14%;
}
.header {
  background-color: #a89b84;
  font-family: "KaLaTeXa Display";
  font-style: normal;
  font-weight: 650;
  font-size: 32px;
  line-height: 45px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
}
.divider-m {
  margin-top: -17px;
  margin-bottom: 60px;
}
.theme--light.v-divider {
  border-color: rgba(168, 155, 132, 1);
}
.v-divider {
  display: block;
  flex: 1 1 0px;
  max-width: 100%;
  /* height: 50px; */
  /* max-height: 50px; */
  border: solid;
  border-top-width: medium;
  border-right-width: 0px;
  border-bottom-width: 0px;
  border-left-width: 0px;
  transition: inherit;
}
.header-p {
  font-family: "KaLaTeXa Display";
  font-style: normal;
  font-weight: 650;
  font-size: 32px;
  line-height: 45px;

  /* Logo-Branding */

  color: #ad9f86;
}
.change-img {
  font-family: "Bai Jamjuree";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 30px;
  color: #a89b84;
}
.p-name {
  font-family: "Bai Jamjuree";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: #4c4c4c;
}
.p-id {
  font-family: "Bai Jamjuree";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 30px;
  color: #4c4c4c;
}
.a-password {
  font-family: "Bai Jamjuree";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 30px;
  text-align: right;
  text-decoration-line: underline;
  color: #2d9cdb;
}
.v-input {
        font-family: 'Bai Jamjuree' !important;
font-style: normal !important;
font-weight: 700 !important;
}
.v-btn {
  font-family: 'Kanit';
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 30px;
text-align: center;

color: #FFFFFF;
}


</style>