<?php

namespace App\Services;

use net\authorize\api\contract\v1\MerchantAuthenticationType;

use net\authorize\api\contract\v1\OpaqueDataType;

use net\authorize\api\contract\v1\PaymentType;

use net\authorize\api\contract\v1\TransactionRequestType;

use net\authorize\api\contract\v1\CustomerProfilePaymentType;

use net\authorize\api\contract\v1\PaymentProfileType;

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

    public function getTransactionRequest($payment = [], $user = null) {
        $requestType = new TransactionRequestType();
        $requestType->setTransactionType("authCaptureTransaction");
        $requestType->setAmount($payment['amount']);
        if($payment['type'] == 'new') {
            $op = new OpaqueDataType();
            $op->setDataDescriptor($payment['dataDescriptor']);
            $op->setDataValue($payment['dataValue']);

            $payment = new PaymentType();
            $payment->setOpaqueData($op);

            $requestType->setPayment($payment);
        } else {
            $profileToCharge = new CustomerProfilePaymentType();
            $profileToCharge->setCustomerProfileId($user->customer_profile_id);

            $paymentProfile = new PaymentProfileType();
            $paymentProfile->setPaymentProfileId($user->customer_payment_profile_id);
            $profileToCharge->setPaymentProfile($paymentProfile);

            $requestType->setProfile($profileToCharge);
        }

        $transactionRequest = new CreateTransactionRequest();
        $transactionRequest->setMerchantAuthentication($this->merchantAuthenticationType);
        $transactionRequest->setRefId('ref'.time());
        $transactionRequest->setTransactionRequest($requestType);
        return $transactionRequest;
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
