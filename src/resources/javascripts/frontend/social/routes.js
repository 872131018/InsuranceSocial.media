import Welcome from './vue/welcome/Welcome';
import Facebook from './vue/facebook/Facebook';
import Page from './vue/page/Page';
import Twitter from './vue/twitter/Twitter';
import Payment from './vue/payment/Payment';

export default [
    {
        path: '/setup/welcome',
        name: 'Welcome',
        component: Welcome
    },
    {
        path: '/setup/facebook',
        name: 'Facebook',
        component: Facebook
    },
    {
        path: '/setup/page',
        name: 'Page',
        component: Page
    },
    {
        path: '/setup/twitter',
        name: 'Twitter',
        component: Twitter
    },
    {
        path: '/setup/payment',
        name: 'Payment',
        component: Payment
    }
];
