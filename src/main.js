import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'

import App from './App.vue'
import router from './router'
// axios
import axios from 'axios'
import VueAxios from 'vue-axios'
// animate
import 'animate.css';
import VueToast from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(VueToast);

Vue.config.productionTip = false




new Vue({
  router,
  axios,
  VueAxios,
  
  

   
  
  render: h => h(App)
}).$mount('#app')
