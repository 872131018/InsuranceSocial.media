<template>
    <div>
        <a class="w3-bar-item w3-button w3-hover-white header-logo">Insurance Social Media</a>
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
        <router-link class="w3-bar-item w3-button w3-hover-white w3-right header-link"
            v-bind:to="{ name: 'Dashboard'}">Dashboard
        </router-link>
    </div>
</template>

<script>
    export default {
        mounted() {
            //
        }
    }
</script>
