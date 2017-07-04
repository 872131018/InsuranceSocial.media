<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

class LocationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if($request->wantsJson()) {
            return response()->json(Auth::user());
        } else {
            return view('layouts.setup.app');
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
        if($request->wantsJson()) {
            $user = Auth::user();
            if($user->email == $request->input('email')) {
                $user->address_1 = $request->input('address_1');
                $user->address_2 = $request->input('address_2');
                $user->city = $request->input('city');
                $user->state = $request->input('state');
                $user->zip = $request->input('zip');
                $user->marketing_regions = json_encode($request->input('marketing_regions'));
                $user->marketing_states = json_encode($request->input('marketing_states'));
                $user->marketing_counties = json_encode($request->input('marketing_counties'));
                $user->update();

                $user->marketing_regions = $request->input('marketing_regions');
                $user->marketing_states = $request->input('marketing_states');
                $user->marketing_counties = $request->input('marketing_counties');
            }
            return response()->json($user);
        } else {
            return view('layouts.setup.app');
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
