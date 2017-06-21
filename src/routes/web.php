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
 * Deliver the homepage
 *
 * @return \Illuminate\Http\Response
 */
 Route::get('/', function () {
    return view('layouts.register.app');
 });

/**
 * Overwrite the default functionality to deliver the SPA
 *
 * @return \Illuminate\Http\Response
 */
Route::get('/register', 'Auth\RegisterController@index');

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

/**
* Deliver the homepage
*
* @return \Illuminate\Http\Response
*/
Route::get('/setup/profile', function (Request $request) {
   if($request->wantsJson()) {

       return response()->json(Auth::user());
   } else {
       return view('layouts.setup.app');
   }
});
