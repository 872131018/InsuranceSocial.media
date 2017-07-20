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

 Route::post('/location', 'LocationController@store');

 Route::post('/coverage', 'CoverageController@store');

 Route::post('/outreach', 'OutreachController@store');
