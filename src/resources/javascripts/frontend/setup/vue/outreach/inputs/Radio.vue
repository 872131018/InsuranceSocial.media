<template>
    <ul class="w3-ul w3-hoverable">
        <li class="w3-section"
            v-for="(option, index) in options">
            <input type="radio"
                v-bind:id="`${ option }${ index }`"
                v-bind:value="option"
                v-model="selected"
                v-on:change="$emit('setChecked', option)">
            <label v-bind:for="`${ option }${ index }`">
                <span class="w3-show-inline-block w3-margin-right v-align"></span>{{ option }}
            </label>
        </li>
    </ul>
</template>

<script>
    export default {
        props: {
            options: {
                type: Array
            }
        },
        data() {
            return {
                selected: ''
            }
        }
    }
</script>
