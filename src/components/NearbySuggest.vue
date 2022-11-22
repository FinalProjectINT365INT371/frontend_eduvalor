<template>
  <div>
    <gmap-map
      ref="mapRef"
      :center="center"
      :zoom="16"
      map-type-id="terrain"
      class="gmap-map"
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
      <p v-if="aquariums">
        พบ
        <b>
          Aquarium <span> {{ aquariums }} </span></b
        >
        แห่ง
      </p>
      |

      <p v-if="art_gallerries">
        พบ
        <b>
          Gallery <span>{{ art_gallerries }} </span></b
        >
        แห่ง
      </p>
      |
      <p v-if="pipittapan">
        พบ
        <b>
          Museum <span>{{ pipittapan }} </span></b
        >
        แห่ง
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
      pipittapan: "",
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
      const res0 = await axios.get(
        "https://cors-anywhere.herokuapp.com/" +
          "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
          this.center.lat +
          "%2C" +
          this.center.lng +
          "&radius=2500&keyword=พิพิธภัณฑ์&key=" +
          process.env.VUE_APP_MAP_ACCESS_TOKEN
      );

      const res = await axios.get(
        "https://cors-anywhere.herokuapp.com/" +
          "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
          this.center.lat +
          "%2C" +
          this.center.lng +
          "&radius=2500&type=art_gallery&key=" +
          process.env.VUE_APP_MAP_ACCESS_TOKEN
      );

      const res2 = await axios.get(
        "https://cors-anywhere.herokuapp.com/" +
          "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
          this.center.lat +
          "%2C" +
          this.center.lng +
          "&radius=2500&type=aquarium&key=" +
          process.env.VUE_APP_MAP_ACCESS_TOKEN
      );

      // const res3 = await axios.get(
      //   "https://cors-anywhere.herokuapp.com/" +
      //     "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
      //     this.center.lat +
      //     "%2C" +
      //     this.center.lng +
      //     "&radius=2500&type=museum&key=" +
      //     process.env.VUE_APP_MAP_ACCESS_TOKEN
      // );

      if (res) {
        for (let i = 0; i < res0.data.results.length; i++) {
          this.markersText.push(
            JSON.stringify(res0.data.results[i].geometry.location)
          );
          this.pipittapan = res0.data.results.length;
        }

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

        // for (let i = 0; i < res3.data.results.length; i++) {
        //   this.markersText.push(
        //     JSON.stringify(res3.data.results[i].geometry.location)
        //   );
        //   this.museums = res3.data.results.length;
        // }

        for (let index = 0; index < this.markersText.length; index++) {
          this.markers.push({ position: JSON.parse(this.markersText[index]) });
        }

        console.log(this.markers);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.gmap-map {
  width: 800px;
  height: 300px;
  width: 100%;
}

#test-show-results {
  margin-top: 16px;
  justify-content: space-around;
  font-family: "Kanit";
  font-weight: 300;
  font-size: 18px;
  display: flex;
  color: #333333;
  b {
    color: #ad9f86;
    font-weight: 500;
  }
}
@media screen and (min-width: 768px) {
  #test-show-results {
    justify-content:space-evenly;
  }
}

@media screen and (min-width: 768px) {
  #test-show-results {
    font-size: 20px;
    b {
      font-size: 22px;
    }
  }
}
</style>>
