import Welcome from './vue/welcome/Welcome';
import Profile from './vue/profile/Profile';

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
];
