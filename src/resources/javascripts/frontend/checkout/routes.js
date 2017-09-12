import Corporate from './vue/corporate/Corporate';
import Plans from './vue/plans/Index';
import Payment from './vue/payment/Index';

export default [
    {
        path: '/corporate',
        name: 'Corporate',
        component: Corporate
    },
    {
        path: '/plans',
        name: 'Plans',
        component: Plans
    },
    {
        path: '/payment',
        name: 'Payment',
        component: Payment
    }
];
