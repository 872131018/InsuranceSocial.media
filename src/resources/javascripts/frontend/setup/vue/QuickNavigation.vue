<template>
    <div class="w3-row w3-center form">
        <div v-bind:class="[{ 'primary': isActive('profile') }, { 'w3-text-white': isActive('profile') }, 'w3-col', 'l3', 'm3', 's12', 'w3-card-2', 'w3-padding']"
            v-on:click="$emit('route', 'Profile')">Profile
        </div>
        <div v-bind:class="[{ 'primary': isActive('location') }, { 'w3-text-white': isActive('location') }, 'w3-col', 'l3', 'm3', 's12', 'w3-card-2', 'w3-padding']"
            v-on:click="$emit('route', 'Location')">Location
        </div>
        <div v-bind:class="[{ 'primary': isActive('coverage') },{ 'w3-text-white': isActive('coverage') }, 'w3-col', 'l3', 'm3', 's12', 'w3-card-2', 'w3-padding']"
            v-on:click="$emit('route', 'Coverage')">Coverage
        </div>
        <div v-bind:class="[{ 'primary': isActive('outreach') },{ 'w3-text-white': isActive('outreach') }, 'w3-col', 'l3', 'm3', 's12', 'w3-card-2', 'w3-padding']"
            v-on:click="$emit('route', 'Outreach')">Outreach
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            isActive(route) {
                return this.$route.path == `/setup/${ route }`;
            }
        }
    }
</script>
