<template lang="pug">
    div
        router-link(class="w3-bar-item w3-hover-white w3-right sub-header-link"
            :class="{ 'w3-white': selected == 'twitterPost' }"
            @click.native="$emit('setRoute', 'twitterPost')"
            :to="{ name: 'TwitterPost' }") Post Now
        router-link(class="w3-bar-item w3-hover-white w3-right sub-header-link"
            :class="{ 'w3-white': selected == 'twitterFeed' }"
            @click.native="$emit('setRoute', 'twitterFeed')"
            :to="{ name: 'TwitterFeed' }") Home Feed
        //-
            router-link(class="w3-bar-item w3-hover-white w3-right sub-header-link"
                :to="{ name: 'TwitterScheduledPosts' }") Scheduled Posts
        div(class="w3-bar-item w3-right sub-header-link") Actions For Twitter:
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
