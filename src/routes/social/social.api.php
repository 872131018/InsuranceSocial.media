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

 Route::get('/api/facebook', 'FacebookController@index');

 Route::get('/api/pages', function (Request $request) {
     $data = json_decode(session('pages'));
     return response()->json($data);
 });

 Route::post('/create', 'FacebookController@store');

 Route::post('/pages', 'FacebookController@edit');

 Route::get('/api/twitter', 'TwitterController@index');

 Route::get('/api/linkedin', 'LinkedInController@index');
