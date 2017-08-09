<template>
    <div class="progress">
        <div class="w3-section w3-light-gray">
            <div class="secondary w3-center w3-padding w3-text-white"
                v-bind:style="{ width: `${ progress }%`}">{{ progress }}%</div>
        </div>
        <div class="w3-section w3-row w3-center"
            v-if="progress >= 33 && progress < 67">
            <div class="secondary w3-col l4 m4 s12 w3-padding-large w3-text-white">Registration</div>
            <div class="primary w3-col l4 m4 s12 w3-padding-large w3-text-white">Social Media</div>
            <div class="primary w3-col l4 m4 s12 w3-padding-large w3-text-white">Profile</div>
        </div>
        <div class="w3-section w3-row w3-center"
            v-if="progress == 67">
            <div class="secondary w3-col l4 m4 s12 w3-padding-large w3-text-white">Registration</div>
            <div class="secondary w3-col l4 m4 s12 w3-padding-large w3-text-white">Social Media</div>
            <div class="primary w3-col l4 m4 s12 w3-padding-large w3-text-white">Profile</div>
        </div>
    </div>
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
