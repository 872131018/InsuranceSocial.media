<?php
use Illuminate\Database\Seeder;

class IndustriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json = File::get("database/data/industries.json");
        $data = json_decode($json, true);
        foreach ($data as $obj) {
            DB::table('industries')->insert($obj);
        }
    }
}
