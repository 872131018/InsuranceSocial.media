<template lang="pug">
    div(class="w3-card w3-content w3-padding dashboard")
        div(class="w3-padding w3-text-white primary")
            i(class="fa fa-facebook-official" style="font-size:24px")
            | Create post for {{ facebookPage }}
        p You may upload a link or a photo with an optional message, or just a simple message.
        p Links must be a proper url for Facebook to accept (E.g. www.example.com, https://insurancesocial.media).
        p Facebook recommends photos smaller than 4mb for best results. Large images may be pixelated once posted.
        div(class="w3-row")
            div(class="w3-half")
                Field(
                    :label="'Link'"
                    :value="link"
                    :valid="linkValid"
                    @setValue="(value) => $store.commit('setLink', value)")
                File(
                    :label="'Upload File'"
                    :valid="fileValid"
                    @setFile="(value) => $store.commit('setFile', value)")
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
            facebookPage() {
                return this.$store.state.recent.facebook_page;
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
                form.append('link', this.link);
                form.append('file', this.file);

                this.$store.commit('serviceLoading');
                axios.post('/api/facebook/post', form, {
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
