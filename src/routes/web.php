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

Route::get('/user/recent', 'HomeController@index')->name('home');

Route::get('/user/reports/facebook', 'HomeController@index')->name('home');

Route::get('/user/reports/twitter', 'HomeController@index')->name('home');

Route::get('/user/facebook/feed', 'HomeController@index')->name('home');

Route::get('/user/facebook/post', 'HomeController@index')->name('home');

Route::get('/user/twitter/feed', 'HomeController@index')->name('home');




Route::get('/user/profile', 'HomeController@index')->name('home');

/**
* All requirements for user having logged in
*/
Route::middleware(['auth'])->group(function() {

    Route::get('/corporate/{discount?}', 'CorporateController@index');

    Route::get('/file', function(Request $request) {
        $user = Auth::user();
        $myfile = fopen($user->email.".json", "w");
        $data = [
            'user' => $user,
            'plan' => $user->plan,
            'facebook_account' => $user->facebook,
            'template' => $user->template,
            'twitter' => $user->twitter,
            'agency' => $user->agency,
            'regions' => $user->regions,
            'states' => $user->states,
            'counties' => $user->counties,
            'carriers' => $user->carriers,
            'commercialCoverages' => $user->commercialCoverages,
            'cropCoverages' => $user->cropCoverages,
            'personalCoverages' => $user->personalCoverages,
            'benefitCoverages' => $user->benefitCoverages,
            'currentIndustries' => $user->currentIndustries,
            'targetIndustries' => $user->targetIndustries,
            'specialTopics' => $user->specialTopics,
            'causes' => $user->causes,
            'payment' => $user->payments

        ];

        fwrite($myfile, json_encode($data, JSON_PRETTY_PRINT));
        fclose($myfile);

        chown($user->email.".json");

        return redirect('/user/recent');
    });
});
