<template lang="pug">
    div
        div(class="w3-card w3-padding dashboard")
            div(class="w3-row")
                div(class="w3-half w3-padding")
                    div(class="w3-padding w3-text-white primary")
                        b Welcome back {{ name }}
                    p Your current ISM score is {{ score }}.
                    p A score of at least 65 indicates social media success!
                    p A score of 80 or higher is social media rock start status!
                div(class="w3-half w3-padding")
                    div(class="w3-padding w3-text-white primary")
                        b Your ISM Score
                    div(class="bar-chart")
            div(class="w3-row")
                div(class="w3-half w3-padding")
                    div(class="w3-padding w3-text-white primary")
                        i(class="fa fa-facebook-official" style="font-size:24px")
                        | {{ facebookPage }}
                    div(class="w3-center w3-padding")
                        div(id="fb-root")
                        div(class="fb-post" data-width="auto"
                            v-for="post in facebookPosts"
                            :data-href="post.permalink_url")
                div(class="w3-half w3-padding")
                    div(class="w3-padding w3-text-white primary")
                        i(class="fa fa-twitter" style="font-size:24px")
                        | @{{ twitterHandle }}
                    div(class="w3-padding")
                        a(id="twitter_timeline" class="twitter-timeline")
</template>

<script>
    import Chartist from 'chartist';

    export default {
        computed: {
            name() {
                return this.$store.state.user.name;
            },
            score() {
                return this.$store.state.recent.score;
            },
            facebookPage() {
                return this.$store.state.recent.facebook_page;
            },
            twitterHandle() {
                return this.$store.state.recent.twitter_handle;
            },
            facebookPosts() {
                return this.$store.state.recent.facebook_posts;
            },
            twitterPosts() {
                return this.$store.state.recent.twitter_posts;
            },
            scoreLabels() {
                return this.$store.state.recent.scoreLabels;
            },
            scoreSeries() {
                return this.$store.state.recent.scoreSeries;
            }
        },
        mounted() {
            this.initialize();
        },
        updated() {
            this.initialize();
        },
        methods: {
            initialize() {
                if(this.facebookPage) {
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
                }
                if(this.twitterHandle) {
                    /* TWITTER STUFF */
                    twttr.widgets.createTimeline({
                        sourceType: "profile",
                        screenName: this.twitterHandle,
                    },
                        document.getElementById("twitter_timeline"), {
                            tweetLimit: 5,
                            chrome: 'noheader',
                        }
                    );
                }
                new Chartist.Bar('.bar-chart', {
                    labels: this.scoreLabels,
                    series: [
                        this.scoreSeries
                    ]
                }, {
                    low: 0,
                    high: 100
                });
            }
        }
    }
</script>
