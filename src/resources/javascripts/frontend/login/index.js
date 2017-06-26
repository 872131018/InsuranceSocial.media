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
