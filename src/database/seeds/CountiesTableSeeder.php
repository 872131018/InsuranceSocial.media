<?php
use Illuminate\Database\Seeder;

class CountiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json = File::get("database/data/counties.json");
        $data = json_decode($json, true);
        foreach ($data as $obj) {
            DB::table('counties')->insert($obj);
        }
    }
}
