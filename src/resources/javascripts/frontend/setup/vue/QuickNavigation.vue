<template lang="pug">
    div(class="w3-row w3-center form")
        div(
            :class="[{ 'primary': isActive('agency') }, { 'w3-text-white': isActive('agency') }, 'w3-quarter', 'w3-card', 'w3-padding']"
            @click="$router.push({ name: 'Agency' })") Agency
        div(
            :class="[{ 'primary': isActive('location') }, { 'w3-text-white': isActive('location') }, 'w3-quarter', 'w3-card', 'w3-padding']"
            @click="$router.push({ name: 'Location' })") Location
        div(
            :class="[{ 'primary': isActive('coverages') },{ 'w3-text-white': isActive('coverages') }, 'w3-quarter', 'w3-card', 'w3-padding']"
            @click="$router.push({ name: 'Coverages' })") Coverages
        div(
            :class="[{ 'primary': isActive('outreach') },{ 'w3-text-white': isActive('outreach') }, 'w3-quarter', 'w3-card', 'w3-padding']"
            @click="$router.push({ name: 'Outreach' })") Outreach
</template>

<script>
    export default {
        methods: {
            isActive(route) {
                return this.$route.path == `/${ route }`;
            }
        }
    }
</script>
