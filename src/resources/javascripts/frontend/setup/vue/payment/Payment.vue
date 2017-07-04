<template>
    <div>
        <Progress
            v-bind:progress="33">
        </Progress>
        <div class="w3-container w3-card-2 form">
            <div class="w3-panel">
                <h3>Payment Information</h3>
                <h5>Please confirm a payment method for facebook setup.</h5>
            </div>
            <div class="w3-panel">
                <Cart
                    v-bind:plan="plan">
                </Cart>
            </div>
            <div class="w3-panel">
                <h3>Payment Method</h3>
                <h5>Please enter a form of payment.</h5>
                <p>This is a one time charge to cover the cost of setting up a corporate Facebook page for you.</p>
            </div>
            <div class="w3-panel">
                <Card v-on:setCard="(card) => properties.card = card"></Card>
            </div>
            <div class="w3-panel">
                <Expiration
                    v-on:setMonth="(month) => properties.month = month.value"
                    v-on:setYear="(year) => properties.year = year">
                </Expiration>
            </div>
            <div class="w3-panel">
                <CCV v-on:setCode="(code) => properties.code = code"></CCV>
            </div>
            <div class="w3-panel">
                <Name v-on:setName="(name) => properties.name = name"></Name>
            </div>
            <div class="w3-panel">
                <button class="w3-button w3-text-white primary"
                    v-on:click="sendPaymentDataToAnet()">Complete
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import Progress from '../Progress';
    import Cart from './Cart';
    import Card from './inputs/Card';
    import Expiration from './inputs/Expiration';
    import CCV from './inputs/CCV';
    import Name from './inputs/Name';

    export default {
        data() {
            return {
                plan: {
                    name: 'Create a Facebook Account',
                    price: '25.00'
                },
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
        },
        methods: {
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
                    let total = parseInt(this.plan.price);
                    total = total.toFixed(2).toString();

                    const transaction = {
                        total: total,
                        dataDescriptor: response.opaqueData.dataDescriptor,
                        dataValue: response.opaqueData.dataValue,
                        customerData: store.getState().UserStore
                    };

                    axios.post(window.location, transaction).then(response => {
                        window.location = window.base_url + '/setup/profile';
                    });

                });

            },
        },
        components: {
            Progress,
            Cart,
            Card,
            Expiration,
            CCV,
            Name
        }
    }
</script>
