<?php
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

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

Auth::routes();

Route::get('/logout', 'Auth\LoginController@logout')->name('logout');

Route::get('/user/recent', 'HomeController@index')->name('home');

Route::get('/user/reports/facebook', 'HomeController@index')->name('home');

Route::get('/user/reports/twitter', 'HomeController@index')->name('home');

Route::get('/user/facebook/feed', 'HomeController@index')->name('home');

Route::get('/user/facebook/post', 'HomeController@index')->name('home');

Route::get('/user/facebook/schedule', 'HomeController@index')->name('home');

Route::get('/user/twitter/feed', 'HomeController@index')->name('home');

Route::get('/user/twitter/post', 'HomeController@index')->name('home');

Route::get('/user/linkedin/post', 'HomeController@index')->name('home');

Route::get('/user/agency', 'HomeController@index')->name('home');

Route::get('/user/location', 'HomeController@index')->name('home');

Route::get('/user/coverages', 'HomeController@index')->name('home');

Route::get('/user/outreach', 'HomeController@index')->name('home');

Route::get('/user/payment', 'HomeController@index')->name('home');

Route::get('/user/referral', 'HomeController@index')->name('home');
