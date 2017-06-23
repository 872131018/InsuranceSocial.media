<template>
    <div class="w3-section">
        <input class="w3-input w3-show-inline-block eighty" type="text"
            v-model="email"
            v-on:keyup="validate()">
        <Check v-if="isValid"></Check>
        <Cross v-else></Cross>
        <label class="w3-show-block">{{ label }}</label>
    </div>
</template>

<script>
    import Check from './Check';
    import Cross from './Cross';

    export default {
        props: {
            label: {
                type: String
            },
            value: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                email: this.value,
                isValid: false
            }
        },
        methods: {
            validate() {
                this.$emit('setEmail', this.email);
                if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,9})+$/.test(this.email)) {
                    this.isValid = true;
                } else {
                    this.isValid = false;
                }
            }
        },
        components: {
            Check,
            Cross
        }
    }
</script>
