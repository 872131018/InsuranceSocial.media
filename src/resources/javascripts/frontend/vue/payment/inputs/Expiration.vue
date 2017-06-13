<template>
    <div class="w3-section eighty">
        <Month v-on:setMonth="setMonth($event)"></Month>
        <Year v-bind:label="'Expiration Year'"
            v-on:setYear="setYear($event)">
        </Year>
    </div>
</template>

<script>
    import Month from './Month';
    import Year from './Year';

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
            Month,
            Year
        }
    }
</script>

<style>
    .eighty {
        width: 80%
    }
</style>
