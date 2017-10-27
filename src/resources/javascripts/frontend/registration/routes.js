import VueRouter from 'vue-router';
import Register from './vue/register/Index';

const routes = [
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/register/:discount',
        name: 'RegisterWithDiscount',
        component: Register
    }
];

export default new VueRouter({
  mode: 'history',
  routes
});
