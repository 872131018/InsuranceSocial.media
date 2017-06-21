<template>
    <div class="w3-section">
        <input class="w3-input w3-show-inline-block eighty" type="text"
            v-model="website"
            v-on:change="validate()">
        <Check v-if="isValid"></Check>
        <Cross v-else></Cross>
        <label class="w3-show-block">Website</label>
    </div>
</template>

<script>
    import Check from './Check';
    import Cross from './Cross';

    export default {
        data() {
            return {
                website: '',
                isValid: false
            }
        },
        methods: {
            validate() {
                this.$emit('setWebsite', this.website);
                if(this.website != '') {
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
