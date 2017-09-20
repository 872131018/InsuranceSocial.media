<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

use Facebook\Facebook;

use Facebook\FacebookRequest;

use Facebook\GraphUser;

use Abraham\TwitterOAuth\TwitterOAuth;

use App\FacebookAccount;

use Illuminate\Support\Facades\Log;

class DashboardController extends Controller
{

    protected $facebook;

    protected $twitter;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->facebook = new Facebook([
            'app_id' => env('APP_ID'),
            'app_secret' => env('APP_SECRET'),
            'default_graph_version' => env('DEFAULT_GRAPH_VERSION')
        ]);
        $this->facebook->setDefaultAccessToken(Auth::user()->facebook->access_token);

        $this->twitter = $connection = new TwitterOAuth(
            env('CONSUMER_KEY'),
            env('CONSUMER_SECRET'),
            Auth::user()->facebook->access_token,
            Auth::user()->facebook->secret_token
        );
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        
        die;

        $batch = [
            'page_reach_request' => $this->facebook->request('GET', '/127774770597667/insights/page_impressions/days_28'),
            'page_clicks_request' => $this->facebook->request('GET', '/127774770597667/insights/page_consumptions/days_28'),
            'page_likes_shares_comments_request' => $this->facebook->request('GET', '/127774770597667/insights/page_positive_feedback_by_type/days_28'),
            'page_engagement_request' => $this->facebook->request('GET', '/127774770597667/insights/page_post_engagements/days_28')
        ];

        try {
            $responses = $this->facebook->sendBatchRequest($batch);
        } catch(Facebook\Exceptions\FacebookResponseException $e) {
            // When Graph returns an error
            return response()->json($e->getMessage(), 502);
        } catch(Facebook\Exceptions\FacebookSDKException $e) {
            // When validation fails or other local issues
            return response()->json($e->getMessage(), 502);
        }
        $responses = json_decode($responses->getBody());
        $data = [
            'reach' => json_decode($responses[0]->body)->data[0]->values[0]->value,
            'clicks' => json_decode($responses[1]->body)->data[0]->values[0]->value,
            'likes' => json_decode($responses[2]->body)->data[0]->values[0]->value->like,
            'shares' => json_decode($responses[2]->body)->data[0]->values[0]->value->link,
            'comments' => json_decode($responses[2]->body)->data[0]->values[0]->value->comment,
            'engagement' => json_decode($responses[3]->body)->data[0]->values[0]->value
        ];

        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, $id = 0)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
