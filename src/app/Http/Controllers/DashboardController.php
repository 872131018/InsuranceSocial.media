<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

use Facebook\Facebook;

use Abraham\TwitterOAuth\TwitterOAuth;

use Carbon\Carbon;

use App\FacebookAccount;

use App\FacebookPerformance;

use App\FacebookInteraction;

use App\TwitterPerformance;

use App\TwitterInteraction;

use Illuminate\Support\Facades\Log;

class DashboardController extends Controller
{

    protected $facebook;

    protected $twitter;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->facebook = new Facebook([
            'app_id' => env('APP_ID'),
            'app_secret' => env('APP_SECRET'),
            'default_graph_version' => env('DEFAULT_GRAPH_VERSION')
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexFacebookPerformance(Request $request)
    {
        $user = Auth::user();
        $this->facebook->setDefaultAccessToken($user->facebook->access_token);

        try {
            $start = Carbon::today()->toDateString();
            $end = Carbon::today()->subDays(strval($request->input('range')))->toDateString();
            $params = '?since='.$end.'&until='.$start;

            $batch = [
                'reach' => $this->facebook->request('GET', '/'.$user->facebook->page_id.'/insights/page_impressions/day'.$params),
                'clicks' => $this->facebook->request('GET', '/'.$user->facebook->page_id.'/insights/page_consumptions/day'.$params),
                'likes_shares_comments' => $this->facebook->request('GET', '/'.$user->facebook->page_id.'/insights/page_positive_feedback_by_type/day'.$params),
                'engagement' => $this->facebook->request('GET', '/'.$user->facebook->page_id.'/insights/page_post_engagements/day'.$params)
            ];
            $responses = $this->facebook->sendBatchRequest($batch);
        } catch(Facebook\Exceptions\FacebookResponseException $e) {
            return response()->json($e->getMessage(), 502);
        } catch(Facebook\Exceptions\FacebookSDKException $e) {
            return response()->json($e->getMessage(), 502);
        }
        $responses = json_decode($responses->getBody());

        $facebook = [
            'reach' => 0,
            'clicks' => 0,
            'likes' => 0,
            'shares' => 0,
            'comments' => 0,
            'engagement' => 0
        ];
        /*
        * REACH
        */
        $data = json_decode($responses[0]->body);
        if(isset($data->data[0]->values)) {
            foreach($data->data[0]->values as $value) {
                $facebook['reach'] += $value->value;
            }
        }
        /*
        * CLICKS
        */
        $data = json_decode($responses[1]->body);
        if(isset($data->data[0]->values)) {
            foreach($data->data[0]->values as $value) {
                $facebook['clicks'] += $value->value;
            }
        }
        /*
        * LIKES, SHARES, COMMENTS
        */
        $data = json_decode($responses[2]->body);
        if(isset($data->data[0]->values)) {
            foreach($data->data[0]->values as $value) {
                $facebook['likes'] += $value->value->like;
                $facebook['shares'] += $value->value->link;
                $facebook['comments'] += $value->value->comment;
            }
        }
        /*
        * ENGAGEMENT
        */
        $data = json_decode($responses[3]->body);
        if(isset($data->data[0]->values)) {
            foreach($data->data[0]->values as $value) {
                $facebook['engagement'] += $value->value;
            }
        }

        try {

            $start = Carbon::today()->subDays(strval($request->input('range')))->toDateString();
            $end = Carbon::today()->subDays(strval($request->input('range')) * 2)->toDateString();
            $params = '?since='.$end.'&until='.$start;

            $batch = [
                'reach' => $this->facebook->request('GET', '/'.$user->facebook->page_id.'/insights/page_impressions/day'.$params),
                'clicks' => $this->facebook->request('GET', '/'.$user->facebook->page_id.'/insights/page_consumptions/day'.$params),
                'likes_shares_comments' => $this->facebook->request('GET', '/'.$user->facebook->page_id.'/insights/page_positive_feedback_by_type/day'.$params),
                'engagement' => $this->facebook->request('GET', '/'.$user->facebook->page_id.'/insights/page_post_engagements/day'.$params)
            ];
            $responses = $this->facebook->sendBatchRequest($batch);
        } catch(Facebook\Exceptions\FacebookResponseException $e) {
            return response()->json($e->getMessage(), 502);
        } catch(Facebook\Exceptions\FacebookSDKException $e) {
            return response()->json($e->getMessage(), 502);
        }
        $responses = json_decode($responses->getBody());

        $facebook_baseline = [
            'reach' => 0,
            'clicks' => 0,
            'likes' => 0,
            'shares' => 0,
            'comments' => 0,
            'engagement' => 0
        ];
        /*
        * REACH
        */
        $data = json_decode($responses[0]->body);
        if(isset($data->data[0]->values)) {
            foreach($data->data[0]->values as $value) {
                $facebook_baseline['reach'] += $value->value;
            }
        }
        /*
        * CLICKS
        */
        $data = json_decode($responses[1]->body);
        if(isset($data->data[0]->values)) {
            foreach($data->data[0]->values as $value) {
                $facebook_baseline['clicks'] += $value->value;
            }
        }
        /*
        * LIKES, SHARES, COMMENTS
        */
        $data = json_decode($responses[2]->body);
        if(isset($data->data[0]->values)) {
            foreach($data->data[0]->values as $value) {
                $facebook_baseline['likes'] += $value->value->like;
                $facebook_baseline['shares'] += $value->value->link;
                $facebook_baseline['comments'] += $value->value->comment;
            }
        }
        /*
        * ENGAGEMENT
        */
        $data = json_decode($responses[3]->body);
        if(isset($data->data[0]->values)) {
            foreach($data->data[0]->values as $value) {
                $facebook_baseline['engagement'] += $value->value;
            }
        }

        $facebook_percentages = [];
        if($facebook_baseline['reach'] == 0) {
            $facebook_percentages['reach'] = '+'.$facebook['reach'];
        } else {
            if(((($facebook['reach'] - $facebook_baseline['reach']) / $facebook_baseline['reach']) * 100) < 1 ) {
                $facebook_percentages['reach'] = '-%'.number_format(((($facebook['reach'] - $facebook_baseline['reach']) / $facebook_baseline['reach']) * 100) * -1, 2);
            } else {
                $facebook_percentages['reach'] = '+%'.number_format((($facebook['reach'] - $facebook_baseline['reach']) / $facebook_baseline['reach']) * 100, 2);
            }
        }
        if($facebook_baseline['clicks'] == 0) {
            $facebook_percentages['clicks'] = '+'.$facebook['clicks'];
        } else {
            if(((($facebook['clicks'] - $facebook_baseline['clicks']) / $facebook_baseline['clicks']) * 100) < 1) {
                $facebook_percentages['clicks'] = '-%'.number_format(((($facebook['clicks'] - $facebook_baseline['clicks']) / $facebook_baseline['clicks']) * 100) * -1, 2);
            } else {
                $facebook_percentages['clicks'] = '+%'.number_format((($facebook['clicks'] - $facebook_baseline['clicks']) / $facebook_baseline['clicks']) * 100, 2);
            }
        }
        if($facebook_baseline['likes'] == 0) {
            $facebook_percentages['likes'] = '+'.$facebook['likes'];
        } else {
            if(((($facebook['likes'] - $facebook_baseline['likes']) / $facebook_baseline['likes']) * 100) < 1) {
                $facebook_percentages['likes'] = '-%'.number_format(((($facebook['likes'] - $facebook_baseline['likes']) / $facebook_baseline['likes']) * 100) * -1, 2);
            } else {
                $facebook_percentages['likes'] = '+%'.number_format((($facebook['likes'] - $facebook_baseline['likes']) / $facebook_baseline['likes']) * 100, 2);
            }
        }
        if($facebook_baseline['shares'] == 0) {
            $facebook_percentages['shares'] = '+'.$facebook['shares'];
        } else {
            if(((($facebook['shares'] - $facebook_baseline['shares']) / $facebook_baseline['shares']) * 100) < 1) {
                $facebook_percentages['shares'] = '-%'.number_format(((($facebook['shares'] - $facebook_baseline['shares']) / $facebook_baseline['shares']) * 100) * -1, 2);
            } else {
                $facebook_percentages['shares'] = '+%'.number_format((($facebook['shares'] - $facebook_baseline['shares']) / $facebook_baseline['shares']) * 100, 2);
            }
        }
        if($facebook_baseline['comments'] == 0) {
            $facebook_percentages['comments'] = '+'.$facebook['comments'];
        } else {
            if(((($facebook['comments'] - $facebook_baseline['comments']) / $facebook_baseline['comments']) * 100) < 1) {
                $facebook_percentages['comments'] = '-%'.number_format(((($facebook['comments'] - $facebook_baseline['comments']) / $facebook_baseline['comments']) * 100) * -1, 2);
            } else {
                $facebook_percentages['comments'] = '+%'.number_format((($facebook['comments'] - $facebook_baseline['comments']) / $facebook_baseline['comments']) * 100, 2);
            }
        }
        if($facebook_baseline['engagement'] == 0) {
            $facebook_percentages['engagement'] = '+'.$facebook['engagement'];
        } else {
            if(((($facebook['engagement'] - $facebook_baseline['engagement']) / $facebook_baseline['engagement']) * 100) < 1) {
                $facebook_percentages['engagement'] = '-%'.number_format(((($facebook['engagement'] - $facebook_baseline['engagement']) / $facebook_baseline['engagement']) * 100) * -1, 2);
            } else {
                $facebook_percentages['engagement'] = '+%'.number_format((($facebook['engagement'] - $facebook_baseline['engagement']) / $facebook_baseline['engagement']) * 100, 2);
            }
        }

        $facebookPerformance = new FacebookPerformance();
        $facebookPerformance->email = $user->email;
        $facebookPerformance->range = $request->input('range');
        $facebookPerformance->reach = $facebook['reach'];
        $facebookPerformance->clicks = $facebook['clicks'];
        $facebookPerformance->likes = $facebook['likes'];
        $facebookPerformance->shares = $facebook['shares'];
        $facebookPerformance->comments = $facebook['comments'];
        $facebookPerformance->engagement = $facebook['engagement'];
        $facebookPerformance->baseline_reach = $facebook_baseline['reach'];
        $facebookPerformance->baseline_clicks = $facebook_baseline['clicks'];
        $facebookPerformance->baseline_likes = $facebook_baseline['likes'];
        $facebookPerformance->baseline_shares = $facebook_baseline['shares'];
        $facebookPerformance->baseline_comments = $facebook_baseline['comments'];
        $facebookPerformance->baseline_engagement = $facebook_baseline['engagement'];
        $facebookPerformance->reach_percentage = $facebook_percentages['reach'];
        $facebookPerformance->clicks_percentage = $facebook_percentages['clicks'];
        $facebookPerformance->likes_percentage = $facebook_percentages['likes'];
        $facebookPerformance->shares_percentage = $facebook_percentages['shares'];
        $facebookPerformance->comments_percentage = $facebook_percentages['comments'];
        $facebookPerformance->engagement_percentage = $facebook_percentages['engagement'];
        $user->facebookPerformance()->save($facebookPerformance);

        return response()->json($facebookPerformance);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexTwitterPerformance(Request $request)
    {
        $user = Auth::user();
        $twitter = [
            'followers' => 0,
            'retweets' => 0,
            'favorites' => 0,
            'mentions' => 0
        ];
        $twitter_baseline = [
            'retweets' => 0,
            'favorites' => 0,
            'mentions' => 0
        ];
        $max_id = 0;
        $twitter_percentages = [
            'retweets' => 0,
            'favorites' => 0,
            'mentions' => 0
        ];

        $this->twitter = new TwitterOAuth(
            env('CONSUMER_KEY'),
            env('CONSUMER_SECRET'),
            $user->twitter->access_token,
            $user->twitter->secret_token
        );

        try {
            $response = $this->twitter->get('users/show', [
                'screen_name' => $user->twitter->screen_name,
                'user_id' => $user->facebook->twitter_id
            ]);
        } catch(Exception $e) {
            return response()->json($e->getMessage(), 502);
        }
        $twitter['followers'] = $response->followers_count;

        try {
            $response = $this->twitter->get('statuses/user_timeline', [
                'screen_name' => $user->twitter->screen_name,
                'user_id' => $user->facebook->twitter_id,
                'count' => $request->input('range'),
            ]);
        } catch(Exception $e) {
            return response()->json($e->getMessage(), 502);
        }

        foreach ($response as $key => $value) {
            $twitter['retweets'] += $value->retweet_count;
            $twitter['favorites'] += $value->favorite_count;
            $twitter['mentions'] += count($value->entities->user_mentions);
        }

        $max_id = $response[count($response) - 1]->id;
        try {
            $response = $this->twitter->get('statuses/user_timeline', [
                'screen_name' => $user->twitter->screen_name,
                'user_id' => $user->facebook->twitter_id,
                'count' => $request->input('twitter'),
                'max_id' => $max_id
            ]);
        } catch(Exception $e) {
            return response()->json($e->getMessage(), 502);
        }

        foreach ($response as $key => $value) {
            $twitter_baseline['retweets'] += $value->retweet_count;
            $twitter_baseline['favorites'] += $value->favorite_count;
            $twitter_baseline['mentions'] += count($value->entities->user_mentions);
        }

        if($twitter_baseline['retweets'] == 0) {
            $twitter_percentages['retweets'] = '+'.$twitter['retweets'];
        } else {
            if(((($twitter['retweets'] - $twitter_baseline['retweets']) / $twitter_baseline['retweets']) * 100) < 1) {
                $twitter_percentages['retweets'] = '- %'.number_format(((($twitter['retweets'] - $twitter_baseline['retweets']) / $twitter_baseline['retweets']) * 100) * -1, 2);
            } else {
                $twitter_percentages['retweets'] = '+ %'.number_format((($twitter['retweets'] - $twitter_baseline['retweets']) / $twitter_baseline['retweets']) * 100, 2);
            }
        }
        if($twitter_baseline['favorites'] == 0) {
            $twitter_percentages['favorites'] = '+'.$twitter['favorites'];
        } else {
            if(((($twitter['favorites'] - $twitter_baseline['favorites']) / $twitter_baseline['favorites']) * 100) < 1) {
                $twitter_percentages['favorites'] = '- %'.number_format(((($twitter['favorites'] - $twitter_baseline['favorites']) / $twitter_baseline['favorites']) * 100) * -1, 2);
            } else {
                $twitter_percentages['favorites'] = '+ %'.number_format((($twitter['favorites'] - $twitter_baseline['favorites']) / $twitter_baseline['favorites']) * 100, 2);
            }
        }
        if($twitter_baseline['mentions'] == 0) {
            $twitter_percentages['mentions'] = '+'.$twitter['mentions'];
        } else {
            if(((($twitter['mentions'] - $twitter_baseline['mentions']) / $twitter_baseline['mentions']) * 100) < 1) {
                $twitter_percentages['mentions'] = '- %'.number_format(((($twitter['mentions'] - $twitter_baseline['mentions']) / $twitter_baseline['mentions']) * 100) * -1, 2);
            } else {
                $twitter_percentages['mentions'] = '+ %'.number_format((($twitter['mentions'] - $twitter_baseline['mentions']) / $twitter_baseline['mentions']) * 100, 2);
            }
        }

        $twitterPerformance = new TwitterPerformance();
        $twitterPerformance->email = $user->email;
        $twitterPerformance->range = $request->input('range');
        $twitterPerformance->followers = $twitter['followers'];
        $twitterPerformance->retweets = $twitter['retweets'];
        $twitterPerformance->favorites = $twitter['favorites'];
        $twitterPerformance->mentions = $twitter['mentions'];
        $twitterPerformance->baseline_retweets = $twitter_baseline['retweets'];
        $twitterPerformance->baseline_favorites = $twitter_baseline['favorites'];
        $twitterPerformance->baseline_mentions = $twitter_baseline['mentions'];
        $twitterPerformance->retweets_percentage = $twitter_percentages['retweets'];
        $twitterPerformance->favorites_percentage = $twitter_percentages['favorites'];
        $twitterPerformance->mentions_percentage = $twitter_percentages['mentions'];
        $user->twitterPerformance()->save($twitterPerformance);

        return response()->json($twitterPerformance);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexFacebookInteraction(Request $request)
    {
        $user = Auth::user();
        $this->facebook->setDefaultAccessToken($user->facebook->access_token);

        try {
            $start = Carbon::today()->toDateString();
            $end = Carbon::today()->subDays(strval($request->input('range')))->toDateString();
            $params = '?since='.$end.'&until='.$start;

            $batch = [
                'reach' => $this->facebook->request('GET', '/'.$user->facebook->page_id.'/insights/page_impressions/day'.$params),
                'engagement' => $this->facebook->request('GET', '/'.$user->facebook->page_id.'/insights/page_post_engagements/day'.$params)
            ];
            $responses = $this->facebook->sendBatchRequest($batch);
        } catch(Facebook\Exceptions\FacebookResponseException $e) {
            return response()->json($e->getMessage(), 502);
        } catch(Facebook\Exceptions\FacebookSDKException $e) {
            return response()->json($e->getMessage(), 502);
        }
        $responses = json_decode($responses->getBody());

        $interaction = [
            'reach_labels' => [],
            'reach_series' => [],
            'engagement_labels' => [],
            'engagement_series' => []
        ];
        /*
        * REACH
        */
        $data = json_decode($responses[0]->body);
        if(isset($data->data[0]->values)) {
            foreach($data->data[0]->values as $value) {
                array_push($interaction['reach_labels'], substr($value->end_time, 0, 10));
                array_push($interaction['reach_series'], $value->value);
            }
        }
        /*
        * ENGAGEMENT
        */
        $data = json_decode($responses[1]->body);
        if(isset($data->data[0]->values)) {
            foreach($data->data[0]->values as $value) {
                array_push($interaction['engagement_labels'], substr($value->end_time, 0, 10));
                array_push($interaction['engagement_series'], $value->value);
            }
        }

        $facebookInteraction = new FacebookInteraction();
        $facebookInteraction->email = $user->email;
        $facebookInteraction->range = $request->input('range');
        $facebookInteraction->reach_labels = json_encode($interaction['reach_labels']);
        $facebookInteraction->reach_series = json_encode($interaction['reach_series']);
        $facebookInteraction->engagement_labels = json_encode($interaction['engagement_labels']);
        $facebookInteraction->engagement_series = json_encode($interaction['engagement_series']);
        $user->facebookInteraction()->save($facebookInteraction);

        return response()->json($facebookInteraction);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexTwitterInteraction(Request $request)
    {
        $user = Auth::user();

        $this->twitter = new TwitterOAuth(
            env('CONSUMER_KEY'),
            env('CONSUMER_SECRET'),
            $user->twitter->access_token,
            $user->twitter->secret_token
        );

        $interaction = [
            'retweet_labels' => [],
            'retweet_series' => [],
            'favorite_labels' => [],
            'favorite_series' => [],
            'mention_labels' => [],
            'mention_series' => [],
        ];

        try {
            $response = $this->twitter->get('statuses/user_timeline', [
                'screen_name' => $user->twitter->screen_name,
                'user_id' => $user->facebook->twitter_id,
                'count' => $request->input('range'),
            ]);
        } catch(Exception $e) {
            return response()->json($e->getMessage(), 502);
        }

        foreach ($response as $key => $value) {
            array_push($interaction['retweet_labels'], $value->created_at);
            array_push($interaction['retweet_series'], $value->retweet_count);
            array_push($interaction['favorite_labels'], $value->created_at);
            array_push($interaction['favorite_series'], $value->favorite_count);
            array_push($interaction['mention_labels'], $value->created_at);
            array_push($interaction['mention_series'], count($value->entities->user_mentions));
        }

        $twitterInteraction = new TwitterInteraction();
        $twitterInteraction->email = $user->email;
        $twitterInteraction->range = $request->input('range');
        $twitterInteraction->retweet_labels = json_encode($interaction['retweet_labels']);
        $twitterInteraction->retweet_series = json_encode($interaction['retweet_series']);
        $twitterInteraction->favorite_labels = json_encode($interaction['favorite_labels']);
        $twitterInteraction->favorite_series = json_encode($interaction['favorite_series']);
        $twitterInteraction->mention_labels = json_encode($interaction['mention_labels']);
        $twitterInteraction->mention_series = json_encode($interaction['mention_series']);
        $user->twitterInteraction()->save($twitterInteraction);

        return response()->json($twitterInteraction);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexFacebookPosts(Request $request)
    {
        $user = Auth::user();
        $this->facebook->setDefaultAccessToken($user->facebook->access_token);
        $posts = [];
        /**
        * POSTS
        */
        try {
            $batch = [
                'posts' => $this->facebook->request('GET', '/'.$user->facebook->page_id.'/posts')
            ];
            $responses = $this->facebook->sendBatchRequest($batch);
        } catch(Facebook\Exceptions\FacebookResponseException $e) {
            return response()->json($e->getMessage(), 502);
        } catch(Facebook\Exceptions\FacebookSDKException $e) {
            return response()->json($e->getMessage(), 502);
        }
        $responses = json_decode($responses->getBody());
        /*
        * REACTIONS
        */
        $data = json_decode($responses[0]->body);
        foreach($data->data as $post) {
            try {
                $batch = [
                    'reactions' => $this->facebook->request('GET', '/'.$post->id.'/insights/post_reactions_by_type_total')
                ];
                $responses = $this->facebook->sendBatchRequest($batch);
            } catch(Facebook\Exceptions\FacebookResponseException $e) {
                return response()->json($e->getMessage(), 502);
            } catch(Facebook\Exceptions\FacebookSDKException $e) {
                return response()->json($e->getMessage(), 502);
            }
            $responses = json_decode($responses->getBody());
            $post_reactions = json_decode($responses[0]->body);
            if(!isset($post->message)) {
                continue;
            }
            if(isset($post_reactions->data[0]->values[0]->value)) {
                $reactions = 0;
                $reactions += $post_reactions->data[0]->values[0]->value->like;
                $reactions += $post_reactions->data[0]->values[0]->value->love;
                $reactions += $post_reactions->data[0]->values[0]->value->wow;
                $reactions += $post_reactions->data[0]->values[0]->value->haha;
                $reactions += $post_reactions->data[0]->values[0]->value->sorry;
                $reactions += $post_reactions->data[0]->values[0]->value->anger;
                array_push($posts, [
                    'date' => explode('_', $post->created_time)[0],
                    'content' => $post->message,
                    'reactions' => $reactions
                ]);
            }
        }
        /**
        * POST SORT
        */
        usort($posts, function($a, $b) {
            return  $b['reactions'] - $a['reactions'];
        });
        $posts = array_slice($posts, 0, 5);

        return response()->json($posts);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexTwitterPosts(Request $request)
    {
        $user = Auth::user();
        $posts = [];
        /**
        * TWEETS
        */
        $this->twitter = new TwitterOAuth(
            env('CONSUMER_KEY'),
            env('CONSUMER_SECRET'),
            $user->twitter->access_token,
            $user->twitter->secret_token
        );

        try {
            $response = $this->twitter->get('statuses/user_timeline', [
                'screen_name' => $user->twitter->screen_name,
                'user_id' => $user->facebook->twitter_id,
                'count' => $request->input('range'),
            ]);
        } catch(Exception $e) {
            return response()->json($e->getMessage(), 502);
        }

        foreach ($response as $key => $value) {
            $RFM = 0;
            $RFM += $value->retweet_count;
            $RFM += $value->favorite_count;
            $RFM += count($value->entities->user_mentions);
            array_push($posts, [
                'date' => $value->created_at,
                'content' => $value->text,
                'rfm' => $RFM
            ]);
        }
        /**
        * POST SORT
        */
        usort($posts, function($a, $b) {
            return  $b['rfm'] - $a['rfm'];
        });
        $posts = array_slice($posts, 0, 5);

        return response()->json($posts);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexInsights(Request $request)
    {
        $user = Auth::user();
        $this->facebook->setDefaultAccessToken($user->facebook->access_token);

        try {
            $start = Carbon::today()->toDateString();
            $end = Carbon::today()->subDays(30)->toDateString();
            $params = '?since='.$end.'&until='.$start;

            $batch = [
                'mentions' => $this->facebook->request('GET', '/'.$user->facebook->page_id.'/insights/page_impressions_by_story_type/day'.$params),
                'page_suggestion_and_favorites' => $this->facebook->request('GET', '/'.$user->facebook->page_id.'/insights/page_fans_by_like_source/day'.$params),
                'likes' => $this->facebook->request('GET', '/'.$user->facebook->page_id.'/insights/page_fan_adds/day'.$params),
                'viral_impressions' => $this->facebook->request('GET', '/'.$user->facebook->page_id.'/insights/page_impressions_viral/day'.$params),
                'page_reactions ' => $this->facebook->request('GET', '/'.$user->facebook->page_id.'/insights/page_actions_post_reactions_total/day'.$params),
                'page_clicks' => $this->facebook->request('GET', '/'.$user->facebook->page_id.'/insights/page_consumptions/day'.$params)
            ];
            $responses = $this->facebook->sendBatchRequest($batch);
        } catch(Facebook\Exceptions\FacebookResponseException $e) {
            return response()->json($e->getMessage(), 502);
        } catch(Facebook\Exceptions\FacebookSDKException $e) {
            return response()->json($e->getMessage(), 502);
        }
        $responses = json_decode($responses->getBody());
        /*
        * SCORE
        */
        $score = [
            'mentions' => 0,
            'page_suggestion' => 0,
            'favorites' => 0,
            'likes' => 0,
            'viral_impressions' => 0,
            'page_reactions' => 0,
            'page_clicks' => 0,
            'positive_engagement' => 0,
            'engagement_greater_than'=> 0,
            'consistency' => 25,
            'quality' => 25
        ];
        /*
        * Mentions
        */
        $data = json_decode($responses[0]->body);
        $mentions = 0;
        if(isset($data->data[0]->values)) {
            foreach($data->data[0]->values as $value) {
                $mentions += $value->value->mention;
                if($mentions > 2) {
                    $score['mentions'] = 5;
                    break;
                }
            }
        }
        /*
        * Page Suggestion && Favorites
        */
        $data = json_decode($responses[1]->body);
        if(isset($data->data[0]->values)) {
            foreach($data->data[0]->values as $value) {
                if(isset($value->page_suggestion)) {
                    $score['page_suggestion'] = 3;
                }
                if(isset($value->favorites)) {
                    $score['favorites'] = 2;
                    break;
                }
            }
        }
        /*
        * Likes
        */
        $data = json_decode($responses[2]->body);
        if(isset($data->data[0]->values)) {
            foreach($data->data[0]->values as $value) {
                if($value->value > 0) {
                    $score['likes'] = 2;
                    break;
                }
            }
        }
        /*
        * Viral Impressions
        */
        $data = json_decode($responses[3]->body);
        if(isset($data->data[0]->values)) {
            foreach($data->data[0]->values as $value) {
                if($value->value > 0) {
                    $score['viral_impressions'] = 1;
                    break;
                }
            }
        }
        /*
        * Page Reactions
        */
        $data = json_decode($responses[4]->body);
        $reactions = 0;
        if(isset($data->data[0]->values)) {
            foreach($data->data[0]->values as $value) {
                $reactions += $value->value->like;
                $reactions += $value->value->love;
                $reactions += $value->value->wow;
                if($reactions > 100) {
                    $score['page_reactions'] = 5;
                    break;
                }
            }
        }
        /*
        * Page Clicks
        */
        $data = json_decode($responses[5]->body);
        $clicks = 0;
        if(isset($data->data[0]->values)) {
            foreach($data->data[0]->values as $value) {
                $clicks += $value->value;
                if($value->value > 200) {
                    $score['page_clicks'] = 3;
                    break;
                }
            }
        }
        /**
        * TODO: figure out the post fan one
        */
        /**
        * All the Engagement stuff
        */
        try {
            $start = Carbon::today()->toDateString();
            $end = Carbon::today()->subDays(30)->toDateString();
            $params = '?since='.$end.'&until='.$start;
            $base_start = Carbon::today()->subDays(30)->toDateString();
            $base_end = Carbon::today()->subDays(60)->toDateString();
            $base_params = '?since='.$base_end.'&until='.$base_start;

            $batch = [
                'page_engagement_request' => $this->facebook->request('GET', '/'.$user->facebook->page_id.'/insights/page_post_engagements'.$params),
                'page_engagement_baseline_request' => $this->facebook->request('GET', '/'.$user->facebook->page_id.'/insights/page_post_engagements'.$base_params)
            ];
            $responses = $this->facebook->sendBatchRequest($batch);
        } catch(Facebook\Exceptions\FacebookResponseException $e) {
            return response()->json($e->getMessage(), 502);
        } catch(Facebook\Exceptions\FacebookSDKException $e) {
            return response()->json($e->getMessage(), 502);
        }
        $responses = json_decode($responses->getBody());
        /*
        * ENGAGEMENT
        */
        $data = json_decode($responses[0]->body);
        $engagement = 0;
        if(isset($data->data[0]->values)) {
            foreach($data->data[0]->values as $value) {
                $engagement += $value->value;
            }
        }

        $data = json_decode($responses[1]->body);
        $engagement_baseline = 0;
        if(isset($data->data[0]->values)) {
            foreach($data->data[0]->values as $value) {
                $engagement_baseline += $value->value;
            }
        }

        $engagement_percentage = 0;
        if($engagement_baseline == 0) {
            $engagement_percentage = $engagement;
        } else {
            $engagement_percentage = number_format((($engagement - $engagement_baseline) / $engagement_baseline) * 100, 2);
        }

        if($engagement_percentage > 0) {
            $score['positive_engagement'] = 3;
        }
        if($engagement_percentage > 0.5) {
            $score['engagement_greater_than'] = 5;
        }

        return response()->json($score);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, $id = 0)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
