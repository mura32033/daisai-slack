import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'vue-moment'

Vue.config.productionTip = false

new Vue({
  router,
  VueAxios,
  axios,
  moment,
  render: h => h(App)
}).$mount('#app')
