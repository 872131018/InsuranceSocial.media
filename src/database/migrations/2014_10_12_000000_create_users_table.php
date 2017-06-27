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
            $table->string('principle_name')->nullable();
            $table->string('principle_email')->nullable();
            $table->string('organization_name')->nullable();
            $table->string('website')->nullable();
            $table->string('staff_size')->nullable();
            $table->string('year_founded')->nullable();
            $table->string('multi_generation')->nullable();
            $table->string('notification_frequency')->nullable();
            $table->text('notify_method')->nullable();
            $table->string('address_1')->nullable();
            $table->string('address_2')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('zip')->nullable();
            $table->string('marketing_region')->nullable();
            $table->string('marketing_state')->nullable();
            $table->string('marketing_county')->nullable();
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
