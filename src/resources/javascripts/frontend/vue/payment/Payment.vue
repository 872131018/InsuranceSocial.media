<template>
    <div class="w3-container w3-card-2 form">
        <div class="w3-panel">
            <h3>Payment Methods</h3>
            <h5>Enter a payment method as the last step in registration</h5>
        </div>
        <div class="w3-panel">
            <Cart v-bind:plan="plan"
                v-bind:reduction="reduction">
            </Cart>
        </div>
        <div class="w3-panel">
            <Discount v-bind:discount="discount"
                v-on:setDiscount="setDiscount($event)">
            </Discount>
        </div>
        <div class="w3-panel">
            <h3>Payment Information</h3>
            <h5>Visa, Mastercard, American Express</h5>
            <Card v-bind:label="'Card Number'"
                v-on:setCard="(number) => { card = number }">
            </Card>
        </div>
        <div class="w3-panel">
            <Expiration></Expiration>
        </div>
        <div class="w3-panel">
            <Name v-bind:label="'Card Holder Name'"
                v-on:setName="(name) => { name = name }">
            </Name>
        </div>
        <div class="w3-panel">
            <h5 class="w3-large">We look forward to working with you. Please click register to finish setting up your account.</h5>
            <button class="w3-button w3-text-white primary"
                v-on:click="complete()">Complete
            </button>
        </div>
    </div>
</template>

<script>
    import Discount from './inputs/Discount';
    import Cart from './Cart';
    import Card from './inputs/Card';
    import Expiration from './inputs/Expiration';
    import Name from './inputs/Name';

    export default {
        data() {
            return {
                plan: {},
                reduction: '0.00',
                discount: '',
                card: '',
                month: '',
                year: '',
                name: ''
            }
        },
        mounted() {
            this.plan = store.getState().UserStore.plan;
            if(store.getState().UserStore.discount) {
                setDiscount(store.getState().UserStore.discount);
            }
        },
        methods: {
            setDiscount(discount) {
                this.discount = discount;
                axios.put(`${ window.location }/${ this.discount }`,).then(response => {
                    this.reduction = response.data;
                });
            },
            setMonth(month) {
                this.month = month;
            },
            setYear(year) {
                this.year = year;
            },
            complete() {
                console.log("NEW CARD SUBMITTED")
                console.log(`info is ${ this.card }, ${ this.month }, ${ this.year }, ${ this.name }`)
            },
        },
        components: {
            Discount,
            Cart,
            Card,
            Expiration,
            Name
        }
    }
</script>
