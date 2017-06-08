<template>
    <div>
        <input class="w3-input w3-show-inline-block" type="text" style="width:80%"
            v-model="discount"
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
            code: {
                type: String
            },
            label: {
                type: String
            }
        },
        data() {
            return {
                discount: this.code,
                isValid: false
            }
        },
        mounted() {
                this.validate();
        },
        methods: {
            validate() {
                if(this.discount != '') {
                    this.isValid = true;
                    this.$emit('setDiscount', this.discount);
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
