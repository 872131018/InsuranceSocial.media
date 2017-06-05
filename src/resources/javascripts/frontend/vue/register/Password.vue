<template>
    <div class="w3-section">
        <input class="w3-input w3-show-inline-block" type="password" style="width:80%"
            v-model="password"
            v-on:blur="validate()">
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
                if(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(this.password)) {
                    this.isValid = true;
                    this.$emit('setPassword', this.password);
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
