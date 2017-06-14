<template>
    <div class="w3-section">
        <input class="w3-input w3-show-inline-block" type="text" style="width:80%"
            v-model="code">
        <label class="w3-show-block">Enter discount code</label>
        <button class="w3-button w3-text-white secondary"
            v-on:click="$emit('setDiscount', code)">Apply
        </button>
    </div>
</template>

<script>
    export default {
        props: {
            discount: {
                type: String
            }
        },
        data() {
            return {
                code: ''
            }
        },
        mounted() {
            if(this.discount) {
                this.code = this.discount;
            }
        }
    }
</script>
