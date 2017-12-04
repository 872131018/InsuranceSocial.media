<template lang="pug">
    div
        div(class="w3-card w3-padding form")
            h3 Link your Twitter Account
            h6 Do you have a Twitter account? If so, please log in to Twitter in order to recieve our Twitter services.
            input(class="v-align" type="radio" id="yes"
                :checked="selected"
                @change="$store.commit('setTwitter', true)")
            label(for="yes")
                span(class="w3-show-inline-block w3-margin v-align")
                | Yes
            input(class="v-align" type="radio" id="no"
                :checked="!selected"
                @change="$store.commit('setTwitter', false)")
            label(for="no")
                span(class="w3-show-inline-block w3-margin v-align")
                | No
            div(
                v-if="!selected")
                p Don’t have a Twitter account? Setting one up will take you about 30 seconds—and we can start posting to it right away.
                a(href="https://twitter.com/signup" target="_blank")
                    h5 Click here to create your account.
            div(
                v-if="selected") Almost done.
            button(class="w3-button w3-text-white primary"
                @click="update()") Continue
</template>

<script>
    export default {
        computed: {
            selected() {
                return this.$store.state.twitter.has;
            }
        },
        methods: {
            update() {
                if(this.selected) {
                    window.location = this.$store.state.redirect.twitterUrl;
                } else {
                    window.location = '/profile';
                }
            }
        }
    }
</script>
