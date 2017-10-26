<template>
    <div>
        <router-link class="w3-bar-item w3-button w3-hover-white w3-right sub-header-link"
            v-bind:to="{ name: 'FacebookPost' }">Post Now
        </router-link>
        <router-link class="w3-bar-item w3-button w3-hover-white w3-right sub-header-link"
            v-bind:to="{ name: 'FacebookScheduledPosts' }">Scheduled Posts
        </router-link>
        <router-link class="w3-bar-item w3-button w3-hover-white w3-right sub-header-link"
            v-bind:to="{ name: 'FacebookFeed' }">Home Feed
        </router-link>
        <div class="w3-bar-item w3-right sub-header-link">Actions For Facebook: </div>
    </div>
</template>

<script>
    export default {
        //
    }
</script>
