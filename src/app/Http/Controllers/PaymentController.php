<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

use App\Services\PaymentService;

use net\authorize\api\controller as AnetController;

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
        if($request->wantsJson()) {
            $data = [
                'apiLoginID' => env('API_LOGIN_ID'),
                'clientKey' => env('CLIENT_KEY')
            ];
            return response()->json($data);
        } else {
            return view('layouts.checkout.app');
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
        $controller = new AnetController\CreateTransactionController($this->paymentService->getTransactionRequest($request));
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
                    'errorMessage' => $response->getMessages()->getMessage()[0]->getCode()
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
        if($response->getMessages()->getResultCode() == 'Ok') {
            $data = [];
            if ($response->getTransactionResponse() != null && $response->getTransactionResponse()->getMessages() != null) {
                $transactionId = $response->getTransactionResponse()->getTransId();
            }
        }
        /**
        * Create customer profile from transaction
        */
        $controller = new AnetController\CreateCustomerProfileFromTransactionController($this->paymentService->createProfile(Auth::user(), $transactionId));
        $response = $controller->executeWithApiResponse(\net\authorize\api\constants\ANetEnvironment::SANDBOX);
        if(($response != null) && ($response->getMessages()->getResultCode() == "Ok") ) {
            $user = Auth::user();
            $user->couponCd = $request->input('discount');
            $user->customerProfileId = $response->getCustomerProfileId();
            $user->customerPaymentProfileId = $response->getCustomerPaymentProfileIdList()[0];
            $user->update();

            return response()->json($user);
        } else {
            $data = [
                'error' => 'FAILED',
                'errorCode' => $response->getMessages()->getMessage()[0]->getCode(),
                'errorMessage' => $response->getMessages()->getMessage()[0]->getText()
            ];
            return response()->json($data, 501);
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
        $controller = new AnetController\CreateTransactionController($this->paymentService->getTransactionRequest($request));

        $response = $controller->executeWithApiResponse(\net\authorize\api\constants\ANetEnvironment::SANDBOX);

        if ($response != null) {
            $data = [];
            if($response->getMessages()->getResultCode() =='Ok') {
                $tresponse = $response->getTransactionResponse();

                if ($tresponse != null && $tresponse->getMessages() != null) {
                    $data = [
                        'responseCode' => $tresponse->getResponseCode(),
                        'authCode' => $tresponse->getAuthCode(),
                        'transactionId' => $tresponse->getTransId(),
                        'code' => $tresponse->getMessages()[0]->getCode(),
                        'description' => $tresponse->getMessages()[0]->getDescription()
                    ];

                    $user = Auth::user();
                    $user->facebook_auth_code = $tresponse->getAuthCode();
                    $user->facebook_transaction_id = $tresponse->getTransId();
                    $user->update();
                } else {
                    if($tresponse->getErrors() != null) {
                        $data = [
                            'error' => 'FAILED!',
                            'errorCode' => $tresponse->getErrors()[0]->getErrorCode(),
                            'errorMessage' => $tresponse->getErrors()[0]->getErrorText()
                        ];
                    }
                }
            } else {
                $tresponse = $response->getTransactionResponse();

                if($tresponse != null && $tresponse->getErrors() != null) {
                    $data = [
                        'error' => 'FAILED!',
                        'errorCode' => $tresponse->getErrors()[0]->getErrorCode(),
                        'errorMessage' => $tresponse->getErrors()[0]->getErrorText()
                    ];
                } else {
                    $data = [
                        'error' => 'FAILED!',
                        'errorCode' => $response->getMessages()->getMessage()[0]->getCode(),
                        'errorMessage' => $response->getMessages()->getMessage()[0]->getText()
                    ];
                }
            }
            return response()->json($data);
        } else {
            return response()->json('No Response Returned');
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
    public function update(Request $request, $discount)
    {
        if($request->wantsJson()) {
            if($discount == 'asdf1234') {
                $mock_discount = '10.00';
                return response()->json($mock_discount);
            } else {
                return response()->json('Invalid Discount Code', 400);
            }
        } else {
            return response()->json('Error occured', 400);
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
