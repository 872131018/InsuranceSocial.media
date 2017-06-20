<?php
use Illuminate\Database\Seeder;
class PlansTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('plans')->insert([
            'name' => 'Free Trial',
            'price' => '0.00',
            'tier' => '1',
            'features' => '["Insert free plan specifics here.","Insert free plan specifics here.","Insert free plan specifics here."]'
        ]);
        DB::table('plans')->insert([
            'name' => 'Essential Plan',
            'price' => '39.00',
            'tier' => '2',
            'features' => '["Facebook and Twitter account set-up, if necessary","6 posts\/week (3 each to Facebook and Twitter)","Personalized content, tailored to your community, interests, products and companies \u2013 edited for optimum engagement","Automatic notifications when friends or followers react to your posts","24\/7 access to analytics on your social media reach and engagement"]'
        ]);
        DB::table('plans')->insert([
            'name' => 'Standard Plan',
            'price' => '59.00',
            'tier' => '3',
            'features' => '["All the benefits of the Essential Plan","10 posts\/week (5 each to Facebook and Twitter)","PLUS, 4 email campaigns per year to help grow your Facebook and Twitter audience","Up to 1,500 names per campaign"]'
        ]);
        DB::table('plans')->insert([
            'name' => 'Concierge Plan',
            'price' => '399.00',
            'tier' => '4',
            'features' => '["Personal Account Concierge crafts unique posts and interacts with your friends and followers","Includes personal contact and consulting as we build your social media presence, relationships and engagement","4 email campaigns per year","Up to 5,000 names per campaign"]'
        ]);
        DB::table('plans')->insert([
            'name' => 'Enterprise Plan',
            'price' => 'Contact Us',
            'tier' => '5',
            'features' => '["Special pricing for agent groups","Turnkey launch, onboarding and account set-up tools","Enterprise Dashboard provides detailed, per-agent analytics","Agent training and webinars"]'
        ]);
    }
}
