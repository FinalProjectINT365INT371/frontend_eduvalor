<template>
  <div>
    <div style="justify-content: center">
      <br />
      <!-- <v-btn @click='clearMap'> Clear Map</v-btn> -->
      <GmapAutocomplete
        class="gmap"
        @place_changed="setPlace"
      />

      <v-btn @click="addMarkers"> Add Markers</v-btn>
      <br />
      <br />

      <gmap-map
        :center="center"
        :zoom="16"
        map-type-id="terrain"
        class="gmap-map"
        :options="{
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          disableDefaultUi: false,
        }"
      >
        <gmap-marker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center = m.position"
        />
      </gmap-map>
      <p v-if="mainGPSRules" class="text-red">กรุณาใส่พิกัดของสถานที่ที่ต้องการแนะนำ</p>
    </div>

    <v-btn @click="addMoreOpts" class="primary">add</v-btn>
    <div
      v-for="(moreGmapAuto, i) in GmapAutocompletes"
      :key="i"
      class="text-fields-row"
    >
      <GmapAutocomplete
        :rules="mainGPSRules"
        class="gmap"
        @place_changed="setPlace"
        v-model="moreGmapAuto.value"
      />
      <v-btn @click="removeOpts(i)" class="error">delete</v-btn>
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

      mainGPSRules: true,
      GmapAutocompletes: [],
    };
  },
  mounted() {
    this.geolocate();
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
    addMoreOpts() {
      this.GmapAutocompletes.push({
        value: "",
      });
    },
    removeOpts(index) {
      this.GmapAutocompletes.splice(index, 1);
    },
    pinningAlert() {
      if (this.coordinates !== []) {
        this.mainCoordinate = false;
      } else {
        this.mainCoordinate = true;
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