<template>
    <div class="w3-section w3-show-inline-block w3-margin-left">
        <input class="w3-input" type="text"
            v-model="year"
            v-on:change="validate()">
        <label class="w3-show-block">{{ label }}</label>
    </div>
</template>

<script>
    export default {
        props: {
            label: {
                type: String
            }
        },
        data() {
            return {
                year: '',
                isValid: false
            }
        },
        methods: {
            validate() {
                if(this.year != '') {
                    this.isValid = true;
                    this.$emit('setYear', this.year);
                } else {
                    this.isValid = false;
                }
            }
        },
        components: {
            //
        }
    }
</script>
