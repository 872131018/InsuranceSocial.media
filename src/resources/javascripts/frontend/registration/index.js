import axios from 'axios';
axios.defaults.baseURL = window.base_url;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.head.querySelector('meta[name="csrf-token"]').content;
window.axios = axios;

import Vue from 'vue';

import Navigation from '../global/navigation/Navigation';
import Foot from '../global/foot/Foot';
Vue.component('Navigation', Navigation);
Vue.component('Foot', Foot);

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Vuex from 'vuex';
Vue.use(Vuex);

import store from './root.vuex';
import router from './routes';
import App from './vue/App';
const Site = new Vue({
    el: '#app',
    store: store,
    router,
    components: {
        App
    }
}).$mount('#app');
