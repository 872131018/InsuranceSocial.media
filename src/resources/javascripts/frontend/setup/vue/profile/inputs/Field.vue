<template>
    <div class="w3-section">
        <label class="w3-show-block">{{ label }}</label>
        <input class="w3-input w3-show-inline-block eighty" type="text"
            v-model="value"
            v-on:keyup="validate()">
        <Check v-if="isValid"></Check>
        <Cross v-else></Cross>
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
            default: {
                type: String
            },
            validation: {
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
                        } else {
                            this.isValid = false;
                        }
                        break;
                    case 'PHONE':
                        if(this.value != '' && this.value.length == 12) {
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
                    default:
                        if(this.value != '') {
                            this.isValid = true;
                        } else {
                            this.isValid = false;
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
