<template>
    <div>
        <router-link class="w3-bar-item w3-button w3-hover-white w3-right sub-header-link"
            v-bind:to="{ name: 'TwitterPostNow' }">Post Now
        </router-link>
        <router-link class="w3-bar-item w3-button w3-hover-white w3-right sub-header-link"
            v-bind:to="{ name: 'TwitterScheduledPosts' }">Scheduled Posts
        </router-link>
        <div class="w3-bar-item w3-right sub-header-link">Actions For Twitter: </div>
    </div>
</template>

<script>
    export default {
        //
    }
</script>
