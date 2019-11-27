import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import store from './stores';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'vue-multiselect/dist/vue-multiselect.min.css';

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
