import Login from './vue/login/Login';
import Register from './vue/register/Register';
import Corporate from './vue/corporate/Corporate';
import Select from './vue/select/Select';
import SocialMedia from './vue/social-media/SocialMedia';

export default [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/corporate/:code',
        name: 'Corporate',
        component: Corporate
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
        path: '/select',
        name: 'Select',
        component: Select
    },
    {
        path: '/social-media',
        name: 'SocialMedia',
        component: SocialMedia
    },
    {
        path: '/payment',
        name: 'Payment',
        component: Login
    }
];
