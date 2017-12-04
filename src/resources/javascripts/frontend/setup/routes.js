import VueRouter from 'vue-router';
import Agency from './vue/agency/Index';
import Location from './vue/location/Index';
import Coverages from './vue/coverages/Index';
import Outreach from './vue/outreach/Index';

const routes = [
    {
        path: '/agency',
        name: 'Agency',
        component: Agency
    },
    {
        path: '/location',
        name: 'Location',
        component: Location
    },
    {
        path: '/coverages',
        name: 'Coverages',
        component: Coverages
    },
    {
        path: '/outreach',
        name: 'Outreach',
        component: Outreach
    }
];

export default new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
  }
});
