<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

use App\Agency;

class ProfileController extends Controller
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
        $user->phone = $request->input('phone');
        $user->title_code = $request->input('title_code');
        $user->notify_frequency = $request->input('notify_frequency');
        $user->notify_email = $request->input('notify_email');
        $user->notify_text = $request->input('notify_text');
        $user->update();

        $agency = new Agency();
        $agency->email = $user->email;
        $agency->principal_name = $request->input('principal_name');
        $agency->principal_email = $request->input('principal_email');
        $agency->name = $request->input('agency_name');
        $agency->website = $request->input('website');
        $agency->size = $request->input('size');
        $agency->established = $request->input('established');
        $agency->multigenerational = $request->input('multigenerational');
        $user->agency()->save($agency);

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
