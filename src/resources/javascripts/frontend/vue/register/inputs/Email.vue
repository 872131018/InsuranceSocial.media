<template>
    <div class="w3-section">
        <input class="w3-input w3-show-inline-block" type="text" style="width:80%"
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
            confirmed: {
                type: Boolean
            }
        },
        data() {
            return {
                email: '',
                isValid: false
            }
        },
        methods: {
            validate() {
                this.$emit('setEmail', this.email);
                if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,9})+$/.test(this.email) && this.confirmed) {
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
