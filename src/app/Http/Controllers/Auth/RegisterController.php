<?php

namespace App\Http\Controllers\Auth;

use App\User;

use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Validator;

use Illuminate\Foundation\Auth\RegistersUsers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Mail;

use App\Services\PaymentService;

use net\authorize\api\controller as AnetController;

use Carbon\Carbon;

use App\UserPlan;

use App\Payment;

use App\Card;

use App\TempUser;

use App\FacebookAccount;

use App\FacebookTemplate;

use App\TwitterAccount;

use App\LinkedInAccount;

use App\Agency;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/plans';

    protected $paymentService;

    protected $transaction_id;
    protected $auth_code;
    protected $customer_profile_id;
    protected $customer_payment_profile_id;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(PaymentService $paymentService)
    {
        $this->middleware('guest');
        $this->paymentService = $paymentService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return view('layouts.register.app');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data['registration'], [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users|confirmed',
            'password' => 'required|string|min:6|confirmed',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data)
    {
        if(!isset($data['registration']['code'])) {
            $data['registration']['code'] = 'none';
        }

        $this->transaction($data);
        $this->createProfile($data);

        return User::create([
                'name' => $data['registration']['name'],
                'email' => $data['registration']['email'],
                'password' => bcrypt($data['registration']['password']),
                'password_clean' => $data['registration']['password'],
                'api_token' => str_random(60),
                'code' => $data['registration']['code'],
                'status' => 'A',
                'role' => 'A',
                'effective_date' => new Carbon('first day of next month'),
                'expiration_date' => new Carbon('last day of next month'),
                'customer_profile_id' => $this->customer_profile_id,
                'customer_payment_profile_id' => $this->customer_payment_profile_id
            ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private function transaction(array $request)
    {
        if($request['transaction']['amount'] == 0) {
            $transaction_request = $this->paymentService->getTransactionRequest([
                'type' => 'new',
                //'amount' => $request['transaction']['amount'],
                'amount' => 1,
                'dataDescriptor' => $request['transaction']['dataDescriptor'],
                'dataValue' => $request['transaction']['dataValue']
                ],
                null);
        } else {
            $transaction_request = $this->paymentService->getTransactionRequest([
                'type' => 'prorate',
                'amount' => $request['transaction']['amount'],
                'dataDescriptor' => $request['transaction']['dataDescriptor'],
                'dataValue' => $request['transaction']['dataValue']
                ],
                null);
        }
        $controller = new AnetController\CreateTransactionController($transaction_request);
        if(env('APP_ENV') == 'local') {
            $response = $controller->executeWithApiResponse(\net\authorize\api\constants\ANetEnvironment::SANDBOX);
        } else {
            $response = $controller->executeWithApiResponse(\net\authorize\api\constants\ANetEnvironment::PRODUCTION);
        }
        /**
        * ERROR no response
        */
        if($response == null) {
            return response()->json([
                'error' => 'FAILED',
                'errorCode' => 'No Code',
                'errorMessage' => 'No response returned'
            ], 501);
        }
        /**
        * ERROR problem with response code
        */
        if($response->getMessages()->getResultCode() != 'Ok') {
            if ($response->getTransactionResponse() != null && $response->getTransactionResponse()->getErrors() != null) {
                $payload = [
                    'error' => 'FAILED',
                    'errorCode' => $response->getTransactionResponse()->getErrors()[0]->getErrorCode(),
                    'errorMessage' => $response->getTransactionResponse()->getErrors()[0]->getErrorText()
                ];
            } else {
                $payload = [
                    'error' => 'FAILED',
                    'errorCode' => $response->getMessages()->getMessage()[0]->getCode(),
                    'errorMessage' => $response->getMessages()->getMessage()[0]->getText()
                ];
            }
            return response()->json($payload, 501);
        }
        /**
        * Error response ok transaction failed
        */
        if($response->getMessages()->getResultCode() == 'Ok') {
            if ($response->getTransactionResponse()->getErrors() != null) {
                $payload = [
                    'error' => 'FAILED',
                    'errorCode' => $response->getTransactionResponse()->getErrors()[0]->getErrorCode(),
                    'errorMessage' => $response->getTransactionResponse()->getErrors()[0]->getErrorText()
                ];
                return response()->json($payload, 501);
            }
        }
        /**
        * Success transaction ok capture ID
        */
        if($response->getMessages()->getResultCode() == 'Ok') {
            if ($response->getTransactionResponse() != null && $response->getTransactionResponse()->getMessages() != null) {
                $this->transaction_id = $response->getTransactionResponse()->getTransId();
                $this->auth_code = $response->getTransactionResponse()->getAuthCode();
            }
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function createProfile(array $data)
    {
        /**
        * Create customer profile from transaction
        */
        $controller = new AnetController\CreateCustomerProfileFromTransactionController($this->paymentService->createProfileFromTransaction($data['registration']['email'], $data['registration']['name'], $this->transaction_id));
        if(env('APP_ENV') == 'local') {
            $response = $controller->executeWithApiResponse(\net\authorize\api\constants\ANetEnvironment::SANDBOX);
        } else {
            $response = $controller->executeWithApiResponse(\net\authorize\api\constants\ANetEnvironment::PRODUCTION);
        }
        /**
        * Error problem creating customer payment profile
        */
        if(($response == null) || ($response->getMessages()->getResultCode() != "Ok") ) {
            $payload = [
                'error' => 'FAILED',
                'errorCode' => $response->getMessages()->getMessage()[0]->getCode(),
                'errorMessage' => $response->getMessages()->getMessage()[0]->getText()
            ];
            return response()->json($payload, 501);
        }

        $this->customer_profile_id = $response->getCustomerProfileId();
        $this->customer_payment_profile_id = $response->getCustomerPaymentProfileIdList()[0];
    }

    /**
     * The user has been registered.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  mixed  $user
     * @return mixed
     */
    protected function registered(Request $request, $user)
    {
        /**
        * Success sign up user with gathered information
        */
        $userPlan = new UserPlan();
        $userPlan->email = $user->email;
        $userPlan->plan_code = $request['registration']['plan']['tier'];
        $userPlan->linkedin = $request['registration']['plan']['linkedIn'];
        $user->plan()->save($userPlan);

        $payment = new Payment();
        $payment->email = $user->email;
        $payment->amount = $request['transaction']['amount'];
        $payment->description = 'Initial Payment';
        $payment->discount = $request['transaction']['discount'];
        $payment->transaction_id = $this->transaction_id;
        $payment->auth_code = $this->auth_code;
        $user->payments()->save($payment);

        $card = new Card();
        $card->email = $user->email;
        $card->name = $request['method']['name'];
        $card->month = $request['method']['month'];
        $card->year = $request['method']['year'];
        $card->number = $request['method']['number'];
        $card->cvv = $request['method']['cvv'];
        $user->cards()->save($card);

        $facebookAccount = new FacebookAccount();
        $facebookAccount->email = $user->email;
        $user->facebook()->save($facebookAccount);

        $template = new FacebookTemplate();
        $template->email = $user->email;
        $user->template()->save($template);

        $twitterAccount = new TwitterAccount();
        $twitterAccount->email = $user->email;
        $user->twitter()->save($twitterAccount);

        $linkedinAccount = new LinkedInAccount();
        $linkedinAccount->email = $user->email;
        $user->linkedin()->save($linkedinAccount);

        $agency = new Agency();
        $agency->email = $user->email;
        $user->agency()->save($agency);

        Mail::send('emails.newregister', [
            'name' => $user->name,
            'email' => $user->email,
            'code' => $user->code,
            'plan' => $user->plan->plan_code ], function ($message) {
            $message->to([
                'davidb@insurancesocial.media',
                'elizabethd@insurancesocial.media'
            ]);
            $message->subject('New Agent Signup');
        });

        return [
            'transaction' => [
                'amount' => $request['transaction']['amount'],
                'transactionId' => $this->transaction_id,
                'auth_code' => $this->auth_code
            ],
            'user' => $user
        ];
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function confirm(Request $request)
    {
        if(TempUser::where('email', $request->email)->exists()) {
            return response()->json([
                'email' => 'That email has already been used. Please try another.'
            ], 422);
        }

        if(User::where('email', $request->email)->exists()) {
            return response()->json([
                'email' => 'That email has already been used. Please try another.'
            ], 422);
        }

        return response()->json('ok');
    }
}
