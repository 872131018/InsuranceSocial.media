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
Route::get('/register', 'Auth\RegisterController@index')->name('register');

Route::get('/register/{discount?}', 'Auth\RegisterController@index');

Route::get('/plans', 'Auth\RegisterController@index');

Route::get('/options', 'Auth\RegisterController@index');

Route::get('/payment', 'Auth\RegisterController@index');

Route::get('/corporate/{discount}', 'Auth\RegisterController@register');

Route::post('/register', 'Auth\RegisterController@register');

Route::post('/register/{discount?}', 'Auth\RegisterController@register');

Route::post('/confirm', 'Auth\RegisterController@confirm');
