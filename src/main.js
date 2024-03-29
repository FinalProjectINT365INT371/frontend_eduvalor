import Vue from "vue"
import App from "@/App.vue"

// import router from "@/router"
import vuetify from "@/plugins/vuetify"

import router from './router'
// import axios from "axios";

// import Geocoder from "@pderas/vue2-geocoder";
// Vue.use(Geocoder, {
//   defaultCountryCode: 'TH', // e.g. 'CA'
//   defaultLanguage:    'th', // e.g. 'en'
//   defaultMode:        'lat-lng', //'address', 
//   googleMapsApiKey:   process.env.VUE_APP_MAP_ACCESS_TOKEN,
// });

import * as VueGoogleMaps from 'vue2-google-maps'

import VueGeoLocation from 'vue-browser-geolocation'
 
import VueSocialSharing from 'vue-social-sharing'
Vue.use(VueSocialSharing);

import VueClipboard from 'vue2-clipboard' 
Vue.use(VueClipboard)

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_MAP_ACCESS_TOKEN,
    libraries: 'places', 
    region: 'TH',
    language: 'th',// This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
 
    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
 
  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,
 
  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
})
Vue.use(VueGeoLocation)
import store from './store'
// import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete';
// Vue.use(VuetifyGoogleAutocomplete, {
//     // apiKey: process.env.VUE_APP_MAP_ACCESS_TOKEN,
//   vueGoogleMapsCompatibility: true,
// })
import VueCookies from 'vue-cookies';
Vue.use(VueCookies);

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

// new Vue({
//   // router,
//   vuetify, 
// //<= เพิ่มส่วนนี้
//   render: h => h(App),
// }).$mount("#app")