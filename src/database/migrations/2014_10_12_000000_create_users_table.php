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
            $table->string('password_clean');
            $table->char('status', 1)->nullable();
            $table->char('role', 1)->nullable();
            $table->string('phone')->nullable();
            $table->string('cell_phone')->nullable();
            $table->string('title_code')->nullable();
            $table->date('effective_date')->nullable();
            $table->date('expiration_date')->nullable();
            $table->string('code')->nullable();
            $table->string('termination_reason')->nullable();
            $table->text('termination_comment')->nullable();
            $table->string('customer_profile_id')->nullable();
            $table->string('customer_payment_profile_id')->nullable();
            $table->boolean('notify_email')->nullable();
            $table->boolean('notify_text')->nullable();
            $table->char('notify_frequency', 1)->nullable();
            $table->string('commercial_mix')->nullable();
            $table->string('personal_mix')->nullable();
            $table->string('api_token', 60)->unique();
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
