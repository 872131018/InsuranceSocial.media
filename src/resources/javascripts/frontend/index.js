/**
* Load the project dependencies and other boilerplate js
*/
window.axios = require('axios');
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.head.querySelector('meta[name="csrf-token"]').content;

window.Vue = require('vue');

/**
* Application Vue logic
*/
import Vue from 'vue';
import App from './vue/App';

const Site = new Vue({
    el: '#app',
    components: {
        App
    }
});
