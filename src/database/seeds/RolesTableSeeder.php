<?php
use Illuminate\Database\Seeder;
class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            'code' => 'A',
            'description' => 'Agent'
        ]);
        DB::table('roles')->insert([
            'code' => 'E',
            'description' => 'Employee'
        ]);
        DB::table('roles')->insert([
            'code' => 'I',
            'description' => 'IC Users'
        ]);
        DB::table('roles')->insert([
            'code' => 'S',
            'description' => 'Supervisors'
        ]);
    }
}
