<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTwitterAccountTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('twitter_account', function (Blueprint $table) {
            $table->increments('id');
            $table->string('user_id');
            $table->string('email');
            $table->string('access_token')->nullable();
            $table->string('secret_token')->nullable();
            $table->string('screen_name')->nullable();
            $table->string('twitter_id')->nullable();
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
        Schema::dropIfExists('twitter_account');
    }
}
