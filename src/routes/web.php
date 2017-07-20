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

    Route::get('/api/pages', function (Request $request) {
        $data = json_decode(session('pages'));
        return response()->json($data);
    });

    Route::get('/setup/payment', 'PaymentController@index');

    Route::post('/setup/payment', 'PaymentController@storealt');
});
