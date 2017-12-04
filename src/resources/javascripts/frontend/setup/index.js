import axios from 'axios';
axios.defaults.baseURL = window.base_url;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.head.querySelector('meta[name="csrf-token"]').content;
axios.defaults.headers.common['Authorization'] = `Bearer ${ document.querySelector('meta[name="api-token"]').content }`;
window.axios = axios;

import Vue from 'vue';

import Navigation from '../global/navigation/Navigation';
import Foot from '../global/foot/Foot';
import Field from '../global/inputs/Field';
import Dropdown from '../global/inputs/Dropdown';
import List from '../global/inputs/List';
import Radio from '../global/inputs/Radio';
import Errors from '../global/Errors';
import ProgressBar from './vue/Progress';
import QuickNavigation from './vue/QuickNavigation';
Vue.component('Navigation', Navigation);
Vue.component('Foot', Foot);
Vue.component('Field', Field);
Vue.component('Dropdown', Dropdown);
Vue.component('List', List);
Vue.component('Radio', Radio);
Vue.component('Errors', Errors);
Vue.component('ProgressBar', ProgressBar);
Vue.component('QuickNavigation', QuickNavigation);

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
    },
}).$mount('#app');
