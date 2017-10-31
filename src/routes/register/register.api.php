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

/**
 * Deliver application data from ajax requests
 *
 * @return \Illuminate\Http\Response
 */
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
