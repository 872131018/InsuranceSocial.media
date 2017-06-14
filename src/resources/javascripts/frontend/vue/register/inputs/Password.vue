<template>
    <div class="w3-section">
        <input class="w3-input w3-show-inline-block" type="password" style="width:80%"
            v-model="password"
            v-on:keyup="validate()">
        <Check v-if="isValid && confirmed"></Check>
        <Cross v-else></Cross>
        <label class="w3-show-block">{{ label }}</label>
        <span class="w3-small">Must contain min 8 characters, 1 capital letter, 1 special character</span>
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
                password: '',
                isValid: false
            }
        },
        methods: {
            validate() {
                this.$emit('setPassword', this.password);
                if(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(this.password)) {
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
