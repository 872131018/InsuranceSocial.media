<template lang="pug">
    div
        router-link(class="w3-bar-item w3-button w3-hover-white w3-right sub-header-link"
            :to="{ name: 'LinkedInPost' }") Post Now
        router-link(class="w3-bar-item w3-button w3-hover-white w3-right sub-header-link"
            :to="{ name: 'LinkedInScheduledPosts' }") Scheduled Posts
        div(class="w3-bar-item w3-right sub-header-link") Actions For LinkedIn:
</template>

<script>
    export default {
        //
    }
</script>
