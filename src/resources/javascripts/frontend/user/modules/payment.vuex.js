const Module = {
    state: {
        card: '',
        month: '',
        year: '',
        cvv: '',
        name: '',
        amount: 0.00,
        payment: {
            name: '',
            month: '',
            year: '',
            number: '',
        }
    },
    mutations: {
        setCard(state, value) {
            state.card = value;
        },
        setMonth(state, value) {
            state.month = value;
        },
        setYear(state, value) {
            state.year = value;
        },
        setCVV(state, value) {
            state.cvv = value;
        },
        setCardName(state, value) {
            state.name = value;
        },
        setAmount(state, value) {
            state.amount = value;
        },
        setPayment(state, value) {
            state.payment.name = value.name;
            state.payment.month = value.month;
            state.payment.year = value.year;
            state.payment.number = value.number;
        }
    }
}

export default Module;
