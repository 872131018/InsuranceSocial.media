<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

use App\SelectedCarrier;

class CoverageController extends Controller
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

            $selected = [];
            foreach ($request->input('carriers') as $carrier) {
                $selectedCarrier = new SelectedCarrier();
                $selectedCarrier->email = $user->email;
                $selectedCarrier->carrier_code = $carrier['code'];
                array_push($selected, $selectedCarrier);
            }
            $user->carriers()->saveMany($selected);


            $user->coverage_lines = json_encode($request->input('coverage_lines'));
            $user->coverage_targets = json_encode($request->input('coverage_targets'));
            $user->industry_currents = json_encode($request->input('industry_currents'));
            $user->industry_targets = json_encode($request->input('industry_targets'));
            $user->commercial_mix = $request->input('commercial_mix');
            $user->personal_mix = $request->input('personal_mix');
            $user->update();
            /*
            * Unscrub that data after its saved
            */
            $user->carriers = $request->input('carriers');
            $user->coverage_lines = $request->input('coverage_lines');
            $user->coverage_targets = $request->input('coverage_targets');
            $user->industry_currents = $request->input('industry_currents');
            $user->industry_targets = $request->input('industry_targets');
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
