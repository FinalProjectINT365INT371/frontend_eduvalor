<template>
  <div>
    <div style="justify-content: center;">
      <br />
      <!-- <v-btn @click='clearMap'> Clear Map</v-btn> -->
      <GmapAutocomplete class="gmap" @place_changed='setPlace' />

      <v-btn @click='addMarkers'> Add Markers</v-btn>
      <br />
      <br />

      <gmap-map :center="center" :zoom="14" map-type-id="terrain" class="gmap-map">
        <!-- <gmap-map :center="{lat:10, lng:10}" :zoom="7" map-type-id="terrain" style="width: 500px; height: 300px"> -->

        <gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true"
          :draggable="true" @click="center = m.position" />
      </gmap-map>
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
          lng: this.currentPlace.geometry.location.lng()
        };
        // this.markers.push({position: marker});
        this.markers[0] = { position: marker };

        console.log("this is from markers (lt, lng)", this.markers);
        console.log("this is from addmarkers( ได้ออกมาเป็นชุดข้อมูล)", this.places);

        // this.places.push(this.currentPlace);
        this.places[0] = this.currentPlace;
        console.log("this is the only one pinned place", this.places);

        this.center = null;
        this.center = marker;
        this.currentPlace = null;
        // console.log(this.currentPlace);
        // console.log(marker);
        // console.log(this.markers[0]);
        // this.$emit('addMarkers', this.markers[0].position)
        this.$emit('addMarkers', marker)

      }
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(position => {
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
      this.currentPlace = place
      console.log("this is from setPlace()", this.currentPlace);
    },

    // geocoder(latlng) {
    //   const geocoder = new google.maps.Geocoder();
    //   geocoder.Geocoder() 
    // },
    clearMap() {
      this.markers = [];
    },
  },
}
</script>
<style scoped>
.pac-target-input {
  padding: 2%;
  height: 48px;
  width: 100%;
  background-color: #EDE6DA;
  border-radius: 24px;
  border-color: #EDE6DA;

}

.pac-target-input {
  padding: 2%;
  height: 48px;
  width: 100%;
  background-color: #EDE6DA;
  border-color: #EDE6DA;
}

.gmap:focus {
  border-color: #EDE6DA;
}

.gmap-map{
  width: 800px; height: 300px;
}

@media screen and (max-width: 768px) {
  .gmap-map {
    width: 95%;
  }
}
</style>