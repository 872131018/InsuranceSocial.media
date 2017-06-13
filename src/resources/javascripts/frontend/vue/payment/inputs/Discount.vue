<template>
    <div class="w3-section">
        <input class="w3-input w3-show-inline-block" type="text" style="width:80%"
            v-model="discount">
        <label class="w3-show-block">Enter discount code</label>
        <button class="w3-button w3-text-white secondary"
            v-on:click="setDiscount()">Apply
        </button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                discount: ''
            }
        },
        mounted() {
            if(store.getState().UserStore.discount) {
                this.discount = store.getState().UserStore.discount;
            }
        },
        methods: {
            setDiscount() {
                this.$emit('setDiscount', this.discount);
            }
        },
        components: {
            //
        }
    }
</script>
