<template>
    <div>
        <div class="w3-card-2 dashboard">
            <div class="w3-container w3-content w3-padding">
                <div class="w3-content">
                    <div class="w3-padding w3-margin w3-text-white primary">
                        <i class="fa fa-facebook-official" style="font-size:24px"></i>
                        <span>Home Feed for {{ facebook_page }}</span>
                    </div>
                    <div class="w3-center w3-padding">
                        <FacebookPosts
                            v-bind:posts="facebook_posts">
                        </FacebookPosts>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import FacebookPosts from './FacebookPosts';

    export default {
        data() {
            return {
                facebook_page: store.getState().RecentStore.facebook_page,
                facebook_posts: store.getState().RecentStore.facebook_posts,
            }
        },
        mounted() {
            if(this.facebook_page) {
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
        },
        components: {
            FacebookPosts
        }
    }
</script>
