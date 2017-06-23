<template>
    <div class="w3-section">
        <input class="w3-input w3-show-inline-block eighty" type="text"
            v-model="year"
            v-on:change="validate()">
        <Check v-if="isValid"></Check>
        <Cross v-else></Cross>
        <label class="w3-show-block">Founding Year</label>
    </div>
</template>

<script>
    import Check from './Check';
    import Cross from './Cross';

    export default {
        data() {
            return {
                year: '',
                isValid: false
            }
        },
        methods: {
            validate() {
                this.$emit('setYear', this.year);
                if(this.year != '' && this.year.length == 4) {
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
