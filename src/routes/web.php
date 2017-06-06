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
/**
 * Overwrite the default functionality to deliver the SPA
 *
 * @return \Illuminate\Http\Response
 */
Route::get('/register/{code?}', function ($code = '') {
    return view('layouts.frontend.app');
});
/**
 * Deliver the homepage
 *
 * @return \Illuminate\Http\Response
 */
 Route::get('/corporate/{code?}', function ($code = '') {
     $data = [];
     /**
     * Mock code should be a call against a real code that returns carrier and plan details
     */
     $mock_code = 'asdf1234';
     if($code == $mock_code) {
         /**
         * Generate a mock plan
         */
         $mock_logo = asset('images/office.jpg');
         $mock_company = 'Dunder Mifflin Inc.';
         $mock_features = [
             'Facebook and Twitter account set-up, if necessary',
             '6 posts/week (3 each to Facebook and Twitter)',
             'Personalized content, tailored to your community, interests, products and companies – edited for optimum engagement',
             'Automatic notifications when friends or followers react to your posts',
             '24/7 access to analytics on your social media reach and engagement'
         ];
         /**
         * Build an object to output onto the view
         */
         $data = [
             'logo' => $mock_logo,
             'company' => $mock_company,
             'features' => $mock_features
         ];
     } else {
         /**
         * Empty object, something else might need to get into the view from here
         */
         $data = [];
     }
     return view('layouts.frontend.app')->with('data', json_encode($data));
 });
