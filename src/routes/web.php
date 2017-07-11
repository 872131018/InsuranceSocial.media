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

Auth::routes();
Route::get('/home', 'HomeController@index')->name('home');

/**
 * Deliver the login SPA
 *
 * @return \Illuminate\Http\Response
 */
Route::get('/login', 'Auth\LoginController@index')->name('login');

/**
 * Deliver the registration SPA and handle posts
 *
 * @return \Illuminate\Http\Response
 */
Route::get('/register', 'Auth\RegisterController@index')->name('register');

Route::get('/register/{discount?}', 'Auth\RegisterController@index');

Route::post('/register', 'Auth\RegisterController@register');

Route::post('/register/{discount?}', 'Auth\RegisterController@register');

/**
* All requirements for user having logged in
*/
Route::middleware(['auth'])->group(function() {

    Route::get('/corporate/{discount?}', 'CorporateController@index');

   Route::get('/select', function (Request $request) {
       if($request->wantsJson()) {
           $data = [];
           foreach (Plan::all() as $key => $value) {
               $value['features'] = json_decode($value['features']);
               array_push($data, $value);
           }

           return response()->json($data);
       } else {
           return view('layouts.checkout.app');
       }
   });

    Route::get('/social-media', function () {
        return view('layouts.checkout.app');
    });

    Route::get('/payment', 'PaymentController@index');

    Route::post('/payment', 'PaymentController@store');

    Route::put('/payment/{discount}', 'PaymentController@update');

    /**
     * Routes for the setup app
     *
     * @return \Illuminate\Http\Response
     */
    Route::get('/setup', function (Request $request) {
        if($request->wantsJson()) {
            return response()->json(Auth::user());
        }
    });

    Route::get('/setup/welcome', function (Request $request) {
        return view('layouts.setup.app');
    });

    Route::get('/setup/facebook', 'FacebookController@index');

    Route::get('/setup/facebook/return', 'FacebookController@update');

    Route::get('/setup/payment', 'PaymentController@index');

    Route::post('/setup/payment', 'PaymentController@storealt');

    Route::get('/setup/twitter', 'TwitterController@index');

    Route::get('/setup/twitter/return', 'TwitterController@update');

    Route::get('/setup/profile', 'ProfileController@index');

    Route::post('/setup/profile', 'ProfileController@store');

    Route::get('/setup/location', 'LocationController@index');

    Route::post('/setup/location', 'LocationController@store');

    Route::get('/setup/coverage', 'CoverageController@index');

    Route::post('/setup/coverage', 'CoverageController@store');

    Route::get('/setup/outreach', 'OutreachController@index');

    Route::post('/setup/outreach', 'OutreachController@store');
});
