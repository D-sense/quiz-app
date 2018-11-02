<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});


Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function () {
    Route::post('register', 'Auth\RegisterController@register');
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');

    Route::get('quiz', 'QuizController@displayQuiz');
    Route::post('submit_quiz', 'QuizController@checkAnswer');
    Route::get('home', 'QuizController@home');
});
