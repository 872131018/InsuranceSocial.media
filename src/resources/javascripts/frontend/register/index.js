window.axios = require('axios');
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.head.querySelector('meta[name="csrf-token"]').content;

import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import App from './vue/App';
import Navigation from '../global/navigation/Navigation';
import Foot from '../global/foot/Foot';

Vue.component('Navigation', Navigation);
Vue.component('Foot', Foot);

Vue.use(VueRouter);

const router = new VueRouter({
  base: `${ window.base_url }`,
  mode: 'history',
  routes
});

const Site = new Vue({
    el: '#app',
    components: {
        App
    },
    router
}).$mount('#app');
