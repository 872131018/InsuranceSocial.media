import Facebook from './vue/facebook/Facebook';
import Create from './vue/create/Create';
import Page from './vue/page/Page';
import Twitter from './vue/twitter/Twitter';
import LinkedIn from './vue/linkedin/LinkedIn';

export default [
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
    },
    {
        path: '/linkedin',
        name: 'LinkedIn',
        component: LinkedIn
    }
];
