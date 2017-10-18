import Recent from './vue/recent/Recent';
import ReportsFacebook from './vue/reports/facebook/Reports';
import ReportsTwitter from './vue/reports/twitter/Reports';
import Profile from './vue/profile/Profile';
import Location from './vue/location/Location';
import Coverage from './vue/coverage/Coverage';
import Outreach from './vue/outreach/Outreach';

export default [
    {
        path: '/user/recent',
        name: 'Recent',
        component: Recent
    },
    {
        path: '/user/reports/facebook',
        name: 'ReportsFacebook',
        component: ReportsFacebook
    },
    {
        path: '/user/reports/twitter',
        name: 'ReportsTwitter',
        component: ReportsTwitter
    },
    {
        path: '/user/profile',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/user/location',
        name: 'Location',
        component: Location
    },
    {
        path: '/user/coverage',
        name: 'Coverage',
        component: Coverage
    },
    {
        path: '/user/outreach',
        name: 'Outreach',
        component: Outreach
    }
];
