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

use net\authorize\api\contract\v1\CreateCustomerProfileRequest;

use net\authorize\api\contract\v1\CustomerProfileType;

use net\authorize\api\contract\v1\CustomerPaymentProfileType;

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
        if($payment['type'] == 'new') {
            $requestType->setTransactionType("authOnlyTransaction");
            $requestType->setAmount($payment['amount']);

            $op = new OpaqueDataType();
            $op->setDataDescriptor($payment['dataDescriptor']);
            $op->setDataValue($payment['dataValue']);

            $payment = new PaymentType();
            $payment->setOpaqueData($op);

            $requestType->setPayment($payment);
        } else if($payment['type'] == 'prorate') {
            $requestType->setTransactionType("authCaptureTransaction");
            $requestType->setAmount($payment['amount']);

            $op = new OpaqueDataType();
            $op->setDataDescriptor($payment['dataDescriptor']);
            $op->setDataValue($payment['dataValue']);

            $payment = new PaymentType();
            $payment->setOpaqueData($op);

            $requestType->setPayment($payment);
        } else {
            $requestType->setTransactionType("authCaptureTransaction");
            $requestType->setAmount($payment['amount']);

            $profileToCharge = new CustomerProfilePaymentType();
            $profileToCharge->setCustomerProfileId($user->customer_profile_id);

            $paymentProfile = new PaymentProfileType();
            $paymentProfile->setPaymentProfileId($user->customer_payment_profile_id);
            $profileToCharge->setPaymentProfile($paymentProfile);

            $requestType->setProfile($profileToCharge);
        }

        $request = new CreateTransactionRequest();
        $request->setMerchantAuthentication($this->merchantAuthenticationType);
        $request->setRefId('ref'.time());
        $request->setTransactionRequest($requestType);
        return $request;
    }

    public function createProfileFromTransaction($email = '', $name = '', $transaction_id = 0) {
        $customerProfile = new CustomerProfileBaseType();
        $customerProfile->setMerchantCustomerId(time());
        $customerProfile->setEmail($email);
        $customerProfile->setDescription('Name: '.$name.' Email: '.$email);

        $request = new CreateCustomerProfileFromTransactionRequest();
        $request->setMerchantAuthentication($this->merchantAuthenticationType);
        $request->setTransId($transaction_id);
        $request->setCustomer($customerProfile);

        return $request;
    }
}
