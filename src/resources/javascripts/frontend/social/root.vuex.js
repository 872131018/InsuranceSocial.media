import Vue from 'vue';
import Vuex from 'vuex';
import PageModule from './modules/page.vuex';
import CompanyModule from './modules/company.vuex';
import CreateModule from './modules/create.vuex';
import SocialModule from './modules/social.vuex';
import RedirectModule from './modules/redirect.vuex';
import ErrorModule from './modules/errors.vuex';
import ServiceModule from './modules/services.vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        page: PageModule,
        company: CompanyModule,
        create: CreateModule,
        social: SocialModule,
        redirect: RedirectModule,
        errors: ErrorModule,
        services: ServiceModule
    }
});

export default store;
