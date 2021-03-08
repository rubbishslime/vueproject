import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import iView from 'iview';
import store from './store';
import moment from 'moment'

import router from './router'
Vue.use(iView)
import 'iview/dist/styles/iview.css'
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$store = store
Vue.prototype.$moment = moment;
axios.defaults.baseURL = '/api'
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
