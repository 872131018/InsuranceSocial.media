const { mix } = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
/**
mix.js('resources/assets/js/app.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css');
*/

/**
* Login styles
*/
mix.combine([
    'node_modules/w3-css/w3.css',
    'resources/stylesheets/frontend/frontend.styles.css'
], 'public/stylesheets/login.css');

/**
* Registration Styles
*/
mix.combine([
    'node_modules/w3-css/w3.css',
    'resources/stylesheets/frontend/frontend.styles.css',
    'resources/stylesheets/frontend/checkbox.terms.styles.css',
    'resources/stylesheets/frontend/radio.styles.css',
], 'public/stylesheets/registration.css');

/**
* Checkout Styles
*/
mix.combine([
    'node_modules/w3-css/w3.css',
    'resources/stylesheets/frontend/frontend.styles.css',
    'resources/stylesheets/frontend/checkbox.styles.css',
], 'public/stylesheets/checkout.css');

/**
* Social Styles
*/
mix.combine([
    'node_modules/w3-css/w3.css',
    'resources/stylesheets/frontend/frontend.styles.css',
    'resources/stylesheets/frontend/checkbox.styles.css',
    'resources/stylesheets/frontend/radio.styles.css',
], 'public/stylesheets/social.css');

/**
* Setup Styles
*/
mix.combine([
    'node_modules/w3-css/w3.css',
    'resources/stylesheets/frontend/frontend.styles.css',
    'resources/stylesheets/frontend/checkbox.styles.css',
    'resources/stylesheets/frontend/radio.styles.css',
], 'public/stylesheets/setup.css');

/**
* User Styles
*/
mix.combine([
    'node_modules/w3-css/w3.css',
    'node_modules/chartist/dist/chartist.min.css',
    'resources/stylesheets/frontend/frontend.styles.css'
], 'public/stylesheets/user.css');

/**
* Login SPA
*/
mix.js('resources/javascripts/frontend/login/index.js', 'public/javascripts/login.index.js');

/**
* Registration SPA
*/
mix.js('resources/javascripts/frontend/registration/index.js', 'public/javascripts/registration.index.js');

/**
* Checkout SPA
*/
mix.js('resources/javascripts/frontend/checkout/index.js', 'public/javascripts/checkout.index.js');

/**
* Social SPA
*/
mix.js('resources/javascripts/frontend/social/index.js', 'public/javascripts/social.index.js');

/**
* Setup SPA
*/
mix.js('resources/javascripts/frontend/setup/index.js', 'public/javascripts/setup.index.js');

/**
* User SPA
*/
mix.js('resources/javascripts/frontend/user/index.js', 'public/javascripts/user.index.js');
