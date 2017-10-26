<template lang="pug">
    div(class="w3-padding-16")
        label(class="w3-show-block") {{ label }}
        div(class="w3-small") Must contain min 8 characters, 1 number, and 1 special character
        input(class="w3-input w3-show-inline-block eighty" type="password"
            v-model="value"
            v-on:keyup="validate()")
        Check(v-show="isValid")
        Cross(v-show="!isValid && value != ''")
</template>

<script>
    import Check from './Check';
    import Cross from './Cross';

    export default {
        props: {
            label: {
                type: String
            },
            default: {
                type: String
            },
            validation: {
                type: String
            },
            confirmation: {
                type: String
            }
        },
        data() {
            return {
                value: '',
                isValid: false
            }
        },
        mounted() {
            if(this.default) {
                this.value = this.default;
                this.validate();
            }
        },
        methods: {
            validate() {
                this.$emit('setValue', this.value);
                switch(this.validation) {
                    case 'PASSWORD':
                        if(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(this.value)) {
                            this.isValid = true;
                            this.$emit('valid');
                        } else {
                            this.isValid = false;
                            this.$emit('invalid');
                        }
                        break;
                    case 'CONFIRM':
                        if(this.value != '' && this.value == this.confirmation) {
                            this.isValid = true;
                            this.$emit('valid');
                        } else {
                            this.isValid = false;
                            this.$emit('invalid');
                        }
                        break;
                    default:
                        if(this.value != '') {
                            this.isValid = true;
                            this.$emit('valid');
                        } else {
                            this.isValid = false;
                            this.$emit('invalid');
                        }
                        break;
                }
            }
        },
        components: {
            Check,
            Cross
        }
    }
</script>
