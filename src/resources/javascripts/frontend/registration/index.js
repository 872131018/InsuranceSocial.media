import axios from 'axios';
axios.defaults.baseURL = window.base_url;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.head.querySelector('meta[name="csrf-token"]').content;
window.axios = axios;

import Vue from 'vue';

import Navigation from '../global/navigation/Navigation';
import Field from '../global/inputs/Field';
import PasswordField from '../global/inputs/PasswordField';
import Foot from '../global/foot/Foot';
import Errors from '../global/Errors';
import Features from './vue/Features';
Vue.component('Navigation', Navigation);
Vue.component('Foot', Foot);
Vue.component('Field', Field);
Vue.component('PasswordField', PasswordField);
Vue.component('Features', Features);
Vue.component('Errors', Errors);

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
