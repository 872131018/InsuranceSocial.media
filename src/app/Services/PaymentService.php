<?php

namespace App\Services;

use net\authorize\api\contract\v1\MerchantAuthenticationType;

use net\authorize\api\contract\v1\OpaqueDataType;

use net\authorize\api\contract\v1\PaymentType;

use net\authorize\api\contract\v1\TransactionRequestType;

use net\authorize\api\contract\v1\CreateTransactionRequest;

use net\authorize\api\contract\v1\CustomerProfileBaseType;

use net\authorize\api\contract\v1\CreateCustomerProfileFromTransactionRequest;

class PaymentService
{
    protected $merchantAuthenticationType;
    /**
     * Construct an instance of the payment service
     *
     * @return void
     */
    public function __construct(MerchantAuthenticationType $MerchantAuthenticationType)
    {
        $this->merchantAuthenticationType = $MerchantAuthenticationType;
        $this->merchantAuthenticationType->setName(env('API_LOGIN_ID'));
        $this->merchantAuthenticationType->setTransactionKey(env('TRANSACTION_KEY'));
    }

    public function getTransactionRequest($request = null) {
        $transactionRequest = new CreateTransactionRequest();
        $transactionRequest->setMerchantAuthentication($this->merchantAuthenticationType);
        $transactionRequest->setRefId('ref'.time());
        $transactionRequest->setTransactionRequest($this->getRequestType($request));
        return $transactionRequest;
    }

    private function getRequestType($request = null) {
        // Create a transaction
        $requestType = new TransactionRequestType();
        $requestType->setTransactionType("authCaptureTransaction");
        $requestType->setAmount($request->input('total'));
        $requestType->setPayment($this->getPayment($request));
        return $requestType;
    }

    private function getPayment($request = null) {
        $payment = new PaymentType();
        $payment->setOpaqueData($this->getOpaqueData($request));
        return $payment;
    }

    private function getOpaqueData($request = null) {
        // Create the payment data for a credit card from nonce
        $op = new OpaqueDataType();
        $op->setDataDescriptor($request->input('dataDescriptor'));
        $op->setDataValue($request->input('dataValue'));
        return $op;
    }

    public function createProfile($user = null, $transId = 0) {
        $customerProfile = new CustomerProfileBaseType();
        $customerProfile->setMerchantCustomerId(time());
        $customerProfile->setEmail($user->email);
        $customerProfile->setDescription('Name: '.$user->name.' Email: '.$user->email);

        $request = new CreateCustomerProfileFromTransactionRequest();
        $request->setMerchantAuthentication($this->merchantAuthenticationType);
        $request->setTransId($transId);
        $request->setCustomer($customerProfile);

        return $request;
    }
}
