import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
// axios
import axios from 'axios'
import VueAxios from 'vue-axios'
// animate
import 'animate.css';
// mosha toast



Vue.config.productionTip = false


new Vue({
  router,
  axios,
  VueAxios,

   
  
  render: h => h(App)
}).$mount('#app')
