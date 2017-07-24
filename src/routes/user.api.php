<?php
use Illuminate\Http\Request;

use App\Region;

use App\State;

use App\County;

use App\Coverage;

use App\Industry;

use App\Cause;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/**
 * Deliver the registration SPA and handle posts
 *
 * @return \Illuminate\Http\Response
 */
 Route::get('/api/user', function (Request $request) {
     return response()->json(Auth::user());
 });

 Route::get('/api/agency', function (Request $request) {
     return response()->json(Auth::user()->agency);
 });
 Route::get('/api/regions', function (Request $request) {
     return response()->json(Region::all());
 });
 Route::get('/api/states', function (Request $request) {
     return response()->json(State::all());
 });
 Route::get('/api/counties', function (Request $request) {
     return response()->json(County::all());
 });
 Route::get('/api/coverages', function (Request $request) {
     return response()->json(Coverage::all());
 });
 Route::get('/api/industries', function (Request $request) {
     return response()->json(Industry::all());
 });
 Route::get('/api/causes', function (Request $request) {
     return response()->json(Cause::all());
 });
