<template>
    <div>
        <input type="checkbox"
            v-bind:id="id"
            v-bind:value="value"
            v-model="checked"
            v-on:change="$emit('setChecked', value)">
        <label v-bind:for="id">
            <span class="w3-show-inline-block w3-margin-right v-align"></span>{{ label }}
        </label>
    </div>
</template>

<script>
    export default {
        props: {
            label: {
                type: String
            },
            id: {
                type: String
            },
            value: {
                type: String
            }
        },
        data() {
            return {
                checked: false
            }
        }
    }
</script>
