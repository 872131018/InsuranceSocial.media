<?php
use Illuminate\Database\Seeder;

class FrequenciesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json = File::get("database/data/frequencies.json");
        $data = json_decode($json, true);
        foreach ($data as $obj) {
            DB::table('frequencies')->insert($obj);
        }
    }
}
