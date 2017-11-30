<template lang="pug">
    div(class="w3-card w3-padding form")
        h3 You have selected the following plan.
        Selected(
            v-if="plan.name && !expired"
            :plan="plan")
        div(
            v-if="!expired")
            h3 Payment Method
            h6 Please enter a form of payment to complete registration.
            p(v-if="code == 'ISMFREETRIAL' && plan.tier == 1") Your Insurance Social Media Essential Plan trial period is free. We ask for your credit card to prevent any service interruption should you keep your account open after the trial period. Your card will not be charged for the trial period. After the trial, you will be charged for each month. You can cancel at any time.
            p(v-else)
                p Your credit card will be charged a pro-rated amount for this month’s subscription fee. You will be charged for next month’s service during the last week of this month.
                h3 Total Charges: #[b ${{ amount }}]
            Card(
                :value="card"
                @setValue="(value) => $store.commit('setCard', value)")
            div(class="w3-row-padding")
                Month(
                    :value="month"
                    @setMonth="(value) => $store.commit('setMonth', value.value)")
                Year(
                    :value="year"
                    @setValue="(value) => $store.commit('setYear', value)")
                CVV(
                    :value="cvv"
                    @setValue="(value) => $store.commit('setCVV', value)")
            div Expiration Month and Year(YYYY) with Security Code
                i(class="fa fa-question-circle-o w3-tooltip")
                    img(class="w3-text" style="position:absolute;bottom:-20px" src="/images/creditcards_cvv.png")
            Name(
                :value="name"
                @setValue="(value) => $store.commit('setCardName', value)")
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
    import Selected from './Selected';
    import Card from './Card';
    import Month from './Month';
    import Year from './Year';
    import CVV from './CVV';
    import Name from './Name';
    import Modal from './Modal';
    import Expired from './Expired';

    export default {
        data() {
            return {
                response: null,
                expired: false
            }
        },
        computed: {
            plan() {
                return this.$store.state.registration.plan;
            },
            code() {
                return this.$store.state.registration.code;
            },
            amount() {
                return this.$store.state.payment.amount;
            },
            card() {
                return this.$store.state.payment.card;
            },
            month() {
                return this.$store.state.payment.month;
            },
            year() {
                return this.$store.state.payment.year;
            },
            cvv() {
                return this.$store.state.payment.cvv;
            },
            name() {
                return this.$store.state.payment.name;
            },
            errors() {
                return this.$store.state.errors.errors;
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
                case 'ISMFREETRIAL':
                    if(this.plan.tier == 1) {
                        this.$store.commit('setAmount', 0.00);
                    } else {
                        if(today.format('MM/DD/YYYY') == new Moment().startOf('month').format('MM/DD/YYYY') ||
                            today.format('MM/DD/YYYY') == new Moment().endOf('month').format('MM/DD/YYYY')) {
                            this.$store.commit('setAmount', parseInt(this.plan.price));
                        } else {
                            const firstDay = new Moment().startOf('month');
                            const lastDay = new Moment().endOf('month');
                            const rate = (parseInt(this.plan.price) / lastDay.diff(firstDay, 'days')).toFixed(2);
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
                        this.$store.commit('setAmount', parseInt(this.plan.price) - 39.00);
                    } else {
                        const firstDay = new Moment().startOf('month');
                        const lastDay = new Moment().endOf('month');
                        const rate = (parseInt(this.plan.price - 39.00) / lastDay.diff(firstDay, 'days')).toFixed(2);
                        let prorate = 0;
                        prorate = (rate * lastDay.diff(today, 'days')).toFixed(2);
                        this.$store.commit('setAmount', prorate);
                    }
                    break;
                default:
                    if(today.format('MM/DD/YYYY') == new Moment().startOf('month').format('MM/DD/YYYY') ||
                        today.format('MM/DD/YYYY') == new Moment().endOf('month').format('MM/DD/YYYY')) {
                        this.$store.commit('setAmount', this.plan.price);
                    } else {
                        const firstDay = new Moment().startOf('month');
                        const lastDay = new Moment().endOf('month');
                        const rate = (parseInt(this.plan.price) / lastDay.diff(firstDay, 'days')).toFixed(2);
                        let prorate = 0;
                        prorate = (rate * lastDay.diff(today, 'days')).toFixed(2);
                        this.$store.commit('setAmount', prorate);
                    }
                    break;
            }
        },
        methods: {
            sendPaymentDataToAnet() {
                this.validate();
                if(this.errors.length == 0) {
                    const secureData = {
                        cardData: {
                            cardNumber: this.card,
                            month: this.month,
                            year: this.year,
                            cardcode: this.cvv
                        },
                        authData: this.$store.state.authorize
                    };

                    Accept.dispatchData(secureData, (response) => {
                        if (response.messages.resultCode === "Error") {
                            for(let error of response.messages.message) {
                                this.$store.commit('setError', error.text);
                            }
                        } else {
                            let data = {
                                registration: this.$store.state.registration,
                                transaction: {
                                    amount: this.amount,
                                    dataDescriptor: response.opaqueData.dataDescriptor,
                                    dataValue: response.opaqueData.dataValue,
                                    customerData: this.$store.state.registration,
                                    discount: 0.00
                                },
                                method: {
                                    name: this.name,
                                    month: this.month,
                                    year: this.year,
                                    number: this.card.substr(this.card.length - 4),
                                    cvv: this.cvv
                                }
                            }
                            if(this.code == 'ISMFREETRIAL' ||
                                this.code == 'IMTGEM17' ||
                                this.code == 'FMH17') {
                                    data.transaction.discount = 39.00;
                            }

                            axios.post('/register', data).then(response => {
                                this.response = {
                                    planCost: this.plan.price,
                                    coupon_code: this.$store.state.registration.code,
                                    amount_charged: response.data.transaction.amount,
                                    transactionId: response.data.transaction.transactionId
                                };
                            }).catch((error) => {
                                if(error.response.data) {
                                    this.$store.commit('setError', 'There has been an error. See error message below.');
                                    this.$store.commit('setError', response.data);
                                }
                            });
                        }
                    });
                }
            },
            validate() {
                this.$store.commit('clearErrors');
                if(this.card == '') {
                    this.$store.commit('setError', 'Please enter credit card number.');
                }
                if(this.month == '') {
                    this.$store.commit('setError', 'Please enter expiration month on credit card.');
                }
                if(this.year == '') {
                    this.$store.commit('setError', 'Please enter expiration year on credit card.');
                }
                if(this.cvv == '') {
                    this.$store.commit('setError', 'Please enter the security code on the back of the card.');
                }
                if(this.name == '') {
                    this.$store.commit('setError', 'Please enter name on credit card.');
                }
            },
            navigate() {
                window.location = '/facebook';
            }
        },
        components: {
            Selected,
            Card,
            Month,
            Year,
            CVV,
            Name,
            Modal,
            Expired
        }
    }
</script>
