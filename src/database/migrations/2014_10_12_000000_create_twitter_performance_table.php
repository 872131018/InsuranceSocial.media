<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTwitterPerformanceTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('twitter_performance', function (Blueprint $table) {
            $table->increments('id');
            $table->string('user_id');
            $table->string('email');
            $table->string('range');
            $table->string('followers');
            $table->string('retweets');
            $table->string('favorites');
            $table->string('mentions');
            $table->string('baseline_retweets');
            $table->string('baseline_favorites');
            $table->string('baseline_mentions');
            $table->string('retweets_percentage');
            $table->string('favorites_percentage');
            $table->string('mentions_percentage');
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
        Schema::dropIfExists('twitter_performance');
    }
}
