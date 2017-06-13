<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CorporateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, $discount = '')
    {
        if($request->wantsJson()) {
            $data = [];
            /**
            * Mock discount should be a call against a real discount that returns carrier and plan details
            */
            $mock_discount = 'asdf1234';
            if($discount == $mock_discount) {
                /**
                * Generate a mock plan
                */
                $mock_logo = asset('images/office.jpg');
                $mock_company = 'Dunder Mifflin Inc.';
                $mock_plan = [
                    'name' => 'Essential Plan',
                    'price' => '39.00',
                    'features' => [
                        'Facebook and Twitter account set-up, if necessary',
                        '6 posts/week (3 each to Facebook and Twitter)',
                        'Personalized content, tailored to your community, interests, products and companies – edited for optimum engagement',
                        'Automatic notifications when friends or followers react to your posts',
                        '24/7 access to analytics on your social media reach and engagement'
                    ]
                ];
                /**
                * Build an object to output onto the view
                */
                $data = [
                    'logo' => $mock_logo,
                    'company' => $mock_company,
                    'plan' => $mock_plan
                ];
            } else {
                /**
                * Empty object, something else might need to get into the view from here
                */
                $data = [];
            }
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
    public function update(Request $request, $id)
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
