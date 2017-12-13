import VueRouter from 'vue-router';
import Facebook from './vue/facebook/Index';
import Create from './vue/create/Index';
import Pages from './vue/pages/Index';
import Twitter from './vue/twitter/Index';
import LinkedIn from './vue/linkedin/Index';
import Companies from './vue/companies/Index';

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
        path: '/pages',
        name: 'Pages',
        component: Pages
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
    },
    {
        path: '/companies',
        name: 'Companies',
        component: Companies
    }
];

export default new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
  }
});
