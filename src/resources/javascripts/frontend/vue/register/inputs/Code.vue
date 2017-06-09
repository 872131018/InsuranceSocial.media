<template>
    <div>
        <input class="w3-input w3-show-inline-block" type="text" style="width:80%"
            v-model="code"
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
                code: '',
                isValid: false
            }
        },
        mounted() {
            if(this.$route.params.code) {
                this.code = this.$route.params.code;
            }
            this.validate();
        },
        methods: {
            validate() {
                if(this.code != '') {
                    this.isValid = true;
                    this.$emit('setCode', this.code);
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
