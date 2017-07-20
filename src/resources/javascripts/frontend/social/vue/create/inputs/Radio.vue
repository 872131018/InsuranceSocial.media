<template>
    <ul class="w3-ul w3-hoverable">
        <li class="w3-section"
            v-for="(option, index) in options">
            <input type="radio"
                v-bind:id="`${ option.id }${ index }`"
                v-bind:value="option.id"
                v-model="selected"
                v-on:change="$emit('setChecked', option)">
            <label v-bind:for="`${ option.id }${ index }`">
                <span class="w3-show-inline-block w3-margin-right v-align"></span>{{ option.name }}
            </label>
            <img class="v-align" height="180" width="180"
                v-if="option.src"
                v-bind:src="getSrc(option)">
        </li>
    </ul>
</template>

<script>
    export default {
        props: {
            options: {
                type: Array
            },
            default: {
                type: String
            }
        },
        data() {
            return {
                selected: ''
            }
        },
        mounted() {
            if(typeof(this.default != undefined)) {
                this.selected = this.default;
            }
        },
        methods: {
            getSrc(option) {
                return `${ window.base_url }/${ option.src }`;
            }
        }
    }
</script>
