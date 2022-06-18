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
import { library } from '@fortawesome/fontawesome-svg-core'
import CKEditor from '@ckeditor/ckeditor5-vue2';
//fontawesomeeicon
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
//vue loading skeleton
import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/dist/vue-tel-input.css';

Vue.use(VueTelInput);

library.add(fas,fab,far)
Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.use(VueToast, {
  // One of the options
  position: 'top-right',
  dismissible:'true',
  pauseOnHover:'true'
})
Vue.use( CKEditor );
Vue.config.productionTip = false



new Vue({
  router,
  axios,
  VueAxios,
  
  
  

   
  
  render: h => h(App)
}).$mount('#app')
