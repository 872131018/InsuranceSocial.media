import Vue from 'vue';
import Vuex from 'vuex';
import ServiceModule from './modules/services.vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        services: ServiceModule
    }
});

export default store;
