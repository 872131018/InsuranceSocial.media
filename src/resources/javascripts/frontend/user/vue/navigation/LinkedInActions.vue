<template lang="pug">
    div
        router-link(class="w3-bar-item w3-button w3-hover-white w3-right sub-header-link"
            :class="{ 'w3-white': selected == 'linkedinPost' }"
            @click.native="$emit('setRoute', 'linkedinPost')"
            :to="{ name: 'LinkedInPost' }") Post Now
        div(class="w3-bar-item w3-right sub-header-link") Actions For LinkedIn:
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
