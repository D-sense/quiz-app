<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Quiz;
use App\Grade;
use Auth;

class QuizController extends Controller
{

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
       // $this->middleware('auth:api', ['except' => ['home'] ]);
    }



    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function home()
    {
        // displays all users who have taken the quiz
        $participants = Grade::all();
        return response()->json($participants);
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storeAnswer(Request $request)
    {
        // stores grade for each quiz taken by a user

    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function checkAnswer(Request $request)
    {
        // stores grade for each quiz taken by a user
//        $grade = 0;
//
//        $answer[0] = request()->chosen_answer[0];
//        $answer[1] = request()->chosen_answer[1];
//        $answer[2] = request()->chosen_answer[2];
//        $answer[3] = request()->chosen_answer[3];
//
//        for($i = 0; $i <= $chosen_answer->length; $i++){
//            if($chosen_answer[i] == $answer[i]){
//                $grade++;
//            }
//        }

        return response()->json("Thank you for taking the test");

    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function displayQuiz()
    {
        // shows the questions
        $quizzes = Quiz::all();
        return response()->json($quizzes);
    }




}
