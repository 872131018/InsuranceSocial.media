<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

use App\Agency;

use App\SelectedRegion;

use App\SelectedState;

use App\SelectedCounty;

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
            $agency = Agency::find($user->agency->id);
            $agency->address_1 = $request->input('address_1');
            $agency->address_2 = $request->input('address_2');
            $agency->city = $request->input('city');
            $agency->state = $request->input('state');
            $agency->zip = $request->input('zip');
            $agency->update();

            $selected = [];
            foreach ($request->input('marketing_regions') as $region) {
                $selectedRegion = new SelectedRegion();
                $selectedRegion->email = $user->email;
                $selectedRegion->region_code = $region['code'];
                array_push($selected, $selectedRegion);
            }
            $user->regions()->saveMany($selected);

            $selected = [];
            foreach ($request->input('marketing_states') as $state) {
                $selectedState = new SelectedState();
                $selectedState->email = $user->email;
                $selectedState->state_code = $state['code'];
                array_push($selected, $selectedState);
            }
            $user->states()->saveMany($selected);

            $selected = [];
            foreach ($request->input('marketing_counties') as $county) {
                $selectedCounty = new SelectedCounty();
                $selectedCounty->email = $user->email;
                $selectedCounty->county_code = $county['code'];
                array_push($selected, $selectedCounty);
            }
            $user->counties()->saveMany($selected);

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
