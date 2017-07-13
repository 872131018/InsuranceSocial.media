import Corporate from './vue/corporate/Corporate';
import Plans from './vue/plans/Plans';
import Payment from './vue/payment/Payment';

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
