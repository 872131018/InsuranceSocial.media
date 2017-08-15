<?php
use Illuminate\Database\Seeder;

class CarriersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json = File::get("database/data/carriers.json");
        $data = json_decode($json, true);
        foreach ($data as $obj) {
            DB::table('carriers')->insert($obj);
        }
    }
}
