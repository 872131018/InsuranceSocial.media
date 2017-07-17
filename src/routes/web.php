<?php
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

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
 * Deliver the registration SPA and handle posts
 *
 * @return \Illuminate\Http\Response
 */
Route::get('/register', 'Auth\RegisterController@index')->name('register');

Route::get('/register/{discount?}', 'Auth\RegisterController@index');

Route::post('/register', 'Auth\RegisterController@register');

Route::post('/register/{discount?}', 'Auth\RegisterController@register');

/**
* Deliver the SPA that require authentication
*/
Route::middleware(['auth'])->group(function() {
    Route::get('/plans', 'CheckoutController@index');

    Route::get('/payment', 'CheckoutController@index');
});
/**
* API routes guarded by authentication
*/
Route::middleware(['auth:api'])->group(function() {
    Route::get('/api/user', function (Request $request) {
        return response()->json(Auth::user());
    });

    Route::get('/api/plans', function (Request $request) {
        $data = [];
        foreach (Plan::all() as $key => $value) {
            $value['features'] = json_decode($value['features']);
            array_push($data, $value);
        }
        return response()->json($data);
    });

    Route::get('/api/payment', function (Request $request) {
        $data = [
            'apiLoginID' => env('API_LOGIN_ID'),
            'clientKey' => env('CLIENT_KEY')
        ];
        return response()->json($data);
    });

    Route::post('/payment', 'PaymentController@store');
});

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

    Route::get('/setup/page', 'FacebookController@index');

    Route::get('/api/pages', function (Request $request) {
        $data = json_decode(session('pages'));
        return response()->json($data);
    });

    Route::post('/setup/page', 'FacebookController@store');

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
