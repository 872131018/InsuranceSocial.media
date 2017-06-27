<template>
    <div class="w3-container w3-card-2 form">
        <div class="w3-panel">
            <h3>Plan Information</h3>
            <h5>Please confirm your plan or enter a promotion code.</h5>
        </div>
        <div class="w3-panel">
            <Cart
                v-bind:plan="plan"
                v-bind:reduction="reduction">
            </Cart>
        </div>
        <div class="w3-panel">
            <Discount
                v-bind:discount="discount"
                v-on:setDiscount="setDiscount($event)">
            </Discount>
        </div>
        <div class="w3-panel">
            <h3>Payment Method</h3>
            <h5>Please enter a form of payment to complete registration.</h5>
            <p>The first 30 days of the Insurance Social.Media Essential plan are free. We ask for your credit card to prevent any service interruption should you keep your account open. Your card will not be charged for the trial period. After the trial, you will be charged each month. You can cancel at any time.</p>
        </div>
        <div class="w3-panel">
            <Card v-on:setCard="(card) => { properties.card = card }"></Card>
        </div>
        <div class="w3-panel">
            <Expiration
                v-on:setMonth="(month) => { properties.month = month.value }"
                v-on:setYear="(year) => { properties.year = year }">
            </Expiration>
        </div>
        <div class="w3-panel">
            <CCV v-on:setCode="(code) => { properties.code = code }"></CCV>
        </div>
        <div class="w3-panel">
            <Name v-on:setName="(name) => { properties.name = name }"></Name>
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
    import CCV from './inputs/CCV';
    import Name from './inputs/Name';

    export default {
        data() {
            return {
                plan: {},
                reduction: '0.00',
                discount: store.getState().UserStore.discount,
                properties: {
                    card: '',
                    month: '',
                    year: '',
                    code: '',
                    name: '',
                    apiLoginID: '',
                    clientKey: ''
                }
            }
        },
        mounted() {
            axios.get(window.location).then(response => {
                this.properties.apiLoginID = response.data.apiLoginID;
                this.properties.clientKey = response.data.clientKey;
            });

            this.plan = store.getState().UserStore.plan;

            if(this.discount) {
                this.setDiscount(this.discount);
            }
        },
        methods: {
            setDiscount(discount) {
                axios.put(`${ window.location }/${ discount }`,).then(response => {
                    this.reduction = response.data;
                });
            },
            sendPaymentDataToAnet() {
                const secureData = {
                    cardData: {
                        cardNumber: this.properties.card,
                        month: this.properties.month,
                        year: this.properties.year,
                        cardcode: this.properties.code
                    },
                    authData: {
                        apiLoginID: this.properties.apiLoginID,
                        clientKey: this.properties.clientKey
                    }
                };

                Accept.dispatchData(secureData, (response) => {
                    let total = parseInt(this.plan.price) - parseInt(this.reduction);
                    total = total.toFixed(2).toString();

                    const transaction = {
                        total: total,
                        dataDescriptor: response.opaqueData.dataDescriptor,
                        dataValue: response.opaqueData.dataValue,
                        customerData: store.getState().UserStore
                    };

                    axios.post(window.location, transaction).then(response => {
                        window.location = window.base_url + '/setup/welcome';
                    });

                });

            },
        },
        components: {
            Discount,
            Cart,
            Card,
            Expiration,
            CCV,
            Name
        }
    }
</script>
