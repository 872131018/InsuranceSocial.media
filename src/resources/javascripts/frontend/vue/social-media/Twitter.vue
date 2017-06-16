<template>
    <div class="w3-section">
        <input class="v-align" type="checkbox" id="twitter"
            v-model="twitter"
            v-on:change="$emit('setTwitter', twitter)">
        <label class="v-align w3-margin-right check-box" for="twitter"></label>
        <span class="w3-large">
            Twitter<i class="fa fa-twitter fa-2x w3-margin-left w3-text-blue v-align"></i>
        </span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                twitter: true
            }
        }
    }
</script>
