<template lang="pug">
    div(class="w3-padding-16")
        label(class="w3-show-block") {{ label }}
        input(class="w3-input w3-show-inline-block eighty" type="text"
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
                    case 'EMAIL':
                        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,9})+$/.test(this.value)) {
                            this.isValid = true;
                            this.$emit('valid');
                        } else {
                            this.isValid = false;
                            this.$emit('invalid');
                        }
                        break;
                    case 'PASSWORD':
                        if(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(this.value)) {
                            this.isValid = true;
                            this.$emit('valid');
                        } else {
                            this.isValid = false;
                            this.$emit('invalid');
                        }
                        break;
                    case 'PHONE':
                        if(this.value != '' && this.value.length == 10) {
                            this.isValid = true;
                        } else {
                            this.isValid = false;
                        }
                        break;
                    case 'YEAR':
                        if(this.value != '' && this.value.length == 4) {
                            this.isValid = true;
                        } else {
                            this.isValid = false;
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
