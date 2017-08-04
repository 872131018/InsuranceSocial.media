import Welcome from './vue/welcome/Welcome';
import Facebook from './vue/facebook/Facebook';
import Create from './vue/create/Create';
import Page from './vue/page/Page';
import Twitter from './vue/twitter/Twitter';

export default [
    {
        path: '/welcome',
        name: 'Welcome',
        component: Welcome
    },
    {
        path: '/facebook',
        name: 'Facebook',
        component: Facebook
    },
    {
        path: '/create',
        name: 'Create',
        component: Create
    },
    {
        path: '/page',
        name: 'Page',
        component: Page
    },
    {
        path: '/twitter',
        name: 'Twitter',
        component: Twitter
    }
];
