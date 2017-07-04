<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('api_token', 60)->unique();
            $table->string('discount')->nullable();
            $table->text('plan')->nullable();
            $table->boolean('facebook')->nullable();
            $table->boolean('twitter')->nullable();
            $table->string('auth_code')->nullable();
            $table->string('transaction_id')->nullable();
            $table->string('phone')->nullable();
            $table->string('title')->nullable();
            $table->string('principal_name')->nullable();
            $table->string('principal_email')->nullable();
            $table->string('organization_name')->nullable();
            $table->string('website')->nullable();
            $table->string('staff_size')->nullable();
            $table->string('year_founded')->nullable();
            $table->string('multi_generation')->nullable();
            $table->string('notification_frequency')->nullable();
            $table->boolean('notify_email')->nullable();
            $table->boolean('notify_text')->nullable();
            $table->string('address_1')->nullable();
            $table->string('address_2')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('zip')->nullable();
            $table->text('marketing_regions')->nullable();
            $table->text('marketing_states')->nullable();
            $table->text('marketing_counties')->nullable();
            $table->text('carriers')->nullable();
            $table->text('coverage_lines')->nullable();
            $table->text('coverage_targets')->nullable();
            $table->text('industry_currents')->nullable();
            $table->text('industry_targets')->nullable();
            $table->string('commercial_mix')->nullable();
            $table->string('personal_mix')->nullable();
            $table->string('engagement_mix')->nullable();
            $table->string('engagement_tone')->nullable();
            $table->text('special_topics')->nullable();
            $table->text('causes')->nullable();
            $table->text('posting_days')->nullable();
            $table->string('posting_time')->nullable();
            $table->string('facebook_access_token')->nullable();
            $table->string('facebook_auth_code')->nullable();
            $table->string('facebook_transaction_id')->nullable();
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
