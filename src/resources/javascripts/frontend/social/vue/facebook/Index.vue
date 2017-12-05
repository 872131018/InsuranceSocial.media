<template lang="pug">
    div
        div(class="w3-card w3-padding form")
            h3 Link your Facebook
            p Do you have a corporate Facebook page you’d like us to post to, or do you need us to create a page for you?
            button(class="w3-button w3-margin-right w3-text-white primary"
                @click="facebookLogin()") Post to my page
            button(class="w3-button w3-margin-left w3-text-white primary"
                @click="$router.push({ name: 'Create' })") Create a new page
</template>

<script>
    export default {
        methods: {
            facebookLogin() {
                window.location = this.$store.state.redirect.facebookUrl;
            }
        }
    }
</script>
