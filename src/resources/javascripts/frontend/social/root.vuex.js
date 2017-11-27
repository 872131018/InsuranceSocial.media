import Vue from 'vue';
import Vuex from 'vuex';
import CreateModule from './modules/create.vuex';
import TwitterModule from './modules/twitter.vuex';
import RedirectModule from './modules/redirect.vuex';
import ErrorModule from './modules/errors.vuex';
import ServiceModule from './modules/services.vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        create: CreateModule,
        twitter: TwitterModule,
        redirect: RedirectModule,
        errors: ErrorModule,
        services: ServiceModule
    }
});

export default store;
