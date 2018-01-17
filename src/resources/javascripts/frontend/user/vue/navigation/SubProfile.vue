<template lang="pug">
    div
        router-link(class="w3-bar-item w3-hover-white w3-right sub-header-link"
            :class="{ 'w3-white': selected == 'outreach' }"
            @click.native="$emit('setRoute', 'outreach')"
            :to="{ name: 'Outreach' }") Outreach
        router-link(class="w3-bar-item w3-hover-white w3-right sub-header-link"
            :class="{ 'w3-white': selected == 'coverages' }"
            @click.native="$emit('setRoute', 'coverages')"
            :to="{ name: 'Coverages' }") Coverages
        router-link(class="w3-bar-item w3-hover-white w3-right sub-header-link"
            :class="{ 'w3-white': selected == 'location' }"
            @click.native="$emit('setRoute', 'location')"
            :to="{ name: 'Location' }") Location
        router-link(class="w3-bar-item w3-hover-white w3-right sub-header-link"
            :class="{ 'w3-white': selected == 'agency' }"
            @click.native="$emit('setRoute', 'agency')"
            :to="{ name: 'Agency' }") Agency
        div(class="w3-bar-item w3-right sub-header-link") Edit Profile:
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
