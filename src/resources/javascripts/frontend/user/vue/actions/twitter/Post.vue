<template lang="pug">
    div
        div(class="w3-card w3-content w3-padding dashboard")
            div(class="w3-padding w3-text-white primary")
                i(class="fa fa-facebook-official" style="font-size:24px")
                | Create post for {{ twitterHandle }}
            p You may tweet up to 256 characters, or a link (in the format of http://www.example.com) in the message section.
            p If your link has the correct meta data, twitter will read it and display it in the tweet.
            p If you want to post a picture, you must include a message for it to appear on twitter.
            div(class="w3-row")
                div(class="w3-half")
                    Message(
                        :label="'Post Content'"
                        :value="message"
                        :valid="messageValid"
                        @setValue="(value) => $store.commit('setMessage', value)")
                    File(
                        :label="'Upload File'"
                        :valid="fileValid"
                        @setFile="(value) => $store.commit('setFile', value)")
                    button(class="w3-button w3-text-white secondary"
                        @click="post()") Post
            Errors(
                v-if="errors.length"
                :errors="errors")
</template>

<script>
    export default {
        computed: {
            twitterHandle() {
                return this.$store.state.recent.twitter_handle;
            },
            link() {
                return this.$store.state.post.link;
            },
            linkValid() {
                return this.link != '' && this.link != null;
            },
            message() {
                return this.$store.state.post.message;
            },
            messageValid() {
                return this.message != '' && this.message != null;
            },
            file() {
                return this.$store.state.post.file;
            },
            fileValid() {
                return this.file != '' && this.file != null;
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
                form.append('file', this.file);

                this.$store.commit('serviceLoading');
                axios.post('/api/twitter/post', form, {
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
