<template>
    <div class="w3-container w3-card-2 form">
        <div class="w3-panel">
            <h3>Payment Methods</h3>
            <h5>Enter a payment method as the last step in registration</h5>
        </div>
        <div class="w3-panel">
            <Cart v-bind:plan="plan"
                v-bind:discount="discount"></Cart>
        </div>
        <div class="w3-panel">
            <Discount v-on:setDiscount="setDiscount($event)"></Discount>
        </div>
        <div class="w3-panel">
            <h3>Payment Information</h3>
            <h5>Visa, Mastercard, American Express</h5>
            <Card v-bind:label="'Card Number'"
                v-on:setCard="setCard($event)">
            </Card>
        </div>
        <div class="w3-panel">
            <Month v-on:setMonth="setMonth($event)"></Month>
            <Year v-bind:label="'Expiration Year'"
                v-on:setYear="setYear($event)">
            </Year>
        </div>
        <div class="w3-panel">
            <Name v-bind:label="'Card Holder Name'"
                v-on:setName="setName($event)">
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
    import Discount from './Discount';
    import Cart from './Cart';
    import Card from './inputs/Card';
    import Month from './inputs/Month';
    import Year from './inputs/Year';
    import Name from './inputs/Name';

    export default {
        data() {
            return {
                plan: store.getState().UserStore.plan,
                discount: '',
                discount: '0.00',
                card: '',
                month: '',
                year: '',
                name: ''
            }
        },
        mounted() {
            this.plan = store.getState().UserStore.plan;
        },
        methods: {
            setDiscount(discount) {
                axios.post(window.location, { discount: discount }).then(response => {
                    this.discount = response.data;
                });
            },
            setCard(card) {
                this.card = card;
            },
            setMonth(month) {
                this.month = month;
            },
            setYear(year) {
                this.year = year;
            },
            setName(name) {
                this.name = name;
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
            Month,
            Year,
            Name
        }
    }
</script>
