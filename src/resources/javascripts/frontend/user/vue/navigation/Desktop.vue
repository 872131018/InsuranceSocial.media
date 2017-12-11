<template lang="pug">
    div
        div(class="w3-bar-item w3-button w3-hover-white header-logo") Insurance Social Media
        //-
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
        div(class="w3-bar-item w3-button w3-hover-white w3-right header-link"
            :class="{ 'w3-white': selected == 'tools' }"
            @click="$emit('showMenu', 'tools')") Tools
        div(class="w3-bar-item w3-button w3-hover-white w3-right header-link"
            :class="{ 'w3-white': selected == 'socialMedia' }"
            @click="$emit('showMenu', 'socialMedia')") Social Media
        div(class="w3-bar-item w3-button w3-hover-white w3-right header-link"
            :class="{ 'w3-white': selected == 'reports' }"
            @click="$emit('showMenu', 'reports')") Reports
        router-link(class="w3-bar-item w3-hover-white w3-right header-link"
            :class="{ 'w3-white': selected == 'home' }"
            @click="$emit('showMenu', 'home')"
            :to="{ name: 'Recent' }") Home
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
