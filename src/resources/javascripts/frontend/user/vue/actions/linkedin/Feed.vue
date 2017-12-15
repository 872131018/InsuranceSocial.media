<template lang="pug">
    div
        div(class="w3-card w3-content w3-padding dashboard")
            div(class="w3-padding w3-text-white primary")
                i(class="fa fa-twitter" style="font-size:24px")
                | @{{ twitterHandle }}
            div(class="w3-center w3-padding")
                a(id="twitter_timeline" class="twitter-timeline")
</template>

<script>
    export default {
        computed: {
            twitterHandle() {
                return this.$store.state.recent.twitter_handle;
            }
        },
        mounted() {
            this.feed();
        },
        updated() {
            this.feed();
        },
        methods: {
            feed() {
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
            }
        }
    }
</script>
