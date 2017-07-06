<template>
    <div class="progress">
        <div class="w3-section w3-row w3-center">
            <div class="primary w3-col l3 m3 s12 w3-padding w3-text-white w3-hover-shadow"
                v-on:click="$emit('route', 'Profile')">Profile</div>
            <div class="primary w3-col l3 m3 s12 w3-padding w3-text-white w3-hover-shadow"
                v-on:click="$emit('route', 'Location')">Location</div>
            <div class="primary w3-col l3 m3 s12 w3-padding w3-text-white w3-hover-shadow"
                v-on:click="$emit('route', 'Coverage')">Coverage</div>
            <div class="primary w3-col l3 m3 s12 w3-padding w3-text-white w3-hover-shadow"
                v-on:click="$emit('route', 'Outreach')">Outreach</div>
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
