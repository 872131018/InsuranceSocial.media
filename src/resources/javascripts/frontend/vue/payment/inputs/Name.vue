<template>
    <div class="w3-section">
        <input class="w3-input w3-show-inline-block" type="text" style="width:80%"
            v-model="name"
            v-on:change="validate()">
        <label class="w3-show-block">{{ label }}</label>
        <span class="w3-small">Accepted payment forms are Visa, Mastercard, and American Express</span>
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
                name: '',
                isValid: false
            }
        },
        methods: {
            validate() {
                if(this.name != '') {
                    this.isValid = true;
                    this.$emit('setName', this.name);
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
