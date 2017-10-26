<template>
    <div class="w3-section">
        <label class="w3-show-block">{{ label }}</label>
        <input class="w3-input w3-show-inline-block eighty" type="file"
            v-on:change="process($event)">
        <Check v-if="isValid"></Check>
        <Cross v-else-if="!isValid"></Cross>
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
                isValid: false
            }
        },
        methods: {
            process(event) {
                this.$emit('setFile', event.target.files[0]);
                this.isValid = true;
            }
        },
        components: {
            Check,
            Cross
        }
    }
</script>
