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
        $plan->engagement_mix = $request->input('engagement_mix')['code'];
        $plan->engagement_tone = $request->input('engagement_tone')['code'];
        $plan->time_code = $request->input('posting_time')['code'];
        $plan->update();

        $selected = [];
        foreach ($request->input('special_topics') as $topic) {
            $selectedTopic = new SelectedSpecialTopic();
            $selectedTopic->email = $user->email;
            $selectedTopic->topic_code = $topic['code'];
            array_push($selected, $selectedTopic);
        }
        $user->specialTopics()->saveMany($selected);

        $selected = [];
        foreach ($request->input('causes') as $cause) {
            $selectedCause = new selectedCause();
            $selectedCause->email = $user->email;
            $selectedCause->cause_code = $cause['code'];
            array_push($selected, $selectedCause);
        }
        $user->causes()->saveMany($selected);

        foreach($request->input('posting_days') as $day) {
            switch($day) {
                case 'Sunday':
                    $user->plan->sunday = true;
                    break;
                case 'Monday':
                    $user->plan->monday = true;
                    break;
                case 'Tuesday':
                    $user->plan->tuesday = true;
                    break;
                case 'Wednesday':
                    $user->plan->wednesday = true;
                    break;
                case 'Thursday':
                    $user->plan->thursday = true;
                    break;
                case 'Friday':
                    $user->plan->friday = true;
                    break;
                case 'Saturday':
                    $user->plan->saturday = true;
                    break;
            }
        }

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
