<?php
use Illuminate\Http\Request;

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
Route::get('/corporate/{discount?}', 'CorporateController@index');

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
 Route::get('/', function () {
    return view('layouts.frontend.app');
 });
 /**
  * Deliver the homepage
  *
  * @return \Illuminate\Http\Response
  */
  Route::get('/select', function (Request $request) {
    if($request->wantsJson()) {
        $data = [
             [
                'name' => 'Trial Plan',
                'price' => '0.00',
                'features' => [
                    'Insert free plan specifics here.',
                    'Insert free plan specifics here.',
                    'Insert free plan specifics here.'
                ]
            ],
            [
                'name' => 'Essential Plan',
                'price' => '39.00',
                'features' => [
                    'Facebook and Twitter account set-up, if necessary',
                    '6 posts/week (3 each to Facebook and Twitter)',
                    'Personalized content, tailored to your community, interests, products and companies – edited for optimum engagement',
                    'Automatic notifications when friends or followers react to your posts',
                    '24/7 access to analytics on your social media reach and engagement'
                ]
            ],
            [
                'name' => 'Standard Plan',
                'price' => '59.00',
                'features' => [
                    'All the benefits of the Essential Plan',
                    '10 posts/week (5 each to Facebook and Twitter)',
                    'PLUS, 4 email campaigns per year to help grow your Facebook and Twitter audience',
                    'Up to 1,500 names per campaign'
                ]
            ],
            [
                'name' => 'Concierge Plan',
                'price' => '399.00',
                'features' => [
                    'Personal Account Concierge crafts unique posts and interacts with your friends and followers',
                    'Includes personal contact and consulting as we build your social media presence, relationships and engagement',
                    '4 email campaigns per year',
                    'Up to 5,000 names per campaign'
                ]
            ],
            [
                'name' => 'Enterprise Plan',
                'price' => 'Contact Us',
                'features' => [
                    'Special pricing for agent groups',
                    'Turnkey launch, onboarding and account set-up tools',
                    'Enterprise Dashboard provides detailed, per-agent analytics',
                    'Agent training and webinars'
                ]
            ]
        ];

        return response()->json($data);
    } else {
        return view('layouts.frontend.app');
    }
  });
/**
 * Deliver the homepage
 *
 * @return \Illuminate\Http\Response
 */
Route::get('/social-media', function () {
    return view('layouts.frontend.app');
});
