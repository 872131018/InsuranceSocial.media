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
 * Overwrite the default functionality to deliver the SPA
 *
 * @return \Illuminate\Http\Response
 */
Route::get('/login', 'Auth\LoginController@index')->name('login');

/**
 * Overwrite the default functionality to deliver the SPA
 *
 * @return \Illuminate\Http\Response
 */
Route::get('/register', 'Auth\RegisterController@index')->name('register');

/**
 * Overwrite the default functionality to deliver the SPA
 *
 * @return \Illuminate\Http\Response
 */
Route::get('/register/{discount?}', 'Auth\RegisterController@index');

/**
 * Overwrite the default functionality to deliver the SPA
 *
 * @return \Illuminate\Http\Response
 */
Route::post('/register', 'Auth\RegisterController@register');

/**
 * Overwrite the default functionality to deliver the SPA
 *
 * @return \Illuminate\Http\Response
 */
Route::post('/register/{discount?}', 'Auth\RegisterController@register');

/**
 * Overwrite the default functionality to deliver the SPA
 *
 * @return \Illuminate\Http\Response
 */
Route::get('/corporate/{discount?}', 'CorporateController@index');

/**
 * Deliver the homepage
 *
 * @return \Illuminate\Http\Response
 */
Route::get('/social-media', function () {
    return view('layouts.register.app');
});

/**
 * Overwrite the default functionality to deliver the SPA
 *
 * @return \Illuminate\Http\Response
 */
Route::get('/payment', 'PaymentController@index');

/**
 * Overwrite the default functionality to deliver the SPA
 *
 * @return \Illuminate\Http\Response
 */
Route::post('/payment', 'PaymentController@store');

/**
 * Overwrite the default functionality to deliver the SPA
 *
 * @return \Illuminate\Http\Response
 */
Route::put('/payment/{discount}', 'PaymentController@update');


 /**
 * Deliver the homepage
 *
 * @return \Illuminate\Http\Response
 */
Route::get('/select', function (Request $request) {
    if($request->wantsJson()) {
        $data = [];
        foreach (Plan::all() as $key => $value) {
            $value['features'] = json_decode($value['features']);
            array_push($data, $value);
        }

        return response()->json($data);
    } else {
        return view('layouts.register.app');
    }
});

Route::middleware(['auth'])->group(function() {
    /**
    * Deliver the homepage
    *
    * @return \Illuminate\Http\Response
    */
    Route::get('/setup/welcome', function (Request $request) {
        if($request->wantsJson()) {
            return response()->json(Auth::user());
        } else {
            return view('layouts.setup.app');
        }
    });

    Route::get('/setup/facebook', 'FacebookController@index');

    Route::get('/setup/facebook/return', 'FacebookController@update');

    Route::get('/setup/profile', 'ProfileController@index');

    Route::post('/setup/profile', 'ProfileController@store');

    Route::get('/setup/location', 'LocationController@index');

    Route::post('/setup/location', 'LocationController@store');

    Route::get('/setup/coverage', 'CoverageController@index');

    Route::post('/setup/coverage', 'CoverageController@store');

    Route::get('/setup/outreach', 'OutreachController@index');

    Route::post('/setup/outreach', 'OutreachController@store');
});
