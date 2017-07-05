<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

use Abraham\TwitterOAuth\TwitterOAuth;

class TwitterController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if($request->wantsJson()) {
            $connection = new TwitterOAuth(env('CONSUMER_KEY'), env('CONSUMER_SECRET'));
            $request_token = $connection->oauth('oauth/request_token', array('oauth_callback' => env('APP_URL').'/setup/twitter/return'));
            session(['oauth_token' => $request_token['oauth_token']]);
            session(['oauth_token_secret' => $request_token['oauth_token_secret']]);

            $url = $connection->url('oauth/authorize', array('oauth_token' => $request_token['oauth_token']));

            return response()->json($url);
        } else {
            return view('layouts.setup.app');
        }
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
        if($request->wantsJson()) {
            $user = Auth::user();
            if($user->email == $request->input('email')) {
                //
            }
            return response()->json($user);
        } else {
            return view('layouts.setup.app');
        }
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
    public function edit($id)
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
        $oauth_token = $request->input('oauth_token');
        if(isset($oauth_token) && session('oauth_token') !== $request->input('oauth_token')) {
            return response(500);
        }
        $connection = new TwitterOAuth(env('CONSUMER_KEY'), env('CONSUMER_SECRET'), session('oauth_token'), session('oauth_token_secret'));
        $access_token = $connection->oauth("oauth/access_token", ["oauth_verifier" => $request->input('oauth_verifier')]);

        if (isset($access_token)) {
          // Logged in!
          $user = Auth::user();
          $user->twitter_oauth_token = $access_token['oauth_token'];
          $user->twitter_oauth_token_secret = $access_token['oauth_token_secret'];
          $user->update();

           return redirect('setup/profile');
        }
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