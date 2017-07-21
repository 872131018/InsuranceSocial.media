<template>
    <ul class="w3-ul w3-hoverable">
        <li class="w3-section"
            v-for="(option, index) in options">
            <input type="radio"
                v-bind:id="`${ option.code }${ index }`"
                v-bind:value="option"
                v-model="selected"
                v-on:change="$emit('setChecked', option)">
            <label v-bind:for="`${ option.code }${ index }`">
                <span class="w3-show-inline-block w3-margin-right v-align"></span>{{ option.desc }}
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
                type: Object
            }
        },
        data() {
            return {
                selected: {code:'00', desc:'Options'}
            }
        },
        mounted() {
            if(typeof(this.default != undefined)) {
                this.selected = this.default;
            }
        }
    }
</script>
