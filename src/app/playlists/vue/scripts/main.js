import Vue from "vue";
import Vuex from "vuex";
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'

import router from "./router";
import store from "../store";

import Playlists from "../components/Playlists.vue";

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueMaterial)

new Vue({
  el: '#app',
  router,
  store,
  render: r => r(Playlists)
});