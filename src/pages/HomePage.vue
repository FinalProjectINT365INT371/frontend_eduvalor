<template>
  <div class="mb-10">
    <v-sheet class="mx-auto" max-width="100%">
      <v-slide-group class="mb-5" v-model="model" center-active show-arrows>
        <v-slide-item
          v-for="(topLoop, index) in eduvalor"
          :key="index"
          v-slot="{ active, toggle }"
        >
          <v-card
            :color="active ? undefined : 'grey lighten-1'"
            class="mx-2 corousel-img"
            @click="toggle, navTo(topLoop._id)"
          >
            <v-img :src="topLoop.imgSrc" alt="" class="img-corousel" width="100%" />
            <v-row class="fill-height" align="center" justify="center"> </v-row>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
    <div class="d-flex justify-center">
      <div class="d-inline test">
        <p class="pic-cover">
          <img
            class="pr-3 img-icon"
            src="../assets/icon/gps.png"
          />ส่องแหล่งเรียนรู้ใกล้ตัวคุณ!
        </p>
        <NearbySuggest class="gps-homepage" />

        <div>
          <p class="pic-cover">
            <img
              class="pr-3 img-icon"
              src="../assets/icon/fire.png"
            />บทความล่าสุด
          </p>
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
                  <v-img
                    :src="items.imgSrc"
                    alt=""
                    width="100%"
                    max-height="188"
                    min-height="188"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="5" lg="5">
                  <p class="p-title">{{ items.Header }}</p>
                  <p class="p-author">โดย {{ items.CreateBy }}</p>
                  <p class="p-date">เมื่อ {{ items.UpdateDate }}</p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <p class="p-addition cursor" @click="filterContent">
            ดูบทความทั้งหมดเพิ่มเติม >
          </p>
        </div>

        <div>
          <p class="pic-cover mb-0">รีวิวแนะนำแหล่งเรียนรู้</p>
          <p class="p-subtitle">รวมบทความรีวิวสถานที่น่าสนใจทั้งหมด</p>
          <v-sheet class="mx-auto" max-width="100%">
            <v-slide-group v-model="model" class="pa-0">
              <v-slide-item
                v-for="(items, index) in reviewNews"
                :key="'s' + index"
                v-slot="{ active, toggle }"
              >
                <v-card
                  :color="active ? undefined : undefined"
                  class="ma-4"
                  elevation="0"
                  width="400"
                  height="345"
                  @click="toggle, navTo(items._id)"
                >
                  <v-img
                    :src="items.imgSrc"
                    alt=""
                    width="100%"
                    max-height="188"
                    min-height="188"
                  />
                  <v-row>
                    <v-col cols="12">
                      <p class="p-title-slide">{{ items.Header }}</p>
                      <p class="p-author">โดย {{ items.CreateBy }}</p>
                    </v-col>
                  </v-row>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
          <!-- <p class="p-addition cursor" @click="filterContent">
            ดูบทความรีวิวเพิ่มเติม >
          </p> -->
        </div>

        <div>
          <p class="pic-cover mb-0">รอบรู้ตามแต่ละศาสตร์</p>
          <p class="p-subtitle">
            รวมบทความเกี่ยวกับสถานที่เรียนรู้โดยแบ่งตามแขนง
          </p>
          <div class="my-10">
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
          <v-row>
            <v-col
              v-for="(items, index) in knowledge"
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
                  <v-img
                    :src="items.imgSrc"
                    alt=""
                    width="100%"
                    max-height="188"
                    min-height="188"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="5" lg="5">
                  <p class="p-title">{{ items.Header }}</p>
                  <p class="p-author">โดย {{ items.CreateBy }}</p>
                  <p class="p-date">เมื่อ {{ items.UpdateDate }}</p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <!-- <p class="p-addition cursor" @click="filterContent">
            ดูบทความทั้งหมดเพิ่มเติม >
          </p> -->
        </div>
        <div>
          <p class="pic-cover mb-0">บ.ก. EduValor ขอแนะนำ!</p>
          <p class="p-subtitle">
            รวมบทความจากบ.ก. และจากทางบ้านที่บ.ก. อยากแนะนำ
          </p>
          <v-sheet class="mx-auto" max-width="100%">
            <v-slide-group v-model="model">
              <v-slide-item
                v-for="(items, index) in eduvalor"
                :key="'s' + index"
                v-slot="{ active, toggle }"
              >
                <v-card
                  :color="active ? undefined : undefined"
                  class="ma-4"
                  elevation="0"
                  width="400"
                  height="345"
                  @click="toggle, navTo(items._id)"
                >
                  <v-img
                    :src="items.imgSrc"
                    alt=""
                    width="100%"
                    max-height="188"
                    min-height="188"
                  />
                  <v-row>
                    <v-col cols="12">
                      <p class="p-title-slide">{{ items.Header }}</p>
                      <p class="p-author">โดย {{ items.CreateBy }}</p>
                    </v-col>
                  </v-row>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
          <!-- <p class="p-addition cursor" @click="filterContent">
            ดูบทความแนะนำโดยบ.ก. เพิ่มเติม >
          </p> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import NearbySuggest from "../components/NearbySuggest.vue";
