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
        }
    }
</script>
