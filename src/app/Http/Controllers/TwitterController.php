<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

use Facebook\Facebook;

class TwitterController extends Controller
{

    protected $fb;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->fb = new Facebook([
            'app_id' => env('APP_ID'),
            'app_secret' => env('APP_SECRET'),
            'default_graph_version' => env('DEFAULT_GRAPH_VERSION')
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if($request->wantsJson()) {
            $helper = $this->fb->getRedirectLoginHelper();
            $permissions = ['email']; // optional
            $url = env('APP_URL');
            $loginUrl = $helper->getLoginUrl("{$url}/setup/facebook/return", $permissions);

            return response()->json($loginUrl);
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
        $helper = $this->fb->getRedirectLoginHelper();
        if ($request->input('state')) {
            $helper->getPersistentDataHandler()->set('state', $request->input('state'));
        }
        try {
          $accessToken = $helper->getAccessToken();
        } catch(Facebook\Exceptions\FacebookResponseException $e) {
          // When Graph returns an error
          return response()->json($e->getMessage(), 502);
        } catch(Facebook\Exceptions\FacebookSDKException $e) {
          // When validation fails or other local issues
          return response()->json($e->getMessage(), 502);
        }

        if (isset($accessToken)) {
          // Logged in!
          $user = Auth::user();
          $user->facebook_access_token = (string) $accessToken;
          $user->update();

           return redirect('setup/facebook');
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
