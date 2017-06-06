import Login from './vue/login/Login';
import Register from './vue/register/Register';
import Corporate from './vue/corporate/Corporate';

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
    }
];
