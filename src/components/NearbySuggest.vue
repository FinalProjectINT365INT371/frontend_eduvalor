<template>
  <div>
    <gmap-map
      ref="mapRef"
      :center="center"
      :zoom="16"
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

    <div id="test-show-results">
      <p>
        พบ Aquarium {{ aquariums }} แห่ง | Art Gallery {{ art_gallerries }} แห่ง
        | พบ Museum {{ museums }} แห่ง
      </p>
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

      art_gallerries: "",
      aquariums: "",
      museums: "",
    };
  },

  mounted() {
    this.geolocate();
  },
  methods: {
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(async (position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.markers.push({ position: this.center });
        this.filteredMap();
      });
    },

    async filteredMap() {
        const res = await axios.get(
        "https://cors-anywhere.herokuapp.com/" +
          "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+ this.center.lat + '%2C' + this.center.lng + "&radius=4000&type=art_gallery&key=" +
          process.env.VUE_APP_MAP_ACCESS_TOKEN
      );

      const res2 = await axios.get(
        "https://cors-anywhere.herokuapp.com/" +
          "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+ this.center.lat + '%2C' + this.center.lng + "&radius=4000&type=aquarium&key=" +
          process.env.VUE_APP_MAP_ACCESS_TOKEN
      );

      const res3 = await axios.get(
        "https://cors-anywhere.herokuapp.com/" +
          "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+ this.center.lat + '%2C' + this.center.lng + "&radius=4000&type=museum&key=" +
          process.env.VUE_APP_MAP_ACCESS_TOKEN
      );

      if (res) {
        for (let i = 0; i < res.data.results.length; i++) {
          this.markersText.push(
            JSON.stringify(res.data.results[i].geometry.location)
          );
          this.art_gallerries = res.data.results.length;
        }

        for (let i = 0; i < res2.data.results.length; i++) {
          this.markersText.push(
            JSON.stringify(res2.data.results[i].geometry.location)
          );
          this.aquariums = res2.data.results.length;
        }

        for (let i = 0; i < res3.data.results.length; i++) {
          this.markersText.push(
            JSON.stringify(res3.data.results[i].geometry.location)
          );
          this.museums = res3.data.results.length;
        }

        for (let index = 0; index < this.markersText.length; index++) {
          this.markers.push({ position: JSON.parse(this.markersText[index]) });
        }

        console.log(this.markers);
      }
    },
  },
};
</script>

<style></style>
