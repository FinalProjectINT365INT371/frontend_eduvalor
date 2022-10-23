<template>
  <div>      
    <!-- <GmapAutocomplete :type="shopping_mall"/> -->
    <gmap-map :center="center" :zoom="15" map-type-id="terrain" :types="museum"  style="width: 1100px; height: 300px;">
      <gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true"
            :draggable="false" @click="center=m.position" />
    </gmap-map>


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
          };
      },
    mounted() {
          this.geolocate();
      },
      methods:{
        geolocate: function () {
              navigator.geolocation.getCurrentPosition(position => {
                  this.center = {
                      lat: position.coords.latitude,
                      lng: position.coords.longitude,
                  };
                  this.markers.push({position: this.center});
              });
          },
      }
}
</script>

<style>

</style>