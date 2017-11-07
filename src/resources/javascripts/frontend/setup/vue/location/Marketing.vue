<template>
    <div class="w3-section">
        <span class="w3-large">Marketing Geography:</span>
        <div class="w3-show-inline-block w3-margin-left">
            <input type="radio" id="region" value="R"
                v-model="marketing"
                v-on:change="$emit('setMarketing', marketing)">
            <label for="region">
                <span class="w3-show-inline-block w3-margin-right v-align"></span>Region
            </label>
        </div>
        <div class="w3-show-inline-block w3-margin-left">
            <input type="radio" id="state" value="S"
                v-model="marketing"
                v-on:change="$emit('setMarketing', marketing)">
            <label for="state">
                <span class="w3-show-inline-block w3-margin-right v-align"></span>State and County
            </label>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            method: {
                type: String
            }
        },
        data() {
            return {
                marketing: false,
            }
        }
    }
</script>
