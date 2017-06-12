<template>
    <div class="w3-section">
        <input class="w3-input w3-show-inline-block" type="text" style="width:80%"
            v-model="card"
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
                card: '',
                isValid: false
            }
        },
        methods: {
            validate() {
                if(this.card != '') {
                    this.isValid = true;
                    this.$emit('setCard', this.card);
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
