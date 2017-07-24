<?php
use Illuminate\Database\Seeder;

class StatesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json = File::get("database/data/states.json");
        $data = json_decode($json, true);
        foreach ($data as $obj) {
            DB::table('states')->insert($obj);
        }
    }
}
