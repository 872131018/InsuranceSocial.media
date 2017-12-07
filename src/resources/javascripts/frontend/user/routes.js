import VueRouter from 'vue-router';
import Recent from './vue/recent/Index';
import ReportsFacebook from './vue/reports/facebook/Index';
import ReportsTwitter from './vue/reports/twitter/Index';
import FacebookFeed from './vue/actions/facebook/Feed';
import FacebookPost from './vue/actions/facebook/Post';
import TwitterFeed from './vue/actions/twitter/Feed';

const routes = [
    {
        path: '/user/recent',
        name: 'Recent',
        component: Recent
    },
    {
        path: '/user/reports/facebook',
        name: 'ReportsFacebook',
        component: ReportsFacebook
    },
    {
        path: '/user/reports/twitter',
        name: 'ReportsTwitter',
        component: ReportsTwitter
    },
    {
        path: '/user/facebook/feed',
        name: 'FacebookFeed',
        component: FacebookFeed
    },
    {
        path: '/user/facebook/post',
        name: 'FacebookPost',
        component: FacebookPost
    },
    {
        path: '/user/twitter/feed',
        name: 'TwitterFeed',
        component: TwitterFeed
    }
];

export default new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
  }
});
