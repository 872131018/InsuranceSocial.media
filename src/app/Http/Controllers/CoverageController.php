<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

use App\SelectedCarrier;

use App\SelectedCommercialCoverage;

use App\SelectedCropCoverage;

use App\SelectedPersonalCoverage;

use App\SelectedBenefitCoverage;

use App\SelectedTargetCoverage;

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
        foreach($user->carriers as $carrier) {
            $carrier->delete();
        }
        foreach ($request->input('selected_carriers') as $carrier) {
            $selectedCarrier = new SelectedCarrier();
            $selectedCarrier->email = $user->email;
            $selectedCarrier->code = $carrier['code'];
            $selectedCarrier->desc = $carrier['desc'];
            array_push($selected, $selectedCarrier);
        }
        $user->carriers()->saveMany($selected);

        $selected = [];
        foreach($user->commercialCoverages as $coverage) {
            $coverage->delete();
        }
        foreach ($request->input('selected_commercial_coverages') as $coverage) {
            $selectedCoverage = new SelectedCommercialCoverage();
            $selectedCoverage->email = $user->email;
            $selectedCoverage->code = $coverage['code'];
            $selectedCoverage->desc = $coverage['desc'];
            array_push($selected, $selectedCoverage);
        }
        $user->commercialCoverages()->saveMany($selected);

        $selected = [];
        foreach($user->cropCoverages as $coverage) {
            $coverage->delete();
        }
        foreach ($request->input('selected_crop_coverages') as $coverage) {
            $selectedCoverage = new SelectedCropCoverage();
            $selectedCoverage->email = $user->email;
            $selectedCoverage->code = $coverage['code'];
            $selectedCoverage->desc = $coverage['desc'];
            array_push($selected, $selectedCoverage);
        }
        $user->cropCoverages()->saveMany($selected);

        $selected = [];
        foreach($user->personalCoverages as $coverage) {
            $coverage->delete();
        }
        foreach ($request->input('selected_personal_coverages') as $coverage) {
            $selectedCoverage = new SelectedPersonalCoverage();
            $selectedCoverage->email = $user->email;
            $selectedCoverage->code = $coverage['code'];
            $selectedCoverage->desc = $coverage['desc'];
            array_push($selected, $selectedCoverage);
        }
        $user->personalCoverages()->saveMany($selected);

        $selected = [];
        foreach($user->benefitCoverages as $coverage) {
            $coverage->delete();
        }
        foreach ($request->input('selected_benefit_coverages') as $coverage) {
            $selectedCoverage = new SelectedBenefitCoverage();
            $selectedCoverage->email = $user->email;
            $selectedCoverage->code = $coverage['code'];
            $selectedCoverage->desc = $coverage['desc'];
            array_push($selected, $selectedCoverage);
        }
        $user->benefitCoverages()->saveMany($selected);

        $selected = [];
        foreach($user->currentIndustries as $industry) {
            $industry->delete();
        }
        foreach ($request->input('selected_current_industries') as $industry) {
            $selectedIndustry = new SelectedCurrentIndustry();
            $selectedIndustry->email = $user->email;
            $selectedIndustry->code = $industry['code'];
            $selectedIndustry->desc = $industry['desc'];
            array_push($selected, $selectedIndustry);
        }
        $user->currentIndustries()->saveMany($selected);

        $selected = [];
        foreach($user->targetIndustries as $industry) {
            $industry->delete();
        }
        foreach ($request->input('selected_target_industries') as $industry) {
            $selectedIndustry = new SelectedTargetIndustry();
            $selectedIndustry->email = $user->email;
            $selectedIndustry->code = $industry['code'];
            $selectedIndustry->desc = $industry['desc'];
            array_push($selected, $selectedIndustry);
        }
        $user->targetIndustries()->saveMany($selected);

        $selected = [];
        foreach($user->targetCoverages as $coverage) {
            $coverage->delete();
        }
        foreach ($request->input('selected_target_coverages') as $coverage) {
            $selectedCoverage = new SelectedTargetCoverage();
            $selectedCoverage->email = $user->email;
            $selectedCoverage->code = $coverage['code'];
            $selectedCoverage->desc = $coverage['desc'];
            array_push($selected, $selectedCoverage);
        }
        $user->targetCoverages()->saveMany($selected);

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
