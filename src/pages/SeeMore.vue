<template>
  <div class="all-content wid-80 ma-auto">
    <v-row class="my-2">
      <v-col cols="12">
        <p class="sub-detail backHome" @click="backHome">
          <img
            class="pr-3 img-middle"
            src="../assets/icon/left-arrow.png"
          />กลับหน้าแรก
        </p>
      </v-col>
    </v-row>
    <p class="see-more-heading">
      <img class="pr-3 " src="../assets/icon/fire.png" />บทความทั้งหมด
    </p>
    <p class="count">จำนวนทั้งหมด {{ contentAll.length }} บทความ</p>
    <v-row justify="space-between" align="center">
      <v-col cols="12" sm="12" md="3" lg="3">
        <v-text-field
          label="ค้นหาบทความ"
          v-model="inputNews"
          @input="filterList($event)"
          outlined
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="8" lg="8">
        <div class="my-auto">
          <v-btn
            elevation="2"
            @click="selectOne(1)"
            outlined
            :class="{ 'button-active': b1 }"
            >ทั้งหมด</v-btn
          >
          <v-btn
            elevation="2"
            @click="selectOne(2)"
            outlined
            :class="{ 'button-active': b2 }"
            class="mx-2"
            >ศิลป์และดนตรี</v-btn
          >
          <v-btn
            elevation="2"
            @click="selectOne(3)"
            outlined
            class="mx-2"
            :class="{ 'button-active': b3 }"
            >วิทยาศาสตร์</v-btn
          >
          <v-btn
            elevation="2"
            @click="selectOne(4)"
            outlined
            class="mx-2"
            :class="{ 'button-active': b4 }"
            >สังคมและการเมือง</v-btn
          >
          <v-btn
            elevation="2"
            @click="selectOne(5)"
            outlined
            class="mx-2"
            :class="{ 'button-active': b5 }"
            >สิ่งแวดล้อม</v-btn
          >
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(items, index) in news"
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
      page: 1,
      pageTotal: 1,
      contents: [],
      inputNews: "",
      b1: true,
      b2: false,
      b3: false,
      b4: false,
      b5: false,
      model: "",
      getImg: [],
      reviewNews: [],
      eduvalor: [],
      envNews: [],
      scienceNews: [],
      musicNews: [],
      politicsNews: [],
      knowledge: [],
      news: [],
      contentAll: [],
      indexTopic: []
    };
  },
  methods: {
    navTo(articleId) {
      this.$router.push({
        path: "/article/" + articleId,
      });
    },
    backHome() {
      this.$router.push({
        path: "/",
      });
    },
    filterList(event) {
      let raw = [];
      this.b1 = true;
      this.b2 = false;
      this.b3 = false;
      this.b4 = false;
      this.b5 = false;
      this.contents.filter((e) => {
        if (e.Header.includes(event)) {
          raw.push(e);
        }
      });
      //console.log(raw);
      this.news = raw;
    },
    changePage(event){
      let startIndex = 10*(event-1)
      let endIndex = 10*event
      switch (this.indexTopic) {
        case 1:
          this.b1 = true;
          this.b2 = false;
          this.b3 = false;
          this.b4 = false;
          this.b5 = false;
          this.news = this.contents.slice(startIndex, endIndex);
          this.pageTotal = Math.floor(this.contents.length / 10) + 1;
          break;
        case 2:
          this.b1 = false;
          this.b2 = true;
          this.b3 = false;
          this.b4 = false;
          this.b5 = false;
          this.news = this.musicNews.slice(startIndex, endIndex);
          this.pageTotal = Math.floor(this.musicNews.length / 10) + 1;
          break;
        case 3:
          this.b1 = false;
          this.b2 = false;
          this.b3 = true;
          this.b4 = false;
          this.b5 = false;
          this.news = this.scienceNews.slice(startIndex, endIndex);
          this.pageTotal = Math.floor(this.scienceNews.length / 10) + 1;
          break;
        case 4:
          this.b1 = false;
          this.b2 = false;
          this.b3 = false;
          this.b4 = true;
          this.b5 = false;
          this.news = this.politicsNews.slice(startIndex, endIndex);
          this.pageTotal = Math.floor(this.politicsNews.length / 10) + 1;
          break;
        case 5:
          this.b1 = false;
          this.b2 = false;
          this.b3 = false;
          this.b4 = false;
          this.b5 = true;
          this.news = this.envNews.slice(startIndex, endIndex);
          this.pageTotal = Math.floor(this.envNews.length / 10) + 1;
          break;
        default:
          break;
      }
    }
    ,
    selectOne(index) {
      this.indexTopic = index
      switch (index) {
        case 1:
          this.b1 = true;
          this.b2 = false;
          this.b3 = false;
          this.b4 = false;
          this.b5 = false;
          this.news = this.contents.slice(0, 10);
          this.pageTotal = Math.floor(this.contents.length / 10) + 1;
          break;
        case 2:
          this.b1 = false;
          this.b2 = true;
          this.b3 = false;
          this.b4 = false;
          this.b5 = false;
          this.news = this.musicNews.slice(0, 10);
          this.pageTotal = Math.floor(this.musicNews.length / 10) + 1;
          break;
        case 3:
          this.b1 = false;
          this.b2 = false;
          this.b3 = true;
          this.b4 = false;
          this.b5 = false;
          this.news = this.scienceNews.slice(0, 10);
          this.pageTotal = Math.floor(this.scienceNews.length / 10) + 1;
          break;
        case 4:
          this.b1 = false;
          this.b2 = false;
          this.b3 = false;
          this.b4 = true;
          this.b5 = false;
          this.news = this.politicsNews.slice(0, 10);
          this.pageTotal = Math.floor(this.politicsNews.length / 10) + 1;
          break;
        case 5:
          this.b1 = false;
          this.b2 = false;
          this.b3 = false;
          this.b4 = false;
          this.b5 = true;
          this.news = this.envNews.slice(0, 10);
          this.pageTotal = Math.floor(this.envNews.length / 10) + 1;
          break;
        default:
          break;
      }
    },
  },
  mounted() {
    // let buffer;
    const res = axios.get(process.env.VUE_APP_BACKEND_API + "/content/");
    //console.log(res);
    res.then((result) => {
      let reviewBuffer = [];
      // buffer = result.data;
      this.contents = result.data;
      //console.log(result.data);
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
        let textCategory = this.contents[index].ContentCategory[0];
        if (textCategory.includes("รีวิว")) {
          reviewBuffer.push(this.contents[index]);
        }
        if (textCategory.includes("สิ่งแวดล้อม")) {
          this.envNews.push(this.contents[index]);
        }
        if (textCategory.includes("วิทยาศาสตร์")) {
          this.scienceNews.push(this.contents[index]);
        }
        if (textCategory.includes("ศิลป์และดนตรี")) {
          this.musicNews.push(this.contents[index]);
        }
        if (textCategory.includes("สังคมและการเมือง")) {
          this.politicsNews.push(this.contents[index]);
        }
        if (this.contents[index].CreateBy == "EduValor") {
          this.eduvalor.push(this.contents[index]);
        }
        const resImg = axios.get(
          process.env.VUE_APP_BACKEND_API_PROD +
            "/content/getImageContentByName?imageName=" +
            Url
        );
        resImg.then((result) => {
          this.getImg = result.data;
          const srcUrl = this.getImg.split("imageUrl : ");
          this.contents[index].imgSrc = srcUrl[1];
        });
      }
      this.news = this.contents.slice(0, 10);
      this.contentAll = this.contents;
      this.pageTotal = Math.floor(this.contents.length / 10) + 1;
      this.knowledge = this.contents;
      this.reviewNews = reviewBuffer;
      this.indexTopic = 1
    });
  },
};
</script>

<style scoped>
.wid-80 {
  color: #4c4c4c;
  width: 80%;
  font-family: "Bai Jamjuree";
}
.sub-detail {
  font-family: "Bai Jamjuree";
  font-style: normal;
  font-weight: 400;
  color: #ad9f86;
  font-size: 24px;
}

.img-middle {
  vertical-align: middle;
}
.backHome {
  font-size: 18px;
  cursor: pointer;
}
.button-active {
  background: #ad9f86;
  color: #ffffff !important;
  border-color: #ad9f86;
}
.v-btn {
  font-family: "KaLaTeXa Display";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
  color: #4c4c4c;
}
.see-more-heading{
  font-family: 'Kanit';
  font-size: 24px;
  color: #333;
  font-weight: 500;
}
.count{
  font-size: 20px;
}
.p-title{
  font-weight: 600;
  font-size: 18px;
}
</style>