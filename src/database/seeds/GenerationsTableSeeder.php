<?php
use Illuminate\Database\Seeder;

class GenerationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json = File::get("database/data/generations.json");
        $data = json_decode($json, true);
        foreach ($data as $obj) {
            DB::table('generations')->insert($obj);
        }
    }
}
