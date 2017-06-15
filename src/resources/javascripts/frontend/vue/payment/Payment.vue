<template>
    <div class="w3-container w3-card-2 form">
        <div class="w3-panel">
            <h3>Plan Information</h3>
            <h5>Please confirm your plan or enter a promotion code.</h5>
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
            <h3>Payment Method</h3>
            <h5>Please enter a form of payment to complete registration.</h5>
        </div>
        <div class="w3-panel">
            <Card v-on:setCard="(input) => { card = input }"></Card>
        </div>
        <div class="w3-panel">
            <Expiration v-on:setMonth="(input) => { month = input.value }"
                v-on:setYear="(input) => { year = input }">
            </Expiration>
        </div>
        <div class="w3-panel">
            <Name v-on:setName="(input) => { name = input }"></Name>
        </div>
        <div class="w3-panel">
            <button class="w3-button w3-text-white primary"
                v-on:click="sendPaymentDataToAnet()">Complete
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
            sendPaymentDataToAnet() {
                console.log("NEW CARD SUBMITTED")
                console.log(`info is ${ this.card }, ${ this.month }, ${ this.year }, ${ this.name }`)

                const secureData = {
                    cardData: {
                        cardNumber: this.card,
                        month: this.month,
                        year: this.year,
                        cardcode: '123',
                    },
                    authData: {
                        clientKey: '4tspwTt5c6A9uuR97LR28mgUWu887qB4LEj5EnZ4U3qAYywUe2X6SYaGsv7GgR4q',
                        apiLoginID: '7WA27Zgq9'
                    }
                };

                Accept.dispatchData(secureData, (response) => {
                    console.log(response)
                });

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
