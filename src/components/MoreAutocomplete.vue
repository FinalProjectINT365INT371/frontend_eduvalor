<template>
  <div>
    <div v-if="addBoxs" class="d-flex justify-center pb-10">
      <v-btn fab color="#EDE6DA" @click="addMoreGPS(0)"
        ><v-icon color="gray"> mdi-plus </v-icon></v-btn
      >
    </div>
    <div v-if="box01">
      <div class="auto-box d-flex pt-5 pb-5 align-center">
        <GmapAutocomplete class="gmap" @place_changed="setPlace01" />
        <div class="buttons-box d-flex">
          <v-btn
            @click="addMarkers"
            id="addMarker"
            rounded
            elevation="2"
            color="#AD9F86"
          >
            <img src="../assets/icon/eva_pin-fill.png" />
            เพิ่มหมุดใหม่
          </v-btn>
          <v-btn color="white" @click="removeMoreGPS(0)">
            <v-icon color="grey"> mdi-minus</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="d-flex justify-center">
        <v-btn v-if="addBoxs1" fab color="#EDE6DA" @click="addMoreGPS(1)"
          ><v-icon color="gray"> mdi-plus </v-icon>
        </v-btn>
      </div>
    </div>

    <div v-if="box02">
      <div class="auto-box d-flex pb-5 align-center">
        <GmapAutocomplete class="gmap" @place_changed="setPlace02" />
        <div class="buttons-box d-flex">
          <v-btn
            @click="addMarkers"
            id="addMarker"
            rounded
            elevation="2"
            color="#AD9F86"
          >
            <img src="../assets/icon/eva_pin-fill.png" />
            เพิ่มหมุดใหม่
          </v-btn>
          <v-btn color="white" @click="removeMoreGPS(1)">
            <v-icon color="grey"> mdi-minus</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="d-flex justify-center">
        <v-btn v-if="addBoxs2" fab color="#EDE6DA" @click="addMoreGPS(2)"
          ><v-icon color="gray"> mdi-plus </v-icon>
        </v-btn>
      </div>
    </div>

    <div v-if="box03">
      <div class="auto-box d-flex pb-5 align-center">
        <GmapAutocomplete class="gmap" @place_changed="setPlace03" />
        <div class="buttons-box d-flex">
          <v-btn
            @click="addMarkers"
            id="addMarker"
            rounded
            elevation="2"
            color="#AD9F86"
          >
            <img src="../assets/icon/eva_pin-fill.png" />
            เพิ่มหมุดใหม่
          </v-btn>
          <v-btn color="white" @click="removeMoreGPS(2)">
            <v-icon color="grey"> mdi-minus</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
    
  <script>
export default {
  name: "Map-test",
  data() {
    return {
      center: { lat: 10, lng: 10 },

      addBoxs: true,
      addBoxs1: true,
      addBoxs2: true,

      box01: false,
      box02: false,
      box03: false,

      optPlace01: null,
      optPlace02: null,
      optPlace03: null,
    };
  },
  mounted() {
    this.optCheck();
  },
  methods: {
    addMarkers() {
      let arrayContainer = [this.optPlace01, this.optPlace02, this.optPlace03];
      this.$emit("addMoreGPS", arrayContainer);
    },

    setPlace01(place) {
      this.optPlace01 = place;
    },
    setPlace02(place) {
      this.optPlace02 = place;
    },
    setPlace03(place) {
      this.optPlace03 = place;
    },

    addMoreGPS(box) {
      let tempArray = [this.box01, this.box02, this.box03];
      if (tempArray[box] == false) {
        switch (box) {
          case 0:
            this.box01 = true;
            this.addBoxs = false;
            this.addBoxs1 = true;

            break;
          case 1:
            this.box02 = true;
            this.addBoxs1 = false;
            this.addBoxs2 = true;

            break;
          case 2:
            this.box03 = true;
            this.addBoxs2 = false;
            break;

          default:
            break;
        }
      }
    },

    removeMoreGPS(box) {
      let tempArray = [this.box01, this.box02, this.box03];
      if (tempArray[box] == true) {
        switch (box) {
          case 0:
            this.box01 = false;
            this.optPlace01 = null;
            break;
          case 1:
            this.box02 = false;
            this.optPlace02 = null;
            this.optCheck01();
            break;
          case 2:
            this.box03 = false;
            this.optPlace03 = null;
            this.optCheck02();
            break;

          default:
            break;
        }
      }
      this.optCheck();
    },

    optCheck() {
      let tempArray = [this.box01, this.box02, this.box03];
      let checker = tempArray.every((v) => v === false);
      if (checker) {
        this.addBoxs = true;
      }
    },
    optCheck01() {
      let tempArray = [this.box02, this.box03];
      let checker = tempArray.every((v) => v === false);
      if (checker) {
        this.addBoxs1 = true;
      }
    },
    optCheck02() {
      let tempArray = [this.box03];
      let checker = tempArray.every((v) => v === false);
      if (checker) {
        this.addBoxs2 = true;
      }
    },
  },
};
</script>
  <style scoped>
.pac-target-input {
  padding: 2%;
  height: 48px;
  width: 70%;
  background-color: #ede6da;
  border-radius: 24px;
  border-color: #ede6da;
  outline: none;

  font-family: "Bai Jamjuree";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
}

#addMarker {
  color: white;
  font-family: "Bai Jamjuree";
  font-style: bold;
  font-size: 14px;
  padding: 3% 1%;
}
@media screen and (min-width: 320px) {
  .auto-box {
    flex-direction: column;
  }
  .buttons-box {
    margin-top: 3%;
    vertical-align: middle;
    width: 100%;
    flex-direction: row;
    justify-content: center;
  }
  .pac-target-input {
    padding: 4%;
    width: 100%;
    height: 40px;
  }
  #pin-icon {
    width: 28px;
  }

  #addMarker {
    margin: 0px 16px;
    font-size: 14px;
    padding: 6% 16%;
    width: 40%;
  }
  .v-application .d-flex {
    justify-content: center;
  }
}
</style>