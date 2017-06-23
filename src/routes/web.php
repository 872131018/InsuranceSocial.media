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
 Route::get('/login', 'Auth\LoginController@index');

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

    /**
    * Deliver the homepage
    *
    * @return \Illuminate\Http\Response
    */
    Route::post('/setup/profile', function (Request $request) {
        if($request->wantsJson()) {
            $user = Auth::user();
            if($user->email == $request->input('email')) {
                $user->phone = $request->input('phone');
                $user->title = $request->input('title');
                $user->principle_name = $request->input('principle_name');
                $user->principle_email = $request->input('principle_email');
                $user->organization_name = $request->input('organization_name');
                $user->website = $request->input('website');
                $user->staff_size = $request->input('staff_size');
                $user->year_founded = $request->input('year_founded');
                $user->multi_generation = $request->input('multi_generation');
                $user->notification_frequency = $request->input('notification_frequency');
                $user->notify_email = $request->input('notify_email');
                $user->notify_text = $request->input('notify_text');
                $user->update();
            }
            return response()->json($user);
        } else {
            return view('layouts.setup.app');
        }
    });
});
