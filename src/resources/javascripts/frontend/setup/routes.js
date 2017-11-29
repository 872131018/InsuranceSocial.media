import VueRouter from 'vue-router';
import Profile from './vue/profile/Index';
import Location from './vue/location/Location';
import Coverage from './vue/coverage/Coverage';
import Outreach from './vue/outreach/Outreach';

const routes = [
    {
        path: '/profile',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/location',
        name: 'Location',
        component: Location
    },
    {
        path: '/coverage',
        name: 'Coverage',
        component: Coverage
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
