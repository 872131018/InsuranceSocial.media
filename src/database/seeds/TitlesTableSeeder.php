<?php
use Illuminate\Database\Seeder;

class TitlesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json = File::get("database/data/titles.json");
        $data = json_decode($json, true);
        foreach ($data as $obj) {
            DB::table('titles')->insert($obj);
        }
    }
}
