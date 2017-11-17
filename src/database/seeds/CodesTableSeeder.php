<?php
use Illuminate\Database\Seeder;

class CodesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json = File::get("database/data/codes.json");
        $data = json_decode($json, true);
        foreach ($data as $obj) {
            DB::table('codes')->insert($obj);
        }
    }
}
