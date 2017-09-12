window.axios = require('axios');
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.head.querySelector('meta[name="csrf-token"]').content;
axios.defaults.headers.common['Authorization'] = `Bearer ${ document.querySelector('meta[name="api-token"]').content }`;

import Store from './root.redux';
window.store = Store;

import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import App from './vue/App';
import Navigation from './vue/navigation/Navigation';
import Foot from '../global/foot/Foot';

Vue.component('Navigation', Navigation);
Vue.component('Foot', Foot);

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
});

const Site = new Vue({
    el: '#app',
    components: {
        App
    },
    router
}).$mount('#app');
