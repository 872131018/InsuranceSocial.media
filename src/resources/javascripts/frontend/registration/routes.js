import VueRouter from 'vue-router';
import Register from './vue/register/Index';
import Plans from './vue/plans/Index';
import LinkedIn from './vue/linkedin/Index';
import Payment from './vue/payment/Index';
import Corporate from './vue/corporate/Corporate';

const routes = [
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/plans',
        name: 'Plans',
        component: Plans
    },
    {
        path: '/options',
        name: 'LinkedIn',
        component: LinkedIn
    },
    {
        path: '/payment',
        name: 'Payment',
        component: Payment
    },
    {
        path: '/corporate',
        name: 'Corporate',
        component: Corporate
    }
];

export default new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
  }
});
