<?php
use Illuminate\Database\Seeder;

class SizesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json = File::get("database/data/sizes.json");
        $data = json_decode($json, true);
        foreach ($data as $obj) {
            DB::table('sizes')->insert($obj);
        }
    }
}
