<?php
use Illuminate\Database\Seeder;
class StatusTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('status')->insert([
            'code' => 'A',
            'description' => 'Active'
        ]);
        DB::table('status')->insert([
            'code' => 'I',
            'description' => 'Inactive'
        ]);
        DB::table('status')->insert([
            'code' => 'N',
            'description' => 'Registration Incomplete'
        ]);
        DB::table('status')->insert([
            'code' => 'T',
            'description' => 'Terminate'
        ]);
    }
}
