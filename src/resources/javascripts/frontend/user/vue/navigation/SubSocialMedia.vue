<template>
    <div>
        <div class="w3-bar-item w3-button w3-hover-white w3-right sub-header-link"
            v-on:click="$emit('showLinkedInActions')">LinkedIn
        </div>
        <div class="w3-bar-item w3-button w3-hover-white w3-right sub-header-link"
            v-on:click="$emit('showTwitterActions')">Twitter
        </div>
        <div class="w3-bar-item w3-button w3-hover-white w3-right sub-header-link"
            v-on:click="$emit('showFacebookActions')">Facebook
        </div>
        <div class="w3-bar-item w3-right sub-header-link">Social Actions For: </div>
    </div>
</template>

<script>
    export default {
        //
    }
</script>
