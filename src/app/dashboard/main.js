import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'

import Dashboard from './Dashboard.vue'

Vue.use(VueMaterial)

new Vue({
    el: '#app',
    render: r => r(Dashboard)
})