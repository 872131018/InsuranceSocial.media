<?php
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/**
 * Deliver the registration SPA and handle posts
 *
 * @return \Illuminate\Http\Response
 */


 Route::get('/facebook', 'SocialController@index');

 Route::get('/facebook/return', 'FacebookController@update');

 Route::get('/create', 'SocialController@index');

 Route::get('/page', 'SocialController@index');

 Route::get('/twitter', 'SocialController@index');

 Route::get('/twitter/return', 'TwitterController@update');

 Route::get('/linkedin', 'SocialController@index');

 Route::get('/linkedin/return', 'LinkedInController@update');
