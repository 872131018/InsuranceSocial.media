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
* STYLESHEETS FRONTEND
*/
mix.combine([
    'node_modules/w3-css/w3.css',
    'resources/stylesheets/frontend/frontend.styles.css'
], 'public/stylesheets/login.css');

/**
* STYLESHEETS FRONTEND
*/
mix.combine([
    'node_modules/w3-css/w3.css',
    'resources/stylesheets/frontend/frontend.styles.css',
    'resources/stylesheets/frontend/checkbox.styles.css',
    'resources/stylesheets/frontend/radio.styles.css'
], 'public/stylesheets/register.css');

/**
* STYLESHEETS FRONTEND
*/
mix.combine([
    'node_modules/w3-css/w3.css',
    'resources/stylesheets/frontend/frontend.styles.css',
    'resources/stylesheets/frontend/checkbox.alt.styles.css',
    'resources/stylesheets/frontend/radio.alt.styles.css',
], 'public/stylesheets/setup.css');

/**
* JAVASCRIPTS FRONTEND
*/
mix.js('resources/javascripts/frontend/login/index.js', 'public/javascripts/login.index.js');

/**
* JAVASCRIPTS FRONTEND
*/
mix.js('resources/javascripts/frontend/register/index.js', 'public/javascripts/register.index.js');

/**
* JAVASCRIPTS FRONTEND
*/
mix.js('resources/javascripts/frontend/setup/index.js', 'public/javascripts/setup.index.js');
