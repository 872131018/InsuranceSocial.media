<?php
use Illuminate\Http\Request;

use App\Region;

use App\State;

use App\County;

use App\CommercialCoverage;

use App\PersonalCoverage;

use App\BenefitCoverage;

use App\Industry;

use App\Cause;

use App\Title;

use App\Size;

use App\Generation;

use App\Frequency;

use App\Carrier;

use App\SelectedRegion;

use App\SelectedState;

use App\SelectedCounty;

use App\SelectedCarrier;

use App\SelectedCurrentIndustry;

use App\SelectedTargetIndustry;

use App\SelectedSpecialTopic;

use App\SelectedCause;

use Facebook\Facebook;

use Abraham\TwitterOAuth\TwitterOAuth;

use Illuminate\Support\Facades\Log;

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
 * Deliver the registration SPA and handle posts
 *
 * @return \Illuminate\Http\Response
 */
 Route::get('/api/user', function (Request $request) {
     return response()->json(Auth::user()->with('agency')->first());
 });
 Route::get('/api/plan', function (Request $request) {
     return response()->json(Auth::user()->plan);
 });
 Route::get('/api/regions', function (Request $request) {
     return response()->json(Region::all());
 });
 Route::get('/api/states', function (Request $request) {
     return response()->json(State::all());
 });
 Route::get('/api/counties', function (Request $request) {
     return response()->json(County::all());
 });
 Route::get('/api/coverages', function (Request $request) {
     return response()->json([
         'commercial' => CommercialCoverage::all(),
         'personal' => PersonalCoverage::all(),
         'benefit' => BenefitCoverage::all()
     ]);
 });
 Route::get('/api/industries', function (Request $request) {
     return response()->json(Industry::all());
 });
 Route::get('/api/causes', function (Request $request) {
     return response()->json(Cause::all());
 });
 Route::get('/api/titles', function (Request $request) {
     return response()->json(Title::all());
 });
 Route::get('/api/sizes', function (Request $request) {
     return response()->json(Size::all());
 });
 Route::get('/api/generations', function (Request $request) {
     return response()->json(Generation::all());
 });
 Route::get('/api/frequencies', function (Request $request) {
     return response()->json(Frequency::all());
 });
 Route::get('/api/carriers', function (Request $request) {
     return response()->json(Carrier::all());
 });
 Route::get('/api/selections', function (Request $request) {
     $user = Auth::user();

     return response()->json([
        'selected_regions' => $user->regions,
        'selected_states' => $user->states,
        'selected_counties' => $user->counties,
        'selected_carriers' => $user->carriers,
        'selected_personal_coverages' => $user->personalCoverages,
        'selected_commercial_coverages' => $user->commercialCoverages,
        'selected_benefit_coverages' => $user->benefitCoverages,
        'selected_crop_coverages' => $user->cropCoverages,
        'selected_current_industries' => $user->currentIndustries,
        'selected_target_industries' => $user->targetIndustries,
        'selected_special_topics' => $user->specialTopics,
        'selected_causes' => $user->causes
     ]);
 });
 Route::get('/api/endpoint', function (Request $request) {
    if(env('APP_ENV') == 'local') {
        $response = [
            'post' => 'https://www.staging.insurancesocial.media/api/ismv2/_ismv2_register/',
            'redirect' => 'https://www.staging.insurancesocial.media/?vkVDosE4Oj_add_za_f_EHi9Y7GGB4gST8WkXMjnnWDIr7ZtE_e_'
        ];
    } else {
        $response = [
            'post' => 'https://www.ism.insurancesocial.media/api/ismv2/_ismv2_register/',
            'redirect' => 'https://www.ism.insurancesocial.media/?vkVDosE4Oj_add_za_f_EHi9Y7GGB4gST8WkXMjnnWDIr7ZtE_e_'
        ];
    }

     return response()->json($response);
 });
 Route::get('/api/recent', function (Request $request) {
     $user = Auth::user();

     $facebook = new Facebook([
         'app_id' => env('APP_ID'),
         'app_secret' => env('APP_SECRET'),
         'default_graph_version' => env('DEFAULT_GRAPH_VERSION')
     ]);
     $facebook->setDefaultAccessToken($user->facebook->access_token);

     $this->twitter = new TwitterOAuth(
         env('CONSUMER_KEY'),
         env('CONSUMER_SECRET'),
         $user->twitter->access_token,
         $user->twitter->secret_token
     );

     $data = [
         'facebook_page' => $user->facebook->page_name,
         'twitter_handle' => $user->twitter->screen_name,
         'facebook_posts' => [],
         'twitter_posts' => []
     ];

     try {
         $batch = [
             'posts' => $facebook->request('GET', '/'.$user->facebook->page_id.'/feed?fields=permalink_url')
         ];
         $responses = $facebook->sendBatchRequest($batch);
     } catch(Facebook\Exceptions\FacebookResponseException $e) {
         return response()->json($e->getMessage(), 502);
     } catch(Facebook\Exceptions\FacebookSDKException $e) {
         return response()->json($e->getMessage(), 502);
     }
     $responses = json_decode($responses->getBody());

     $posts = json_decode($responses[0]->body);
     $data['facebook_posts'] = array_slice($posts->data, 0, 5);

     return response()->json($data);
 });
