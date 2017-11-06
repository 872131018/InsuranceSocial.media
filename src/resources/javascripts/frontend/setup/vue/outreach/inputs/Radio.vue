<template>
    <ul class="w3-ul w3-hoverable">
        <li class="w3-section"
            v-for="(option, index) in options">
            <input type="radio"
                v-bind:id="`${ option.desc.substr(0, 5) }${ index }`"
                v-bind:value="option"
                v-model="selected"
                v-on:change="$emit('setChecked', option.code)">
            <label v-bind:for="`${ option.desc.substr(0, 5) }${ index }`">
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
                type: String
            }
        },
        data() {
            return {
                selected: {code:'00', desc:'Options'}
            }
        },
        mounted() {
            if(this.default) {
                for(let option of this.options) {
                    if(option.code == this.default) {
                        this.selected = option;
                        this.$emit('setChecked', option.code);
                    }
                }
            }
        }
    }
</script>
