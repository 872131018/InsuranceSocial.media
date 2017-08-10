<template>
    <div class="w3-section">
        <span class="w3-large">Do I write benefit coverage?</span>
        <div class="w3-show-inline-block w3-margin-left">
            <input type="radio" id="benefit_yes" value="Y"
                v-model="option"
                v-on:change="$emit('setOption', option)">
            <label for="benefit_yes">
                <span class="w3-show-inline-block w3-margin-right v-align"></span>Yes
            </label>
        </div>
        <div class="w3-show-inline-block w3-margin-left">
            <input type="radio" id="benefit_no" value="N"
                v-model="option"
                v-on:change="$emit('setOption', option)">
            <label for="benefit_no">
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
                option: false,
            }
        },
        mounted() {
            //
        }
    }
</script>
