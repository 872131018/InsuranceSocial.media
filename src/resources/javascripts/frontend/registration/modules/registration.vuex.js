const Module = {
    state: {
        name: '',
        email: '',
        email_confirmation: '', //required for laravel validation
        password: '',
        password_confirmation: '', //required for laravel validation
        code: '',
        terms: false,
        plan: {}
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
            state.plan = value;
        }
    }
}

export default Module;
