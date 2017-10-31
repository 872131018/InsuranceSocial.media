import Vue from 'vue';
import Vuex from 'vuex';
import RegisterModule from './modules/registration.vuex';
import PlansModule from './modules/plans.vuex';
import AuthorizeModule from './modules/authorize.vuex';
import PaymentModule from './modules/payment.vuex';
import ServiceModule from './modules/services.vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        registration: RegisterModule,
        plans: PlansModule,
        authorize: AuthorizeModule,
        payment: PaymentModule,
        services: ServiceModule
    }
});

export default store;
