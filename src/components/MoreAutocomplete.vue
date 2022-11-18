<template>
  <div>
    <div v-if="addBoxs">
      <v-btn fab dark color="indigo" @click="addMoreGPS(0)"
        ><v-icon dark> mdi-plus </v-icon></v-btn
      >
    </div>
    <div v-if="box01">
      <GmapAutocomplete class="gmap" @place_changed="setPlace" />
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
      <GmapAutocomplete class="gmap" @place_changed="setPlace" />
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
      <GmapAutocomplete class="gmap" @place_changed="setPlace" />
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
      currentPlace: null,
      markers: [],
      places: [],

      addBoxs: true,
      box01: false,
      box02: false,
      box03: false,
    };
  },
  mounted() {
    this.geolocate();
    this.optCheck();
  },
  methods: {
    addMarkers() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        // this.markers.push({position: marker});
        this.markers[0] = { position: marker };

        console.log("this is from markers (lt, lng)", this.markers);
        console.log(
          "this is from addmarkers( ได้ออกมาเป็นชุดข้อมูล)",
          this.places
        );

        // this.places.push(this.currentPlace);
        this.places[0] = this.currentPlace;
        console.log("this is the only one pinned place", this.places);

        this.center = null;
        this.center = marker;
        this.$emit("addMarkers", this.currentPlace);
        this.currentPlace = null;

        this.mainGPSRules = false;
        console.log(this.mainGPSRules);
      }
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.markers.push({ position: this.center });
        // this.markers = { position: this.center }
        // console.log('this is markers from Geolocate', this.markers);
        console.log("this is center from Geolocate", this.center);
        // this.currentPlace =
      });
    },
    setPlace(place) {
      this.currentPlace = place;
      console.log("this is from setPlace()", this.currentPlace);
    },
    clearMap() {
      this.markers = [];
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
            break;
          case 1:
            this.box02 = false;
            break;
          case 2:
            this.box03 = false;
            break;

          default:
            break;
        }
      }
      this.optCheck();
    },

    optCheck(){
      let tempArray = [this.box01, this.box02, this.box03];
      let checker = tempArray.every(v => v === false);
      if (checker) {
        console.log(checker);
        this.addBoxs = true;
      }
    }
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