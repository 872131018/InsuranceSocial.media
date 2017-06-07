<template>
    <div class="w3-container w3-card-2 form">
        <h3>Add additional features to your plan</h3>
        <div class="w3-container">
            <input class="v-align" type="checkbox" id="terms"
                v-model:checked="checked"
                v-on:change="$emit('setTerms', checked)">
            <label class="v-align check-box" for="terms"></label>
            <span class="w3-large w3-margin-left">Terms of Service</span>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                checked: false
            }
        },
        methods: {
            //
        },
        components: {
            //
        }
    }
</script>
