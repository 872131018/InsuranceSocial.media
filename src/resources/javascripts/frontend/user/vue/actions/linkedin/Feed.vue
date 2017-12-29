<template lang="pug">
    div(class="w3-card w3-content w3-padding dashboard")
        div(class="w3-padding w3-text-white primary")
            i(class="fa fa-linkedin-square" style="font-size:24px")
            | @{{ twitterHandle }}
        div(class="w3-center w3-padding")
            a(id="twitter_timeline" class="twitter-timeline")
</template>

<script>
    export default {
        computed: {
            linkedIn() {
                //return this.$store.state.recent.twitter_handle;
                return 'LinkedIn Account Name';
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
                if(this.linkedIn) {
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
