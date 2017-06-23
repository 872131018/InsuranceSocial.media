<template>
    <div class="w3-section">
        <input class="w3-input w3-show-inline-block eighty" type="text"
            v-model="value"
            v-on:change="validate()">
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
                value: '',
                isValid: false
            }
        },
        methods: {
            validate() {
                this.$emit('setValue', this.value);
                if(this.value != '') {
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
