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
            return view('layouts.frontend.app');
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
                    $user->discount = $request->input('discount');
                    $user->plan = json_encode($request->input('customerData')['plan']);
                    $user->facebook = $request->input('customerData')['facebook'];
                    $user->twitter = $request->input('customerData')['twitter'];
                    $user->auth_code = $tresponse->getAuthCode();
                    $user->transaction_id = $tresponse->getTransId();
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
