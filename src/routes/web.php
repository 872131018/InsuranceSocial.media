<?php
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

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
* All requirements for user having logged in
*/
Route::middleware(['auth'])->group(function() {

    Route::get('/corporate/{discount?}', 'CorporateController@index');

    /**
     * Routes for the setup app
     *
     * @return \Illuminate\Http\Response
     */
    Route::get('/social', function (Request $request) {
        if($request->wantsJson()) {
            return response()->json(Auth::user());
        }
    });

    Route::get('/setup', function (Request $request) {
        if($request->wantsJson()) {
            return response()->json(Auth::user());
        }
    });

    Route::get('/api/pages', function (Request $request) {
        $data = json_decode(session('pages'));
        return response()->json($data);
    });

    Route::get('/setup/payment', 'PaymentController@index');

    Route::post('/setup/payment', 'PaymentController@storealt');

    Route::get('/setup/profile', 'ProfileController@index');

    Route::post('/setup/profile', 'ProfileController@store');

    Route::get('/setup/location', 'LocationController@index');

    Route::post('/setup/location', 'LocationController@store');

    Route::get('/setup/coverage', 'CoverageController@index');

    Route::post('/setup/coverage', 'CoverageController@store');

    Route::get('/setup/outreach', 'OutreachController@index');

    Route::post('/setup/outreach', 'OutreachController@store');
});
