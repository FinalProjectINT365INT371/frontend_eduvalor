<template>
  <div>
    <!-- <GmapAutocomplete :type="shopping_mall"/> -->
    <gmap-map
      ref="mapRef"
      :center="center"
      :zoom="15"
      :options="{
        streetViewControl: true,
        streetView: panoramaValue,
      }"
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
      <!-- <gmap-street-view-panorama
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
      </gmap-street-view-panorama> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Map-Suggest",
  data() {
    return {
      center: { lat: 10, lng: 10 },
      currentPlace: null,
      markers: [],
      
      // reportedMapCenter: {
      //       lat: 52.201272,
      //       lng: 0.118720
      //     },
      //     mapCenter: null,
      //     pov: {
      //       heading: 0,
      //       pitch: 0,
      //     },
      //     pano: 0,
    };
  },

  mounted() {
    this.geolocate();
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
  },
};
</script>

<style></style>
