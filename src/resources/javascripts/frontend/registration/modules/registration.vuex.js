const Module = {
    state: {
        name: '',
        email: '',
        email_confirmation: '', //required for laravel validation
        password: '',
        password_confirmation: '', //required for laravel validation
        code: '',
        terms: false,
        plan: {
            id: '',
            name: '',
            cost: '',
            price: '',
            tier: '',
            features: [],
            linkedIn: false
        }
    },
    mutations: {
        setName(state, value) {
            state.name = value;
        },
        setEmail(state, value) {
            state.email = value;
        },
        setEmailConfirmation(state, value) {
            state.email_confirmation = value;
        },
        setPassword(state, value) {
            state.password = value;
        },
        setPasswordConfirmation(state, value) {
            state.password_confirmation = value;
        },
        setCode(state, value) {
            state.code = value;
        },
        setTerms(state, value) {
            state.terms = value;
        },
        setPlan(state, value) {
            state.plan.id = value.id,
            state.plan.name = value.name,
            state.plan.cost = value.cost,
            state.plan.price = value.price,
            state.plan.tier = value.tier,
            state.plan.features = value.features
        },
        setLinkedIn(state, value) {
            state.plan.linkedIn = value;
        }
    }
}

export default Module;
