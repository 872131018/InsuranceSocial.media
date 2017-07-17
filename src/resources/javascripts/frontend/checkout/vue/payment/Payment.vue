<template>
    <div class="w3-container w3-card-2 form">
        <div class="w3-panel">
            <h3>Plan Information</h3>
            <h5>
                You have selected the following plan.  If you register now your free trial will begin
                <b>{{ startDate}}</b> and billing will begin <b>{{ billingDate }}.</b>
            </h5>
        </div>
        <div class="w3-panel">
            <Plan
                v-if="plan.name"
                v-bind:plan="plan">
            </Plan>
        </div>
        <div class="w3-panel">
            <h3>Payment Method</h3>
            <h5>Please enter a form of payment to complete registration.</h5>
            <p>The first 30 days of the Insurance Social Media Essential plan are free. We ask for your credit card to prevent any service interruption should you keep your account open after the trial period. Your card will not be charged for the trial period. After the trial, you will be charged for each month. You can cancel at any time.</p>
        </div>
        <div class="w3-panel">
            <Card v-on:setCard="(card) => properties.card = card"></Card>
        </div>
        <div class="w3-panel">
            <Expiration
                v-on:setMonth="(month) => properties.month = month.value"
                v-on:setYear="(year) => properties.year = year"
                v-on:setCode="(code) => properties.code = code">
            </Expiration>
            <div>Expiration Month and Year(YYYY) with Securty Code</div>
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
</template>

<script>
    import Moment from 'moment';
    import Plan from './Plan';
    import Card from './inputs/Card';
    import Expiration from './Expiration';
    import CCV from './inputs/CCV';
    import Name from './inputs/Name';

    export default {
        data() {
            return {
                plan: {},
                startDate: new Moment().startOf('month').add(1, 'month').format('MM-DD-YYYY'),
                billingDate: new Moment().startOf('month').add(2, 'months').format('MM-DD-YYYY'),
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
            axios.get(`${ window.base_url }/api/payment`).then(response => {
                this.properties.apiLoginID = response.data.apiLoginID;
                this.properties.clientKey = response.data.clientKey;
            });

            this.plan = store.getState().UserStore.plan;
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
                    const transaction = {
                        total: '1.00',
                        dataDescriptor: response.opaqueData.dataDescriptor,
                        dataValue: response.opaqueData.dataValue,
                        customerData: store.getState().UserStore
                    };

                    axios.post(window.location, transaction).then(response => {
                        window.location = `${ window.base_url }/setup/welcome`;
                    });

                });

            },
        },
        components: {
            Plan,
            Card,
            Expiration,
            CCV,
            Name
        }
    }
</script>
