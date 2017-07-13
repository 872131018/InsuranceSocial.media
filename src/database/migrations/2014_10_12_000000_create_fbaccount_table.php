<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFbAccountTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fbAccount', function (Blueprint $table) {
            $table->increments('id');
            $table->string('email')->unique();
            $table->string('access_token')->nullable();
            $table->string('pageId')->nullable();
            $table->string('pgName')->nullable();
            $table->string('pgToken')->nullable();
            $table->char('progress', 1)->nullable();
            $table->date('emailSentDt1')->nullable();
            $table->date('emailSentDt2')->nullable();
            $table->date('emailSentDt3')->nullable();
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
        Schema::dropIfExists('fbAccount');
    }
}
