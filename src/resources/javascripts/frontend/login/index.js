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
  base: `${ window.vue_base }`,
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
