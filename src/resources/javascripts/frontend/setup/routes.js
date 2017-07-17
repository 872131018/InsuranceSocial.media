import Profile from './vue/profile/Profile';
import Location from './vue/location/Location';
import Coverage from './vue/coverage/Coverage';
import Outreach from './vue/outreach/Outreach';

export default [
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
