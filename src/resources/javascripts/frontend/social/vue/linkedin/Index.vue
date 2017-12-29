<template lang="pug">
    div(class="w3-card w3-padding form")
        h3 Link your LinkedIn Account
        h6 Do you have a LinkedIn account? If so, please log in to LinkedIn in order to recieve our LinkedIn services.
        input(class="v-align" type="radio" id="yes"
            :checked="selected"
            @change="$store.commit('setLinkedIn', true)")
        label(for="yes")
            span(class="w3-show-inline-block w3-margin v-align")
            | Yes
        input(class="v-align" type="radio" id="no"
            :checked="!selected"
            @change="$store.commit('setLinkedIn', false)")
        label(for="no")
            span(class="w3-show-inline-block w3-margin v-align")
            | No
        div(
            v-if="!selected")
            p Don’t have a LinkedIn account? Setting one up will take you about 30 seconds—and we can start posting to it right away.
            a(href="https://www.linkedin.com/m/login" target="_blank")
                h5 Click here to create your account.
        div(
            v-if="selected") Almost done.
        button(class="w3-button w3-text-white primary"
            @click="update()") Continue
    </div>
</template>

<script>
    export default {
        computed: {
            selected() {
                return this.$store.state.social.linkedIn;
            }
        },
        methods: {
            update() {
                if(this.selected) {
                    window.location = this.$store.state.redirect.linkedInUrl;
                } else {
                    window.location = '/twitter';
                }
            }
        }
    }
</script>
