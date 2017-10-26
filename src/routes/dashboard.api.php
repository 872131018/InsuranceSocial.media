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
 Route::get('/api/dashboard/insights', 'DashboardController@indexInsights');

 Route::get('/api/reports/facebook/performance', 'DashboardController@indexFacebookPerformance');

 Route::get('/api/reports/facebook/interaction', 'DashboardController@indexFacebookInteraction');

 Route::get('/api/reports/facebook/posts', 'DashboardController@indexFacebookPosts');

 Route::get('/api/reports/twitter/performance', 'DashboardController@indexTwitterPerformance');

 Route::get('/api/reports/twitter/interaction', 'DashboardController@indexTwitterInteraction');

 Route::get('/api/reports/twitter/posts', 'DashboardController@indexTwitterPosts');

 Route::post('/api/facebook/post', 'DashboardController@indexFacebookPost');
