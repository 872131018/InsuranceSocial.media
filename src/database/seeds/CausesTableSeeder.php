<?php
use Illuminate\Database\Seeder;

class CausesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json = File::get("database/data/causes.json");
        $data = json_decode($json, true);
        foreach ($data as $obj) {
            DB::table('causes')->insert($obj);
        }
    }
}
