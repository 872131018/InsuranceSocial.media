<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

use App\Services\HttpService;

use App\LinkedInAccount;

class LinkedInController extends Controller
{
    protected $client;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(HttpService $httpService)
    {
        $this->client = $httpService->getGuzzleClient();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $url = 'https://www.linkedin.com/oauth/v2/authorization?';
        $url .= http_build_query([
            'response_type' => 'code',
            'client_id' => env('CLIENT_ID'),
            'redirect_uri' => 'https://localhost/linkedin/return',
            'state' => 'DCEeFWf45A53sdfKef424'
        ]);

        return response()->json($url);
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
        $response = $this->client->post('accessToken', [
            'form_params' => [
                'grant_type' => 'authorization_code',
                'code' => $request->input('code'),
                'redirect_uri' => 'https://localhost/linkedin/return',
                'client_id' => env('CLIENT_ID'),
                'client_secret' => env('CLIENT_SECRET')
            ]
        ]);

        $response = json_decode($response->getBody());
        if(isset($response->access_token) && isset($response->expires_in)) {
          $user = Auth::user();
          $linkedinAccount = new LinkedInAccount();
          $linkedinAccount->email = $user->email;
          $linkedinAccount->access_token = $response->access_token;
          $linkedinAccount->expires_in = $response->expires_in;
          $user->linkedin()->save($linkedinAccount);

           return redirect('profile');
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
