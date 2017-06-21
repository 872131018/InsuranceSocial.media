<template>
    <div  class="w3-section">
        <input class="w3-input w3-show-inline-block eighty" type="text"
            v-model="discount"
            v-on:change="validate()">
        <Check v-if="isValid"></Check>
        <Cross v-else></Cross>
        <label class="w3-show-block">Discount Code</label>
    </div>
</template>

<script>
    import Check from './Check';
    import Cross from './Cross';

    export default {
        data() {
            return {
                discount: '',
                isValid: false
            }
        },
        mounted() {
            if(this.$route.params.discount) {
                this.discount = this.$route.params.discount;
            }
            this.validate();
        },
        methods: {
            validate() {
                this.$emit('setDiscount', this.discount);
                if(this.discount != '') {
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
