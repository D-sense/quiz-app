<?php

use Illuminate\Database\Seeder;
use App\Quiz;

class QuizzesTableSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Remove all existing record in Quiz table.
        Quiz::truncate();

        //obtaining faker object
        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 5; $i++) {
            DB::table('quizzes')->insert([
                'question' => $faker->paragraph,
                'answer_one' => $faker->randomNumber(),
                'answer_two' => $faker->randomNumber(),
                'answer_three' => $faker->randomNumber(),
                'correct_answer' => $faker->randomNumber(),
            ]);
        }

    }
}
