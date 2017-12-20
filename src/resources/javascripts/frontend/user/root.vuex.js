import Vue from 'vue';
import Vuex from 'vuex';
import NavigationModule from './modules/navigation.vuex';
import UserModule from './modules/user.vuex';
import PlanModule from './modules/plan.vuex';
import PaymentModule from './modules/payment.vuex';
import AgencyModule from './modules/agency.vuex';
import RecentModule from './modules/recent.vuex';
import FacebookPerformance from './modules/facebookPerformance.vuex';
import FacebookInteraction from './modules/facebookInteraction.vuex';
import FacebookPosts from './modules/facebookPosts.vuex';
import TwitterPerformance from './modules/twitterPerformance.vuex';
import TwitterInteraction from './modules/twitterInteraction.vuex';
import TwitterPosts from './modules/twitterPosts.vuex';
import Post from './modules/post.vuex';
import TransientModule from './modules/transient.vuex';
import AuthorizeModule from './modules/authorize.vuex';
import OptionModule from './modules/options.vuex';
import ErrorModule from './modules/errors.vuex';
import ServiceModule from './modules/services.vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        navigation: NavigationModule,
        recent: RecentModule,
        user: UserModule,
        plan: PlanModule,
        payment: PaymentModule,
        agency: AgencyModule,
        facebookPerformance: FacebookPerformance,
        facebookInteraction: FacebookInteraction,
        facebookPosts: FacebookPosts,
        twitterPerformance: TwitterPerformance,
        twitterInteraction: TwitterInteraction,
        twitterPosts: TwitterPosts,
        post: Post,
        transient: TransientModule,
        authorize: AuthorizeModule,
        options: OptionModule,
        errors: ErrorModule,
        services: ServiceModule
    }
});

export default store;
