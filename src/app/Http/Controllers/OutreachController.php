<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

use App\SelectedSpecialTopic;

use App\SelectedCause;

use App\Plan;

class OutreachController extends Controller
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
        $plan = $user->plan;
        $plan->engagement_mix = $request->input('engagement_mix');
        $plan->engagement_tone = $request->input('engagement_tone');
        $plan->time_code = $request->input('time_code');

        $days = $request->input('posting_days');
        foreach($days as $day) {
            switch($day['code']) {
                case 'sunday':
                    $plan->sunday = true;
                    break;
                case 'monday':
                    $plan->monday = true;
                    break;
                case 'tuesday':
                    $plan->tuesday = true;
                    break;
                case 'wednesday':
                    $plan->wednesday = true;
                    break;
                case 'thursday':
                    $plan->thursday = true;
                    break;
                case 'friday':
                    $plan->friday = true;
                    break;
                case 'saturday':
                    $plan->saturday = true;
                    break;
            }
        }
        $plan->update();

        $selected = [];
        foreach ($request->input('selected_special_topics') as $topic) {
            $selectedTopic = new SelectedSpecialTopic();
            $selectedTopic->email = $user->email;
            $selectedTopic->code = $topic['code'];
            $selectedTopic->desc = $topic['desc'];
            array_push($selected, $selectedTopic);
        }
        $user->specialTopics()->saveMany($selected);

        $selected = [];
        foreach ($request->input('selected_causes') as $cause) {
            $selectedCause = new selectedCause();
            $selectedCause->email = $user->email;
            $selectedCause->code = $cause['code'];
            $selectedCause->desc = $cause['desc'];
            array_push($selected, $selectedCause);
        }
        $user->causes()->saveMany($selected);

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
