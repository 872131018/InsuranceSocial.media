<template lang="pug">
    div(class="w3-card-2 w3-padding form")
        h3 You have selected the following plan.
        Plan(
            v-if="selected.name && !expired"
            :plan="selected")
        div(
            v-if="!expired")
            h3 Payment Method
            h6 Please enter a form of payment to complete registration.
            p(v-if="code == 'ISMFreeTrial' && selected.tier == 1") Your Insurance Social Media Essential Plan trial period is free. We ask for your credit card to prevent any service interruption should you keep your account open after the trial period. Your card will not be charged for the trial period. After the trial, you will be charged for each month. You can cancel at any time.
            div(v-else)
                p Your credit card will be charged a pro-rated amount for this month’s subscription fee. You will be charged for next month’s service during the last week of this month.
                h3 Total Charges: #[b ${{ amount }}]
            Card(
                @setCard="(value) => $store.commit('setCard', value)")
            Expiration(
                @setMonth="(value) => $store.commit('setMonth', value.value)"
                @setYear="(value) => $store.commit('setYear', value)"
                @setCode="(value) => $store.commit('setCVV', value)")
            div Expiration Month and Year(YYYY) with Security Code
                i(class="fa fa-question-circle-o w3-tooltip")
                    img(class="w3-text" style="position:absolute;bottom:-20px" src="images/creditcards_cvv.png")
            Name(@setName="(value) => $store.commit('setName', value)")
            Errors(
                v-if="errors.length"
                :errors="errors")
            div(class="w3-padding")
                button(class="w3-button w3-text-white primary"
                    @click="sendPaymentDataToAnet()") Submit
        Modal(
            v-if="response"
            :response="response"
            @setModal="navigate()")
        div(class="AuthorizeNetSeal" style="display:none")
            a(href="http://www.authorize.net/" id="AuthorizeNetText" target="_blank") Electronic Check Processing
        Expired(
            v-if="expired"
            @setModal="")
</template>

<script>
    import Moment from 'moment';
    import Plan from './Plan';
    import Card from './inputs/Card';
    import Expiration from './Expiration';
    import CCV from './inputs/CCV';
    import Name from './inputs/Name';
    import Errors from './Errors';
    import Modal from './modal/Modal';
    import Expired from './expired/Expired';

    export default {
        data() {
            return {
                errors: [],
                response: null,
                expired: false
            }
        },
        computed: {
            selected() {
                return this.$store.state.registration.plan;
            },
            code() {
                return this.$store.state.registration.code;
            },
            amount() {
                return this.$store.state.payment.amount;
            }
        },
        mounted() {
            /*
            if(store.getState().UserStore.status == 'N') {
                this.expired = true;
            }
            */
            const today = new Moment();
            switch(this.code) {
                case 'ISMFreeTrial':
                    if(this.selected.tier == 1) {
                        this.$store.commit('setAmount', 1.00);
                    } else {
                        if(today.format('MM/DD/YYYY') == new Moment().startOf('month').format('MM/DD/YYYY') ||
                            today.format('MM/DD/YYYY') == new Moment().endOf('month').format('MM/DD/YYYY')) {
                            this.$store.commit('setAmount', parseInt(this.selected.price));
                        } else {
                            const firstDay = new Moment().startOf('month');
                            const lastDay = new Moment().endOf('month');
                            const rate = (parseInt(this.selected.price) / lastDay.diff(firstDay, 'days')).toFixed(2);
                            let prorate = 0;
                            prorate = (rate * lastDay.diff(today, 'days')).toFixed(2);
                            this.$store.commit('setAmount', prorate);
                        }
                    }
                    break;
                case 'IMTGEM17':
                case 'FMH17':
                    if(today.format('MM/DD/YYYY') == new Moment().startOf('month').format('MM/DD/YYYY') ||
                        today.format('MM/DD/YYYY') == new Moment().endOf('month').format('MM/DD/YYYY')) {
                        this.$store.commit('setAmount', parseInt(this.selected.price) - 39.00);
                        console.log(this.amount)
                    } else {
                        const firstDay = new Moment().startOf('month');
                        const lastDay = new Moment().endOf('month');
                        const rate = (parseInt(this.selected.price - 39.00) / lastDay.diff(firstDay, 'days')).toFixed(2);
                        let prorate = 0;
                        prorate = (rate * lastDay.diff(today, 'days')).toFixed(2);
                        this.$store.commit('setAmount', prorate);
                        console.log(this.amount)
                    }
                    break;
                default:
                    if(today.format('MM/DD/YYYY') == new Moment().startOf('month').format('MM/DD/YYYY') ||
                        today.format('MM/DD/YYYY') == new Moment().endOf('month').format('MM/DD/YYYY')) {
                        this.$store.commit('setAmount', this.selected.price);
                    } else {
                        const firstDay = new Moment().startOf('month');
                        const lastDay = new Moment().endOf('month');
                        const rate = (parseInt(this.selected.price) / lastDay.diff(firstDay, 'days')).toFixed(2);
                        let prorate = 0;
                        prorate = (rate * lastDay.diff(today, 'days')).toFixed(2);
                        this.$store.commit('setAmount', prorate);
                    }
                    break;
            }
        },
        methods: {
            sendPaymentDataToAnet() {
                this.errors = [];
                const secureData = {
                    cardData: {
                        cardNumber: this.$store.state.payment.card,
                        month: this.$store.state.payment.month,
                        year: this.$store.state.payment.year,
                        cardcode: this.$store.state.payment.cvv
                    },
                    authData: this.$store.state.authorize
                };

                Accept.dispatchData(secureData, (response) => {
                    if (response.messages.resultCode === "Error") {
                        for(let error of response.messages.message) {
                            this.errors.push(error.text);
                        }
                    } else {
                        const data = {
                            registration: this.$store.state.registration,
                            transaction: {
                                amount: this.$store.state.payment.amount,
                                dataDescriptor: response.opaqueData.dataDescriptor,
                                dataValue: response.opaqueData.dataValue,
                                customerData: this.$store.state.registration
                            }
                        }

                        axios.post('/register', data).then(response => {
                            this.response = {
                                planCost: this.selected.price,
                                coupon_code: this.$store.state.registration.code,
                                amount_charged: response.data.transaction.amount,
                                transactionId: response.data.transaction.transactionId
                            };
                        }).catch((error) => {
                            if(error.response.data.email) {
                                this.errors.push('This email has already been used.  Please go back and try another.');
                            } else {
                                this.errors.push('An Error has occured. Please contact support.');
                            }
                        });
                    }
                });

            },
            navigate() {
                window.location = '/facebook';
            }
        },
        components: {
            Plan,
            Card,
            Expiration,
            CCV,
            Name,
            Errors,
            Modal,
            Expired
        }
    }
</script>
