<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Mail;

use net\authorize\api\controller as AnetController;

use Facebook\Facebook;

use App\FacebookAccount;

use App\FacebookTemplate;

use App\Services\PaymentService;

use App\Payment;

class FacebookController extends Controller
{

    protected $facebook;

    protected $paymentService;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;

        $this->facebook = new Facebook([
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
        $helper = $this->facebook->getRedirectLoginHelper();
        $permissions = ['email', 'pages_show_list', 'read_insights', 'manage_pages', 'publish_pages']; // optional
        $url = env('APP_URL');
        $loginUrl = $helper->getLoginUrl("{$url}/facebook/return", $permissions);

        return response()->json($loginUrl);
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
        $user = Auth::user();
        $template = $user->template;
        $template->name = $request->name;
        $template->image = $request->image;
        $user->template()->save($template);

        $transactionRequest = $this->paymentService->getTransactionRequest([
            'type' => 'single',
            'amount' => '25.00'
            ],
            $user);
        $controller = new AnetController\CreateTransactionController($transactionRequest);
        if(env('APP_ENV') == 'local') {
            $response = $controller->executeWithApiResponse(\net\authorize\api\constants\ANetEnvironment::SANDBOX);
        } else {
            $response = $controller->executeWithApiResponse(\net\authorize\api\constants\ANetEnvironment::PRODUCTION);
        }

        /**
        * ERROR no response
        */
        if($response == null) {
            $data = [
                'error' => 'FAILED',
                'errorCode' => 'No Code',
                'errorMessage' => 'No response returned'
            ];
            return response()->json($data, 501);
        }
        /**
        * ERROR problem with response code
        */
        if($response->getMessages()->getResultCode() != 'Ok') {
            $data = [];
            if ($response->getTransactionResponse() != null && $response->getTransactionResponse()->getErrors() != null) {
                $data = [
                    'error' => 'FAILED',
                    'errorCode' => $response->getTransactionResponse()->getErrors()[0]->getErrorCode(),
                    'errorMessage' => $response->getTransactionResponse()->getErrors()[0]->getErrorText()
                ];
            } else {
                $data = [
                    'error' => 'FAILED',
                    'errorCode' => $response->getMessages()->getMessage()[0]->getCode(),
                    'errorMessage' => $response->getMessages()->getMessage()[0]->getText()
                ];
            }
            return response()->json($data, 501);
        }
        /**
        * Error response ok transaction failed
        */
        if($response->getMessages()->getResultCode() == 'Ok') {
            $data = [];
            if ($response->getTransactionResponse()->getErrors() != null) {
                $data = [
                    'error' => 'FAILED',
                    'errorCode' => $response->getTransactionResponse()->getErrors()[0]->getErrorCode(),
                    'errorMessage' => $response->getTransactionResponse()->getErrors()[0]->getErrorText()
                ];
                return response()->json($data, 501);
            }
        }
        /**
        * Success transaction ok capture ID
        */
        if($response->getMessages()->getResultCode() == 'Ok') {
            $data = [];
            if ($response->getTransactionResponse() != null && $response->getTransactionResponse()->getMessages() != null) {
                $transactionId = $response->getTransactionResponse()->getTransId();
                $auth_code = $response->getTransactionResponse()->getAuthCode();

                $payment = new Payment();
                $payment->email = $user->email;
                $payment->amount = '25.00';
                $payment->description = 'Page Create Charge';
                $payment->discount = '0';
                $payment->transaction_id = $transactionId;
                $payment->auth_code = $auth_code;
                $user->payments()->save($payment);

                $facebook = $user->facebook;
                $facebook->progress = 3;
                $facebook->update();
            }
        }

        Mail::send('emails.nofacebook', [ 'name' => $user->name ], function ($message) {
           $message->to(Auth::user()->email);
           $message->subject('Insurance Social Media Instructions');
       });

        return response()->json($user);
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
        $facebook = $user->facebook;

        /**
        * Get the facebook email for the user
        */
        try {
            $response = $this->facebook->get('/me?fields=email', $facebook->access_token);
            $email = $response->getGraphUser()->getField('email');
        } catch(Facebook\Exceptions\FacebookResponseException $e) {
            return response()->json($e->getMessage(), 502);
        } catch(Facebook\Exceptions\FacebookSDKException $e) {
            return response()->json($e->getMessage(), 502);
        }

        $facebook->facebook_email = $email;
        $facebook->page_id = $request->id;
        $facebook->page_name = $request->name;
        $facebook->page_token = $request->access_token;
        $facebook->progress = 4;
        $facebook->update();

        Mail::send('emails.hasfacebook', [ 'name' => $user->name ], function ($message) {
           $message->to(Auth::user()->email);
           $message->subject('Insurance Social Media Instructions');
       });

        return response()->json($facebook);
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
        $helper = $this->facebook->getRedirectLoginHelper();
        if($request->state) {
            $helper->getPersistentDataHandler()->set('state', $request->state);
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

        if(isset($accessToken)) {
            /**
            * Get the facebook email for the user
            */
            try {
                $response = $this->facebook->get('/me?fields=email', $accessToken);
                $email = $response->getGraphUser()->getField('email');
            } catch(Facebook\Exceptions\FacebookResponseException $e) {
                return response()->json($e->getMessage(), 502);
            } catch(Facebook\Exceptions\FacebookSDKException $e) {
                return response()->json($e->getMessage(), 502);
            }
            /**
            * Get the facebook pages for the user
            */
            try {
                $response = $this->facebook->get('/me/accounts', $accessToken);
            } catch(Facebook\Exceptions\FacebookResponseException $e) {
                return response()->json($e->getMessage(), 502);
            } catch(Facebook\Exceptions\FacebookSDKException $e) {
                return response()->json($e->getMessage(), 502);
            }

            $pages = [];
            foreach($response->getGraphEdge() as $page) {
                array_push($pages, $page->asArray());
            }
            usort($pages, function($a, $b) {
                return $a['name'] <=> $b['name'];
            });

            /**
            * Logged in!!!
            */
            $user = Auth::user();
            $facebook = $user->facebook;
            $facebook->email = $user->email;
            $facebook->facebook_email = $email;
            $facebook->access_token = $accessToken;
            $facebook->update();

            if(count($pages) != 0) {
                session(['pages' => json_encode($pages)]);
                return redirect('/page');
            } else {
                return redirect('/twitter');
            }
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
