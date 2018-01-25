<template lang="pug">
    div(class="w3-card w3-padding form")
        h3 Payment Method
        h6 You may enter a new card to update your payment information.
        p Current card on file
        p Name: {{ payment.name }}
        p Expiration: {{ payment.month }} - {{ payment.year }}
        p Last 4 digits: {{ payment.number }}
        Card(
            :value="card"
            @setValue="(value) => $store.commit('setCard', value)")
        Month(
            :value="month"
            @setMonth="(value) => $store.commit('setMonth', value.value)")
        Year(
            :value="year"
            @setValue="(value) => $store.commit('setYear', value)")
        CVV(
            :value="cvv"
            @setValue="(value) => $store.commit('setCVV', value)")
        div(style="clear:both") Expiration Month and Year(YYYY) with Security Code
            i(class="fa fa-question-circle-o w3-tooltip")
                img(class="w3-text" style="position:absolute;bottom:-20px" src="/images/creditcards_cvv.png")
        Name(
            :value="name"
            @setValue="(value) => $store.commit('setCardName', value)")
        Errors(
            v-if="errors.length"
            :errors="errors")
        button(class="w3-button w3-text-white primary"
            @click="sendPaymentDataToAnet()") Submit
        div(class="AuthorizeNetSeal" style="display:none")
            a(href="http://www.authorize.net/" id="AuthorizeNetText" target="_blank") Electronic Check Processing
</template>

<script>
    import Card from './Card';
    import Month from './Month';
    import Year from './Year';
    import CVV from './CVV';
    import Name from './Name';

    export default {
        computed: {
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
            payment() {
                return this.$store.state.payment.payment;
            },
            errors() {
                return this.$store.state.errors.errors;
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
                    this.$store.commit('serviceLoading');
                    Accept.dispatchData(secureData, (response) => {
                        if (response.messages.resultCode === "Error") {
                            for(let error of response.messages.message) {
                                this.$store.commit('setError', error.text);
                            }
                        } else {
                            let data = {
                                registration: this.$store.state.registration,
                                transaction: {
                                    dataDescriptor: response.opaqueData.dataDescriptor,
                                    dataValue: response.opaqueData.dataValue,
                                },
                                method: {
                                    name: this.name,
                                    month: this.month,
                                    year: this.year,
                                    number: this.card.substr(this.card.length - 4),
                                    cvv: this.cvv
                                }
                            }

                            axios.post('/api/payment', data).then(response => {
                                this.$store.commit('serviceFinished');
                                this.$router.push({ name: 'Recent' });
                            }).catch((error) => {
                                this.$store.commit('serviceFinished');
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
            Card,
            Month,
            Year,
            CVV,
            Name
        }
    }
</script>
