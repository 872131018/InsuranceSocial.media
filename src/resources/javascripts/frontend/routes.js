import Login from './vue/login/Login';
import Register from './vue/register/Register';
import Corporate from './vue/corporate/Corporate';
import Upsell from './vue/upsell/Upsell';

export default [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/register/:code',
        name: 'RegisterWithCode',
        component: Register
    },
    {
        path: '/corporate/:code',
        name: 'Corporate',
        component: Corporate
    },
    {
        path: '/add-features',
        name: 'Upsell',
        component: Upsell
    }
];
