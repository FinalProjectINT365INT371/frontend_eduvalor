<template>
  <div>
    <!-- <GmapAutocomplete :type="shopping_mall"/> -->
    <gmap-map
      ref="mapRef"
      :center="center"
      :zoom="15"
      map-type-id="terrain"
      style="width: 1100px; height: 300px"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        @click="center = m.position"
      />
      <!-- <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen = false"
      >
      </gmap-info-window> -->
    </gmap-map>
    <div>
      <gmap-street-view-panorama
        ref="pano"
        :position="center"
        :pov="pov"
        :zoom="1"
        class="map-container"
        @position_changed="updateCenter"
        @pano_changed="updatePano"
        @pov_changed="updatePov"
        style="width: 1100px; height: 300px"
      >
      </gmap-street-view-panorama>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Map-Suggest",
  data() {
    return {
      center: { lat: 10, lng: 10 },
      currentPlace: null,
      markers: [],

      reportedMapCenter: {
        lat: 52.201272,
        lng: 0.11872,
      },
      mapCenter: null,
      pov: {
        heading: 0,
        pitch: 0,
      },
      pano: 0,
    };
  },

  mounted() {
    this.geolocate();
    this.filteredMap();
  },
  methods: {
    geolocate: function () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.markers.push({ position: this.center });
      });
    },
    // updatePov(pov) {
    //   this.pov = pov;
    // },
    // updatePano(pano) {
    //   this.pano = pano;
    // },
    // updateCenter(latLng) {
    //   this.reportedMapCenter = {
    //     lat: latLng.lat(),
    //     lng: latLng.lng(),
    //   };
    // },

    async filteredMap() {
      //  const res = await axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + this.center.lat + '%' + this.center.lng + '&radius=1500&type=restaurant&keyword=cruise&key=' + process.env.VUE_APP_MAP_ACCESS_TOKEN)
      const res = await axios.get(
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&keyword=cruise&key=" +
          process.env.VUE_APP_MAP_ACCESS_TOKEN
      );

      console.log(res.data.results);
    },
  },
};
</script>

<style></style>
