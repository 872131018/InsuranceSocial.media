<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFacebookPerformanceTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('facebook_performance', function (Blueprint $table) {
            $table->increments('id');
            $table->string('user_id');
            $table->string('email');
            $table->string('range');
            $table->string('reach');
            $table->string('clicks');
            $table->string('likes');
            $table->string('shares');
            $table->string('comments');
            $table->string('engagement');
            $table->string('baseline_reach');
            $table->string('baseline_clicks');
            $table->string('baseline_likes');
            $table->string('baseline_shares');
            $table->string('baseline_comments');
            $table->string('baseline_engagement');
            $table->string('reach_percentage');
            $table->string('clicks_percentage');
            $table->string('likes_percentage');
            $table->string('shares_percentage');
            $table->string('comments_percentage');
            $table->string('engagement_percentage');
            /*
            $table->string('twitter_tweet_count');
            $table->string('twitter_followers');
            $table->string('twitter_retweets');
            $table->string('twitter_favorites');
            $table->string('twitter_mentions');
            $table->string('twitter_retweets_percentage');
            $table->string('twitter_favorites_percentage');
            $table->string('twitter_mentions_percentage');
            */
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
        Schema::dropIfExists('facebook_performance');
    }
}
