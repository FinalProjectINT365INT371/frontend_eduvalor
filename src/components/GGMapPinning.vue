<template>
  <div>
    <div style="justify-content: center">
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
          @click="center = m.position"
        />
      </gmap-map>
      <div class="d-flex justify-space-around pt-5">
        <GmapAutocomplete class="gmap" @place_changed="setPlace" />

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
      </div>

      <p v-if="mainGPSRules" class="text-red">
        กรุณาใส่พิกัดของสถานที่ที่ต้องการแนะนำ
      </p>
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
        this.markers[0] = { position: marker };

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
      });
    },
    setPlace(place) {
      this.currentPlace = place;
    },
    clearMap() {
      this.markers = [];
    },
  },
};
</script>
<style scoped>
.pac-target-input {

  padding: 2%;
  height: 48px;
  width: 80%;
  background-color: #ede6da;
  border-radius: 24px;
  border-color: #ede6da;

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
.text-red {
  padding-top: 2%;
  color: red;
}
</style>