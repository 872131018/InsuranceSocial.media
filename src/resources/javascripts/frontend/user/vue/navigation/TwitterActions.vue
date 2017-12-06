<template lang="pug">
    div
        router-link(class="w3-bar-item w3-hover-white w3-right sub-header-link"
            :to="{ name: 'TwitterPostNow' }") Post Now
        router-link(class="w3-bar-item w3-hover-white w3-right sub-header-link"
            v-bind:to="{ name: 'TwitterScheduledPosts' }") Scheduled Posts
        div(class="w3-bar-item w3-right sub-header-link") Actions For Twitter:
</template>

<script>
    export default {
        //
    }
</script>
