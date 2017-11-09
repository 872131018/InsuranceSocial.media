<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFacebookAccountTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('facebook_account', function (Blueprint $table) {
            $table->increments('id');
            $table->string('user_id');
            $table->string('email');
            $table->string('access_token')->nullable();
            $table->string('page_id')->nullable();
            $table->string('page_name')->nullable();
            $table->string('page_token')->nullable();
            $table->char('progress', 1)->nullable();
            $table->date('email_sent_date_1')->nullable();
            $table->date('email_sent_date_2')->nullable();
            $table->date('email_sent_date_3')->nullable();
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
        Schema::dropIfExists('facebook_account');
    }
}
