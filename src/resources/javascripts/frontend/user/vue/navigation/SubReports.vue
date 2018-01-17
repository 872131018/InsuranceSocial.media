<template lang="pug">
    div
        //-
            router-link(class="w3-bar-item w3-hover-white w3-right sub-header-link"
                :to="{ name: 'LinkedInReport' }") LinkedIn
        router-link(class="w3-bar-item w3-hover-white w3-right sub-header-link"
            :class="{ 'w3-white': selected == 'twitterReport' }"
            @click.native="$emit('setRoute', 'twitterReport')"
            :to="{ name: 'ReportsTwitter' }") Twitter
        router-link(class="w3-bar-item w3-hover-white w3-right sub-header-link"
            :class="{ 'w3-white': selected == 'facebookReport' }"
            @click.native="$emit('setRoute', 'facebookReport')"
            :to="{ name: 'ReportsFacebook' }") Facebook
        div(class="w3-bar-item w3-right sub-header-link") View Reports For:
</template>

<script>
    export default {
        props: {
            selected: {
                type: String
            }
        }
    }
</script>