export default {
  data: () => ({
    contents: [],
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
    news: [
      {
        title:
          "ปักหมุด เที่ยวกรุงเทพมิวเซียมสยาม เล่าเรื่องเมืองไทย ในพิพิธภัณฑ์มีชีวิต",
        author: "บก. EduValor",
        date: "5/8/2565 17:03:07",
        img: "../assets/demo/img1.png",
      },
      {
        title:
          "8 อควาเรียม เที่ยวกรุงเทพ และ ใกล้กรุงเทพ เที่ยวสนุก ทั้งครอบครัว วันหยุดสั้นๆ",
        author: "บก. EduValor",
        date: "5/8/2565 17:03:07",
        img: "../assets/demo/img2.png",
      },
      {
        title:
          "พิพิธภัณฑ์วิทยาศาสตร์แห่ง ชาติ ปทุมธานี เที่ยวสนุก เรียน รู้มันส์ ไปกับเทคโนโลยีล้ำ ๆ",
        author: "บก. EduValor",
        date: "5/8/2565 17:03:07",
        img: "../assets/demo/img3.png",
      },
    ],
  }),
  methods: {
    navTo(articleId) {
      this.$router.push({
        path: "/article/" + articleId,
      });
    },
    selectOne(index) {
      switch (index) {
        case 1:
          this.b1 = true;
          this.b2 = false;
          this.b3 = false;
          this.b4 = false;
          this.b5 = false;
          this.knowledge = this.news;
          break;
        case 2:
          this.b1 = false;
          this.b2 = true;
          this.b3 = false;
          this.b4 = false;
          this.b5 = false;
          this.knowledge = this.musicNews;
          break;
        case 3:
          this.b1 = false;
          this.b2 = false;
          this.b3 = true;
          this.b4 = false;
          this.b5 = false;
          this.knowledge = this.scienceNews;
          break;
        case 4:
          this.b1 = false;
          this.b2 = false;
          this.b3 = false;
          this.b4 = true;
          this.b5 = false;
          this.knowledge = this.politicsNews;
          break;
        case 5:
          this.b1 = false;
          this.b2 = false;
          this.b3 = false;
          this.b4 = false;
          this.b5 = true;
          this.knowledge = this.envNews;
          break;
        default:
          break;
      }
    },
    filterContent() {
      this.$router.push({
        path: "/SeeMore",
      });
    },
  },
  mounted() {
    // let buffer;
    const res = axios.get(process.env.VUE_APP_BACKEND_API + "/content/");
    // console.log(res);
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
        //console.log(Url);
        const resImg = axios.get(
          process.env.VUE_APP_BACKEND_API +
            "/content/getImageContentByName?imageName=" +
            Url
        );
        //console.log(resImg);
        resImg.then((result) => {
          this.getImg = result.data;
          const srcUrl = this.getImg.split("imageUrl : ");
          //console.log(srcUrl[1]);
          this.contents[index].imgSrc = srcUrl[1];
          //console.log(this.contents.imgSrc);
        });
      }
      this.news = this.contents.slice(0, 4);
      this.knowledge = this.contents.slice(0, 4);
      this.reviewNews = reviewBuffer.slice(0, 4);
      this.envNews = this.envNews.slice(0, 4);
      this.scienceNews = this.scienceNews.slice(0, 4);
      this.musicNews = this.musicNews.slice(0, 4);
      this.politicsNews = this.politicsNews.slice(0, 4);
      // console.log(this.contents);
    });
  },
  components: { NearbySuggest },
};
</script>

<style lang="scss" scoped>
.pic-cover {
  font-family: "Kanit";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 54px;
  color: #333333;
}
.img-middle {
  vertical-align: middle;
}
.p-title {
  font-family: "Kanit";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 36px;
  color: #4c4c4c;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.p-title:hover, .p-title-slide:hover{
color: #a89b84;
}
.p-title-slide {
  font-family: "Kanit";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 36px;
  color: #4c4c4c;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.p-author {
  font-family: "Bai Jamjuree";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  color: #a89b84;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.p-date {
  font-family: "Bai Jamjuree";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #ad9f86;
}
.p-addition {
  font-family: "Kanit";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 30px;
  text-align: right;
  color: #a89b84;
}

.p-addition:hover {
  color: #333333;
}
.p-subtitle {
  font-family: "Bai Jamjuree";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: #4c4c4c;
}
.button-active {
  background: #ad9f86;
  color: #ffffff !important;
  border-color: #ad9f86 !important;
}
.v-btn--outlined .non-active {
  border: thin solid #ede6da;
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
.cursor {
  cursor: pointer;
}
.v-btn > .v-btn__content .v-icon {
  color: #a89b84;
}

@media screen and (min-width: 320px) {
  .test {
    width: 90%;
  }
  .gps-homepage {
    width: 100%;
  }
  .img-icon {
    width: 36px;
  }
  ::v-deep .v-slide-group__next,
  ::v-deep .v-slide-group__prev {
    min-width: 32px;
  }
  .corousel-img {
    width: 400px;
    height: 200px;
    object-fit: cover;
  }
  .pic-cover {
    margin-top: 24px;
  }
}

@media screen and (min-width: 768px) {
  .test {
    width: 75%;
  }
}

@media screen and (min-width: 1024px) {
  .test {
    width: 65%;
  }
  .pic-cover {
    font-size: 28px;
  }
  .p-subtitle {
    font-size: 20px;
  }
  .v-btn {
    border-color: #ede6da;
  }
  .row {
    padding: 10px 8px;
  }
  .p-addition {
    font-size: 24px;
  }
  .p-date {
    font-size: 16px;
  }
  .p-author {
    font-size: 20px;
  }
  .corousel-img, .img-corousel {
    width: 440px;
    min-height: 240px;
    max-height: 240px;
  }
}
</style>>
