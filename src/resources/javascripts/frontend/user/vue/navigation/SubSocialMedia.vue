<template lang="pug">
    div
        div(class="w3-bar-item w3-button w3-hover-white w3-right sub-header-link"
            v-on:click="$emit('showSubMenu', 'linkedin')") LinkedIn
        div(class="w3-bar-item w3-button w3-hover-white w3-right sub-header-link"
            v-on:click="$emit('showSubMenu', 'twitter')") Twitter
        div(class="w3-bar-item w3-button w3-hover-white w3-right sub-header-link"
            v-on:click="$emit('showSubMenu', 'facebook')") Facebook
        div(class="w3-bar-item w3-right sub-header-link") Social Actions For:
</template>

<script>
    export default {
        //
    }
</script>
