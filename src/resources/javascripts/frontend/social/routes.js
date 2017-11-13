import VueRouter from 'vue-router';
import Facebook from './vue/facebook/Index';
import Create from './vue/create/Create';
import Page from './vue/page/Page';
import Twitter from './vue/twitter/Twitter';
import LinkedIn from './vue/linkedin/LinkedIn';

const routes = [
    {
        path: '/facebook',
        name: 'Facebook',
        component: Facebook
    },
    {
        path: '/create',
        name: 'Create',
        component: Create
    },
    {
        path: '/page',
        name: 'Page',
        component: Page
    },
    {
        path: '/twitter',
        name: 'Twitter',
        component: Twitter
    },
    {
        path: '/linkedin',
        name: 'LinkedIn',
        component: LinkedIn
    }
];

export default new VueRouter({
  mode: 'history',
  routes
});
