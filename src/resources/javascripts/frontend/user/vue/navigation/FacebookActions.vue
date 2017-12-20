<template lang="pug">
    div
        router-link(class="w3-bar-item w3-hover-white w3-right sub-header-link"
            :to="{ name: 'FacebookPost' }") Post Now
        //-
            router-link(class="w3-bar-item w3-hover-white w3-right sub-header-link"
                :to="{ name: 'FacebookSchedule' }") Scheduled Posts
        router-link(class="w3-bar-item w3-hover-white w3-right sub-header-link"
            :to="{ name: 'FacebookFeed' }") Home Feed
        div(class="w3-bar-item w3-right sub-header-link") Actions For Facebook:
</template>

<script>
    export default {
        //
    }
</script>
