<template>
  <div>
    <v-sheet class="mx-auto" max-width="100%">
      <v-slide-group v-model="model" class="pa-4" show-arrows>
        <v-slide-item v-for="n in 5" :key="n" v-slot="{ active, toggle }">
          <v-card
            :color="active ? undefined : 'grey lighten-1'"
            class="ma-4"
            height="350"
            width="660"
            @click="toggle"
          >
            <img src="../assets/demo/img1.png" alt="" />
            <v-row class="fill-height" align="center" justify="center"> </v-row>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
    <div class="d-flex justify-center">
      <div class="d-inline test">
        <p class="pic-cover">
          <img
            class="pr-3 img-relate"
            src="../assets/icon/gps.png"
          />ส่องแหล่งเรียนรู้ใกล้ตัวคุณ!
        </p>
        <img src="../assets/gpsmap.png" alt="" width="100%" />

        <div>
          <p class="pic-cover">
            <img
              class="pr-3 img-relate"
              src="../assets/icon/fire.png"
            />บทความล่าสุด
          </p>
          <v-row>
            <v-col v-for="(items, index) in news" :key="index" cols="12" sm="12" md="6" lg="6">
              <v-row>
                <v-col cols="12" sm="12" md="7" lg="7" >
                  <img src="../assets/demo/img2.png" alt="" width="100%" />
                </v-col>
                <v-col cols="12" sm="12" md="5" lg="5">
                  <p class="p-title">{{ items.title }}</p>
                  <p class="p-author">โดย {{ items.author }}</p>
                  <p class="p-date">เมื่อ {{ items.date }}</p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <p class="p-addition">ดูบทความล่าสุดเพิ่มเติม ></p>
        </div>

        <div>
          <p class="pic-cover mb-0">รีวิวแนะนำแหล่งเรียนรู้</p>
          <p class="p-subtitle">
            รวมบทความรีวิวสถานที่น่าสนใจทั้งหมด
          </p>
          <v-sheet class="mx-auto" max-width="100%">
            <v-slide-group v-model="model" class="pa-4">
              <v-slide-item
                v-for="(items, index) in news"
                :key="s + index"
                v-slot="{ active, toggle }"
              >
                <v-card
                  :color="active ? undefined : undefined"
                  class="ma-4"
                  elevation="0"
                  width="400"
                  height="345"
                  @click="toggle"
                >
                  <img src="../assets/demo/img2.png" alt="" width="100%" />
                  <v-row>
                    <v-col cols="12">
                      <p class="p-title-slide">{{ items.title }}</p>
                      <p class="p-author">โดย {{ items.author }}</p>
                    </v-col>
                  </v-row>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
          <p class="p-addition">ดูบทความล่าสุดเพิ่มเติม ></p>
        </div>

        <div>
          <p class="pic-cover mb-0">รอบรู้ตามแต่ละศาสตร์</p>
          <p class="p-subtitle">
            รวมบทความเกี่ยวกับสถานที่เรียนรู้โดยแบ่งตามแขนง
          </p>
          <div class="mb-4">
            <v-btn
              elevation="2"
              @click="b1 = !b1"
              outlined
              :class="{ 'button-active': b1 }"
              >ทั้งหมด</v-btn
            >
            <v-btn
              elevation="2"
              @click="b2 = !b2"
              outlined
              :class="{ 'button-active': b2 }"
              class="mx-2"
              >ศิลป์และดนตรี</v-btn
            >
            <v-btn
              elevation="2"
              @click="b3 = !b3"
              outlined
              class="mx-2"
              :class="{ 'button-active': b3 }"
              >วิทยาศาสตร์</v-btn
            >
            <v-btn
              elevation="2"
              @click="b4 = !b4"
              outlined
              class="mx-2"
              :class="{ 'button-active': b4 }"
              >สังคมและการเมือง</v-btn
            >
            <v-btn
              elevation="2"
              @click="b5 = !b5"
              outlined
              class="mx-2"
              :class="{ 'button-active': b5 }"
              >สิ่งแวดล้อม</v-btn
            >
          </div>
          <v-row>
            <v-col v-for="(items, index) in news" :key="index" cols="12" sm="12" md="6" lg="6">
              <v-row>
                <v-col cols="12" sm="12" md="7" lg="7" >
                  <img src="../assets/demo/img2.png" alt="" width="100%" />
                </v-col>
                <v-col cols="12" sm="12" md="5" lg="5">
                  <p class="p-title">{{ items.title }}</p>
                  <p class="p-author">โดย {{ items.author }}</p>
                  <p class="p-date">เมื่อ {{ items.date }}</p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <p class="p-addition">ดูบทความล่าสุดเพิ่มเติม ></p>
        </div>
                    <div>
          <p class="pic-cover mb-0">บ.ก. EduValor ขอแนะนำ!</p>
          <p class="p-subtitle">
            รวมบทความจากบ.ก. และจากทางบ้านที่บ.ก. อยากแนะนำ
          </p>
          <v-sheet class="mx-auto" max-width="100%">
            <v-slide-group v-model="model" class="pa-4">
              <v-slide-item
                v-for="(items, index) in news"
                :key="s + index"
                v-slot="{ active, toggle }"
              >
                <v-card
                  :color="active ? undefined : undefined"
                  class="ma-4"
                  elevation="0"
                  width="400"
                  height="345"
                  @click="toggle"
                >
                  <img src="../assets/demo/img2.png" alt="" width="100%" />
                  <v-row>
                    <v-col cols="12">
                      <p class="p-title-slide">{{ items.title }}</p>
                      <p class="p-author">โดย {{ items.author }}</p>
                    </v-col>
                  </v-row>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
          <p class="p-addition">ดูบทความล่าสุดเพิ่มเติม ></p>
        </div>
      </div>
    </div>



    <!-- <router-link to="/ShowContent" >
      <v-card hover shaped class="mx-auto content-thumbnail" @click="selectContent(_id._id)" max-width="400"
        v-for="_id in contents" :key="_id._id">

        <v-img src="https://www.traveldb.me/wp-content/uploads/2021/01/bangkok-sea-life-ocean-world.jpg"></v-img>
        <v-img :src="`${_id.imgSrc}`" class="thumbnails"></v-img>
        <v-card-title class="test-underline">{{ _id.Header }}</v-card-title>

        <v-card-subtitle color="white">
          โดย {{ _id.CreateBy }}
        </v-card-subtitle>
        <v-card-subtitle>
          เมื่อ {{ _id.CreateDate }}
        </v-card-subtitle>

      </v-card>
    </router-link> -->
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    contents: [],
    b1: false,
    b2: false,
    b3: false,
    b4: false,
    b5: false,
    getImg: [],
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
    selectContent(selected) {
      const selectData = this.contents.find((c) => (c._id = selected))._id;
      window.localStorage.setItem("content", selectData);
      //console.log(selectData);
    },
  },

  mounted() {
    // let buffer;
    const res = axios.get(process.env.VUE_APP_BACKEND_API + "/content/");
    res.then((result) => {
      // buffer = result.data;
      this.contents = result.data;
      //console.log(result.data);
      this.contents = this.contents.map(function (el) {
        const o = Object.assign({}, el);
        o.imgSrc = "";
        return o;
      });

      for (let index = 0; index < this.contents.length; index++) {
        let Url = this.contents[index].ImageUrl[0];
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
    });
  },
};
</script>

<style lang="scss">
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

.content-thumbnail {
  padding: 1.5%;
  margin: 1.5%;
}

// @media screen and (max-width: 767px) {
//   .thumbnails {
//   width: 30%;
// }
// }

// @media screen and (max-width: 1023px) {
//   .thumbnails {
//   width: 40%;
// }
// }

// @media screen and (max-width: 2000px) {
//   .thumbnails {
//   width: 70%;
// }
// }
.test-underline {
  text-decoration: none;
}
.pic-cover {
  font-family: "Kanit";
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
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
  font-size: 24px;
  line-height: 36px;
  color: #4c4c4c;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.p-title-slide {
  font-family: "Kanit";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
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
  font-size: 20px;
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
  font-size: 16px;
  line-height: 20px;
  color: #ad9f86;
}
.p-addition {
  font-family: "Kanit";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  text-align: right;
  color: #a89b84;
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
  border-color: #ad9f86;
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
</style>>
