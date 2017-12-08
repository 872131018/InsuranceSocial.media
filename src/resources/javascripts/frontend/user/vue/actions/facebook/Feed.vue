<template lang="pug">
    div
        div(class="w3-card w3-content w3-padding dashboard")
            div(class="w3-padding w3-text-white primary")
                i(class="fa fa-facebook-official" style="font-size:24px")
                | {{ facebookPage }}
            div(class="w3-center w3-padding")
                div(id="fb-root")
                div(class="fb-post" data-width="auto"
                    v-for="post in facebookPosts"
                    :data-href="post.permalink_url")
</template>

<script>
    export default {
        computed: {
            facebookPage() {
                return this.$store.state.recent.facebook_page;
            },
            facebookPosts() {
                return this.$store.state.recent.facebook_posts;
            }
        },
        updated() {
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
        }
    }
</script>
