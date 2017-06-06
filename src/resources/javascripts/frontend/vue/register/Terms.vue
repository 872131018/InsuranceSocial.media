<template>
    <div class="w3-section w3-padding-32">
        <input class="v-align" type="checkbox" id="terms"
            v-model:checked="checked"
            v-on:change="$emit('setTerms', checked)">
        <label class="v-align check-box" for="terms"></label>
        <span class="w3-large w3-margin-left">Terms of Service</span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                checked: false
            }
        }
    }
</script>
