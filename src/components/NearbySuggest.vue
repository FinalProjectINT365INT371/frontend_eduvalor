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
    </gmap-map>
    <div>
      <gmap-street-view-panorama
        ref="pano"
        :position="center"
        :zoom="1"
        class="map-container"
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
      markersText: [],
    };
  },

  mounted() {
    this.geolocate();
    // this.filteredMap();
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
    this.filteredMap();
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

    // @position_changed="updateCenter"
    //     @pano_changed="updatePano"
    //     @pov_changed="updatePov"

    async filteredMap() {
      //  const res = await axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + this.center.lat + '%' + this.center.lng + '&radius=1500&type=restaurant&keyword=cruise&key=' + process.env.VUE_APP_MAP_ACCESS_TOKEN)
      const res = await axios.get(
        "https://cors-anywhere.herokuapp.com/" +
          "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=13.7120038%2C100.531953&radius=50000&type=art_gallery&key=" +
          process.env.VUE_APP_MAP_ACCESS_TOKEN
      );
      if (res) {
        console.log(res);
        console.log("Hi " + res.data.results.length);
        for (let i = 0; i < res.data.results.length; i++) {
          // this.markers = res.data.results[i].geometry.location
          this.markersText.push(
            JSON.stringify(res.data.results[i].geometry.location)
          );
          console.log(res.data.results[i].geometry.location);
        }

        for (let index = 0; index < this.markersText.length; index++) {
          console.log(this.markersText[index]);
          this.markers.push({position: JSON.parse(this.markersText[index])});
          // this.markers.push(JSON.parse(this.markersText[index]));

        }

        console.log(this.markers);
        // console.log(this.center);
        // console.log(res.data.results);
      }
    },
  },
};
</script>

<style></style>
