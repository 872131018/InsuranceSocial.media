import Login from './vue/login/Login';
import Register from './vue/register/Register';
import Corporate from './vue/corporate/Corporate';
import Select from './vue/select/Select';
import SocialMedia from './vue/social-media/SocialMedia';
import Payment from './vue/payment/Payment';

export default [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/register/:discount',
        name: 'RegisterWithDiscount',
        component: Register
    },
    {
        path: '/corporate',
        name: 'Corporate',
        component: Corporate
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
        component: Payment
    }
];
