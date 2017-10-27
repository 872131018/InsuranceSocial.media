import Vue from 'vue';
import Vuex from 'vuex';
import RegisterModule from './modules/registration.vuex';
import ServiceModule from './modules/services.vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        registration: RegisterModule,
        services: ServiceModule
    }
});

export default store;
