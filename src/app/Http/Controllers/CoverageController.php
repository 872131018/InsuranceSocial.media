<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

use App\SelectedCarrier;

use App\SelectedCommercialCoverage;

use App\SelectedPersonalCoverage;

use App\SelectedBenefitCoverage;

use App\SelectedCurrentIndustry;

use App\SelectedTargetIndustry;

class CoverageController extends Controller
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

        $selected = [];
        foreach ($request->input('carriers') as $carrier) {
            $selectedCarrier = new SelectedCarrier();
            $selectedCarrier->email = $user->email;
            $selectedCarrier->carrier_code = $carrier['code'];
            array_push($selected, $selectedCarrier);
        }
        $user->carriers()->saveMany($selected);

        $selected = [];
        foreach ($request->input('commercial_coverage_lines') as $coverage) {
            $selectedCoverage = new SelectedCommercialCoverage();
            $selectedCoverage->email = $user->email;
            $selectedCoverage->coverage_code = $coverage['code'];
            array_push($selected, $selectedCoverage);
        }
        $user->commercialCoverages()->saveMany($selected);

        $selected = [];
        foreach ($request->input('personal_coverage_lines') as $coverage) {
            $selectedCoverage = new SelectedPersonalCoverage();
            $selectedCoverage->email = $user->email;
            $selectedCoverage->coverage_code = $coverage['code'];
            array_push($selected, $selectedCoverage);
        }
        $user->personalCoverages()->saveMany($selected);

        $selected = [];
        foreach ($request->input('benefit_coverage_lines') as $coverage) {
            $selectedCoverage = new SelectedBenefitCoverage();
            $selectedCoverage->email = $user->email;
            $selectedCoverage->coverage_code = $coverage['code'];
            array_push($selected, $selectedCoverage);
        }
        $user->benefitCoverages()->saveMany($selected);

        $selected = [];
        foreach ($request->input('industry_currents') as $industry) {
            $selectedIndustry = new SelectedCurrentIndustry();
            $selectedIndustry->email = $user->email;
            $selectedIndustry->industry_code = $industry['code'];
            array_push($selected, $selectedIndustry);
        }
        $user->currentIndustries()->saveMany($selected);

        $selected = [];
        foreach ($request->input('industry_targets') as $industry) {
            $selectedIndustry = new SelectedTargetIndustry();
            $selectedIndustry->email = $user->email;
            $selectedIndustry->industry_code = $industry['code'];
            array_push($selected, $selectedIndustry);
        }
        $user->targetIndustries()->saveMany($selected);

        $user->commercial_mix = $request->input('commercial_mix');
        $user->personal_mix = $request->input('personal_mix');
        $user->update();

        return response()->json($user);
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
