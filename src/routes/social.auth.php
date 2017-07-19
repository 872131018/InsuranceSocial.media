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
 Route::get('/setup/welcome', function (Request $request) {
     return view('layouts.social.app');
 });

 Route::get('/setup/facebook', 'FacebookController@index');

 Route::get('/setup/facebook/return', 'FacebookController@update');

 Route::get('/setup/page', 'FacebookController@index');

 Route::get('/setup/twitter', 'TwitterController@index');

 Route::get('/setup/twitter/return', 'TwitterController@update');
