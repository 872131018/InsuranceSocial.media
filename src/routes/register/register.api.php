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
            $details = 'If you choose the Essential Plan, The IMT Group will cover the full cost of your subscription through Dec. 31, 2017. If you choose the Standard or Concierge Plans, IMT will pay for $39 of your total monthly subscription through Dec. 31, 2017.';
            break;
        case 'FMH17':
            $logo = asset('images/FMH-logos.jpg');
            $company = 'Farmers Mutual Hail Insurance Company of Iowa';
            $details = 'If you choose the Essential Plan, Farmers Mutual Hail will cover the full cost of your subscription through April 30, 2018. If you choose the Standard or Concierge Plans, Farmers Mutual Hail will pay for $39 of your total monthly subscription through April 30, 2018.';
            break;
    }
    /*
    foreach ($mock_plans as $key => $value) {
        $mock_plans[$key]['features'] = json_decode($value['features']);
    }
    */
    $data = [
        'logo' => $logo,
        'company' => $company,
        'details' => $details
    ];
    return response()->json($data);
 });

 Route::post('/payment', 'PaymentController@store');
