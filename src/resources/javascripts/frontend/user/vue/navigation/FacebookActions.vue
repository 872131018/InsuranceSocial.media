<template lang="pug">
    div
        router-link(class="w3-bar-item w3-hover-white w3-right sub-header-link"
            :class="{ 'w3-white': selected == 'facebookPost' }"
            @click.native="$emit('setRoute', 'facebookPost')"
            :to="{ name: 'FacebookPost' }") Post Now
        router-link(class="w3-bar-item w3-hover-white w3-right sub-header-link"
            :class="{ 'w3-white': selected == 'facebookFeed' }"
            @click.native="$emit('setRoute', 'facebookFeed')"
            :to="{ name: 'FacebookFeed' }") Home Feed

        //-
            router-link(class="w3-bar-item w3-hover-white w3-right sub-header-link"
                :to="{ name: 'FacebookSchedule' }") Scheduled Posts
        div(class="w3-bar-item w3-right sub-header-link") Actions For Facebook:
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
