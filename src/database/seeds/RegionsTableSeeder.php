<?php
use Illuminate\Database\Seeder;

class RegionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json = File::get("database/data/regions.json");
        $data = json_decode($json, true);
        foreach ($data as $obj) {
            DB::table('regions')->insert($obj);
        }
    }
}
