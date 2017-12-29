<template lang="pug">
    div(class="w3-card w3-content w3-padding dashboard")
        div(class="w3-padding w3-text-white primary")
            i(class="fa fa-linkedin-square" style="font-size:24px")
            | Create post for {{ linkedIn }}
        p You may post up to 700 characters which includes a link in the message section.
        p You must include a link in your post(in the format of http://example.com or www.insurancesocial.media).
        p LinkedIn will not accept a post without a link. If you try to post multiple links only the first will be analyzed by LinkedIn.
        div(class="w3-row")
            div(class="w3-half")
                Message(
                    :label="'Post Content'"
                    :value="message"
                    :valid="messageValid"
                    @setValue="(value) => $store.commit('setMessage', value)")
                button(class="w3-button w3-text-white secondary"
                    @click="post()") Post
        Errors(
            v-if="errors.length"
            :errors="errors")
</template>

<script>
    export default {
        computed: {
            linkedIn() {
                //return this.$store.state.recent.twitter_handle;
                return 'LinkedIn Account Name';
            },
            message() {
                return this.$store.state.post.message;
            },
            messageValid() {
                return this.message != '' && this.message != null;
            },
            errors() {
                return this.$store.state.errors.errors;
            }
        },
        methods: {
            post() {
                this.$store.commit('clearErrors');

                let form = new FormData();
                form.append('message', this.message);

                this.$store.commit('serviceLoading');
                axios.post('/api/linkedin/post', form, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                }).then(response => {
                    this.$store.commit('serviceFinished');
                }).catch(error => {
                    this.$store.commit('serviceFinished');
                    this.$store.commit('setError', 'An error has occured, please contact support.');
                });
            }
        }
    }
</script>
