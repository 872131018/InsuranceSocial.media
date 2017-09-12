import Register from './vue/register/Index';

export default [
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
