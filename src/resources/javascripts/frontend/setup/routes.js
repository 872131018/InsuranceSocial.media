import Welcome from './vue/welcome/Welcome';
import Facebook from './vue/facebook/Facebook';
import Page from './vue/page/Page';
import Twitter from './vue/twitter/Twitter';
import Payment from './vue/payment/Payment';
import Profile from './vue/profile/Profile';
import Location from './vue/location/Location';
import Coverage from './vue/coverage/Coverage';
import Outreach from './vue/outreach/Outreach';

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
    },
    {
        path: '/setup/profile',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/setup/location',
        name: 'Location',
        component: Location
    },
    {
        path: '/setup/coverage',
        name: 'Coverage',
        component: Coverage
    },
    {
        path: '/setup/outreach',
        name: 'Outreach',
        component: Outreach
    }
];
