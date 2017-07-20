import Profile from './vue/profile/Profile';
import Location from './vue/location/Location';
import Coverage from './vue/coverage/Coverage';
import Outreach from './vue/outreach/Outreach';

export default [
    {
        path: '/profile',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/location',
        name: 'Location',
        component: Location
    },
    {
        path: '/coverage',
        name: 'Coverage',
        component: Coverage
    },
    {
        path: '/outreach',
        name: 'Outreach',
        component: Outreach
    }
];
