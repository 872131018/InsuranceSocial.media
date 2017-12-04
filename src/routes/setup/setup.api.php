<?php
use Illuminate\Http\Request;

use App\Plan;

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

 Route::post('/profile', 'ProfileController@store');

 Route::post('/agency', 'ProfileController@storeAgency');

 Route::post('/location', 'LocationController@store');

 Route::post('/location/selections', 'LocationController@storeSelections');

 Route::post('/coverage', 'CoverageController@store');

 Route::post('/outreach', 'OutreachController@store');

 Route::post('/outreach/selections', 'OutreachController@storeSelections');

 Route::get('/export', 'OutreachController@show');
