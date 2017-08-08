<?php
use Illuminate\Database\Seeder;

class CoveragesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json = File::get("database/data/commercial_coverages.json");
        $data = json_decode($json, true);
        foreach ($data as $obj) {
            DB::table('commercial_coverages')->insert($obj);
        }

        $json = File::get("database/data/personal_coverages.json");
        $data = json_decode($json, true);
        foreach ($data as $obj) {
            DB::table('personal_coverages')->insert($obj);
        }

        $json = File::get("database/data/benefit_coverages.json");
        $data = json_decode($json, true);
        foreach ($data as $obj) {
            DB::table('benefit_coverages')->insert($obj);
        }
    }
}
