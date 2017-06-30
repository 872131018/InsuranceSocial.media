<template>
    <div class="w3-section">
        <input class="v-align" type="checkbox" id="twitter"
            v-model="twitter"
            v-on:change="$emit('setTwitter', twitter)">
        <label for="twitter">
            <span class="w3-show-inline-block w3-margin-right v-align"></span>
            Twitter<i class="fa fa-twitter fa-2x w3-margin-left w3-text-blue v-align"></i>
        </label>
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
