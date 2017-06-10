<template>
    <div class="w3-section">
        <input class="w3-input w3-show-inline-block" type="text" style="width:80%"
            v-model="code">
        <button class="w3-button w3-text-white secondary"
            v-on:click="discount()">Apply
        </button>
        <label class="w3-show-block">Enter discount code</label>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                code: ''
            }
        },
        mounted() {
            if(store.getState().UserStore.code) {
                this.code = store.getState().UserStore.code;
            }
        },
        methods: {
            discount() {
                this.$emit('setCode', this.code);
            }
        },
        components: {
            //
        }
    }
</script>
