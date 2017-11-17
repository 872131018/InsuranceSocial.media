<?php
use Illuminate\Database\Seeder;

class TempUserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json = File::get("database/data/temp_users.json");
        $data = json_decode($json, true);
        foreach ($data as $obj) {
            DB::table('temp_users')->insert($obj);
        }
    }
}
