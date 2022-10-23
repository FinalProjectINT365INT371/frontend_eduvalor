<template>
    <div>
      <div style="justify-content: center;">
        <button @click='addMarkers'> Add Markers</button>
        <button @click='clearMap'> Clear Map</button>
        <GmapAutocomplete @place_changed = 'setPlace'/>
        <gmap-map :center="center" :zoom="14" map-type-id="terrain" style="width: 800px; height: 300px; ">
          <!-- <gmap-map :center="{lat:10, lng:10}" :zoom="7" map-type-id="terrain" style="width: 500px; height: 300px"> -->
  
          <gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true"
            :draggable="true" @click="center=m.position" />
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
            if(this.currentPlace){
              const marker = {
                lat: this.currentPlace.geometry.location.lat(),
                lng: this.currentPlace.geometry.location.lng()
              };
              this.markers.push({position: marker});
              this.places.push(this.currentPlace);
              console.log(this.currentPlace);
  
              this.center = null; 
              this.center = marker;
              this.currentPlace = null;
              console.log(this.currentPlace);
              console.log(marker);
            }
          },
          geolocate: function () {
              navigator.geolocation.getCurrentPosition(position => {
                  this.center = {
                      lat: position.coords.latitude,
                      lng: position.coords.longitude,
                  };
                  this.markers.push({position: this.center});
              });
          },
          setPlace(place){
            this.currentPlace=place;
          },
          clearMap(){
            this.markers = [];
          },
      },
  }
  </script>