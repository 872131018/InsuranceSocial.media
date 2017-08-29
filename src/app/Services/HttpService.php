<?php

namespace App\Services;

use GuzzleHttp\Client;

class HttpService
{
    protected $client;
    /**
     * Construct an instance of the payment service
     *
     * @return void
     */
    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => 'https://www.linkedin.com/oauth/v2/',
            'verify' => false
        ]);
    }

    public function getGuzzleClient() {
        return $this->client;
    }
}
