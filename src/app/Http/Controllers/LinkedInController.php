<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

use App\Services\HttpService;

use GuzzleHttp\Client;

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
            'redirect_uri' => env('APP_URL').'/linkedin/return',
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
    public function edit(Request $request, $id = 0)
    {
        $user = Auth::user();
        $linkedInAccount = $user->linkedin;
        $linkedInAccount->company_id = $request->id;
        $linkedInAccount->company_name = $request->name;
        $linkedInAccount->progress = 4;
        $linkedInAccount->update();
        /*
        Mail::send('emails.haslinkedin', [ 'name' => $user->name ], function ($message) {
           $message->to(Auth::user()->email);
           $message->bcc([
               'elisabethd@insurancesocial.media',
               'davidb@insurancesocial.media'
           ]);
           $message->subject('Insurance Social Media Instructions');
       });
       */

        return response()->json($linkedInAccount);
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
        try {
            $response = $this->client->post('accessToken', [
                'form_params' => [
                    'grant_type' => 'authorization_code',
                    'code' => $request->code,
                    'redirect_uri' => env('APP_URL').'/linkedin/return',
                    'client_id' => env('CLIENT_ID'),
                    'client_secret' => env('CLIENT_SECRET')
                ]
            ]);
        } catch(Exception $e) {
            return response()->json($e->getMessage(), 502);
        }

        $response = json_decode($response->getBody());
        if(isset($response->access_token) && isset($response->expires_in)) {
            $access_token = $response->access_token;
            $expires_in = $response->expires_in;

            try {
                $client = new Client();
                $response = $client->request('GET', 'https://api.linkedin.com/v1/people/~:(email-address)?format=json', [
                    'headers' => ['Authorization' => 'Bearer '.$access_token]
                ]);
                $response = json_decode($response->getBody());
                $email = $response->emailAddress;
            } catch(Exception $e) {
                return response()->json($e->getMessage(), 502);
            }
        }
        $user = Auth::user();
        $linkedInAccount = $user->linkedin;
        $linkedInAccount->linkedin_email = $email;
        $linkedInAccount->access_token = $access_token;
        $linkedInAccount->expires_in = $expires_in;
        $linkedInAccount->update();

        try {
            $response = $client->request('GET', 'https://api.linkedin.com/v1/companies?format=json&is-company-admin=true', [
                'headers' => ['Authorization' => 'Bearer '.$access_token]
            ]);
        } catch(Exception $e) {
            return response()->json($e->getMessage(), 502);
        }
        $response = json_decode($response->getBody());
        if(isset($response->values) && count($response->values) != 0) {
            session(['companies' => json_encode($response->values)]);
            //return redirect('/companies');
            return redirect('/agency');
        } else {
            return redirect('/agency');
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
