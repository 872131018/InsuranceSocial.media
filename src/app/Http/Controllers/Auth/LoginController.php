<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

use Illuminate\Foundation\Auth\AuthenticatesUsers;

use Illuminate\Http\Request;

use GuzzleHttp\Client;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/user/recent';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function showLoginForm()
    {
        return view('layouts.auth.app');
    }

    /**
     * Log the user out of the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        $this->guard()->logout();

        $request->session()->invalidate();

        return redirect('/login');
    }

    /**
     * The user has been authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  mixed  $user
     * @return mixed
     */
    protected function authenticated(Request $request, $user)
    {
        if(!$user->facebook->page_id) {
            $url = '';
            if(env('APP_ENV') == 'local') {
                $url = 'http://www.staging.insurancesocial.media/api/ismv2/';
            } else {
                $url = 'http://www.ism.insurancesocial.media/api/ismv2/';
            }

            $client = new Client([
                'base_uri' => $url
            ]);

            $response = $client->request('GET', '_ismv2_getFBToken', [
                'query' => ['user' => $user->email]
            ]);
            $response = json_decode($response->getBody());

            if($response->FBPageId) {
                $facebook = $user->facebook;
                $facebook->page_id = $response->FBPageId;
                //$facebook->page_name = $response->FBPageName;
                $facebook->page_token = $response->access_token;
                $facebook->update();
            }

        }
        return redirect()->intended($this->redirectPath());
    }
}
