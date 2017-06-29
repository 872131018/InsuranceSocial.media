window.axios = require('axios');
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.head.querySelector('meta[name="csrf-token"]').content;


import Store from './root.redux';
window.store = Store;

import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import App from './vue/App';

Vue.use(VueRouter);

const router = new VueRouter({
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
