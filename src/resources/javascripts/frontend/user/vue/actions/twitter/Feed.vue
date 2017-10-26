<template>
    <div>
        <div class="w3-card-2 dashboard">
            <div class="w3-container w3-content w3-padding">
                <div class="w3-content">
                    <div class="w3-padding w3-margin w3-text-white primary">
                        <i class="fa fa-twitter" style="font-size:24px"></i>
                        <span>Feed for @{{ twitter_handle }}</span>
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
    import TwitterPosts from './TwitterPosts';

    export default {
        data() {
            return {
                twitter_handle: store.getState().RecentStore.twitter_handle,
            }
        },
        mounted() {
            if(this.twitter_handle) {
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
        },
        components: {
            TwitterPosts
        }
    }
</script>
