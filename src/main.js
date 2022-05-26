import Vue from "vue"
import App from "@/App.vue"

// import router from "@/router"
import vuetify from "@/plugins/vuetify"

import router from './router'
// import axios from "axios";


Vue.config.productionTip = false

new Vue({
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