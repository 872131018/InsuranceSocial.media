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
        //
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
        $user = Auth::user();
        $agency = $user->agency;
        $agency->address_1 = $request->input('address_1');
        $agency->address_2 = $request->input('address_2');
        $agency->city = $request->input('city');
        $agency->state = $request->input('state');
        $agency->zip = $request->input('zip');
        $agency->update();

        $selected = [];
        foreach ($request->input('selected_regions') as $region) {
            $selectedRegion = new SelectedRegion();
            $selectedRegion->email = $user->email;
            $selectedRegion->state_code = $region['state_code'];
            $selectedRegion->code = $region['code'];
            $selectedRegion->desc = $region['desc'];
            array_push($selected, $selectedRegion);
        }
        $user->regions()->saveMany($selected);

        $selected = [];
        foreach ($request->input('selected_states') as $state) {
            $selectedState = new SelectedState();
            $selectedState->email = $user->email;
            $selectedState->state_code = $state['state_code'];
            $selectedState->code = $state['code'];
            $selectedState->desc = $state['desc'];
            array_push($selected, $selectedState);
        }
        $user->states()->saveMany($selected);

        $selected = [];
        foreach ($request->input('selected_counties') as $county) {
            $selectedCounty = new SelectedCounty();
            $selectedCounty->email = $user->email;
            $selectedCounty->state_code = $county['state_code'];
            $selectedCounty->code = $county['code'];
            $selectedCounty->desc = $county['desc'];
            array_push($selected, $selectedCounty);
        }
        $user->counties()->saveMany($selected);

        return response()->json([
            'user' => $user,
            'agency' => $agency
        ]);
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
