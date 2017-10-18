<template>
    <div>
        <a class="w3-bar-item w3-button w3-hover-white header-logo">Insurance Social Media</a>
        <!--
        <router-link class="w3-bar-item w3-button w3-hover-white w3-right header-link"
            v-bind:to="{ name: 'Outreach' }">Outreach
        </router-link>
        <router-link class="w3-bar-item w3-button w3-hover-white w3-right header-link"
            v-bind:to="{ name: 'Coverage' }">Coverage
        </router-link>
        <router-link class="w3-bar-item w3-button w3-hover-white w3-right header-link"
            v-bind:to="{ name: 'Location' }">Location
        </router-link>
        <router-link class="w3-bar-item w3-button w3-hover-white w3-right header-link"
            v-bind:to="{ name: 'Profile' }">Profile
        </router-link>
    -->
        <div class="w3-bar-item w3-button w3-hover-white w3-right header-link"
            v-bind:class="{ 'w3-white': selected == 'tools' }"
            v-on:click="$emit('showTools')">Tools
        </div>
        <div class="w3-bar-item w3-button w3-hover-white w3-right header-link"
            v-bind:class="{ 'w3-white': selected == 'social' }"
            v-on:click="$emit('showSocialMedia')">Social Media
        </div>
        <div class="w3-bar-item w3-button w3-hover-white w3-right header-link"
            v-bind:class="{ 'w3-white': selected == 'reports' }"
            v-on:click="$emit('showReports')">Reports
        </div>
        <div class="w3-bar-item w3-button w3-hover-white w3-right header-link"
            v-bind:class="{ 'w3-white': selected == 'home' }"
            v-on:click="$emit('showHome')">Home
        </div>
    </div>
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
