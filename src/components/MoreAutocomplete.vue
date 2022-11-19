<template>
  <div>
    <div v-if="addBoxs">
      <v-btn fab dark color="indigo" @click="addMoreGPS(0)"
        ><v-icon dark> mdi-plus </v-icon></v-btn
      >
    </div>
    <div v-if="box01">
      <GmapAutocomplete class="gmap" @place_changed="setPlace01" />
      <v-btn @click="addMarkers"> Add Markers</v-btn>
      <br />
      <br />
      <div>
        <v-btn fab dark color="indigo" @click="addMoreGPS(1)"
          ><v-icon dark> mdi-plus </v-icon>
        </v-btn>

        <v-btn @click="removeMoreGPS(0)">
          <v-icon> mdi-minus</v-icon>
        </v-btn>
      </div>
    </div>

    <div v-if="box02">
      <GmapAutocomplete class="gmap" @place_changed="setPlace02" />
      <v-btn @click="addMarkers"> Add Markers</v-btn>
      <br />
      <br />
      <div>
        <v-btn fab dark color="indigo" @click="addMoreGPS(2)"
          ><v-icon dark> mdi-plus </v-icon>
        </v-btn>

        <v-btn @click="removeMoreGPS(1)">
          <v-icon> mdi-minus</v-icon>
        </v-btn>
      </div>
    </div>

    <div v-if="box03">
      <GmapAutocomplete class="gmap" @place_changed="setPlace03" />
      <v-btn @click="addMarkers"> Add Markers</v-btn>
      <br />
      <br />
      <v-btn @click="removeMoreGPS(2)">
        <v-icon> mdi-minus</v-icon>
      </v-btn>
    </div>
  </div>
</template>
    
  <script>
export default {
  name: "Map-test",
  data() {
    return {
      center: { lat: 10, lng: 10 },
      currentPlace: [],
      markers: [],
      places: [],

      addBoxs: true,
      box01: false,
      box02: false,
      box03: false,

      optPlace01: null,
      optPlace02: null,
      optPlace03: null,
      allOptPlaces: [],
    };
  },
  mounted() {
    this.optCheck();
  },
  methods: {
    addMarkers() {
      // this.allOptPlaces = [this.optPlace01, this.optPlace02, this.optPlace03];
      let arrayContainer = [this.optPlace01, this.optPlace02, this.optPlace03];
      this.$emit("addMoreGPS", arrayContainer);
    },

    setPlace01(place) {
      this.optPlace01 = place;
      console.log("this is from setPlace(MoreGPS-1)", this.optPlace01);
    },
    setPlace02(place) {
      this.optPlace02 = place;
      console.log("this is from setPlace(MoreGPS-2)", this.optPlace02);
    },
    setPlace03(place) {
      this.optPlace03 = place;
      console.log("this is from setPlace(MoreGPS-3)", this.optPlace03);
    },

    addMoreGPS(box) {
      let tempArray = [this.box01, this.box02, this.box03];
      if (tempArray[box] == false) {
        switch (box) {
          case 0:
            this.box01 = true;
            this.addBoxs = false;
            break;
          case 1:
            this.box02 = true;
            break;
          case 2:
            this.box03 = true;
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
            break;
          case 2:
            this.box03 = false;
            this.optPlace03 = null;
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
        console.log(checker);
        this.addBoxs = true;
      }
    },
  },
};
</script>
  <style scoped>
.pac-target-input {
  padding: 2%;
  height: 48px;
  width: 100%;
  background-color: #ede6da;
  border-radius: 24px;
  border-color: #ede6da;
}

.pac-target-input {
  padding: 2%;
  height: 48px;
  width: 100%;
  background-color: #ede6da;
  border-color: #ede6da;
}

.gmap:focus {
  border-color: #ede6da;
}

.gmap-map {
  width: 800px;
  height: 300px;
}

@media screen and (max-width: 768px) {
  .gmap-map {
    width: 95%;
  }
}
</style>