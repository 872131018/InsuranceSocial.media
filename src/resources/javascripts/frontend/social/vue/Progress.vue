<template lang="pug">
    div(class="progress")
        div(class="w3-section w3-light-gray")
            div(class="secondary w3-center w3-padding w3-text-white"
                :style="{ width: `${ progress }%`}") {{ progress }}%
        div(class="w3-section w3-center w3-text-white"
            v-if="progress >= 33 && progress < 67")
            div(class="secondary w3-third w3-padding-large") Registration
            div(class="primary w3-third w3-padding-large") Social Media
            div(class="primary w3-third w3-padding-large") Profile
        div(class="w3-section w3-center w3-text-white"
            v-if="progress == 67")
            div(class="secondary w3-third w3-padding-large") Registration
            div(class="secondary w3-third w3-padding-large") Social Media
            div(class="primary w3-third w3-padding-large") Profile
</template>

<script>
    export default {
        props: {
            progress: {
                type: Number,
                default: 33
            }
        }
    }
</script>
