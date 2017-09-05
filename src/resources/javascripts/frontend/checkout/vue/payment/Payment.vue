<template>
    <div class="w3-container w3-card-2 form">
        <h3>You have selected the following plan.</h3>
        <div class="w3-panel">
            <Plan
                v-if="plan.name"
                v-bind:plan="plan">
            </Plan>
        </div>
        <div class="w3-panel">
            <h3>Payment Method</h3>
            <h5>Please enter a form of payment to complete registration.</h5>
            <p v-if="plan.tier == 1">
                Your Insurance Social Media Essential Plan trial period is free.
                We ask for your credit card to prevent any service interruption should you keep your account open after the trial period.
                Your card will not be charged for the trial period.
                After the trial, you will be charged for each month.
                You can cancel at any time.
            </p>
            <div v-else>
                <p>Your credit card will be charged a pro-rated amount for this month’s subscription fee. You will be charged for next month’s service during the last week of this month.</p>
                <h3>Total Charges: <b>${{ properties.prorate }}</b></h3>
            </div>
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
            <div>Expiration Month and Year(YYYY) with Security Code
                <i class="fa fa-question-circle-o w3-tooltip">
                    <img class="w3-text" style="position:absolute;bottom:-20px" src="images/creditcards_cvv.png">
                </i>
            </div>
        </div>
        <div class="w3-panel">
            <Name v-on:setName="(name) => properties.name = name"></Name>
        </div>
        <div class="w3-panel"
            v-if="errors.length">
            <Errors v-bind:errors="errors"></Errors>
        </div>
        <div class="w3-panel">
            <button class="w3-button w3-text-white primary"
                v-on:click="sendPaymentDataToAnet()">Submit
            </button>
        </div>
        <Modal
            v-if="response"
            v-bind:response="response"
            v-on:setModal="navigate()">
        </Modal>
        <div class="AuthorizeNetSeal" style="display:none">
            <a href="http://www.authorize.net/" id="AuthorizeNetText" target="_blank">Electronic Check Processing</a>
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
    import Errors from './Errors';
    import Modal from './Modal/Modal';

    export default {
        data() {
            return {
                plan: {},
                properties: {
                    card: '',
                    month: '',
                    year: '',
                    code: '',
                    name: '',
                    apiLoginID: '',
                    clientKey: '',
                    prorate: 1.00
                },
                discount: '',
                errors: [],
                response: null
            }
        },
        mounted() {
            axios.get(`${ window.base_url }/api/payment`).then(response => {
                this.properties.apiLoginID = response.data.apiLoginID;
                this.properties.clientKey = response.data.clientKey;
            });

            this.plan = store.getState().UserStore.plan;

            if(this.plan.tier > 1) {
                const today = new Moment();
                if(today.format('MM/DD/YYYY') == new Moment().startOf('month').format('MM/DD/YYYY')) {
                    this.properties.prorate = this.plan.price;
                } else {
                    const firstDay = new Moment().startOf('month');
                    const lastDay = new Moment().endOf('month');
                    const rate = (parseInt(this.plan.price) / lastDay.diff(firstDay, 'days')).toFixed(2);
                    const prorate = (rate * lastDay.diff(today, 'days')).toFixed(2);
                    this.properties.prorate = prorate;
                }
            }
        },
        methods: {
            sendPaymentDataToAnet() {
                this.errors = [];
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
                    if (response.messages.resultCode === "Error") {
                        for(let error of response.messages.message) {
                            this.errors.push(error.text);
                        }
                    } else {
                        const transaction = {
                            total: this.properties.prorate,
                            dataDescriptor: response.opaqueData.dataDescriptor,
                            dataValue: response.opaqueData.dataValue,
                            customerData: store.getState().UserStore
                        };

                        axios.post(window.location, transaction).then(response => {
                            this.response = {
                                planCost: this.plan.price,
                                coupon_code: store.getState().UserStore.coupon_code,
                                amount_charged: response.data.transaction.amount,
                                transactionId: response.data.transaction.transactionId
                            };
                        }).catch((error) => {
                            this.errors.push('An Error has occured. Please contact support.');
                        });
                    }
                });

            },
            navigate() {
                window.location = `${ window.base_url }/facebook`;
            }
        },
        components: {
            Plan,
            Card,
            Expiration,
            CCV,
            Name,
            Errors,
            Modal
        }
    }
</script>
