<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

use App\Plan;

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
                $mock_plans = [
                    Plan::where('tier', '2')->first(),
                    Plan::where('tier', '3')->first()
                ];

                foreach ($mock_plans as $key => $value) {
                    $mock_plans[$key]['features'] = json_decode($value['features']);
                }
                /**
                * Build an object to output onto the view
                */
                $data = [
                    'logo' => $mock_logo,
                    'company' => $mock_company,
                    'plans' => $mock_plans
                ];
            } else {
                /**
                * Empty object, something else might need to get into the view from here
                */
                $data = [];
            }
            return response()->json($data);
        } else {
            return view('layouts.checkout.app')->with('api_token', Auth::user()->api_token);
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
