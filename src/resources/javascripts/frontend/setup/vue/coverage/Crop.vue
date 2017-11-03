<template>
    <div class="w3-section">
        <span class="w3-large">Do I write crop coverage?</span>
        <div class="w3-show-inline-block w3-margin-left">
            <input type="radio" id="crop_yes" value="Y"
                v-model="option"
                v-on:change="$emit('setOption', option)">
            <label for="crop_yes">
                <span class="w3-show-inline-block w3-margin-right v-align"></span>Yes
            </label>
        </div>
        <div class="w3-show-inline-block w3-margin-left">
            <input type="radio" id="crop_no" value="N"
                v-model="option"
                v-on:change="$emit('setOption', option)">
            <label for="crop_no">
                <span class="w3-show-inline-block w3-margin-right v-align"></span>No
            </label>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            default: {
                type: String
            }
        },
        data() {
            return {
                option: 'N',
            }
        },
        mounted() {
            //
        }
    }
</script>
