<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        $this->call(PlansTableSeeder::class);
        $this->call(StatusTableSeeder::class);
        $this->call(RolesTableSeeder::class);
        $this->call(CausesTableSeeder::class);
        $this->call(CountiesTableSeeder::class);
        $this->call(CoveragesTableSeeder::class);
        $this->call(IndustriesTableSeeder::class);
        $this->call(RegionsTableSeeder::class);
        $this->call(StatesTableSeeder::class);
    }
}
