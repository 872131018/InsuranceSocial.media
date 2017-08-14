<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

use App\Services\PaymentService;

use net\authorize\api\controller as AnetController;

use Carbon\Carbon;

use App\UserPlan;

use App\Payment;

class PaymentController extends Controller
{
    protected $paymentService;

    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
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
        $transactionRequest = '';
        if($request->input('total') == '1.00'){
            $transactionRequest = $this->paymentService->getTransactionRequest([
                'type' => 'new',
                'amount' => $request->input('total'),
                'dataDescriptor' => $request->input('dataDescriptor'),
                'dataValue' => $request->input('dataValue')
                ],
                Auth::user());
        } else {
            $transactionRequest = $this->paymentService->getTransactionRequest([
                'type' => 'prorate',
                'amount' => $request->input('total'),
                'dataDescriptor' => $request->input('dataDescriptor'),
                'dataValue' => $request->input('dataValue')
                ],
                Auth::user());
        }
        $controller = new AnetController\CreateTransactionController($transactionRequest);
        $response = $controller->executeWithApiResponse(\net\authorize\api\constants\ANetEnvironment::SANDBOX);
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
        $transactionId = 0;
        $auth_code = 0;
        if($response->getMessages()->getResultCode() == 'Ok') {
            $data = [];
            if ($response->getTransactionResponse() != null && $response->getTransactionResponse()->getMessages() != null) {
                $transactionId = $response->getTransactionResponse()->getTransId();
                $auth_code = $response->getTransactionResponse()->getAuthCode();
            }
        }
        /**
        * Create customer profile from transaction
        */
        $controller = new AnetController\CreateCustomerProfileFromTransactionController($this->paymentService->createProfileFromTransaction(Auth::user(), $transactionId));
        $response = $controller->executeWithApiResponse(\net\authorize\api\constants\ANetEnvironment::SANDBOX);
        /**
        * Error problem creating customer payment profile
        */
        if(($response == null) || ($response->getMessages()->getResultCode() != "Ok") ) {
            $data = [
                'error' => 'FAILED',
                'errorCode' => $response->getMessages()->getMessage()[0]->getCode(),
                'errorMessage' => $response->getMessages()->getMessage()[0]->getText()
            ];
            return response()->json($data, 501);
        }
        /**
        * Success sign up user with gathered information
        */
        if(($response != null) && ($response->getMessages()->getResultCode() == "Ok") ) {
            $user = Auth::user();
            $user->status = 'N';
            $user->role = 'A';
            $user->effective_date = new Carbon('first day of next month');
            $user->customer_profile_id = $response->getCustomerProfileId();
            $user->customer_payment_profile_id = $response->getCustomerPaymentProfileIdList()[0];
            $user->update();

            $userPlan = new UserPlan();
            $userPlan->email = $user->email;
            $userPlan->plan_code = $request->input('customerData')['plan']['tier'];
            $user->plan()->save($userPlan);

            $payment = new Payment();
            $payment->email = $user->email;
            $payment->transaction_id = $transactionId;
            $payment->auth_code = $auth_code;
            $user->payments()->save($payment);

            return response()->json([
                'transaction' => [
                    'amount' => $request->input('total'),
                    'transactionId' => $transactionId,
                    'auth_code' => $auth_code
                ],
                'user' => $user
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storealt(Request $request)
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
