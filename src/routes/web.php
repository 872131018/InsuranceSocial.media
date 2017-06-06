<?php

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
Route::get('/home', 'HomeController@index')->name('home');

/**
 * Deliver the homepage
 *
 * @return \Illuminate\Http\Response
 */
 Route::get('/', function () {
     return view('layouts.frontend.app');
 });
/**
 * Overwrite the default functionality to deliver the SPA
 *
 * @return \Illuminate\Http\Response
 */
 Route::get('/register', function () {
     return view('layouts.frontend.app');
 });
Route::get('/register/{code?}', function ($code = '') {
    return view('layouts.frontend.app');
});
