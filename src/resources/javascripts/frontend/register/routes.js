import Register from './vue/register/Register';

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
