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
        //$this->middleware('auth:api', ['except' => ['home'] ]);
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
     * check answers, grade user, and store the record
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function checkAnswer(Request $request)
    {
        $grade = 0;
        $answers = [];

        $answers[0] = request()->answer_one;
        $answers[1] = request()->answer_two;
        $answers[2] = request()->answer_three;
        $answers[3] = request()->correct_answer;

        for($i = 0; $i <= sizeof($answers); $i++){
            if($answers[$i] == $answers[3]){
                $grade++;
            }
        }

        $gradeInstance = new Grade();
        $gradeInstance->user_id = me();
        $gradeInstance->grade = $grade;
        $gradeInstance->save();

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
