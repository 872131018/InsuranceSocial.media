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

 Route::get('/api/corporate/{discount}', function (Request $request, string $discount) {
    $data = [];
    switch($discount) {
        case 'IMTGEM17':
            $logo = asset('images/IMT-logos.jpg');
            $company = 'The IMT Group';
            $expiration = 'Dec. 31, 2017';
            break;
        case 'FMH17':
            $logo = asset('images/FMH-logos.jpg');
            $company = 'Farmers Mutual Hail Insurance Company of Iowa';
            $expiration = 'April 30, 2018';
            break;
        case 'ROCK18':
            $logo = asset('images/ROCK-logos.jpg');
            $company = 'Plymouth Rock Assurance';
            $expiration = 'March 31, 2018';
            break;
    }
    $data = [
        'logo' => $logo,
        'company' => $company,
        'expiration' => $expiration
    ];
    return response()->json($data);
 });
