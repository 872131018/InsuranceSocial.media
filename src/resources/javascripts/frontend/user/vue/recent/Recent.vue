<template>
    <div>
        <div class="w3-card-2 dashboard">
            <div class="w3-container w3-content w3-padding">
                <div class="w3-half w3-padding">
                    <div class="w3-padding w3-text-white primary">
                        <b>Welcome back {{ name }}</b>
                    </div>
                    <p>Your current ISM score is {{ score }}.</p>
                    <p>A score of at least 65 indicates social media success!</p>
                    <p>A score of 80 or higher is social media rock start status!</p>
                </div>
                <div class="w3-half w3-padding">
                    <div class="w3-padding w3-text-white primary">
                        <b>Your ISM Score</b>
                    </div>
                    <ISMScore
                        v-if="barLabels.length != 0 && barSeries.length != 0"
                        v-bind:labels="barLabels"
                        v-bind:series="barSeries">
                    </ISMScore>
                </div>
            </div>
            <div class="w3-container w3-content w3-padding">
                <div class="w3-half">
                    <div class="w3-padding w3-margin w3-text-white primary">
                        <i class="fa fa-facebook-official" style="font-size:24px"></i>
                        <span>{{ facebook_page }}</span>
                    </div>
                    <div class="w3-center w3-padding">
                        <FacebookPosts
                            v-bind:posts="facebook_posts">
                        </FacebookPosts>
                    </div>
                </div>
                <div class="w3-half">
                    <div class="w3-padding w3-margin w3-text-white primary">
                        <i class="fa fa-twitter" style="font-size:24px"></i>
                        <span>{{ twitter_handle }}</span>
                    </div>
                    <div class="w3-padding">
                        <TwitterPosts></TwitterPosts>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Chartist from 'chartist';
    import ISMScore from './ISMScore';
    import FacebookPosts from './FacebookPosts';
    import TwitterPosts from './TwitterPosts';

    export default {
        data() {
            return {
                name: store.getState().UserStore.name,
                score: 0,
                facebook_page: store.getState().RecentStore.facebook_page,
                twitter_handle: store.getState().RecentStore.twitter_handle,
                facebook_posts: store.getState().RecentStore.facebook_posts,
                barLabels: ['Your ISM Score', 'ISM Average'],
                barSeries: [],
            }
        },
        mounted() {
            if(this.facebook_page && this.twitter_handle) {
                /* FACEBOOK STUFF */
                window.fbAsyncInit = function() {
                    FB.init({
                      xfbml      : true,
                      version    : 'v2.10'
                    });
                  };
                  (function(d, s, id){
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) {return;}
                    js = d.createElement(s); js.id = id;
                    js.src = "//connect.facebook.net/en_US/sdk.js";
                    fjs.parentNode.insertBefore(js, fjs);
                  }(document, 'script', 'facebook-jssdk'));
                /* TWITTER STUFF */
                twttr.widgets.createTimeline({
                    sourceType: "profile",
                    screenName: this.twitter_handle,
                },
                    document.getElementById("twitter_timeline"), {
                        tweetLimit: 5,
                        chrome: 'noheader',
                    }
                );
            }
            axios.get('/api/dashboard/insights').then(response => {
                let score = 0;
                for(let key in response.data) {
                    score += response.data[key];
                }
                this.score = score;
                this.barSeries.push(score);
                this.barSeries.push(50);
            });
        },
        components: {
            ISMScore,
            FacebookPosts,
            TwitterPosts
        }
    }
</script>
