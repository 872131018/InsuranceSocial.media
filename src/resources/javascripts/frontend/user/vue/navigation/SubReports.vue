<template>
    <div>
        <router-link class="w3-bar-item w3-button w3-hover-white w3-right sub-header-link"
            v-bind:to="{ name: 'LinkedInReport' }">LinkedIn
        </router-link>
        <router-link class="w3-bar-item w3-button w3-hover-white w3-right sub-header-link"
            v-bind:to="{ name: 'ReportsTwitter' }">Twitter
        </router-link>
        <router-link class="w3-bar-item w3-button w3-hover-white w3-right sub-header-link"
            v-bind:to="{ name: 'ReportsFacebook' }">Facebook
        </router-link>
        <div class="w3-bar-item w3-right sub-header-link">View Reports For: </div>
    </div>
</template>

<script>
    export default {
        //
    }
</script>
