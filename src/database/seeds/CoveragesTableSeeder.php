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
        $json = File::get("database/data/coverages.json");
        $data = json_decode($json, true);
        foreach ($data as $obj) {
            DB::table('coverages')->insert($obj);
        }
    }
}
