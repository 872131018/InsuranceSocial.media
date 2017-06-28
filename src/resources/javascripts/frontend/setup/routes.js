import Welcome from './vue/welcome/Welcome';
import Profile from './vue/profile/Profile';
import Location from './vue/location/Location';
import Coverage from './vue/coverage/Coverage';

export default [
    {
        path: '/setup/welcome',
        name: 'Welcome',
        component: Welcome
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
];
