<template lang="pug">
    div(class="w3-card w3-content dashboard")
        div(class="w3-row w3-margin-bottom w3-light-grey")
            h5(class="w3-text-white w3-padding-large secondary" style="margin:0") Your Success Score!
            div(class="w3-margin-left w3-margin-right w3-left" style="width:30%")
                div(class="w3-padding-large")
                    b Linked Accounts
                    div(class="w3-padding-16"
                        v-if="facebookPage")
                        i(class="fa fa-facebook-official w3-text-white w3-circle primary" style="font-size:24px;padding:8px")
                        | {{ facebookPage }}
                    div(class="w3-padding-16"
                        v-else)
                        i(class="fa fa-facebook-official w3-text-white w3-circle primary" style="font-size:24px;padding:8px")
                        i(class="fa fa-times w3-text-white w3-circle w3-red" style="font-size:24px;padding:8px")
                    div(class="w3-padding-16"
                        v-if="twitterHandle")
                        i(class="fa fa-twitter w3-text-white w3-circle primary" style="font-size:24px;padding:8px")
                        | @{{ twitterHandle }}
                    div(class="w3-padding-16"
                        v-else)
                        i(class="fa fa-twitter w3-text-white w3-circle primary" style="font-size:24px;padding:8px")
                        i(class="fa fa-times w3-text-white w3-circle w3-red" style="font-size:24px;padding:8px")
                    div(class="w3-padding-16"
                        v-if="linkedinEmail")
                        i(class="fa fa-linkedin w3-text-white w3-circle primary" style="font-size:24px;padding:8px")
                        | {{ linkedinEmail }}
                    div(class="w3-padding-16"
                        v-else)
                        i(class="fa fa-linkedin w3-text-white w3-circle primary" style="font-size:24px;padding:8px")
                        i(class="fa fa-times w3-text-white w3-circle w3-red" style="font-size:24px;padding:8px")
            div(class="w3-margin-left w3-margin-right w3-left" style="width:30%")
                div(class="w3-padding-large")
                    b Your ISM Score
                    div(id="gauge-chart" class="200x160px")
            div(class="w3-margin-left w3-margin-right w3-left" style="width:30%")
                div(style="position:relative;top:50px")
                    p 55+ means your social media is a SUCCESS!
                    p 80+ means youre a social media ROCKSTAR!
        div(class="w3-row")
            div(class="w3-light-grey w3-margin-left w3-margin-right w3-left" style="overflow:scroll;height:500px;width:30%")
                h5(class="w3-text-white w3-padding-large primary" style="margin:0") Current Facebook Feed
                div(class="w3-center w3-padding")
                    div(id="fb-root")
                    div(class="fb-post" data-width="auto"
                        v-for="post in facebookPosts"
                        :data-href="post.permalink_url")
            div(class="w3-light-grey w3-margin-left w3-margin-right w3-left" style="overflow:scroll;height:500px;width:30%")
                h5(class="w3-text-white w3-padding-large primary" style="margin:0") Current Twitter Feed
                div(class="w3-padding")
                    a(id="twitter_timeline" class="twitter-timeline")
            div(class="w3-light-grey w3-margin-left w3-margin-right w3-left" style="overflow:scroll;height:500px;width:30%")
                h5(class="w3-text-white w3-padding-large primary" style="margin:0") Current Linkedin Feed
                div(class="w3-padding")
                    div(class="w3-row w3-padding w3-margin w3-white"
                        v-for="post in linkedinPosts")
                        a(
                            :href="post.link")
                            img(class="w3-image"
                                :src="post.image_path")
                        div {{ post.content }}
</template>

<script>
    export default {
        computed: {
            score() {
                return this.$store.state.recent.score;
            },
            facebookPage() {
                return this.$store.state.recent.facebook_page;
            },
            twitterHandle() {
                return this.$store.state.recent.twitter_handle;
            },
            linkedinEmail() {
                return this.$store.state.recent.linkedin_email;
            },
            facebookPosts() {
                return this.$store.state.recent.facebook_posts;
            },
            twitterPosts() {
                return this.$store.state.recent.twitter_posts;
            },
            score() {
                return this.$store.state.recent.score;
            },
            linkedinPosts() {
                return this.$store.state.recent.linkedin_posts;
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
                if(this.facebookPage && this.twitterHandle) {
                    let gauge = new JustGage({
                        id: 'gauge-chart',
                        value: 61,
                        min: 0,
                        max: 100,
                        title: 'Visitors',
                        label: 'Score'
                    });
                }
            }
        }
    }
</script>
