import Corporate from './vue/corporate/Corporate';
import Select from './vue/select/Select';
import SocialMedia from './vue/social-media/SocialMedia';
import Payment from './vue/payment/Payment';

export default [
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
