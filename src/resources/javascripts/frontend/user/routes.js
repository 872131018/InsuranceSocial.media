import Dashboard from './vue/dashboard/Dashboard';
import Profile from './vue/profile/Profile';
import Location from './vue/location/Location';
import Coverage from './vue/coverage/Coverage';
import Outreach from './vue/outreach/Outreach';

export default [
    {
        path: '/user/dashboard',
        name: 'Dashboard',
        component: Dashboard
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
